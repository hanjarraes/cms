import React from 'react';

interface ICardProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void
}

const Card = ({
    className, 
    children,
    onClick
}: ICardProps) => {
    return (
        <div
            className={`shadow-md border bg-white p-2 rounded-md transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer hover:bg-[--blue-v1] ${className || ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
