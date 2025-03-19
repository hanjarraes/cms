import { IButton } from './button.interface'
import './button.style.css'

const Button = ({
    type = 'button',
    isDisabled = false,
    onClick,
    isLoading = false,
    useUpperCase,
    label = '',
    variant = 'default',
    iconClassName = '',
    iconSuffix = '',
    labelClass = '',
    dataTestId = '',
    ...props
}: IButton) => {
    const disableButton = isLoading ? true : isDisabled
    const newLabel = useUpperCase ? label?.toUpperCase() : label
    const buttonVariant = 'button-' + variant
    const hasIcon = props.icon || iconSuffix
    const buttonIconClass = hasIcon && !label ? 'button-icon' : ''
    const dataTestIdComponent = dataTestId ? `${dataTestId}_BUTTON` : ''
    const customLabel = isLoading ? (
        'PLEASE WAIT'
    ) : (
        <>
            {!props.icon ? undefined : (
                <i
                    className={`${props.icon} ${iconClassName} ${newLabel ? `pr-2 sm:pr-0 ${props.isMobileIcon && 'md:hidden'}` : ''}`}
                />
            )}

            {props.icon || iconSuffix !== '' ? (
                <span className={`${labelClass} sm:hidden`}>{newLabel}</span>
            ) : (
                <span className={`${labelClass}`}>{newLabel}</span>
            )}

            {iconSuffix === '' ? undefined : (
                <>
                    <i
                        className={`${iconSuffix} ${iconClassName}  ${newLabel ? `pl-2 sm:pl-0 ${props.isMobileIcon && 'md:hidden'}` : ''}`}
                    />
                </>
            )}
        </>
    )

    return (
        <button
            {...props}
            data-testid={dataTestIdComponent}
            type={type}
            disabled={disableButton}
            onClick={
                isDisabled
                    ? undefined
                    : () => {
                          onClick()
                      }
            }
            className={`cms-button ${buttonVariant} ${props.className} ${buttonIconClass}`}
        >
            {customLabel}
        </button>
    )
}
export default Button
