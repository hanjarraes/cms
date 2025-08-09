import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import ModalToast from 'component/modal-massage/modal-massage';
import useQuiz from './quiz.service';
import { dummyQuiz } from './quiz.dummy';
import Tooltip from 'component/tooltip/tooltip.component';
import Modal from 'component/modal/modal.component';
import SchaduleCreate from './create/quiz-create.component';
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
        <div className="min-h-[calc(100vh-3.2rem)] p-4 sm:p-6 bg-gray-50 ">
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
                            className="p-3 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                            animated
                            onClick={() => nav(`/quiz/${item.code}`)}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                    {item.title}
                                    <Tooltip isShow isHover parentInputClassName="!w-[30px]" className="min-w-max" text="Active">
                                        <div className="h-2 w-2 rounded-full bg-[--success-v3] ring-1 ring-white" />
                                    </Tooltip>
                                </div>

                                <div className="text-xs text-right text-gray-500">
                                    <div className="font-medium mb-[2px]">Progress</div>
                                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="bg-[--info-v6] h-full" style={{ width: `${95}%` }} />
                                    </div>
                                    <div className="text-[10px] mt-[2px]">{'95/100'}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1 text-xs text-gray-700 font-mono mb-2">
                                <div><span className="font-semibold">Kode:</span> {item.code}</div>
                                <div><span className="font-semibold">Durasi:</span> {item.durations} mnt</div>
                                <div><span className="font-semibold">Buka:</span> {item.testOpen}</div>
                                <div><span className="font-semibold">Tutup:</span> {item.testClose}</div>
                                <div><span className="font-semibold">Deadline:</span> {item.deadline}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1 text-[10px] text-gray-500 border-t pt-2">
                                <div><span className="font-medium">Dibuat:</span> Admin Utama</div>
                                <div><span className="font-medium">Tgl Buat:</span> 2025-07-15</div>
                                <div><span className="font-medium">Update:</span> Dosen A</div>
                                <div><span className="font-medium">Tgl Update:</span> 2025-07-30</div>
                            </div>
                        </Card>
                    ))}
                </div>
                <Modal isModalOpen={modalServiceCreate.isModalOpen} className="!w-1/2  px-0" >
                    <SchaduleCreate  service={service}/>
                </Modal>
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
