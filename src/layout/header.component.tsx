import React from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface IDropdownItem {
    icon: string;
    title: string;
    link: string;
    description: string;
}

const dropdownBankSoal: IDropdownItem[] = [
    {
        icon: 'ri-cursor-line',
        title: 'Course',
        link: '/',
        description: 'Lihat semua kursus yang tersedia di sistem'
    },
    {
        icon: 'ri-folders-line',
        title: 'Grouping Course',
        link: '/',
        description: 'Kelompokkan kursus berdasarkan kategori atau topik'
    },
    {
        icon: 'ri-question-answer-line',
        title: 'Quiz',
        link: '/quiz',
        description: 'Lihat dan kelola semua kuis dalam sistem'
    },
    {
        icon: 'ri-layout-masonry-line',
        title: 'Grouping Quiz',
        link: '/',
        description: 'Kelompokkan kuis sesuai topik atau mata pelajaran'
    },
];


const dropdownMasterData: IDropdownItem[] = [
    {
        icon: 'ri-pie-chart-2-line',
        title: 'Periode',
        link: '/',
        description: 'Atur periode pembelajaran untuk siswa dan kelas'
    },
    {
        icon: 'ri-cursor-line',
        title: 'Jurusan',
        link: '/',
        description: 'Kelola daftar jurusan dan program studi yang tersedia'
    },
    {
        icon: 'ri-folders-line',
        title: 'Student',
        link: '/',
        description: 'Lihat dan kelola data seluruh siswa di sistem'
    },
    {
        icon: 'ri-question-answer-line',
        title: 'Student Grouping',
        link: '/quiz',
        description: 'Buat dan kelola pengelompokan siswa berdasarkan kriteria tertentu'
    }
];

const menuItems = ['Forum', 'User Management'];

export default function Header(): React.ReactElement {
    const nav = useNavigate()
    return (
        <Navbar fluid rounded className="bg-white dark:bg-gray-800">
            <Navbar.Brand href="#">
                <img
                    src="https://images.vexels.com/content/266057/preview/bitcoin-sign-coin-money-icon-d532a7.png"
                    className="mr-3 h-6 sm:h-9"
                    alt="Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Logo</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Avatar alt="User" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/">
                    Dashboard
                </Navbar.Link>
                <Dropdown label="Bank Soal" inline arrowIcon={true}>
                    <div className="w-[20rem] p-2">
                        {dropdownBankSoal.map((item, index) => (
                            <Dropdown.Item key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center gap-3" onClick={() => nav(item.link)}>
                                    <i className={`text-lg ${item.icon} bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md`} />
                                    <div className='flex flex-col items-start'>
                                        <p className="font-semibold text-sm text-gray-800 dark:text-white">{item.title}</p>
                                        <p className="text-left text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            </Dropdown.Item>
                        ))}
                        <div className="grid grid-cols-2 divide-x mt-2 border-t pt-2 border-gray-200 dark:border-gray-600">
                            <a
                                href="#"
                                className="text-center text-sm text-gray-700 dark:text-gray-300 hover:underline px-2"
                            >
                                <i className="ri-play-circle-line mr-1" />
                                Create Course
                            </a>
                            <a
                                href="#"
                                className="text-center text-sm text-gray-700 dark:text-gray-300 hover:underline px-2"
                            >
                                <i className="ri-customer-service-2-line mr-1" />
                                Create Quiz
                            </a>
                        </div>
                    </div>
                </Dropdown>
                <Dropdown label="Master Data" inline arrowIcon={true}>
                    <div className="w-[20rem] p-2">
                        {dropdownMasterData.map((item, index) => (
                            <Dropdown.Item key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center gap-3" onClick={() => nav(item.link)}>
                                    <i className={`text-lg ${item.icon} bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md`} />
                                    <div className='flex flex-col items-start'>
                                        <p className="font-semibold text-sm text-gray-800 dark:text-white">{item.title}</p>
                                        <p className="text-left text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </div>
                </Dropdown>
                {menuItems.map((item, index) => (
                    <Navbar.Link href="#" key={index}>
                        {item}
                    </Navbar.Link>
                ))}
            </Navbar.Collapse>
        </Navbar>
    );
}
