export interface ITogglePasswordButton
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    isPasswordVisible: boolean
    toggleVisibility: () => void
    variant?: 'JPL' | 'IFB'
    dataTestId?: string
}
