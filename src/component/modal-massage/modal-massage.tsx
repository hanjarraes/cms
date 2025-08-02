import React from 'react';
import clsx from 'clsx';
import Modal from 'component/modal/modal.component';
import Button from 'component/button/button.component';
import { IVariantButton } from 'component/button/button.interface';

type ToastType = 'info' | 'success' | 'danger';

interface ModalToastProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
    closeLabel?: string;
    type?: ToastType;
    title: string;
    description?: string | React.ReactNode;
}

const toastStyleMap: Record<
    ToastType,
    { iconClass: string; borderColor: string; bgColor: string; textColor: string }
> = {
    info: {
        iconClass: 'ri-information-line text-[--info-v5]',
        borderColor: 'border-[--info-v5]',
        bgColor: 'bg-[--info-v1]',
        textColor: 'text-[--info-v5]',
    },
    success: {
        iconClass: 'ri-information-line text-[--success-v5]',
        borderColor: 'border-[--success-v5]',
        bgColor: 'bg-[--success-v1]',
        textColor: 'text-[--success-v5]',
    },
    danger: {
        iconClass: 'ri-information-line text-[--danger-v5]',
        borderColor: 'border-[--danger-v5]',
        bgColor: 'bg-[--danger-v1]',
        textColor: 'text-[--danger-v5]',
    },
};

const ModalToast: React.FC<ModalToastProps> = ({
    isOpen,
    onClose,
    onSubmit,
    submitLabel = 'OK',
    closeLabel = 'Batal',
    type = 'info',
    title,
    description,
}) => {
    const { iconClass, bgColor, textColor } = toastStyleMap[type];

    return (
        <Modal
            isModalOpen={isOpen}
            animationDirection="top"
            className={clsx(
                'p-3 rounded-xl max-w-sm border flex flex-col gap-4 shadow-xl transition-all duration-300',
                bgColor,
                textColor
            )}
            zIndex={9999}
            hideOnDefault={true}
            parentDivClassName="items-start pt-8 sm:pt-10"
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-center">
                    <div className='flex flex-col items-center'>
                        <i className={clsx('text-[28px]', iconClass)} />
                        <div className="font-semibold text-base">{title}</div>
                    </div>
                </div>
                {description && (
                    <div className="text-sm text-center mt-1 text-[--gray-v4]">
                        {typeof description === 'string' ? (
                            <p>{description}</p>
                        ) : (
                            description
                        )}
                    </div>
                )}
            </div>

            {(onSubmit || onClose) && (
                <div className="flex justify-between gap-2 mt-2">
                    {onClose && (
                        <Button
                            label={closeLabel}
                            variant={'default'}
                            className='mt-4'
                            onClick={onClose}
                        />
                    )}
                    {onSubmit && (
                        <Button
                            label={submitLabel}
                            variant={type as IVariantButton}
                            className='mt-4'
                            onClick={onSubmit}
                        />
                    )}
                </div>
            )}
        </Modal>
    );
};

export default ModalToast;
