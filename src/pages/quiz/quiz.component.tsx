import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import { dummyOptionsSoal, dummyQuizSoal, dummyCheckboxSoal, dummyTextSoal, dummyFileSoal, dummyCodeSoal } from './quiz.dummy';
import ModalToast from 'component/modal-massage/modal-massage';
import useQuizSoal from './quiz.service';
import Modal from 'component/modal/modal.component';
import CheckBox from 'component/checkbox/checkbox.component';


const tagColorMap: Record<string, string> = {
    Kategori: 'bg-blue-100 text-blue-800',
    Tipe: 'bg-green-100 text-green-800',
    Kesulitan: 'bg-yellow-100 text-yellow-800',
    Statistik: 'bg-gray-100 text-gray-700',
    Topik: 'bg-purple-100 text-purple-800',
    Level: 'bg-pink-100 text-pink-800',
    Sumber: 'bg-red-100 text-red-800',
};

const QuizCard = ({ item, onEdit, onDelete, onPreview }: any) => {
    const [isScrollEnd, setIsScrollEnd] = useState(false);

    const handleTagScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
        setIsScrollEnd(isAtBottom);
    };

    return (
        <div className="p-4 border border-[--gray-v2] bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer">
            {/* Header */}
            <div className="flex justify-between items-start gap-3 mb-2">
                <div className="flex-1">
                    <div className="text-lg font-bold text-[--gray-v8] flex items-center gap-2">
                        {item.title}
                        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[--success-v2] text-[--success-v7]">
                            Active
                        </span>
                    </div>
                    <p className="text-sm text-[--gray-v5]">{item.desc}</p>
                </div>
                <div className="flex gap-2 text-[--gray-v5]">
                    <i className="ri-eye-line hover:text-[--info-v6] cursor-pointer" onClick={onPreview} />
                    <i className="ri-edit-2-line hover:text-[--info-v6] cursor-pointer" onClick={onEdit} />
                    <i className="ri-delete-bin-line hover:text-[--danger-v5] cursor-pointer" onClick={onDelete} />
                </div>
            </div>

            {/* Tags */}
            <div className="relative mb-2 group">
                <div
                    className="flex flex-wrap gap-2 max-h-[110px] overflow-y-auto pr-1 scroll-smooth"
                    onScroll={handleTagScroll}
                >
                    {item.tag.map((tag: any, idxTag: number) => {
                        const colorClass = tagColorMap[tag.type] ?? 'bg-gray-100 text-[--gray-v8]';
                        return (
                            <span
                                key={idxTag + 'tag'}
                                className={`px-2 py-1 text-xs font-semibold rounded ${colorClass}`}
                            >
                                {tag.name}
                            </span>
                        );
                    })}
                </div>

                {!isScrollEnd && item.tag.length > 8 && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent text-center text-[10px] text-[--gray-v4]">
                        ...
                    </div>
                )}
            </div>

            {/* Metadata */}
            <div className="grid sm:grid-cols-2 text-xs text-[--gray-v5] gap-y-1">
                <div><span className="font-medium">Dibuat oleh:</span> Admin Utama</div>
                <div><span className="font-medium">Tanggal dibuat:</span> 2025-07-15 12:00</div>
                <div><span className="font-medium">Diperbarui oleh:</span> Dosen A</div>
                <div><span className="font-medium">Update terakhir:</span> 2025-07-30 14:00</div>
            </div>
        </div>
    );
};

