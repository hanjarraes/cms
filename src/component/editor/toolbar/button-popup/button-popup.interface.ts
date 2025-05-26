export interface IButtonPopupItem {
    icon: string
    label: string
    onClick: () => void
    isDefault?: boolean
    className?: string
}

export interface IButtonPopup {
    defaultLabel?: string
    label?: string
    classNameButton?: string
    useSelectedLabel?: boolean
    iconButton?: string
    items: IButtonPopupItem[]
    position: 'left' | 'right'
    positionPopup?: 'top' | 'bottom'
    className?: string
    tooltip?: string
    id?: string
    variant?: 'vertical' | 'horizontal'
    isArrowVisible?: boolean
}
