export interface IToastProps {
    header: string
    message?: string
    type: 'success' | 'error' | 'info' | 'warning' | 'default'
    dataTestId?: string
}
export interface IToastService {
    show: boolean
    toast: IToastProps
}
