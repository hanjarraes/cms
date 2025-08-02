import { IRoute } from 'common/common.interface'
import BankSoal from 'pages/bank-soal/bank-soal.component'
import BankSoalCreate from 'pages/bank-soal/create/bank-soal-create.component'
import Dashboard from 'pages/dashboard/dashboard.component'
import PartisipanGroup from 'pages/partisipan-group/partisipan-group.component'
import Partisipan from 'pages/partisipan/partisipan.component'
import QuizDetails from 'pages/quiz/details/quiz-details.component'
import Quiz from 'pages/quiz/quiz.component'
import SoalGroupCreate from 'pages/soal-group/create/soal-group-create.component'
import SoalGroup from 'pages/soal-group/soal-group.component'

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
        path: '/soal-group',
        text: 'Soal Group',
        Content: SoalGroup,
    },
    {
        path: '/soal-group/create',
        text: 'Soal Group Create',
        Content: SoalGroupCreate,
    },
    {
        path: '/quiz',
        text: 'Quiz',
        Content: Quiz,
    },
      {
        path: '/quiz/:id',
        text: 'Quiz',
        Content: QuizDetails,
    },
]
