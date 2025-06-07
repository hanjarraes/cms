import './modal.style.css'
import clsx from 'clsx'

const Modal = ({
  children,
  isModalOpen,
  className,
  zIndex = 9999,
  hideOnDefault = true,
  parentDivClassName,
  animationDirection = 'center',
}: {
  isModalOpen: boolean
  children: React.ReactNode
  className?: string
  zIndex?: number
  hideOnDefault?: boolean
  parentDivClassName?: string
  animationDirection?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}) => {
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
        'cms-modal fixed inset-0 flex items-center justify-center transition-all duration-300',
        backdropClass,
        parentDivClassName
      )}
    >
      <div
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
