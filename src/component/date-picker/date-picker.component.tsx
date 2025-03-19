import { DayPicker } from 'react-day-picker'
import DatePickerHeader from './date-picker-header.component'
import { IDatePicker } from './date-picker.interface'
import { useDatePicker } from './date-picker.service'
import './date-picker.style.css'
import DatePickerInput from './date-picker-input.component'
import { useState, useEffect } from 'react'

const DatePicker = ({ isRange = false, ...props }: IDatePicker) => {
    const {
        dropdownRef,
        showDatePicker,
        date,
        rangeTemporaryValue,
        isFutureDate,
        isPastDate,
        setShowDatePicker,
        changeDateHandler,
        adjustDateRange,
    } = useDatePicker({
        selectedRange: props?.selectedRange,
        selectedDate: props?.selectedDate,
        isRange: isRange,
    })

    const [isAbove, setIsAbove] = useState(false)

    const disabledBackground = props.disable
        ? 'bg-[--gray-v5]'
        : 'bg-[--white]'

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top

            setIsAbove(spaceBelow < 300 && spaceAbove > spaceBelow)
        }
    }, [showDatePicker])

    return (
        <div className="w-full">
            <div
                ref={dropdownRef}
                className={`w-full ${isAbove ? 'relative' : ''}`}
            >
                <DatePickerInput
                    isRange={isRange}
                    setShowDatePicker={setShowDatePicker}
                    rangeTemporaryValue={rangeTemporaryValue}
                    {...props}
                />
                {showDatePicker && (
                    <div
                        className={`${isRange && 'flex justify-center'} w-fit`}
                    >
                        <div
                            className={`pickerStyle ${disabledBackground} ${props.classNamesDisplayDate} absolute ${!isRange ? '' : 'left-[50%] -translate-x-1/2'} ${
                                isAbove ? 'bottom-full mb-2' : ''
                            }`}
                        >
                            {!isRange ? (
                                <DayPicker
                                    month={new Date(date)}
                                    disabled={
                                        !props.disableDays
                                            ? undefined
                                            : props.disableDays === 'future'
                                              ? isFutureDate
                                              : isPastDate
                                    }
                                    onDayClick={(date) => {
                                        props?.setSelectedDate &&
                                            props.setSelectedDate(date)
                                    }}
                                    selected={props.selectedDate}
                                    components={{
                                        Caption: (props) =>
                                            DatePickerHeader({
                                                ...props,
                                                changeDateHandler,
                                            }),
                                    }}
                                />
                            ) : (
                                <DayPicker
                                    month={new Date(date)}
                                    mode={'range'}
                                    disabled={
                                        !props.disableDays
                                            ? undefined
                                            : props.disableDays === 'future'
                                              ? isFutureDate
                                              : isPastDate
                                    }
                                    components={{
                                        Caption: (props) =>
                                            DatePickerHeader({
                                                ...props,
                                                changeDateHandler,
                                            }),
                                    }}
                                    selected={rangeTemporaryValue}
                                    onSelect={(range) => {
                                        const adjusted = adjustDateRange(range)
                                        if (!adjusted) return
                                        props.setSelectedRange &&
                                            props.setSelectedRange(adjusted)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DatePicker
