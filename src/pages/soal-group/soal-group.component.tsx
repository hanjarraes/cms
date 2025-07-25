import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import { dummySoalGroup } from './soal-group.dummy';
import ModalToast from 'component/modal-massage/modal-massage';
import useSoalGroup from './soal-group.service';


const SoalGroup = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummySoalGroup.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const service = useSoalGroup()
    const {
        nav,
        isDelete,
        setIsDelete,
        setDataSoalGroup,
    } = service

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto space-y-3">
                <Card>
                    <div className='flex justify-between items-center gap-2 px-2'>
                        <div className='text-[24px] font-bold'> Group Soal </div>
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
                                onClick={() => { 
                                    nav('/soal-group/create')
                                 }}
                            />
                        </div>
                    </div>
                </Card>

                {/* Card List - Scrollable vertically */}
                <div className="flex flex-col gap-2 h-[calc(100vh-10rem)] overflow-y-auto pr-2 mt-0">
                    {filteredQuizzes.map((item, idx) => (
                        <Card
                            key={idx}
                            animated
                        >
                            <div className="flex justify-between items-start gap-5">
                                <div className='bg-animasi h-full flex justify-center rounded-md px-5'>
                                    <i className="ri-questionnaire-fill text-[55px]" />
                                </div>
                                <div className='flex w-full items-start'>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                        <div className='flex gap-2 mt-3'>
                                            {item.tag.map((tag, idxTag) => {
                                                const tagColorMap: Record<string, string> = {
                                                    Kategori: 'bg-blue-100 text-blue-800',
                                                    Tipe: 'bg-green-100 text-green-800',
                                                    Kesulitan: 'bg-yellow-100 text-yellow-800',
                                                    Statistik: 'bg-gray-100 text-gray-700',
                                                    Topik: 'bg-purple-100 text-purple-800',
                                                    Level: 'bg-pink-100 text-pink-800',
                                                    Sumber: 'bg-red-100 text-red-800',
                                                };

                                                const colorClass = tagColorMap[tag.type] ?? 'bg-gray-100 text-gray-800';

                                                return (
                                                    <div
                                                        key={idxTag + 'idTag'}
                                                        className={`px-2 py-1 text-xs rounded-md font-bold w-fit  ${colorClass}`}
                                                    >
                                                        {tag.name}
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col h-[80px] justify-between'>
                                    <div className='text-[24px] flex gap-2'>
                                        <i className="ri-delete-bin-line hover:text-[--danger-v5]" onClick={() => setIsDelete(true)} />
                                        <i className="ri-edit-2-line  hover:text-[--info-v5]" onClick={() => {
                                            setDataSoalGroup(item)

                                        }} />
                                        <div className='text-[14px] font-bold bg-[--success-v2] flex items-center px-4 rounded-md text-[--success-v7]'>
                                            Active
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">Last Update: 12:00 PM </p>
                                </div>

                            </div>
                        </Card>
                    ))}
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

export default SoalGroup;