const QuizSoal = () => {
    const [search, setSearch] = useState('');

    const filteredSchedulezes = dummyQuizSoal.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const service = useQuizSoal()
    const {
        nav,
        isDelete,
        setIsDelete,
        modalPreview,
    } = service

    // dummyOptionsSoal, dummyCheckboxSoal, dummyTextSoal, dummyFileSoal, dummyCodeSoal
    const previewSoal = dummyOptionsSoal

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl  mx-auto space-y-3">
                <Card>
                    <div className='flex justify-between items-center gap-2 px-2'>
                        <div className='text-[24px] font-bold'> Quiz Soal </div>
                        <div className='flex justify-between gap-2'>
                            <Input
                                icon='ri-search-line'
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                            <Button
                                label='Tambah Quiz'
                                variant='default'
                                className='min-w-fit'
                                useUpperCase
                                onClick={() => {
                                    nav('/quiz/create')
                                }}
                            />
                        </div>
                    </div>
                </Card>

                {/* Card List - Scrollable vertically */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100vh-10rem)] overflow-y-auto pr-2">
                    {filteredSchedulezes.map((item, idx) => (
                        <QuizCard
                            key={idx}
                            item={item}
                            onEdit={() => nav('/bank-soal-create')}
                            onPreview={() => modalPreview.openModalHandling()}
                            onDelete={() => setIsDelete(true)}
                        />
                    ))}
                </div>
                <Modal
                    onClose={() => modalPreview.closeModalHandling()}
                    closeOnOutsideClick
                    isModalOpen={modalPreview.isModalOpen}
                    className="!w-3/3 max-w-[90vw] px-0 h-auto max-h-[90vh] overflow-y-auto"
                >
                    <div className="space-y-4">
                        <div className='flex justify-between border-b px-4 py-3 bg-animasi'>
                            <div className='text-[18px] font-bold'> Preview Quiz</div>
                            <i
                                className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                                onClick={() => {
                                    modalPreview.closeModalHandling();
                                }}
                            />
                        </div>
                        <div className="px-6 pb-5 grid grid-cols-2 gap-3">
                            <div className='grid grid-cols-1 gap-2 h-[600px] overflow-y-scroll'>
                                {filteredSchedulezes.map((item, idx) => (
                                    <QuizCard
                                        key={idx}
                                        item={item}
                                        onEdit={() => nav('/bank-soal-create')}
                                        onPreview={() => modalPreview.openModalHandling()}
                                        onDelete={() => setIsDelete(true)}
                                    />
                                ))}
                            </div>
                            <div className='space-y-4 border-[1px] rounded-md p-4'>
                                <div>
                                    <h2 className="text-lg font-bold text-[--gray-v8]">{previewSoal?.title}</h2>
                                    <p className="text-sm text-[--gray-v5]">{previewSoal?.desc}</p>
                                </div>

                                {/* Tag */}
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="bg-blue-100 text-[--info-800] px-2 py-1 rounded-full">
                                        Tag: {previewSoal?.tag?.label}
                                    </span>
                                    <span className="bg-green-100 text-[--success-v7] px-2 py-1 rounded-full">
                                        Kategori: {previewSoal?.kategori?.label}
                                    </span>
                                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                        Tipe: {previewSoal?.type?.label}
                                    </span>
                                </div>

                                {/* Soal (dari editor HTML) */}
                                <div className="prose max-w-full bg-gray-50 p-4 rounded-md border">
                                    <div dangerouslySetInnerHTML={{ __html: previewSoal?.soal ?? '' }} />
                                </div>

                                {/* Opsi Jawaban */}
                                {['options', 'checkbox'].includes(String(previewSoal?.type?.value)) && (
                                    <div className="space-y-2 mt-4">
                                        <div className="flex flex-col gap-2 mt-2">
                                            {previewSoal?.options?.map((option, idx) => (
                                                <CheckBox
                                                    key={idx}
                                                    type={previewSoal.type.value as 'options' | 'checkbox'}
                                                    label={option.value}
                                                    checked={option.isCorrect ?? false}
                                                    onChange={() => { }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tipe Jawaban Lain */}
                                {['text', 'file', 'code'].includes(String(previewSoal?.type?.value)) && (
                                    <div className="mt-4 text-sm text-[--gray-v6] italic">
                                        Tipe soal ini menggunakan jawaban berbentuk{' '}
                                        <strong>{previewSoal?.type?.label}</strong>. Preview jawaban tidak tersedia.
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>
                </Modal>
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
                {/* <ModalToast
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
                /> */}
            </div>
        </div>
    );
};

export default QuizSoal;
