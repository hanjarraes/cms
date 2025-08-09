import { IRoute } from 'common/common.interface'
import BankSoal from 'pages/bank-soal/bank-soal.component'
import BankSoalCreate from 'pages/bank-soal/create/bank-soal-create.component'
import Dashboard from 'pages/dashboard/dashboard.component'
import PartisipanGroup from 'pages/partisipan-group/partisipan-group.component'
import Partisipan from 'pages/partisipan/partisipan.component'
import QuizDetails from 'pages/quiz/details/quiz-details.component'
import Quiz from 'pages/quiz/quiz.component'
import Staff from 'pages/staff/staff.component'
import TemplateSoalCreate from 'pages/template/create/template-create.component'
import TemplateSoal from 'pages/template/template.component'

export const mainRoutes: IRoute[] = [
    {
        path: '/',
        text: 'Dashboard',
        icon: 'ri-dashboard-line',
        show: true,
        Content: Dashboard,
    },
    {
        path: 'activity',
        icon: 'ri-bar-chart-2-line ',
        text: 'Activity',
        show: true,
        expandable: true,
        sub: [
            {
                path: '/bank-soal',
                text: 'Bank Soal',
                icon: 'ri-book-open-line',
                show: true,
                description: "Manage and organize a collection of exam questions",
                Content: BankSoal,
            },
            {
                path: '/bank-soal-create',
                text: 'Bank Soal',
                Content: BankSoalCreate,
            },
            {
                path: '/template',
                text: 'Template Soal',
                icon: 'ri-book-open-line',
                show: true,
                description: "View all available courses in the system",
                Content: TemplateSoal,
            },
            {
                path: '/template-create',
                text: 'Template Soal Create',
                Content: TemplateSoalCreate,
            },

            {
                path: '/quiz',
                icon: "ri-questionnaire-line",
                text: 'Quiz',
                show: true,
                description: "Create and manage schedules for participant assessment",
                Content: Quiz,
            },
            {
                path: '/quiz/:id',
                text: 'Quiz',
                Content: QuizDetails,
            },
        ]
    },
    {
        path: 'setting',
        text: 'Setting',
        icon: 'ri-settings-3-line',
        show: true,
        expandable: true,
        sub: [
            {
                path: '/partisipan',
                text: 'Partisipan',
                icon: "ri-user-line",
                description: "Manage participant profiles and academic records",
                show: true,
                Content: Partisipan,
            },
            {
                path: '/partisipan-group',
                text: 'Partisipan',
                icon: "ri-user-shared-line",
                description: "Group participants based on criteria or classes",
                show: true,
                Content: PartisipanGroup,
            },
            {
                path: '/staff',
                text: 'Staff',
                icon: "ri-user-settings-line",
                description: "Manage staff members and their roles",
                show: true,
                Content: Staff,
            },
        ]
    },
]
