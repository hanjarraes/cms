import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import ModalToast from 'component/modal-massage/modal-massage';
import useQuizDetails from './quiz-details.service';

import { dummyBankSoal } from 'pages/bank-soal/bank-soal.dummy';
import { dummyPartipanData } from 'pages/partisipan-group/partisipan-group.dummy';

const QuizDetails = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummyBankSoal.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const service = useQuizDetails()
    const {
        modalServiceCreate,
        isConfirm,
        isDelete,
        setIsDelete,
        setIsConfirm,
    } = service

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl  mx-auto space-y-3">
                <Card>
                    <div className='flex justify-between items-center gap-2 px-2'>
                        <div className='text-[24px] font-bold'> Quiz Matematika Dassar </div>
                        <div className='flex justify-between gap-2'>
                            <Input
                                icon='ri-search-line'
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                            <Button
                                label='Tambah Group'
                                variant='default'
                                className='min-w-fit'
                                useUpperCase
                                onClick={() => { modalServiceCreate.openModalHandling() }}
                            />
                        </div>
                    </div>
                </Card>

                {/* Card List - Scrollable vertically */}
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 h-[calc(100vh-10rem)] overflow-y-auto pr-2 mt-0'>
                    <div className="grid grid-cols-1 gap-2 h-[calc(100vh-10rem)] overflow-y-auto pr-2 mt-0">
                        {filteredQuizzes.map((item, idx) => (
                            <Card
                                key={idx}
                                className='p-4'
                                animated
                                onClick={() => {
                                }}
                            >
                                <div className="flex justify-between items-start gap-5">
                                    <div className='bg-animasi h-full flex justify-center rounded-md px-5'>
                                        <i className="ri-group-2-fill text-[48px]" />
                                    </div>
                                    <div className='flex w-full items-start gap-3'>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div>
                        <div>
                            <Card
                                key={1}
                            >
                                <div className="flex flex-col h-[calc(100vh-11.5rem)]">
                                    <div className='border-b w-full p-2 mb-2'>
                                        <div className='text-[20px] font-bold'> List Partisipan Seminar</div>
                                    </div>
                                    <div className='flex-grow overflow-y-auto flex flex-col gap-2 border-[1px] p-4 rounded-md'>
                                        {dummyPartipanData.map((item, idx) => {
                                            return (
                                                <div key={idx} className='flex gap-2 items-center border-b pb-2'>
                                                    <div className='h-full flex justify-center rounded-md px-3 border-[1px]'>
                                                        <i className="ri-user-line text-[38px]" />
                                                    </div>
                                                    <div className='flex w-full items-start gap-3'>
                                                        <div className="flex-1">
                                                            <h2 className="text-xl font-bold text-gray-800">{item.nama}</h2>
                                                            <p className="text-sm text-gray-500">{item.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className='text-[24px] flex gap-2'>
                                                        <i className="ri-delete-bin-line hover:text-[--danger-v5] cursor-pointer" onClick={() => setIsDelete(true)} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <ModalToast
                    isOpen={isDelete}
                    type="danger"
                    title="Hapus Data?"
                    description={
                        'Apakah Anda yakin menghapus data ini?'
                    }
                    onClose={() => {
                        setIsDelete(false)
                    }}
                    onSubmit={() => {
                        setIsDelete(false);
                    }}
                    submitLabel="Konfirmasi"
                />
                <ModalToast
                    isOpen={isConfirm}
                    type="info"
                    title="Konfirmasi Data?"
                    description={
                        'Apakah Anda yakin ingin menyimpan data ini?'
                    }
                    onClose={() => {
                        modalServiceCreate.openModalHandling();
                        setIsConfirm(false)
                    }
                    }
                    onSubmit={() => {
                        setIsConfirm(false);
                    }}
                    submitLabel="Konfirmasi"
                />
            </div>
        </div>
    );
};

export default QuizDetails;
