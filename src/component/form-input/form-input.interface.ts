import { IInput } from "component/input/input.interface"

export interface IFormInput extends IInput {
    name: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    className?: string
    parentDivClassName?: string
    type?: string
    icon?: string
    hideError?: boolean
    client?: 'JPL' | 'IFB'
    dataTestId?: string

    // using custom value
    valueSuffix?: string
    useDecimalFormat?: boolean
}
