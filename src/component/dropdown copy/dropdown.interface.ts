
export interface IOption {
  label: string
  value: string | number
}

export interface IDropdownProps {
  label?: string
  options: IOption[]
  value?: string | number
  placeholder?: string
  onChange?: (value: string | number) => void
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  useUppercaseLabel?: boolean
  parentClassName?: string
  className?: string
  dataTestId?: string
}