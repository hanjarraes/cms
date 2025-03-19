import { useEffect, useRef, useState } from 'react'
import { ITextarea } from './text-area.interface'
import './text-area.style.css'

const Textarea = ({
    disabled = false,
    readonly = false,
    required = false,
    resize = false,
    disabledVariant = 'gray',
    maxLength = 225,
    containerClassName = '', // Ubah properti parentTextareaClassName menjadi containerClassName
    useUppercaseLabel = false,
    ...props
}: ITextarea) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [focus, setFocus] = useState(false)
    const showLabelClass = !props.label || props.label === '' ? 'hidden' : ''
    const showAdditionalInfo = !props.additionalInfo || props.additionalInfo === '' ? 'hidden' : 'label-down'
    const isRequired = required ? 'required' : ''
    const isDisabled = disabled ? `disabled-${disabledVariant}` : ''
    const isFocus = focus ? 'text-[blue-v5]' : ''
    const isResize = !resize ? 'none' : 'both'
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
        <div className={`textareaParent-style ${containerClassName} `}>
            {/* Menggunakan containerClassName di sini */}
            <label className={`${showLabelClass} text-[gray-v5]`}>
                <div>
                    <p className={`${isRequired} ${isFocus}`}>
                        {useUppercaseLabel
                            ? props.label?.toUpperCase()
                            : props.label}
                    </p>
                </div>
            </label>
            <textarea
                {...props}
                ref={textareaRef}
                disabled={disabled}
                className={`${props.className} ${isDisabled}`}
                placeholder={props.placeholder}
                value={props.value}
                readOnly={readonly}
                required={required}
                maxLength={maxLength}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e)
                }}
                onFocus={handleFocusEvent}
                style={{ resize: isResize }}
            />
            <label className={`${showAdditionalInfo} text-[gray-v5]`}>
                <div>
                    <p className={`${isRequired} ${isFocus}`}>
                        {props.additionalInfo}
                    </p>
                </div>
            </label>
        </div>
    )
}

export default Textarea
