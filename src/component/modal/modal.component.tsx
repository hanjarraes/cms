import './modal.style.css'

const Modal = ({
    children,
    isModalOpen,
    className,
    zIndex = 9999,
    hideOnDefault = true,
    parentDivClassName,
}: {
    isModalOpen: boolean
    children: React.ReactNode
    className?: string
    zIndex?: number
    hideOnDefault?: boolean
    parentDivClassName?:string
}) => {
    const disActiveClassName = `z-[-9999] ${hideOnDefault ? 'hidden' : ''} fade-out pointer-events-none`
    const activeClassName = `z-[${zIndex}] fade-in bg-opacity-75 bg-gray-800`
    const modalClassName = isModalOpen ? activeClassName : disActiveClassName
    return (
        <div
            style={{ zIndex: zIndex }}
            className={`cms-modal fixed inset-0 bg-opacity-0 flex items-center justify-center  ${modalClassName} ${parentDivClassName}`}
        >
            <div
                className={`${className} bg-[--white] p-4 rounded w-3/4 sm:w-full sm:m-4 `}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal
