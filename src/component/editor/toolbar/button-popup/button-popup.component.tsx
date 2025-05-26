import { useState, useEffect } from 'react'
import { useButtonPopup } from './button-popup.service'
import { IButtonPopup } from './button-popup.interface'
import { menuPositionClasses } from './button-popup.static'
import { Tooltip } from 'react-tooltip'
import '../toolbar.style.css'

const ButtonPopUp = ({
    items,
    position = 'right',
    className,
    defaultLabel = '',
    iconButton,
    label,
    tooltip,
    id,
    classNameButton,
    positionPopup = 'bottom',
    variant = 'vertical',
    isArrowVisible = true,
    useSelectedLabel = false,
}: IButtonPopup) => {
    const {
        dropdownRef,
        isDropdownVisible,
        setDropdownVisible,
        toggleDropdown,
        triggerRef,
    } = useButtonPopup()

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [selectedLabel, setSelectedLabel] = useState<string>(
        useSelectedLabel ? defaultLabel : '',
    )

    const defaultItemIndex = items.findIndex((item) => item.isDefault)
    useEffect(() => {
        if (!useSelectedLabel) return

        if (activeIndex === null) {
            if (defaultItemIndex !== -1) {
                setActiveIndex(defaultItemIndex)
                setSelectedLabel(items[defaultItemIndex].label)
                items[defaultItemIndex].onClick?.()
            } else {
                setSelectedLabel(defaultLabel)
            }
        }
    }, [activeIndex, defaultLabel, useSelectedLabel, defaultItemIndex])
    useEffect(() => {
        if (defaultItemIndex !== -1) {
            setActiveIndex(defaultItemIndex)
            if (useSelectedLabel) {
                setSelectedLabel(items[defaultItemIndex].label)
            }
        }
    }, [])

    return (
        <div className="relative z-30">
            <div className="relative z-20">
                {(variant === 'vertical' || variant === 'horizontal') &&
                    isDropdownVisible && (
                        <div
                            ref={dropdownRef}
                            className={`${
                                variant === 'vertical'
                                    ? 'min-w-40 flex flex-col'
                                    : 'flex flex-row gap-x-0'
                            } absolute z-[999] ${
                                positionPopup === 'top'
                                    ? 'bottom-full'
                                    : 'top-full'
                            } ${menuPositionClasses[position]} ${className} themes-bg-white !border container-border text-size-S mb-2 mt-2 rounded-md`}
                        >
                            {items.map((data, index) => {
                                const isLast = index === items.length - 1
                                const isActive = index === activeIndex

                                return (
                                    <div
                                        key={index}
                                        className={`p-2 cursor-pointer ${
                                            variant === 'horizontal'
                                                ? 'text-size-XS flex justify-center items-center'
                                                : ''
                                        } ${
                                            !isLast && variant === 'vertical'
                                                ? 'border-b border-border-gray'
                                                : !isLast
                                                  ? 'border-r themes-border-brand-v5'
                                                  : ''
                                        } ${data.className || ''} ${
                                            isActive
                                                ? variant === 'vertical'
                                                    ? 'themes-bg-brand-v2'
                                                    : 'themes-bg-brand-v5 text-white'
                                                : variant === 'vertical'
                                                  ? 'themes-bg-hover-gray-v2'
                                                  : 'themes-bg-hover-brand-v4 themes-text-brand-v5'
                                        }`}
                                        onClick={() => {
                                            if (isActive) {
                                                setActiveIndex(null)
                                                setSelectedLabel(defaultLabel)
                                            } else {
                                                setActiveIndex(index)
                                                if (useSelectedLabel) {
                                                    setSelectedLabel(data.label)
                                                }
                                            }
                                            data.onClick?.()
                                            setDropdownVisible(false)
                                        }}
                                    >
                                        <i
                                            className={`ri-${data.icon} text-[1rem] text-center`}
                                        />
                                        {data.label}
                                    </div>
                                )
                            })}
                        </div>
                    )}

                {/* Trigger Button */}
                <div className={`toolbar-button ${classNameButton}`}>
                    <button
                        ref={triggerRef}
                        className={`flex flex-row items-center justify-between w-full padding-toolbar-button ${
                            isDropdownVisible ? 'active-toolbar-button' : ''
                        }`}
                        onClick={toggleDropdown}
                        id={id}
                    >
                        <div className={`toolbar-icon ${iconButton}`}>
                            <span className="text-size-S">
                                {useSelectedLabel
                                    ? selectedLabel || defaultLabel
                                    : label}
                            </span>
                        </div>
                        {isArrowVisible && (
                            <span
                                className={`${
                                    isDropdownVisible
                                        ? 'ri-arrow-up-s-line'
                                        : 'ri-arrow-down-s-line'
                                }`}
                            />
                        )}
                    </button>
                </div>
            </div>
            <Tooltip place="bottom" content={tooltip} anchorSelect={`#${id}`} />
        </div>
    )
}

export default ButtonPopUp
