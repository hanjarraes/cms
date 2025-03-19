import React, { ReactNode, useEffect, useState } from 'react'
import './tooltip.style.css'

const Tooltip = ({
    text,
    customText,
    isShow,
    isHover,
    children,
    className,
}: {
    text: string
    isShow: boolean
    isHover?: boolean
    children: ReactNode
    customText?: ReactNode
    className?: string
}) => {
    const [show, setShow] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Menentukan apakah tooltip akan muncul berdasarkan isShow atau isHover
    const clazz = (isHover ? (isHover && isHovered) : show) ? '' : 'hidden'

    useEffect(() => {
        setShow(isShow)
    }, [isShow])

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    return (
        <>
            <div
                className="w-full relative"
                onMouseEnter={isHover ? handleMouseEnter : undefined}
                onMouseLeave={isHover ? handleMouseLeave : undefined}
            >
                {children}

                <div className={`${clazz} absolute z-[999] mt-1`}>
                    <div className="arrow-up"></div>
                    <div
                        className={`bg-[--gray-v8] text-[--white] bg-opacity-90 leading-none rounded p-3 ${className}`}
                    >
                        {customText ? customText : text}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tooltip
