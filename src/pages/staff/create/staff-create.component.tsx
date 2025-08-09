import React, { useState } from 'react';
import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import PhoneInput from 'component/input-phone/input-phone';
import Dropdown from 'component/dropdown/dropdown.component';
import Tooltip from 'component/tooltip/tooltip.component';
import { IFormStaff, IUseStaff } from '../staff.interface';
import { Switch } from 'component/switch/switch.component';
import { IDropdownItem } from 'component/dropdown/dropdown.interface';


const StaffCreate = ({ service }: { service: IUseStaff }) => {
    const [isActive, setIsActive] = useState(false);

    const {
        modalServiceCreate,
        reactForm,
        setIsConfirm,
        dataStaff,
        setDataStaff
    } = service;


    const {
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = reactForm

    const jenisKelamin = watch('jenisKelamin');

    const onSubmit = (values: IFormStaff) => {
        setDataStaff(null)
        modalServiceCreate.closeModalHandling()
        setIsConfirm(true)
        reactForm.reset({
            nama: '',
            email: '',
            noTelepon: '',
            jenisKelamin: '',
            profile_picture: '',
        });

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between mb-4 border-b px-4 py-3 bg-animasi'>
                <div className='text-[18px] font-bold'>Create Staff</div>
                <i
                    className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                    onClick={() => {
                        modalServiceCreate.closeModalHandling()
                        reactForm.reset({
                            nama: '',
                            email: '',
                            noTelepon: '',
                            jenisKelamin: '',
                            profile_picture: '',
                        });
                        setDataStaff(null)
                    }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
                {/* Bagian Profile Picture */}
                <div className="flex flex-col items-center gap-2">
                    <div className='text-[12px] text-[--gray-v5] mb-1'>PROFILE PICTURE</div>
                    <label className='relative w-[100px] h-[100px] border border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden group hover:border-[--info-v6] transition'>
                        {watch('profile_picture') ? (
                            <img
                                src={watch('profile_picture')}
                                alt="Profile"
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <i className='ri-camera-line text-2xl text-gray-400 group-hover:text-[--info-v6]'></i>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        setValue('profile_picture', reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                </div>

                {/* Bagian Form Kiri */}
                <div className="flex flex-col gap-2 col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                            label="Nama"
                            placeholder="Enter Nama"
                            useUppercaseLabel
                            isError={errors.nama && true}
                            value={watch('nama')}
                            onChange={(e) => setValue('nama', e.target.value)}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter Email"
                            useUppercaseLabel
                            isError={errors.email && true}
                            value={watch('email')}
                            onChange={(e) => setValue('email', e.target.value)}
                        />
                    </div>
                    <PhoneInput
                        label="No Telepon"
                        useUppercaseLabel
                        value={watch('noTelepon')}
                        isError={errors.noTelepon && true}
                        onChange={(e) => setValue('noTelepon', e.target.value)}
                    />

                    {/* Jenis Kelamin + Suspend */}
                    <div className="flex items-start justify-between mt-2">
                        <div>
                            <div className={`text-[12px] ${errors.jenisKelamin ? 'text-[--danger-v5]' : 'text-[--gray-v5]'}`}>
                                JENIS KELAMIN
                            </div>
                            <div className="flex gap-2">
                                <Tooltip isShow isHover parentInputClassName="!w-[30px]" className="min-w-max" text="Laki - Laki">
                                    <i
                                        className={`text-[24px] cursor-pointer font-bold ri-men-line ${jenisKelamin === 'Laki-laki' ? 'text-[--info-v6]' : ''}`}
                                        onClick={() => setValue('jenisKelamin', 'Laki-laki')}
                                    />
                                </Tooltip>
                                <Tooltip isShow isHover parentInputClassName="!w-[30px]" className="min-w-max" text="Perempuan">
                                    <i
                                        className={`text-[24px] cursor-pointer font-bold ri-women-line ${jenisKelamin === 'Perempuan' ? 'text-[--danger-v6]' : ''}`}
                                        onClick={() => setValue('jenisKelamin', 'Perempuan')}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        {dataStaff && (
                            <Switch
                                label="Suspend"
                                checked={isActive}
                                onChange={setIsActive}
                            />
                        )}
                    </div>
                </div>
            </div>



            <div className='flex justify-end p-2 border-t mt-2'>
                <Button
                    label='Save'
                    variant='default'
                    useUpperCase
                    className=''
                    type='submit'
                    onClick={() => {
                    }} />
            </div>
        </form>
    );
};

export default StaffCreate;
