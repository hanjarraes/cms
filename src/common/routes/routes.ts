import { IRoute } from 'common/common.interface'
import MainPage from 'pages/main-page/main-page.component'

export const mainRoutes: IRoute[] = [
    {
        path: '/',
        text: 'MainPage',
        Content: MainPage,
        show: true,
        icon: 'ri-dashboard-line',
    },
]
