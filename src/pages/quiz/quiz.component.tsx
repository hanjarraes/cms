import { Card, TextInput } from 'flowbite-react';
import { useState } from 'react';

const dummyQuizzes = [
    {
        id: 1,
        title: 'React Basics',
        description: 'Quiz covering React components, props, and state.',
        creator: 'John Doe',
        createdDate: '2025-04-15',
        expirationDate: '2025-05-15',
        image: 'https://cloudmatetechnologies.com/wp-content/uploads/2024/06/react.js.png'
    },
    {
        id: 2,
        title: 'JavaScript Fundamentals',
        description: 'Core JS concepts including loops, arrays, and functions.',
        creator: 'Jane Smith',
        createdDate: '2025-04-10',
        expirationDate: '2025-05-10',
        image: 'https://www.datocms-assets.com/48401/1628644950-javascript.png?auto=format&fit=max&w=1200'
    },
    {
        id: 3,
        title: 'HTML & CSS Quiz',
        description: 'Test your skills on layouts and styling.',
        creator: 'Alex Johnson',
        createdDate: '2025-03-28',
        expirationDate: '2025-04-28',
        image: 'https://www.toprankindonesia.com/wp-content/uploads/2024/05/Perbedaan-HTML-dan-CSS.webp'
    },
    {
        id: 4,
        title: 'Python Essentials',
        description: 'Covers variables, conditionals, and loops.',
        creator: 'Maria Lee',
        createdDate: '2025-04-01',
        expirationDate: '2025-05-01',
        image: 'https://miro.medium.com/v2/resize:fit:700/1*3IcLSFuT8PQg4cUBaRXH1A.png'
    },
    {
        id: 5,
        title: 'UX/UI Principles',
        description: 'Basics of user experience and interface design.',
        creator: 'Chris Brown',
        createdDate: '2025-04-12',
        expirationDate: '2025-05-12',
        image: 'https://imajiku.com/userfiles/post/6662c24f865db.jpg'
    },
    {
        id: 6,
        title: 'Data Structures',
        description: 'Quiz about arrays, stacks, and queues.',
        creator: 'Emily Davis',
        createdDate: '2025-04-03',
        expirationDate: '2025-05-03',
        image: 'https://miro.medium.com/v2/resize:fit:1400/1*J38nYZU7gzu-4lQmtjlSUw.jpeg'
    },
];

const Quiz = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummyQuizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Available Quizzes</h1>

                {/* Search */}
                <TextInput
                    type="text"
                    placeholder="Search quiz..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md"
                />

                {/* Card List - Scrollable vertically */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto pr-2 pb-2">
                    {filteredQuizzes.map((quiz) => (
                        <Card
                            key={quiz.id}
                            className="shadow-md rounded-2xl p-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer hover:bg-[--blue-v2]"
                        >
                            {/* Gambar Quiz */}
                            {quiz.image && (
                                <img
                                    src={quiz.image}
                                    alt={quiz.title}
                                    className="w-full h-40 object-cover rounded-xl mb-3"
                                />
                            )}
                            {/* Judul & Deskripsi */}
                            <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{quiz.description}</p>

                            {/* Detail Information */}
                            <div className="mt-3 space-y-2">
                                <p className="text-xs text-gray-500">
                                    <strong>Created by:</strong> {quiz.creator}
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>Created on:</strong> {quiz.createdDate}
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>Expires on:</strong> {quiz.expirationDate}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
