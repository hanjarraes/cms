import './modal.style.css'
import clsx from 'clsx'
import { useRef } from 'react'

const Modal = ({
  children,
  isModalOpen,
  className,
  zIndex = 9999,
  hideOnDefault = true,
  parentDivClassName,
  animationDirection = 'center',
  closeOnOutsideClick = false,
  onClose,
}: {
  isModalOpen: boolean
  children: React.ReactNode
  className?: string
  zIndex?: number
  hideOnDefault?: boolean
  parentDivClassName?: string
  animationDirection?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  closeOnOutsideClick?: boolean
  onClose?: () => void
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      closeOnOutsideClick &&
      onClose &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose()
    }
  }

  const backdropClass = isModalOpen
    ? 'fade-in bg-black/40 pointer-events-auto'
    : `fade-out bg-transparent pointer-events-none ${hideOnDefault ? 'hidden' : ''}`

  const animationClass = {
    top: isModalOpen ? 'slide-in-top' : 'slide-out-top',
    bottom: isModalOpen ? 'slide-in-bottom' : 'slide-out-bottom',
    left: isModalOpen ? 'slide-in-left' : 'slide-out-left',
    right: isModalOpen ? 'slide-in-right' : 'slide-out-right',
    center: isModalOpen ? 'zoom-in' : 'zoom-out',
  }[animationDirection]

  return (
    <div
      style={{ zIndex }}
      className={clsx(
        'cms-modal fixed inset-0 flex items-center justify-center transition-all duration-300 !m-0',
        backdropClass,
        parentDivClassName
      )}
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className={clsx(
          className,
          'bg-white rounded shadow-lg max-h-[90vh] overflow-y-auto w-3/4 sm:w-full sm:m-4',
          animationClass
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
