export interface IMenu {
    active?: boolean
    showName?: boolean

    // eslint-disable-next-line no-unused-vars
    action: (props: string) => void
}

export interface IFetch<T> {
    endpoint: string
    params?: T | any
}

export interface IBlob<T> {
    endpoint: string
    params?: T
}

export interface IFetchOptions {
    endpoint: string
}

export interface IPost<T> {
    endpoint: string
    payload?: any
    params?: T
    isFormData?: boolean
}

export interface IRoute {
    icon?: string
    text: string
    path: string
    Content?: () => JSX.Element
    show?: boolean
    expandable?: boolean
    sub?: IRoute[]
    isSubMenu?: boolean
    index?: number
    openSideBar?: Function
    showSearch?: boolean
    parentId?: string
}

export interface IResponseData<T> {
    message: string
    data: T
    search?: string
    isSuccess?: boolean
    additionals: any
    errors?: any
}

export interface ITableTabs {
    header: string
    body: number
    className: string
}

export type ThemeType =
    | 'dark-sapphire-blue-themes'
    | 'bright-sky-blue-themes'
    | undefined
