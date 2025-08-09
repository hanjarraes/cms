import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import Modal from 'component/modal/modal.component';
import { dummyStaff, } from './staff.dummy';
import ModalToast from 'component/modal-massage/modal-massage';
import useStaff from './staff.service';

import StaffCreate from './create/staff-create.component';

const Staff = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummyStaff.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    const service = useStaff()
    const {
        modalServiceCreate,
        isConfirm,
        isDelete,
        setIsDelete,
        setDataStaff,
        setIsConfirm,
    } = service

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 ">
            <div className="max-w-5xl  mx-auto space-y-3">
                <Card>
                    <div className='flex justify-between items-center gap-2 px-2'>
                        <div className='text-[24px] font-bold'> Staff </div>
                        <div className='flex justify-between gap-2'>
                            <Input
                                icon='ri-search-line'
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                            <Button
                                label='Tambah Staff'
                                variant='default'
                                className='min-w-fit'
                                useUpperCase
                                onClick={() => { modalServiceCreate.openModalHandling() }}
                            />
                        </div>
                    </div>
                </Card>

                {/* Card List - Scrollable vertically */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 h-[calc(100vh-10rem)] overflow-y-auto pr-2 pt-3">
                    {filteredQuizzes.map((item, idx) => (
                        <Card
                            key={idx}
                            className="p-4 flex items-start gap-4 border border-[--gray-v2] rounded-xl hover:shadow-md transition-all relative"
                            animated
                        >

                            {/* Foto Profil */}
                            <div className="w-14 h-14 rounded-full overflow-hidden border border-[--gray-v3] flex-shrink-0">
                                <img
                                    src={item.profile_picture}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info User */}
                            <div className="flex-1 space-y-[2px] pr-6"> {/* beri padding kanan agar tidak mentok icon */}
                                <h3 className="text-base font-semibold text-[--gray-v8]">{item.name}</h3>

                                <span className={`
          text-xs inline-block px-2 py-[2px] rounded-full font-medium w-fit
          ${item.is_active
                                        ? 'bg-[--success-v1] text-[--success-v7]'
                                        : 'bg-[--danger-v1] text-[--danger-v7]'
                                    }
        `}>
                                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>

                                <p className="text-sm text-[--gray-v6]">{item.email}</p>
                                <p className="text-sm text-[--gray-v6]">{item.phone_number}</p>

                                <div className="flex items-center gap-2 text-xs text-[--gray-v5] mt-1">
                                    <span className="capitalize">
                                        <i className={`ri-user-${item.gander === 'male' ? 'line' : 'fill'}`}></i> {item.gander}
                                    </span>
                                    <span>•</span>
                                    <span className="capitalize">{item.user_type}</span>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <i className="ri-edit-2-line text-[--gray-v4] hover:text-[--info-v5] cursor-pointer" />
                                <i className="ri-delete-bin-line text-[--gray-v4] hover:text-[--danger-v5] cursor-pointer" />
                            </div>
                        </Card>
                    ))}
                </div>


                <Modal isModalOpen={modalServiceCreate.isModalOpen} className="!w-1/3  px-0" >
                    <StaffCreate service={service} />
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

export default Staff;
