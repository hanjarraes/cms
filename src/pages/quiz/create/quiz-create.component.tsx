import React, { useState } from 'react';
import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import PhoneInput from 'component/input-phone/input-phone';
import Dropdown from 'component/dropdown/dropdown.component';
import Tooltip from 'component/tooltip/tooltip.component';
import { IFormQuiz, IUseQuiz } from '../quiz.interface';
import { Switch } from 'component/switch/switch.component';
import { IDropdownItem } from 'component/dropdown/dropdown.interface';
import useQuiz from '../quiz.service';
import DateTimePicker from 'component/date-time-picker/date-tme-picker.component';
import TimePicker from 'component/time-picker/time-picker.component';
import DurationPicker from 'component/duration-time/duration-time.component';
import TextArea from 'component/text-area/text-area.component';


const SchaduleCreate = ({ service }: { service: IUseQuiz }) => {
    const [isActive, setIsActive] = useState(false);

    const {
        modalServiceCreate,
        reactForm,
        setIsConfirm,
        dataQuiz,
        setDataQuiz
    } = service;


    const {
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = reactForm

    const onSubmit = (values: IFormQuiz) => {
        modalServiceCreate.closeModalHandling()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between mb-4 border-b px-4 py-3 bg-animasi'>
                <div className='text-[18px] font-bold'>Create Quiz</div>
                <i
                    className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                    onClick={() => {
                        modalServiceCreate.closeModalHandling()
                    }}
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 px-4'>
                <div className='flex flex-col gap-2'>
                    <Input
                        label='Title'
                        placeholder='Enter Title'
                        useUppercaseLabel
                        value={watch('id')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('id', e.target.value)}
                    />
                    <Dropdown
                        label='Group Partisipan'
                        placeholder='Select Group Partisipan'
                        options={[
                        ]}
                        isClearable
                        isSearchable
                        useUppercaseLabel
                    />
                    <DateTimePicker
                        label="TEST OPEN"
                        value={{ date: '03', month: '08', time: '14:30' }}
                        onChange={(val) => console.log(val)}
                        required
                    />
                    <DurationPicker
                        label="WAKTU PEKERJAAN"
                        // value={duration}
                        onChange={(val) => console.log(val)}
                        required
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <Input
                        label='Nilai Minimal Kelulusan'
                        placeholder='Enter Minimal Kelulusan'
                        type='number'
                        useUppercaseLabel
                    />
                    <Dropdown
                        label='Template'
                        placeholder='Select Template'
                        options={[
                        ]}
                        isClearable
                        isSearchable
                        useUppercaseLabel
                    />
                    <DateTimePicker
                        label="TEST CLOSE"
                        value={{ date: '03', month: '08', time: '14:30' }}
                        onChange={(val) => console.log(val)}
                        required
                    />
                    <DateTimePicker
                        label="DEADLINE"
                        value={{ date: '03', month: '08', time: '14:30' }}
                        onChange={(val) => console.log(val)}
                        required
                    />
                </div>
                <div>
                    <TextArea
                        label='Descriptiom'
                        placeholder='Enter Description'
                        useUppercaseLabel
                        height={210}
                    />
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

export default SchaduleCreate;
