import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import Modal from 'component/modal/modal.component';
import { partisipans } from './partisipan.dummy';
import ModalToast from 'component/modal-massage/modal-massage';
import usePartisipan from './partisipan.service';

import PartisipanCreate from './create/partisipan-create.component';

const Partisipan = () => {
    const [search, setSearch] = useState('');

    const filteredSchedulezes = partisipans.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
    );
    const service = usePartisipan()
    const {
        modalServiceCreate,
        isConfirm,
        isDelete,
        setIsDelete,
        setDataPartisipan,
        setIsConfirm,
    } = service

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl  mx-auto space-y-3">
                <Card>
                    <div className='flex justify-between items-center gap-2 px-2'>
                        <div className='text-[24px] font-bold'> Partisipan </div>
                        <div className='flex justify-between gap-2'>
                            <Input
                                icon='ri-search-line'
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                            <Button
                                label='Tambah Partisipan'
                                variant='default'
                                className='min-w-fit'
                                useUpperCase
                                onClick={() => { modalServiceCreate.openModalHandling() }}
                            />
                        </div>
                    </div>
                </Card>

                {/* Card List - Scrollable vertically */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 h-[calc(100vh-10rem)] overflow-y-auto pr-2 mt-0">
                    {filteredSchedulezes.map((item, idx) => (
                        <Card
                            key={idx}
                            className='p-4'
                            animated
                        >
                            <div className="flex justify-between items-start gap-5">
                                <div className='flex items-start gap-3'>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-800">{item.nama}</h2>
                                        <p className="text-sm text-gray-500">{item.nim}</p>
                                    </div>
                                    <span className="inline-block mt-1 bg-[--success-v1] text-[--success-v4] text-xs font-semibold px-2 py-1 rounded-md">
                                        {item.status}
                                    </span>
                                </div>
                                <div className='text-[24px] flex gap-2'>
                                    <i className="ri-delete-bin-line text-[--gray-v4]  hover:text-[--danger-v5]" onClick={() => setIsDelete(true)} />
                                    <i className="ri-edit-2-line text-[--gray-v4]  hover:text-[--info-v5]" onClick={() => {
                                        setDataPartisipan(item)
                                        modalServiceCreate.openModalHandling()
                                    }} />
                                </div>
                            </div>

                            <div className='flex justify-between items-end'>
                                <div className="mt-2 text-sm text-gray-700">
                                    <p><i className='ri-graduation-cap-line mr-2 text-[20px]' />{item.programStudi} - {item.konsentrasi}</p>
                                    <p><i className='ri-mail-line mr-2 text-[20px]' />{item.emailKampus}</p>
                                    <p><i className='ri-phone-line mr-2 text-[20px]' />{item.noTelepon}</p>
                                </div>
                                <p className="text-xs text-gray-400">Masuk: {item.periodeMasuk}</p>
                            </div>
                        </Card>
                    ))}
                </div>
                <Modal isModalOpen={modalServiceCreate.isModalOpen} className="!w-1/3  px-0" >
                    <PartisipanCreate service={service} />
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

export default Partisipan;
