import { useEffect, useRef, useState } from 'react'
import Tooltip from '../tooltip/tooltip.component'
import './text-area.style.css'
import { ITextarea } from './text-area.interface'

const TextArea = ({
    disabled = false,
    readonly = false,
    required = false,
    isError = false,
    disabledVariant = 'gray',
    useUppercaseLabel,
    parentInputClassName,
    onIconClick,
    dataTestId = '',
    rows = 4,
    height = 100,
    ...props
}: ITextarea & { rows?: number }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [focus, setFocus] = useState(false)
    const showLabelClass = !props.label || props.label === '' ? 'hidden' : ''
    const isRequired = required ? 'required' : ''
    const labelFocus = focus ? 'text-[--info-v5]' : ''
    const isDisabled = disabled ? `disabled-${disabledVariant}` : ''
    const iconBg = disabled ? `disabled-gray` : `disabled-white`
    const iconWithAction = ['ri-file-copy-line', 'ri-mail-line']
    const iconClassDisabled =
        props?.icon &&
            disabled &&
            props.value &&
            iconWithAction.includes(props?.icon)
            ? 'cursor-pointer'
            : 'opacity-70'
    const dataTestIdComponent = dataTestId ? `${dataTestId}_TEXTAREA` : ''

    const labelBgColor = disabled ? 'bg-[--gray-v1]' : 'bg-white'

    const handleFocusEvent = () => {
        setFocus(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                textareaRef.current &&
                !textareaRef.current.contains(event.target as Node)
            ) {
                setFocus(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className={` ${parentInputClassName || ''} inputParent-style`}>
            <label className={`${showLabelClass}`}>
                <div className={`inputLabelDiv-style !${labelBgColor}`}>
                    <p
                        className={`${isRequired} ${labelFocus} ${isError && '!text-[--danger-v5]'
                            }`}
                    >
                        {useUppercaseLabel
                            ? props.label?.toUpperCase()
                            : props.label}
                    </p>
                </div>
            </label>

            <div
                className={`relative w-full bg-white ${disabled && 'bg-[--gray-v1]'
                    }`}
                id={props?.id}
            >
                <textarea
                    {...props}
                    ref={textareaRef}
                    disabled={disabled}
                    className={`${props.className} ${isDisabled} ${isError && '!border-[--danger-v5]'
                        } w-full resize-none rounded-md border px-3 py-2`}
                    placeholder={props.placeholder}
                    rows={rows}
                    style={{ height: height }}
                    value={disabled && !props.value ? '-' : props.value}
                    readOnly={readonly}
                    onChange={(e) => {
                        if (props.onChange) props.onChange(e)
                    }}
                    onFocus={(e) => {
                        handleFocusEvent()
                        props.onFocus && props.onFocus(e)
                    }}
                    data-testid={dataTestIdComponent}
                />

                {props?.icon && (
                    <div
                        className={`input-icon absolute top-2 right-2 flex items-center justify-center ${onIconClick && 'cursor-pointer'} ${iconBg}`}
                    >
                        {props.tooltipIcon ? (
                            <Tooltip
                                text={props.tooltipIcon.text}
                                customText={props.tooltipIcon.customText}
                                isShow
                                isHover
                                children={
                                    <i
                                        className={`${props.icon} ${iconClassDisabled}`}
                                        onClick={() => {
                                            onIconClick && onIconClick()
                                        }}
                                    ></i>
                                }
                            />
                        ) : (
                            <i
                                className={`${props.icon} ${iconClassDisabled}`}
                                onClick={() => {
                                    onIconClick && onIconClick()
                                }}
                            ></i>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TextArea
