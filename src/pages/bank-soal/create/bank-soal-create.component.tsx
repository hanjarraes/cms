import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import Dropdown from 'component/dropdown/dropdown.component';
import { IFormBankSoal, IUseBankSoal } from '../bank-soal.interface';
import TextArea from 'component/text-area/text-area.component';
import TextEditor from 'component/editor/text-ediot.component';
import Card from 'component/card/card.component';
import { IDropdownItem } from 'component/dropdown/dropdown.interface';


const BankSoalCreate = ({ service }: { service: IUseBankSoal }) => {

    const {
        modalServiceCreate,
        reactForm,
        option,
        setOption,
        setDataBankSoal
    } = service;


    const {
        watch,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = reactForm

    const values = watch();

    const onSubmit = (values: IFormBankSoal) => {
        reactForm.reset({
            title: '',
            desc: '',
            tag: '',
            kategori: { value: '', label: '' },
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
                <div className='border-[1px] pt-4 px-3 pb-2 rounded-md'>
                    <div className='text-[16px] font-bold mb-2'>INFORMASI SOAL</div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Input
                                label='Title'
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
                                placeholder='Select Kategori'
                                useUppercaseLabel
                                isSearchable
                                isError={errors.tag && true}
                                value={watch('kategori') as IDropdownItem<string>}
                                onClick={(e) => {
                                    setValue('kategori', e as IDropdownItem<string>)
                                }}
                                options={[
                                    { value: 'checkbox', label: 'checkbox' },
                                    { value: 'options', label: 'options' },
                                    { value: 'text', label: 'text' },
                                    { value: 'file', label: 'file' },
                                    { value: 'code', label: 'codes' },
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
                <div className='border-[1px] pt-4 px-3 pb-2 rounded-md'>
                    <div className='flex justify-between items-center mb-2'>
                        <div className='text-[16px] font-bold mb-2'>Example Soal</div>
                        <div className='flex justify-between gap-2'>
                            <Input
                                icon='ri-search-line'
                                placeholder='Search'
                                onChange={(e) => { }}
                            />
                            <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 h-[120px] overflow-y-scroll border-[1px] rounded-md p-2'>
                        <Card animated>
                            <div className='flex justify-between'>
                                <div>Matematika</div>
                                <div
                                    className={`px-2 py-1 text-xs rounded-md font-bold w-fit  bg-gray-100 text-gray-700`}
                                >
                                    Dipilih 150x
                                </div>
                            </div>
                        </Card>
                        <Card animated>
                            <div className='flex justify-between'>
                                <div>English</div>
                                <div
                                    className={`px-2 py-1 text-xs rounded-md font-bold w-fit  bg-gray-100 text-gray-700`}
                                >
                                    Dipilih 100x
                                </div>
                            </div>
                        </Card>
                        <Card animated>
                            <div className='flex justify-between'>
                                <div>Logica</div>
                                <div
                                    className={`px-2 py-1 text-xs rounded-md font-bold w-fit  bg-gray-100 text-gray-700`}
                                >
                                    Dipilih 50x
                                </div>
                            </div>
                        </Card>
                        <Card animated>
                            <div className='flex justify-between'>
                                <div>fisika</div>
                                <div
                                    className={`px-2 py-1 text-xs rounded-md font-bold w-fit  bg-gray-100 text-gray-700`}
                                >
                                    Dipilih 150x
                                </div>
                            </div>
                        </Card>
                        <Card animated>
                            <div className='flex justify-between'>
                                <div>ekima</div>
                                <div
                                    className={`px-2 py-1 text-xs rounded-md font-bold w-fit  bg-gray-100 text-gray-700`}
                                >
                                    Dipilih 150x
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <div className='border-[1px] p-4 rounded-md mx-4'>
                <div className='text-[16px] font-bold mb-2'>BUAT SOAL</div>
                <div className='flex gap-3'>
                    <div className='w-full'>
                        <TextEditor />
                    </div>
                    {(values.kategori?.value === 'options' || values.kategori?.value === 'checkbox') && (
                        <div className='w-[500px] flex flex-col gap-2'>
                            <div className='min-w-max'>Tambah Options</div>
                            <div className='flex gap-2'>
                                <Input
                                    label='New Option'
                                    placeholder='Create Option'
                                    useUppercaseLabel
                                    isError={!!errors.options}
                                    value={option}
                                    onChange={(e) => setOption(e.target.value)}
                                />
                                <Button
                                    variant='default'
                                    icon='ri-add-line'
                                    className='w-[40px]'
                                    useUpperCase
                                    onClick={() => {
                                        const currentOption = option
                                        const currentOptions = watch('options') || [];

                                        if (currentOption?.trim()) {
                                            setValue('options', [...currentOptions, currentOption.trim()]);
                                            setOption('')
                                        }
                                    }}
                                />
                            </div>

                            <div className='flex flex-col flex-grow   gap-2 border-[1px] rounded-md p-3'>
                                {values.options?.map((data, idx) => (
                                    <div key={idx} className='bg-[--white] px-2 py-1 rounded border-[1px] flex gap-3'>
                                        <div>
                                            {data}
                                        </div>
                                        <i className="ri-delete-bin-line hover:text-[--danger-v5] text-[20px] cursor-pointer"
                                            onClick={() => {
                                                const currentOptions = values.options || [];
                                                const updatedOptions = currentOptions.filter((_, i) => i !== idx);
                                                setValue('options', updatedOptions);
                                            }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                        setDataBankSoal(null)
                        modalServiceCreate.closeModalHandling()
                    }} />
            </div>
        </form>
    );
};

export default BankSoalCreate;
