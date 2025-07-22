import { OptionProps, MenuProps, MenuListProps } from 'react-select'

/* eslint-disable no-unused-vars */
export interface IDropdownItem<T = undefined> {
    label: string | number
    value: string | number
    color?: string
    backgroudColor?: string
    selected?: boolean
    disable?: boolean
    additionalData?: T
    customLabelOption?: string // data custom label option
}

export interface IDropdown<T = undefined> {
    required?: boolean
    label?: string
    heightInput?: number
    isError?: boolean
    options?: IDropdownItem<T>[]
    onClick?: (value: IDropdownItem<T> | IDropdownItem<T>[] | undefined) => void
    additionalDataHandling?: (value: T | null) => void
    className?: string
    parentDivClassname?: string
    labelDivClassname?: string
    placeholder?: string
    selectedItem?: (value: IDropdownItem<T> | IDropdownItem<T>[]) => void
    readonly?: boolean
    disabled?: boolean
    isLoading?: boolean
    isClearable?: boolean
    isSearchable?: boolean
    onInputChange?: (value: string) => void
    dropDownIndicator?: boolean
    selectedProps?: IDropdownItem
    value?: IDropdownItem<T> | IDropdownItem<T>[] | null
    isMultiSelect?: boolean
    useBorder?: boolean
    isAsync?: boolean
    loadOptions?: any
    defaultValue?: IDropdownItem<T>[]
    onChange?: any
    borderColorClassName?: string
    customOptionComponent?: (
        props: OptionProps<IDropdownItem<T>>,
    ) => JSX.Element
    customMenuComponent?: (props: MenuListProps<any>) => JSX.Element
    useUppercaseLabel?: boolean
    disabledVariant?: 'white' | 'gray'
    dataTestId?: string
    defaultOptions?: boolean | IDropdownItem<T>[]

    testing?: boolean
}
