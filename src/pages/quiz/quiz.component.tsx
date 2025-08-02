import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import ModalToast from 'component/modal-massage/modal-massage';
import useQuiz from './quiz.service';
import { dummyQuiz } from './quiz.dummy';
import Tooltip from 'component/tooltip/tooltip.component';
// import QuizCreate from './create/partisipan-create.component';

const Quiz = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummyQuiz.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const service = useQuiz()
    const {
        modalServiceCreate,
        isConfirm,
        isDelete,
        setIsDelete,
        setIsConfirm,
        nav,
    } = service

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl  mx-auto space-y-4">
                {/* Header */}
                <Card>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-2">
                        <div className="text-xl font-bold">Quiz</div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
                            <Input
                                icon="ri-search-line"
                                placeholder="Search"
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full sm:w-auto"
                            />
                            <i className="ri-filter-2-line text-[24px] hover:text-[--info-v5] cursor-pointer" onClick={() => { }} />
                            <Button
                                label="Tambah Quiz"
                                variant="default"
                                className="min-w-fit"
                                useUpperCase
                                onClick={() => modalServiceCreate.openModalHandling()}
                            />
                        </div>
                    </div>
                </Card>

                {/* Grid Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 h-[calc(100vh-12rem)] overflow-y-auto pr-1">
                    {filteredQuizzes.map((item, idx) => (
                        <Card
                            key={idx}
                            className="p-4 shadow-md rounded-xl border border-gray-200 bg-white"
                            animated
                            onClick={() => nav(`/quiz/${item.code}`)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2 text-lg font-semibold text-black">
                                    {item.title}
                                    <Tooltip isShow isHover parentInputClassName="!w-[30px]" className="min-w-max" text="Active">
                                        <div className="h-3 w-3 rounded-full bg-[--success-v3] ring-1 ring-white" />
                                    </Tooltip>
                                </div>
                                <div className="flex flex-col items-end text-xs text-gray-500">
                                    <span className="mb-1">Progress</span>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="bg-gray-800 h-full" style={{ width: '95%' }} />
                                    </div>
                                    <span className="text-[10px] text-gray-500 mt-1">95/100</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-1 text-sm font-mono text-gray-800">
                                <div><span className="font-semibold">Code Jadwal:</span> {item.code}</div>
                                <div><span className="font-semibold">Durations:</span> {item.durations} min</div>
                                <div><span className="font-semibold">Test Open:</span> {item.testOpen}</div>
                                <div><span className="font-semibold">Test Close:</span> {item.testClose}</div>
                                <div><span className="font-semibold">Deadline:</span> {item.deadline}</div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Modals */}
                <ModalToast
                    isOpen={isDelete}
                    type="danger"
                    title="Hapus Data?"
                    description="Apakah Anda yakin menghapus data ini?"
                    onClose={() => setIsDelete(false)}
                    onSubmit={() => setIsDelete(false)}
                    submitLabel="Konfirmasi"
                />

                <ModalToast
                    isOpen={isConfirm}
                    type="info"
                    title="Konfirmasi Data?"
                    description="Apakah Anda yakin ingin menyimpan data ini?"
                    onClose={() => {
                        modalServiceCreate.openModalHandling()
                        setIsConfirm(false)
                    }}
                    onSubmit={() => setIsConfirm(false)}
                    submitLabel="Konfirmasi"
                />
            </div>
        </div>

    );
};

export default Quiz;
