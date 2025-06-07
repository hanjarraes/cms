import { IRoute } from 'common/common.interface'
import Dashboard from 'pages/dashboard/dashboard.component'
import Periode from 'pages/periode/periode.component'
import Quiz from 'pages/quiz/quiz.component'
import Student from 'pages/student/student.component'

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
    {
        path: '/student',
        text: 'Student',
        Content: Student,
    },
    {
        path: '/periode',
        text: 'Periode',
        Content: Periode,
    },
]
