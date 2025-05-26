import { ErrorMessage, useField } from 'formik'
import { IFormInput } from './form-input.interface'
import { useEffect, useState } from 'react'
import Input from 'component/input/input.component'
import { formatDecimalNumber } from 'common/common.service'
import TogglePassword from 'component/toggle-password/toggle-password.component'

const FormInput = ({
    readonly = false,
    disabled = false,
    type = 'text',
    parentDivClassName = '',
    hideError = false,
    ...props
}: IFormInput) => {
    //formik
    const [field, meta, helpers] = useField(props.name)

    const borderColorClass =
        meta.error && meta.touched
            ? 'themes-border-red-v3-important'
            : 'themes-border-gray-v3'

    const isError = !(!meta.error || (meta.error && !meta.touched))
    const errorClassMessage = isError && !hideError ? '' : 'hidden'

    // PasswordVisible
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    // use custom value
    const [customValue, setCustomValue] = useState<string>(
        field.value ? field.value.toString() : '',
    )

    const handleChangeCustomValue = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const rawValue = e.target.value
        setCustomValue(rawValue.toString())
    }

    const removeSuffixValue = () => {
        const cleanedLength = customValue.replace(` ${props.valueSuffix}`, '')
        setCustomValue(cleanedLength)
    }

    const handleOnBlurCustomValue = () => {
        // remove suffix value
        const cleanedLength = customValue.replace(` ${props.valueSuffix}`, '')

        // remove string value
        let numericValue = cleanedLength.replace(/[^0-9.]/g, '')

        // handle multiple point
        const parts = numericValue.split('.')
        if (parts.length > 2) {
            numericValue = parts[0] + '.' + parts.slice(1).join('')
        }

        const parsedValue = parseFloat(numericValue) || 0

        const formattedValue = formatDecimalNumber(parsedValue)
        const suffixValue = props.valueSuffix ? ` ${props.valueSuffix}` : ''

        helpers.setValue(parsedValue)
        setCustomValue(formattedValue + suffixValue)
    }

    useEffect(() => {
        if (props.valueSuffix || props.useDecimalFormat) {
            const suffixValue =
                props.valueSuffix && field.value ? ` ${props.valueSuffix}` : ''
            const updatedValue = field.value
                ? formatDecimalNumber(field?.value)
                : ''
            setCustomValue(updatedValue + suffixValue)
        }
    }, [field.value])

    useEffect(() => {
        if (customValue && props.valueSuffix) {
            let numericValue = customValue.replace(/[^0-9.]/g, '')
            const updatedValue = `${numericValue} ${props?.valueSuffix}`
            setCustomValue(updatedValue)
        }
    }, [props?.valueSuffix])

    return (
        <div className={`${parentDivClassName} css-form-input-container mb-3`}>
            <div className="flex relative">
                <Input
                    {...props}
                    value={
                        props.valueSuffix || props.useDecimalFormat
                            ? customValue
                            : field.value
                    }
                    onChange={(e) => {
                        if (props.valueSuffix || props.useDecimalFormat) {
                            handleChangeCustomValue(e)
                        } else {
                            field.onChange(e)
                        }
                        props.onChange && props.onChange(e)
                    }}
                    disabled={disabled}
                    type={
                        type !== 'password'
                            ? type
                            : isPasswordVisible
                              ? 'text'
                              : 'password'
                    }
                    placeholder={props.placeholder}
                    className={`${borderColorClass} ${props.className}`}
                    readonly={readonly}
                    onFocus={() => {
                        if (props.valueSuffix) {
                            removeSuffixValue()
                        }
                    }}
                    onBlur={() => {
                        if (props.valueSuffix || props.useDecimalFormat) {
                            handleOnBlurCustomValue()
                        }
                    }}
                />

                {type === 'password' ? (
                    <TogglePassword
                        isPasswordVisible={isPasswordVisible}
                        toggleVisibility={togglePasswordVisibility}
                        dataTestId={props?.dataTestId}
                    />
                ) : (
                    <></>
                )}
            </div>

            <div
                className={`ml-small-x text-size-XS themes-text-red-v3 ${errorClassMessage}`}
            >
                <ErrorMessage name={props.name} component="p" />
            </div>
        </div>
    )
}

export default FormInput
