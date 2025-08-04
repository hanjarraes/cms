import { IRoute } from 'common/common.interface'
import BankSoal from 'pages/bank-soal/bank-soal.component'
import BankSoalCreate from 'pages/bank-soal/create/bank-soal-create.component'
import Dashboard from 'pages/dashboard/dashboard.component'
import PartisipanGroup from 'pages/partisipan-group/partisipan-group.component'
import Partisipan from 'pages/partisipan/partisipan.component'
import ScheduleDetails from 'pages/schedule/details/schedule-details.component'
import Schedule from 'pages/schedule/schedule.component'
import QuizSoalCreate from 'pages/quiz/create/quiz-create.component'
import QuizSoal from 'pages/quiz/quiz.component'

export const mainRoutes: IRoute[] = [
    {
        path: '/',
        text: 'Dashboard',
        Content: Dashboard,
    },
    {
        path: '/partisipan',
        text: 'Partisipan',
        Content: Partisipan,
    },
    {
        path: '/partisipan-group',
        text: 'Partisipan',
        Content: PartisipanGroup,
    },
    {
        path: '/bank-soal',
        text: 'Bank Soal',
        Content: BankSoal,
    },
    {
        path: '/bank-soal-create',
        text: 'Bank Soal',
        Content: BankSoalCreate,
    },
    {
        path: '/quiz',
        text: 'Quiz Soal',
        Content: QuizSoal,
    },
    {
        path: '/quiz/create',
        text: 'Quiz Soal Create',
        Content: QuizSoalCreate,
    },
    {
        path: '/schedule',
        text: 'Schedule',
        Content: Schedule,
    },
      {
        path: '/schedule/:id',
        text: 'Schedule',
        Content: ScheduleDetails,
    },
]
