/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { IInput } from './input.interface'
import Tooltip from '../tooltip/tooltip.component'
import './input.style.css'

const Input = ({
    disabled = false,
    readonly = false,
    required = false,
    type = 'text',
    disabledVariant = 'gray',
    useUppercaseLabel,
    parentInputClassName,
    onIconClick,
    useArrow = true,
    dataTestId = '',
    ...props
}: IInput) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState(false)
    const showLabelClass = !props.label || props.label === '' ? 'hidden' : ''
    const isRequired = required ? 'required' : ''
    const labelFocus = focus ? 'themes-text-brand-v5' : ''
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
    const useArrowClass = useArrow
        ? ''
        : '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    const dataTestIdComponent = dataTestId ? `${dataTestId}_INPUT` : ''

    // control label color
    const labelBgColor = disabled ? 'themes-bg-gray-v1' : 'bg-white'

    const handleFocusEvent = () => {
        setFocus(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
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
        <div className={` ${parentInputClassName || ''} inputParent-style $`}>
            <label className={`${showLabelClass}`}>
                <div className={`inputLabelDiv-style !${labelBgColor}`}>
                    <p className={`${isRequired} ${labelFocus}`}>
                        {useUppercaseLabel
                            ? props.label?.toUpperCase()
                            : props.label}
                    </p>
                </div>
            </label>

            <div
                className={`${props.descriptionValue || props.descriptionValueRight && 'input-group'} flex w-full items-center themes-bg-white ${props.descriptionValue || props.descriptionValueRight && disabled && 'themes-bg-gray-v1'}`}
                id={props?.id}
            >
                {props.descriptionValue && (
                    <div
                        className={`themes-text-gray-v4 text-size-S mx-2 flex item gap-2 `}
                    >
                        <div className={`themes-text-gray-v4 text-size-S`}>
                            {props.descriptionValue}
                        </div>
                        <div className="border-r"></div>
                    </div>
                )}
                <input
                    {...props}
                    ref={inputRef}
                    disabled={disabled}
                    className={`${props.className} ${isDisabled} ${useArrowClass}`}
                    placeholder={props.placeholder}
                    type={type}
                    value={disabled && !props.value ? '-' : props.value}
                    readOnly={readonly}
                    onChange={(e) => {
                        if (props.onChange) props.onChange(e)
                    }}
                    onFocus={(e) => {
                        handleFocusEvent()
                        props.onFocus && props?.onFocus(e)
                    }}
                    data-testid={dataTestIdComponent}
                />
                {props.descriptionValueRight && (
                    <div
                        className={`themes-text-gray-v4 text-size-S mx-2 flex item gap-2 `}
                    >
                        <div className="border-l"></div>
                        <div className={`themes-text-gray-v4 text-size-S`}>
                            {props.descriptionValueRight}
                        </div>
                    </div>
                )}
                {props?.icon && (

                    <div
                        className={`input-icon flex items-center justify-center  ${onIconClick && 'cursor-pointer'} ${iconBg}`}
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

export default Input
