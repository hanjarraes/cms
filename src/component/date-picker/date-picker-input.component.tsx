import {
    IDatePickerInput,
    IRangeLabelDatePicker,
} from './date-picker.interface'
import { useTranslation } from 'react-i18next'
import './date-picker.style.css'
import Input from 'component/input/input.component'
import moment from 'moment'

const formatDate = (
    dateString?: string,
    typeFormat?: string,
    typeFormatSource?: string,
) => {
    const date = !typeFormatSource
        ? moment(dateString)
        : moment(dateString, typeFormatSource)

    // check invalid date
    if (!date.isValid() || !dateString) {
        return ''
    }

    const formattedDate = date.format(typeFormat ? typeFormat : 'DD/MM/YYYY')
    return formattedDate
}

const DatePickerInput = ({
    selectedDate,
    disable,
    selectedRange,
    isRange,
    label,
    onClear,
    setShowDatePicker,
    iconPosition = 'right',
    ...props
}: IDatePickerInput) => {
    const { t } = useTranslation()

    const setRangeLabelUseUppercase = (rangeLabel: IRangeLabelDatePicker) =>
        props.useUppercaseLabel
            ? {
                  start: rangeLabel?.start.toUpperCase(),
                  end: rangeLabel?.end.toUpperCase(),
              }
            : rangeLabel

    const rangeLabel =
        isRange && props.rangeLabel
            ? setRangeLabelUseUppercase(props.rangeLabel)
            : setRangeLabelUseUppercase({
                  start: t('additional.start_date'),
                  end: t('additional.end_date'),
              })

    return (
        <>
            {isRange ? (
                <div
                    className={`flex rounded-[5px] bg-transparent relative gap-2`}
                >
                    <div className="flex w-full relative justify-between">
                        <Input
                            label={rangeLabel?.start}
                            onClick={() => {
                                setShowDatePicker(true)
                            }}
                            readonly
                            value={
                                selectedRange?.from
                                    ? formatDate(
                                          selectedRange?.from?.toString(),
                                      )
                                    : ''
                            }
                            className={`text-[14px] placeholder:text-[14px] !h-[45px] !w-full !text-[16px]  ${
                                disable
                                    ? 'bg-[--gray-v5]'
                                    : 'bg-[--white]'
                            }`}
                            placeholder={'DD/MM/YYYY'}
                        />
                        <div className="ml-[-55px] z-[1] flex items-center">
                            {selectedRange?.from && (
                                <i
                                    className="ri-close-line pr-1 cursor-pointer font-bold"
                                    onClick={() => {
                                        props.setSelectedRange &&
                                            props.setSelectedRange(undefined)
                                        setShowDatePicker(false)
                                    }}
                                ></i>
                            )}
                            <div
                                className={`ri-calendar-event-line border-l px-2 my-2    ${disable ? '' : 'cursor-pointer'} `}
                                onClick={() => setShowDatePicker(true)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full relative justify-between ">
                        <Input
                            label={rangeLabel.end}
                            onClick={() => {
                                setShowDatePicker(true)
                            }}
                            readonly
                            value={
                                selectedRange?.to
                                    ? formatDate(selectedRange.to.toString())
                                    : ''
                            }
                            className={`text-[14px] placeholder:text-[14px] !h-[45px] !w-full !text-[16px] ${
                                disable
                                    ? 'bg-[--gray-v5]'
                                    : 'bg-[--white]'
                            }`}
                            placeholder={'DD/MM/YYYY'}
                        />
                        <div className="ml-[-55px] z-[1] flex items-center">
                            {selectedRange?.from && (
                                <i
                                    className="ri-close-line pr-1 cursor-pointer font-bold"
                                    onClick={() => {
                                        props.setSelectedRange &&
                                            props.setSelectedRange(undefined)
                                        setShowDatePicker(false)
                                    }}
                                ></i>
                            )}
                            <div
                                className={`ri-calendar-event-line border-l px-2 my-2    ${disable ? '' : 'cursor-pointer'} `}
                                onClick={() => setShowDatePicker(true)}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`flex`}>
                    {iconPosition === 'left' && (
                        <div
                            className="ri-calendar-event-line border-r px-2 my-2 flex items-center mr-[-36px] z-[1] cursor-pointer"
                            onClick={() => {
                                setShowDatePicker(true)
                            }}
                        />
                    )}
                    <Input
                        onChange={() => {}}
                        onClick={() => {
                            setShowDatePicker(true)
                        }}
                        value={
                            selectedDate
                                ? formatDate(selectedDate.toString())
                                : ''
                        }
                        className={`text-[14px] placeholder:text-[14px] ${iconPosition === 'left' && 'pl-10'} caret-transparent ${props.containerInputClassName} `}
                        label={
                            props.useUppercaseLabel
                                ? label?.toUpperCase()
                                : label
                        }
                        readonly
                        placeholder={'DD/MM/YYYY'}
                        disabled={disable}
                    />
                    {iconPosition === 'right' && (
                        <div
                            className={`ri-calendar-event-line border-l px-2 my-2 flex items-center ml-[-36px] z-[1]  ${disable ? '' : 'cursor-pointer'} `}
                            onClick={() => {
                                if (!disable) setShowDatePicker(true)
                            }}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default DatePickerInput
