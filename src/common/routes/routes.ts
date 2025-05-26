import { IRoute } from 'common/common.interface'
import Dashboard from 'pages/dashboard/dashboard.component'
import Quiz from 'pages/quiz/quiz.component'

export const mainRoutes: IRoute[] = [
    {
        path: '/',
        text: 'Dashboard',
        Content: Dashboard,
    },
    {
        path: '/quiz',
        text: 'Quiz',
        Content: Quiz,
    },
]
