import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import Modal from 'component/modal/modal.component';
import { dummyPartisipanGroups } from './partisipan-group.dummy';
import ModalToast from 'component/modal-massage/modal-massage';
import usePartisipanGroup from './partisipan-group.service';

import PartisipanGroupCreate from './create/partisipan-create.component';

const PartisipanGroup = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummyPartisipanGroups.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const service = usePartisipanGroup()
    const {
        modalServiceCreate,
        isConfirm,
        isDelete,
        dataPartisipanGroup,
        setIsDelete,
        setDataPartisipanGroup,
        setIsConfirm,
    } = service

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50">
            <div className="max-w-5xl  mx-auto space-y-3">
                <Card>
                    <div className='flex justify-between items-center gap-2 px-2'>
                        <div className='text-[24px] font-bold'> Partisipan Group </div>
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
                                className="p-4 hover:shadow-md transition-shadow rounded-lg cursor-pointer group"
                                animated
                                onClick={() => setDataPartisipanGroup(item)}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <h2 className="text-base sm:text-lg font-semibold text-[--gray-v8] group-hover:text-[--primary-v4] transition-colors flex gap-2 items-start">
                                            {item.title}
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[--success-v1] text-[--success-v7]">
                                                    Aktif
                                                </span>
                                            </div>
                                        </h2>
                                        <p className="text-sm text-gray-500">{item.description}</p>

                                        {/* Meta info */}
                                        <div className="mt-2 text-xs text-gray-500 flex flex-col gap-0.5">
                                            <span>
                                                🧑 {item.partisipan.length ?? 0} Partisipan • Dibuat oleh: <strong>Syaiful Ode Raes</strong>
                                            </span>
                                            <span>
                                                🕒 Dibuat: {new Date('2025-07-29T09:00:00Z').toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                                {' '}| Terakhir diupdate: {new Date('2025-08-02T16:30:00Z').toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span>
                                                ✏️ Diperbarui oleh: <strong>{'Hanjar Raes'}</strong>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-xl flex gap-3 items-start">
                                        <i
                                            className="ri-delete-bin-line text-[--gray-v4] hover:text-[--danger-v5] transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsDelete(true);
                                            }}
                                        />
                                        <i
                                            className="ri-edit-2-line text-[--gray-v4] hover:text-[--info-v5] transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDataPartisipanGroup(item);
                                                modalServiceCreate.openModalHandling();
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div>
                        <div>
                            <Card key={1} className="h-[calc(100vh-11.5rem)] flex flex-col rounded-lg shadow-sm border border-gray-200">
                                {/* Header */}
                                <div className=" w-full px-2 py-2 bg-white">
                                    <h1 className="text-xl font-semibold text-gray-800">List Partisipan</h1>
                                </div>

                                {/* Body */}
                                <div className="flex-grow overflow-y-auto flex flex-col gap-2 px-2 py-2 bg-gray-50 rounded-lg border">
                                    {dataPartisipanGroup?.partisipan.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between border border-gray-100 hover:shadow-sm transition-shadow p-3 rounded-md bg-white"
                                        >
                                            {/* Left Info */}
                                            <div className="flex items-start gap-3">
                                                {/* Optional avatar/icon */}
                                                <div className="w-10 h-10 rounded-full bg-[--info-v2] flex items-center justify-center text-white font-bold text-md">
                                                    {item.nama?.charAt(0).toUpperCase() ?? "U"}
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-800">{item.nama}</span>
                                                    <span className="text-xs text-gray-500">{item.id}</span>
                                                    {/* Optional info like email or role */}
                                                    {item.email && (
                                                        <span className="text-xs text-gray-400 italic">{item.email}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="text-xl text-gray-400 flex gap-2 items-center">
                                                <i
                                                    className="ri-delete-bin-line hover:text-[--danger-v5] cursor-pointer transition-colors"
                                                    onClick={() => setIsDelete(true)}
                                                    title="Hapus Partisipan"
                                                />
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>

                <Modal isModalOpen={modalServiceCreate.isModalOpen} className="!w-2/3  px-0" >
                    <PartisipanGroupCreate service={service} />
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

export default PartisipanGroup;
