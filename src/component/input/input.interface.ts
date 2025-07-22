import { ReactNode } from "react"
export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string
    label?: string
    useUppercaseLabel?: boolean
    type?: string
    value?: string | number
    readonly?: boolean
    required?: boolean
    disabled?: boolean
    isError?: boolean
    icon?: string
    parentInputClassName?: string
    disabledVariant?: 'white' | 'gray'
    onIconClick?: () => void
    useArrow?: boolean // only works if type input is number
    dataTestId?: string
    tooltipIcon?: {
        customText: ReactNode
        text: string
    }
}
