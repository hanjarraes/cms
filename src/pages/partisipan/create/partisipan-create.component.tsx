import React, { useState } from 'react';
import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import PhoneInput from 'component/input-phone/input-phone';
import Dropdown from 'component/dropdown/dropdown.component';
import Tooltip from 'component/tooltip/tooltip.component';
import { IFormPartisipan, IUsePartisipan } from '../partisipan.interface';
import { Switch } from 'component/switch/switch.component';
import { IDropdownItem } from 'component/dropdown/dropdown.interface';


const PartisipanCreate = ({ service }: { service: IUsePartisipan }) => {
    const [isActive, setIsActive] = useState(false);

    const {
        modalServiceCreate,
        reactForm,
        setIsConfirm,
        dataPartisipan,
        setDataPartisipan
    } = service;


    const {
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = reactForm

    const jenisKelamin = watch('jenisKelamin');

    const onSubmit = (values: IFormPartisipan) => {
        setDataPartisipan(null)
        modalServiceCreate.closeModalHandling()
        setIsConfirm(true)
        reactForm.reset({
            id: '',
            nama: '',
            email: '',
            noTelepon: '',
            kategori: undefined,
            jenisKelamin: '',
        });

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between mb-4 border-b px-4 py-3 bg-animasi'>
                <div className='text-[18px] font-bold'>Create Partisipan</div>
                <i
                    className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                    onClick={() => {
                        modalServiceCreate.closeModalHandling()
                        reactForm.reset({
                            id: '',
                            nama: '',
                            email: '',
                            noTelepon: '',
                            kategori: undefined,
                            jenisKelamin: '',
                        });
                        setDataPartisipan(null)
                    }}
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 px-4'>
                <div className='flex flex-col gap-2'>
                    <Input
                        label='Id'
                        placeholder='Enter ID'
                        useUppercaseLabel
                        isError={errors.id && true}
                        value={watch('id')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('id', e.target.value)}
                    />
                    <Input
                        label='Nama'
                        placeholder='Enter Nama'
                        useUppercaseLabel
                        isError={errors.nama && true}
                        value={watch('nama')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('nama', e.target.value)}
                    />
                    <Input
                        label='Email'
                        placeholder='Enter Email'
                        useUppercaseLabel
                        isError={errors.email && true}
                        value={watch('email')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('email', e.target.value)}
                    />
                    <PhoneInput
                        label='No Telepon'
                        useUppercaseLabel
                        value={watch('noTelepon')}
                        isError={errors.noTelepon && true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('noTelepon', e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <Dropdown
                        label='Kategori'
                        placeholder='Select Kategori'
                        options={[
                            { label: 'Siswa', value: 'Siswa' },
                            { label: 'Mahasiswa', value: 'Mahasiswa' },
                        ]}
                        isError={errors.email && true}
                        isClearable
                        isSearchable
                        useUppercaseLabel
                        value={watch('kategori') as IDropdownItem<string>}
                        onClick={(e) => {
                            setValue('kategori', e as IDropdownItem<string>)
                        }}
                    />
                    <div className='flex items-start justify-between'>
                        <div>
                            <div className={`text-[12px] ${errors.jenisKelamin ? 'text-[--danger-v5]' : 'text-[--gray-v5]'}`}>JENIS KELAMIN</div>
                            <div className='flex gap-2'>
                                <Tooltip isShow isHover parentInputClassName='!w-[30px]' className='min-w-max' text='Laki - Laki'>
                                    <i
                                        className={`text-[24px] cursor-pointer font-bold ri-men-line ${jenisKelamin === 'Laki-laki' ? 'text-[--info-v6]' : ''
                                            }`}
                                        onClick={() => setValue('jenisKelamin', 'Laki-laki')}
                                    />
                                </Tooltip>
                                <Tooltip isShow isHover parentInputClassName='!w-[30px]' className='min-w-max' text='Perempuan'>
                                    <i
                                        className={`text-[24px] cursor-pointer font-bold ri-women-line ${jenisKelamin === 'Perempuan' ? 'text-[--danger-v6]' : ''
                                            }`}
                                        onClick={() => setValue('jenisKelamin', 'Perempuan')}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        {dataPartisipan && (
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

export default PartisipanCreate;
