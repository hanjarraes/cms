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
        icon: 'ri-book-open-line',
        title: 'Course List',
        link: '/',
        description: 'View all available courses in the system'
    },
    {
        icon: 'ri-folder-line',
        title: 'Bank Soal',
        link: '/',
        description: 'Manage and organize a collection of exam questions'
    },
    {
        icon: 'ri-questionnaire-line',
        title: 'Quiz',
        link: '/quiz',
        description: 'Create and manage quizzes for student assessment'
    }
];


const dropdownSetting: IDropdownItem[] = [
    {
        icon: 'ri-book-2-line',
        title: 'Course',
        link: '/',
        description: 'Manage the list of courses offered in the system'
    },
    {
        icon: 'ri-calendar-line',
        title: 'Periode',
        link: '/periode',
        description: 'Set academic periods for learning schedules'
    },
    {
        icon: 'ri-graduation-cap-line',
        title: 'Major',
        link: '/',
        description: 'Manage available majors and study programs'
    },
    {
        icon: 'ri-building-4-line',
        title: 'Departement',
        link: '/',
        description: 'Organize departments within the institution'
    },
    {
        icon: 'ri-user-line',
        title: 'Student',
        link: '/student',
        description: 'Manage student profiles and academic records'
    },
    {
        icon: 'ri-user-shared-line',
        title: 'Student Grouping',
        link: '/',
        description: 'Group students based on criteria or classes'
    },
    {
        icon: 'ri-user-settings-line',
        title: 'Staff',
        link: '/',
        description: 'Manage staff members and their roles'
    }
];


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
                    </div>
                </Dropdown>
                <Dropdown label="Setting" inline arrowIcon={true}>
                    <div className="w-[20rem] p-2">
                        {dropdownSetting.map((item, index) => (
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
            </Navbar.Collapse>
        </Navbar>
    );
}
