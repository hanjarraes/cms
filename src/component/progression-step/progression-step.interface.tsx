export interface IProgressionStepProps {
    steps: ISteps[]
    onChange: (step: ISteps) => void
    selectedItem: ISteps
    completedStep?: boolean
    disableBackClick?: boolean
}

export interface ISteps {
    label: string
    value: string
    icon?: string
    textIcon?: string
    content?: JSX.Element
}
