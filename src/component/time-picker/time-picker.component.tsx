import Input from '../input/input.component'

interface ITimePickerProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  isError?: boolean
  useUppercaseLabel?: boolean
  parentInputClassName?: string
  dataTestId?: string
}

const TimePicker = ({
  label = 'Waktu',
  value = '',
  onChange,
  disabled = false,
  readonly = false,
  required = false,
  isError = false,
  useUppercaseLabel = false,
  parentInputClassName,
  dataTestId = '',
}: ITimePickerProps) => {
  return (
    <Input
      label={label}
      type="time"
      value={value}
      onChange={(e) => {
        onChange && onChange(e.target.value)
      }}
      disabled={disabled}
      readonly={readonly}
      required={required}
      isError={isError}
      useUppercaseLabel={useUppercaseLabel}
      parentInputClassName={parentInputClassName}
      dataTestId={dataTestId}
      className="w-[7.5rem]"
    />
  )
}

export default TimePicker
