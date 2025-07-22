// Dashboard.tsx
import { Card, Progress, Avatar } from 'flowbite-react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import {
    chartData,
    COLORS,
    courseDistribution,
    courseProgress,
    quizScoreData,
    stats,
} from './dashboard.static';

const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="shadow-md  md:col-span-3 lg:col-span-1 rounded-2xl p-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">My Course Progress</h3>
                    <ul className="space-y-4">
                        {courseProgress.map((item, idx) => (
                            <li key={idx}>
                                <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {item.course}
                                </div>
                                <Progress progress={item.progress} size="md" color="blue" />
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card className="shadow-md rounded-2xl" >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Schedule</h3>
                    <div className="text-sm space-y-3 h-[100px] overflow-auto">
                        <div>
                            <strong>April 26</strong> - Live Class: ReactJS Intermediate
                        </div>
                        <div>
                            <strong>April 27</strong> - Assignment Due: UI Redesign
                        </div>
                        <div>
                            <strong>April 29</strong> - Exam: Python Basics
                        </div>
                        <div>
                            <strong>April 26</strong> - Live Class: ReactJS Intermediate
                        </div>
                        <div>
                            <strong>April 27</strong> - Assignment Due: UI Redesign
                        </div>
                        <div>
                            <strong>April 29</strong> - Exam: Python Basics
                        </div>
                        <div>
                            <strong>April 26</strong> - Live Class: ReactJS Intermediate
                        </div>
                        <div>
                            <strong>April 27</strong> - Assignment Due: UI Redesign
                        </div>
                        <div>
                            <strong>April 29</strong> - Exam: Python Basics
                        </div>
                    </div>
                </Card>
                <Card className="shadow-md rounded-2xl p-3">
                    <div className='flex justify-between items-start'>
                        <div className="flex items-center gap-4">
                            <Avatar img="https://i.pravatar.cc/150?img=32" rounded size="lg" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dave O’Brien</h2>
                                <p className="text-sm text-gray-500">@dave_obrien</p>
                            </div>
                        </div>
                        <i className="ri-pencil-line text-[20px] rounded-full shadow-md cursor-pointer px-3 py-2 hover:bg-[--info-v3] " />
                    </div>

                    <div className="flex gap-2">
                        {stats.map((item, index) => {
                            console.log(`text-[${item.color}]`)
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 bg-white shadow-md border-[1px] rounded-md p-1"
                                >
                                    <div className={`rounded-xl text-white text-lg`}>
                                        <i className={`${item.icon} text-[${item.color}]`} />
                                    </div>
                                    <div>
                                        <div className={`text-sm text-center font-semibol bg-[${item.color}] w-[50px] rounded-md`}>
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="shadow-md rounded-2xl">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        Course Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={courseDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {courseDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="lg:col-span-2 shadow-md rounded-2xl">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quiz Score Trend</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={quizScoreData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="score" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Completion & Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Completion Line Chart */}
                <Card className="lg:col-span-2 shadow-md rounded-2xl">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        Course Completion Rate
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="complete"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* Progress & Schedule */}
                <div className="flex flex-col gap-4">
                    <Card className="shadow-md rounded-2xl">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">My Course Progress</h3>
                        <ul className="space-y-4">
                            {courseProgress.map((item, idx) => (
                                <li key={idx}>
                                    <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {item.course}
                                    </div>
                                    <Progress progress={item.progress} size="md" color="blue" />
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="shadow-md rounded-2xl">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Upcoming Schedule</h3>
                        <ul className="text-sm space-y-3">
                            <li>
                                <strong>April 26</strong> - Live Class: ReactJS Intermediate
                            </li>
                            <li>
                                <strong>April 27</strong> - Assignment Due: UI Redesign
                            </li>
                            <li>
                                <strong>April 29</strong> - Exam: Python Basics
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
