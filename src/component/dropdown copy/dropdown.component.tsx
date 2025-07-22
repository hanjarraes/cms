import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import './dropdown.style.css'

interface IOption {
    label: string
    value: string | number
}

interface IDropdownProps {
    label?: string
    options: IOption[]
    placeholder?: string
    value?: string | number | null
    onChange?: (value: string | number | null) => void
    disabled?: boolean
    required?: boolean
    readonly?: boolean
    useUppercaseLabel?: boolean
    parentClassName?: string
    className?: string
    dataTestId?: string
    dropdownPosition?: 'bottom' | 'top' | 'left' | 'right'
    isSearch?: boolean
    isClear?: boolean
}

const Dropdown = ({
    label,
    options,
    value,
    placeholder = 'Pilih...',
    onChange,
    disabled = false,
    required = false,
    readonly = false,
    useUppercaseLabel,
    parentClassName,
    className,
    dataTestId = '',
    dropdownPosition = 'bottom',
    isSearch = false,
    isClear = false
}: IDropdownProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [focused, setFocused] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false)
            setFocused(false)
            setSearchTerm('')
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const selectedOption = options.find((opt) => opt.value === value)
    const showLabelClass = !label ? 'hidden' : ''
    const isRequired = required ? 'required' : ''
    const labelFocus = focused ? 'text-[--info-v5]' : ''
    const labelBgColor = disabled ? 'bg-[--gray-v1]' : 'bg-white'

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const positionClass = {
        bottom: 'top-[37px] animate-slide-down',
        top: 'bottom-[37px] animate-slide-up',
        left: 'right-full top-0 animate-slide-left',
        right: 'left-full top-0 animate-slide-right'
    }[dropdownPosition]

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.(null)
        setOpen(false)
    }

    return (
        <div
            ref={ref}
            className={`inputParent-style relative ${parentClassName || ''}`}
            data-testid={dataTestId ? `${dataTestId}_DROPDOWN` : ''}
        >
            <label className={`${showLabelClass}`}>
                <div className={`inputLabelDiv-style !${labelBgColor}`}>
                    <p className={`${isRequired} ${labelFocus}`}>
                        {useUppercaseLabel ? label?.toUpperCase() : label}
                    </p>
                </div>
            </label>

            <div
                className={clsx(
                    'w-full h-[35px] border rounded-md text-[12px] flex items-center px-2 justify-between',
                    'cursor-pointer transition-all',
                    className,
                    disabled ? 'bg-[--gray-v1] text-[--gray-v5] cursor-not-allowed' : 'bg-white',
                    focused ? 'border-[--brand-v5]' : 'border-[--gray-v3]'
                )}
                onClick={() => {
                    if (!disabled && !readonly) {
                        setOpen(!open)
                        setFocused(true)
                    }
                }}
            >
                <span
                    className={clsx(
                        'truncate flex-1',
                        !selectedOption && 'text-[--gray-v4]'
                    )}
                >
                    {selectedOption?.label || placeholder}
                </span>

                {/* isClear Icon */}
                {isClear && value && (
                    <i
                        className="ri-close-line text-[16px] ml-2 text-[--gray-v5] hover:text-red-500 cursor-pointer"
                        onClick={handleClear}
                    />
                )}

                {/* Arrow Icon */}
                <i
                    className={clsx(
                        'ri-arrow-down-s-line text-[16px] ml-2 transition-transform duration-200',
                        open && 'rotate-180'
                    )}
                />
            </div>

            {open && !disabled && (
                <ul
                    className={clsx(
                        'dropdown-menu-style z-[999] bg-white border border-[--gray-v3] rounded-md max-h-[200px] overflow-y-auto absolute w-full text-[12px] shadow-md h-[150px] overflow-auto',
                        positionClass
                    )}
                >
                    {isSearch && (
                        <li className="p-2 sticky top-0 bg-white z-10 border-b border-[--gray-v2]">
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="w-full border rounded px-2 py-[5px] text-[12px] focus:outline-none focus:ring-1 focus:ring-[--brand-v5]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </li>
                    )}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt) => (
                            <li
                                key={opt.value}
                                className={clsx(
                                    'px-3 py-2 cursor-pointer hover:bg-[--gray-v2]',
                                    value === opt.value && 'bg-[--gray-v1]'
                                )}
                                onClick={() => {
                                    onChange?.(opt.value)
                                    setOpen(false)
                                    setSearchTerm('')
                                }}
                            >
                                {opt.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-3 py-2 text-[--gray-v4]">Tidak ditemukan</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default Dropdown
