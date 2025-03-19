/* eslint-disable no-unused-vars */
import { DateRange } from 'react-day-picker'

export interface IDatePickerHeader {
    changeDateHandler: (date: Date) => void
}

export interface IDatePicker {
    label?: string
    placeholder?: string
    className?: string
    onClear?: () => void
    disable?: boolean
    onlyMonth?: boolean
    isRange: boolean
    iconPosition?: 'left' | 'right'
    disableDays?: 'future' | 'past'
    selectedDate?: Date
    classNamesDisplayDate?: string
    setSelectedDate?: React.Dispatch<React.SetStateAction<Date>>
    selectedRange?: DateRange
    setSelectedRange?: React.Dispatch<
        React.SetStateAction<DateRange | undefined>
    >
    containerInputClassName?: string
    useUppercaseLabel?: boolean

    // datepicker input props
    rangeLabel?: IRangeLabelDatePicker
}
export interface IDatePickerInput extends IDatePicker {
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>
    rangeTemporaryValue?: DateRange
}

export interface IRangeLabelDatePicker {
    start: string
    end: string
}
