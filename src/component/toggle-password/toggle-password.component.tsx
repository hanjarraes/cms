import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ITogglePasswordButton } from './toggle-password.interface'
import './toggle-password.style.css'

const TogglePassword = ({
    isPasswordVisible,
    toggleVisibility,
    dataTestId = '',
    ...props
}: ITogglePasswordButton) => {
    const dataTestIdComponent = dataTestId ? `${dataTestId}_SHOW_HIDE_BTN` : ''
    return (
        <button
            type="button"
            className={`button h-[30px] m-auto mr-1`}
            onClick={toggleVisibility}
            data-testid={dataTestIdComponent}
            {...props}
        >
            {isPasswordVisible ? (
                <AiOutlineEye className={`icon css-toggle-password-icon`} />
            ) : (
                <AiOutlineEyeInvisible
                    className={`icon css-toggle-password-icon`}
                />
            )}
        </button>
    )
}

export default TogglePassword
