import React from 'react';

interface ICardProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    animated?: boolean;
    animationDirection?: 'up' | 'down' | 'left' | 'right';
    hoverClassName?: string; 
}

const getDefaultHoverTransform = (direction: ICardProps['animationDirection']) => {
    switch (direction) {
        case 'up':
            return 'hover:-translate-y-2';
        case 'down':
            return 'hover:translate-y-2';
        case 'left':
            return 'hover:-translate-x-2';
        case 'right':
            return 'hover:translate-x-2';
        default:
            return 'hover:-translate-y-2';
    }
};

const Card = ({
    className = '',
    children,
    onClick,
    animated = false,
    animationDirection = 'up',
    hoverClassName
}: ICardProps) => {
    const defaultTransform = getDefaultHoverTransform(animationDirection);
    const transformClass = animated ? (hoverClassName || defaultTransform) : '';

    return (
        <div
            className={`shadow-md border bg-white p-2 rounded-md transition-transform duration-300
                ${animated ? 'cursor-pointer hover:shadow-lg hover:bg-[--info-v1]' : ''}
                ${transformClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
