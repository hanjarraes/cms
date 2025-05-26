import { useEffect, useRef, useState } from 'react'

export const useButtonPopup = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setDropdownVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function toggleDropdown() {
        setDropdownVisible((prev) => !prev)
    }

    return {
        dropdownRef,
        triggerRef,
        toggleDropdown,
        isDropdownVisible,
        setDropdownVisible,
    }
}
