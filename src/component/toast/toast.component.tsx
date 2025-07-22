import React from 'react'
import { ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast.style.css'
import { IToastProps } from './toast.interface'

const CustomToast: React.FC<IToastProps> = ({
    header,
    message,
    dataTestId,
}) => {
    return (
        <div
            className={`css-custom-toast-container flex ml-3 p-2 bg-white text-gray-700`}
            data-testid={dataTestId}
        >
            <div>
                <div className="css-custom-toast-header font-bold text-size-M">
                    <span>{header}</span>
                </div>
                {message && (
                    <div className="css-custom-toast-message !text-size-xs">
                        <span>
                            {message.split('\n').map((str) => (
                                <p key={str}>{str}</p>
                            ))}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export const Toast = ({ header, message, type }: IToastProps) => {
    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return '#07bc0c' // success for success
            case 'error':
                return '#e74c3c' // Red for error
            case 'info':
                return '#3498db' // Blue for info
            case 'warning':
                return '#f1c40f' // Yellow for warning
            default:
                return '#343a40' // Default background color
        }
    }

    const toastOptions: ToastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyStyle: {
            backgroundColor: getBackgroundColor(),
        },
        closeButton: false,
        className: 'toast-white-icon',
    }

    switch (type) {
        case 'success':
            toast.success(
                <CustomToast
                    header={header}
                    message={message}
                    type={type}
                    dataTestId={'SUCCESS_TOAST'}
                />,
                toastOptions,
            )
            break
        case 'error':
            toast.error(
                <CustomToast
                    header={header}
                    message={message}
                    type={type}
                    dataTestId={'ERROR_TOAST'}
                />,
                toastOptions,
            )
            break
        case 'info':
            toast.info(
                <CustomToast
                    header={header}
                    message={message}
                    type={type}
                    dataTestId={'INFO_TOAST'}
                />,
                toastOptions,
            )
            break
        case 'warning':
            toast.warning(
                <CustomToast
                    header={header}
                    message={message}
                    type={type}
                    dataTestId={'WARNING_TOAST'}
                />,
                toastOptions,
            )
            break
        case 'default':
            toast(
                <CustomToast header={header} message={message} type={type} />,
                toastOptions,
            )
            break
        default:
            break
    }
}
