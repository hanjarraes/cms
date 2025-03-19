/* eslint-disable no-unused-vars */
export interface IButton
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    onClick: () => void
    label?: string
    icon?: string // Icon Prefix
    iconSuffix?: string
    type?: 'button' | 'submit'
    variant?: IVariantButton
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
    iconClassName?: string
    toggle?: boolean
    isActive?: boolean
    useUpperCase?: boolean
    isMobileIcon?: boolean
    dataTestId?: string

    // propery class
    labelClass?: string
}

export type IVariantButton =
    | 'default'
    | 'primary'
    | 'primary-inverse'
    | 'primary-v2'
    | 'primary-v2-inverse'
    | 'red'
    | 'red-inverse'
    | 'default-pagination'
