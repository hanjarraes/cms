import React, { useState } from 'react';
import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import PhoneInput from 'component/input-phone/input-phone';
import Dropdown from 'component/dropdown/dropdown.component';
import Tooltip from 'component/tooltip/tooltip.component';
import { IFormBankSoal, IUseBankSoal } from '../bank-soal.interface';
import { Switch } from 'component/switch/switch.component';
import TextArea from 'component/text-area/text-area.component';
import TextEditor from 'component/editor/text-ediot.component';


const BankSoalCreate = ({ service }: { service: IUseBankSoal }) => {
    const [isActive, setIsActive] = useState(false);

    const {
        modalServiceCreate,
        reactForm,
        dataBankSoal,
        setDataBankSoal
    } = service;


    const {
        watch,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = reactForm


    const onSubmit = (values: IFormBankSoal) => {
        reactForm.reset({
            title: '',
            desc: '',
            tag: '',
            kategori: '',
        });

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between mb-4 border-b px-4 py-3 bg-animasi'>
                <div className='text-[18px] font-bold'>Create Soal</div>
                <i
                    className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                    onClick={() => {
                        modalServiceCreate.closeModalHandling()
                        reactForm.reset();
                        setDataBankSoal(null)
                    }}
                />
            </div>
            <div className='grid grid-cols-2 px-4 gap-2 mb-4'>
                <div className='border-[1px] p-4 rounded-md'>
                    <div className='text-[16px] font-bold mb-2'>INFORMASI SOAL</div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Input
                                label='title'
                                placeholder='Enter Title'
                                useUppercaseLabel
                                isError={errors.title && true}
                                value={watch('title')}
                                {...register('title')}
                            />
                            <Dropdown
                                label='Tag'
                                placeholder='Select Tag'
                                useUppercaseLabel
                                isSearchable
                                isError={errors.tag && true}
                                options={[

                                ]}
                                {...register('tag')}
                            />
                            <Dropdown
                                label='Kategori'
                                placeholder='Select Kategoru'
                                useUppercaseLabel
                                isSearchable
                                isError={errors.tag && true}
                                options={[

                                ]}
                                {...register('kategori')}
                            />

                        </div>
                        <div className='flex flex-col gap-2'>
                            <Dropdown
                                label='Type'
                                placeholder='Select Type'
                                useUppercaseLabel
                                isSearchable
                                isError={errors.tag && true}
                                options={[

                                ]}
                                {...register('kategori')}
                            />
                            <TextArea
                                label='Descriptiom'
                                placeholder='Enter Description'
                                useUppercaseLabel
                                isError={errors.desc && true}
                                height={80}
                                value={watch('desc')}
                                {...register('desc')}
                            />
                        </div>

                    </div>
                </div>
                <div className='border-[1px] p-4 rounded-md'>
                    <div className='text-[16px] font-bold mb-2'>INFORMASI SOAL</div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Input
                                label='title'
                                placeholder='Enter Title'
                                useUppercaseLabel
                                isError={errors.title && true}
                                value={watch('title')}
                                {...register('title')}
                            />
                            <Dropdown
                                label='Tag'
                                placeholder='Select Tag'
                                useUppercaseLabel
                                isSearchable
                                isError={errors.tag && true}
                                options={[

                                ]}
                                {...register('tag')}
                            />
                            <Dropdown
                                label='Kategoru'
                                placeholder='Select Kategoru'
                                useUppercaseLabel
                                isSearchable
                                isError={errors.tag && true}
                                options={[

                                ]}
                                {...register('kategori')}
                            />

                        </div>
                        <div>
                            <TextArea
                                label='Descriptiom'
                                placeholder='Enter Description'
                                useUppercaseLabel
                                isError={errors.desc && true}
                                value={watch('desc')}
                                {...register('desc')}
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className='border-[1px] p-4 rounded-md mx-4'>
                <div className='text-[16px] font-bold mb-2'>BUAT SOAL</div>
                <TextEditor />
            </div>

            <div className='flex justify-end p-2 border-t mt-2'>
                <Button
                    label='Save'
                    variant='default'
                    useUpperCase
                    className=''
                    type='submit'
                    onClick={() => {
                        setDataBankSoal(null)
                        modalServiceCreate.closeModalHandling()
                    }} />
            </div>
        </form>
    );
};

export default BankSoalCreate;
