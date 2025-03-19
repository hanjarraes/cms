/* eslint-disable no-unused-vars */
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

export function useDatePicker({
    selectedRange,
    selectedDate,
}: {
    selectedRange?: DateRange
    selectedDate?: Date
    isRange?: boolean
}) {
    // state
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [rangeTemporaryValue, setRangeTemporaryValue] = useState<
        DateRange | undefined
    >({
        from: undefined,
        to: undefined,
    })

    // variable
    const dropdownRef = useRef<HTMLDivElement>(null)

    // fucntion event listener
    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as HTMLDivElement)
        ) {
            setShowDatePicker(false)
        }
    }
    // fucntion event listener
    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setShowDatePicker(false)
        }
    }

    // function set feature date
    function isFutureDate(date: Date) {
        return moment(date).isAfter(moment())
    }

    // function set past date
    function isPastDate(date: Date) {
        return moment(date).isBefore(moment())
    }

    // change date
    const changeDateHandler = (date: Date) => {
        setDate(date)
    }

    // handle when range value date 0
    const adjustDateRange = (range?: DateRange) => {
        if (!range) {
            setRangeTemporaryValue({ from: undefined, to: undefined })
            return false
        }

        if (!range.to) {
            setRangeTemporaryValue({ from: range.from, to: undefined })
            return false
        }

        setRangeTemporaryValue({ from: range.from, to: range.to })
        return { from: range.from, to: range.to }
    }

    // useEffects
    useEffect(() => {
        // handle event listener
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)
    }, [])

    // handle close selectedRange selected date
    useEffect(() => {
        if (selectedRange?.to && selectedRange?.from) setShowDatePicker(false)
        if (selectedDate) setShowDatePicker(false)
    }, [selectedRange?.to, selectedRange?.from, selectedDate])

    useEffect(() => {
        setRangeTemporaryValue(selectedRange)
    }, [selectedRange])

    return {
        isFutureDate,
        isPastDate,
        setShowDatePicker,
        changeDateHandler,
        showDatePicker,
        dropdownRef,
        rangeTemporaryValue,
        date,
        setDate,
        adjustDateRange,
    }
}
