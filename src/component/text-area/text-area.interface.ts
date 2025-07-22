/* eslint-disable no-unused-vars */
export interface ITextarea {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    label?: string
    additionalInfo?:string
    placeholder?: string
    className?: string
    maxLength?: number
    containerClassName?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    resize?: boolean
    rows?: number
    height?:number
    [key: string]: any
    disabledVariant?: 'white' | 'gray'
}
