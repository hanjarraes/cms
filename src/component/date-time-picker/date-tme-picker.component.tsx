import { useState } from 'react'
import Input from '../input/input.component'

interface IDateTimeValue {
  date: string
  month: string
  time: string
}

interface IDateTimePicker {
  label?: string
  disabled?: boolean
  readonly?: boolean
  isError?: boolean
  value?: IDateTimeValue
  onChange?: (value: IDateTimeValue) => void
  required?: boolean
  useUppercaseLabel?: boolean
  parentInputClassName?: string
}

const DateTimePicker = ({
  label,
  disabled,
  readonly,
  isError,
  value = { date: '', month: '', time: '' },
  onChange,
  required,
  useUppercaseLabel,
  parentInputClassName,
}: IDateTimePicker) => {
  const [internalValue, setInternalValue] = useState<IDateTimeValue>(value)

  const handleChange = (field: keyof IDateTimeValue, newVal: string) => {
    const updated = { ...internalValue, [field]: newVal }
    setInternalValue(updated)
    onChange && onChange(updated)
  }

  return (
    <div className={parentInputClassName}>
      <label className="block text-[--gray-v5]  mb-1 text-[12px]">
        {label && (useUppercaseLabel ? label.toUpperCase() : label)}
        {required && <span className="text-[--danger-v5]">*</span>}
      </label>

      <div className="flex gap-2">
        <Input
          type="number"
          label="Tanggal"
          placeholder="DD"
          disabled={disabled}
          readonly={readonly}
          required={required}
          isError={isError}
          value={internalValue.date}
          onChange={(e) => handleChange('date', e.target.value)}
          className="w-20 text-center"
        />
        <Input
          type="number"
          label="Bulan"
          placeholder="MM"
          disabled={disabled}
          readonly={readonly}
          required={required}
          isError={isError}
          value={internalValue.month}
          onChange={(e) => handleChange('month', e.target.value)}
          className="w-20 text-center"
        />
        <Input
          type="time"
          label="Waktu"
          placeholder="HH:MM"
          disabled={disabled}
          readonly={readonly}
          required={required}
          isError={isError}
          value={internalValue.time}
          onChange={(e) => handleChange('time', e.target.value)}
          className="w-[6.5rem]"
        />
      </div>
    </div>
  )
}

export default DateTimePicker
