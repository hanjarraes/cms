import { IRoute } from 'common/common.interface'
import BankSoal from 'pages/bank-soal/bank-soal.component'
import Dashboard from 'pages/dashboard/dashboard.component'
import PartisipanGroup from 'pages/partisipan-group/partisipan-group.component'
import Partisipan from 'pages/partisipan/partisipan.component'

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
]
