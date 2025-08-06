import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import Dropdown from 'component/dropdown/dropdown.component';
import TextArea from 'component/text-area/text-area.component';
import TextEditor from 'component/editor/text-ediot.component';
import { IDropdownItem } from 'component/dropdown/dropdown.interface';
import useBankSoalCreate from './bank-soal-create.service';
import { IFormBankSoal, IFormBankTemplateSoal } from '../bank-soal.interface';
import Modal from 'component/modal/modal.component';
import ModalExample from './example-soal/example-soal.component';
import ModalToast from 'component/modal-massage/modal-massage';
import CheckBox from 'component/checkbox/checkbox.component';


const BankSoalCreate = () => {
    const {
        reactForm,
        reactFormGroup,
        option,
        nav,
        setOption,
        setDataBankSoal,
        modalServiceExample,
        modalServiceTemplate,
        isConfirm,
        setIsConfirm,
    } = useBankSoalCreate();

    const {
        formState: { errors },
    } = reactForm

    const values = reactForm.watch();


    const onSubmit = (values: IFormBankSoal) => {
        reactForm.reset({
            title: '',
            desc: '',
            tag: { value: '', label: '' },
            kategori: { value: '', label: '' },
            type: { value: '', label: '' },
        });
    };

    const onSubmitGroup = (values: IFormBankTemplateSoal) => {
        reactForm.reset({
            title: '',
            desc: '',
            tag: { value: '', label: '' },
        });
    };
    const dummyData: string[] = Array.from({ length: 60 }, (_, i) => (i + 1).toString());

    return (
        <>
            <form onSubmit={reactForm.handleSubmit(onSubmit)}>
                <div className='flex flex-col p-4 gap-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-3 border-[1px] pt-4 px-3 pb-2 rounded-md bg-white'>
                            <div className='flex justify-between '>
                                <div className='text-[16px] font-bold flex items-center'>INFORMASI SOAL</div>
                                <Button
                                    label='Cari example'
                                    variant='default'
                                    useUpperCase
                                    className=''
                                    onClick={() => {
                                        modalServiceExample.openModalHandling()
                                    }}
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Input
                                        label='Title'
                                        placeholder='Enter Title'
                                        useUppercaseLabel
                                        isError={errors.title && true}
                                        value={reactForm.watch('title')}
                                        onChange={(e) => {
                                            reactForm.setValue('title', e.target.value)
                                        }}
                                    />
                                    <Dropdown
                                        label='Tag'
                                        placeholder='Select Tag'
                                        useUppercaseLabel
                                        isSearchable
                                        isError={errors.tag && true}
                                        value={reactForm.watch('tag') as IDropdownItem<string>}
                                        onClick={(e) => {
                                            reactForm.setValue('tag', e as IDropdownItem<string>)
                                        }}
                                        options={[
                                            { value: 'checkbox', label: 'checkbox' },
                                            { value: 'options', label: 'options' },
                                            { value: 'text', label: 'text' },
                                            { value: 'file', label: 'file' },
                                            { value: 'code', label: 'codes' },
                                        ]}
                                    />
                                    <Dropdown
                                        label='Kategori'
                                        placeholder='Select Kategori'
                                        useUppercaseLabel
                                        isSearchable
                                        isError={errors.tag && true}
                                        value={reactForm.watch('kategori') as IDropdownItem<string>}
                                        onClick={(e) => {
                                            reactForm.setValue('kategori', e as IDropdownItem<string>)
                                        }}
                                        options={[
                                            { value: 'checkbox', label: 'checkbox' },
                                            { value: 'options', label: 'options' },
                                            { value: 'text', label: 'text' },
                                            { value: 'file', label: 'file' },
                                            { value: 'code', label: 'codes' },
                                        ]}
                                    />

                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Dropdown
                                        label='Type'
                                        placeholder='Select Type'
                                        useUppercaseLabel
                                        isSearchable
                                        isError={errors.tag && true}
                                        value={reactForm.watch('type') as IDropdownItem<string>}
                                        onClick={(e) => {
                                            reactForm.setValue('type', e as IDropdownItem<string>)
                                        }}
                                        options={[
                                            { value: 'checkbox', label: 'checkbox' },
                                            { value: 'options', label: 'options' },
                                            { value: 'text', label: 'text' },
                                            { value: 'file', label: 'file' },
                                            { value: 'code', label: 'codes' },
                                        ]}
                                    />
                                    <TextArea
                                        label='Descriptiom'
                                        placeholder='Enter Description'
                                        useUppercaseLabel
                                        isError={errors.desc && true}
                                        height={80}
                                        value={reactForm.watch('desc')}
                                        onChange={(e) => {
                                            reactForm.setValue('desc', e.target.value)
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className='border-[1px] pt-4 pl-3 pb-2 rounded-md bg-white flex flex-wrap content-start  gap-2'>
                            {dummyData.map(data => {
                                return (
                                    <div className='bg-[--info-v2] text-[--info-v5] hover:bg-[--info-v5] hover:text-[--white] cursor-pointer rounded-md px-2'>
                                        {data}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='border-[1px] rounded-md p-3 bg-white'>
                        <div className='text-[16px] font-bold mb-2'>BUAT SOAL</div>
                        <div className='flex gap-3'>
                            <div className='w-full  h-[calc(100vh-28rem)]'>
                                <TextEditor />
                            </div>
                            {(values.type?.value === 'options' || values.type?.value === 'checkbox') && (
                                <div className='w-[500px] flex flex-col gap-2'>
                                    <div className='min-w-max'>Tambah Options</div>
                                    <div className='flex flex-col gap-2'>
                                        {/* Input text option */}
                                        <div className='flex gap-2'>
                                            <Input
                                                label='New Option (Text)'
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
                                                    const currentOption = option.trim();
                                                    const currentOptions = reactForm.watch('options') || [];

                                                    if (currentOption) {
                                                        const newOption: { type: "text"; value: string } = { type: "text", value: currentOption };
                                                        reactForm.setValue('options', [...currentOptions, newOption]);
                                                        setOption('');
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Upload image option */}
                                        <div className='flex items-center gap-2'>
                                            <label className="cursor-pointer flex items-center gap-2 text-sm">
                                                <i className="ri-image-add-line text-lg" />
                                                <span>Upload Gambar</span>
                                                <input
                                                    type='file'
                                                    accept='image/*'
                                                    className='hidden'
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                const base64 = reader.result?.toString() || '';
                                                                const currentOptions = reactForm.watch('options') || [];
                                                                const newOption: { type: "image"; value: string } = { type: "image", value: base64 };
                                                                reactForm.setValue('options', [...currentOptions, newOption]);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div className='flex flex-col flex-grow gap-2 border-[1px] rounded-md p-3'>
                                        {values.options?.map((data, idx) => (
                                            <div
                                                key={idx}
                                                className='bg-[--white] px-2 py-1 rounded border-[1px] flex gap-3 items-center justify-between'
                                            >
                                                <div className='flex items-center gap-3'>
                                                    {data.type === 'text' ? (
                                                        <span>{data.value}</span>
                                                    ) : (
                                                        <img
                                                            src={data.value}
                                                            alt={`Option-${idx}`}
                                                            className='h-10 rounded object-contain'
                                                        />
                                                    )}
                                                </div>

                                                <div className='flex items-center gap-3'>
                                                    <CheckBox
                                                        label='Benar'
                                                        type={values.type?.value === 'options' ? 'options' : 'checkbox'}
                                                        checked={data.isCorrect || false}
                                                        onChange={() => {
                                                            const currentOptions = [...(values.options || [])];

                                                            if (values.type?.value === 'options') {
                                                                currentOptions.forEach((opt, i) => {
                                                                    currentOptions[i].isCorrect = i === idx;
                                                                });
                                                            } else {
                                                                currentOptions[idx].isCorrect = !currentOptions[idx].isCorrect;
                                                            }

                                                            reactForm.setValue('options', currentOptions);
                                                        }}
                                                    />
                                                    <i
                                                        className="ri-delete-bin-line hover:text-[--danger-v5] text-[20px] cursor-pointer"
                                                        onClick={() => {
                                                            const updatedOptions = values.options?.filter((_, i) => i !== idx);
                                                            reactForm.setValue('options', updatedOptions || []);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-end  bg-white p-3 rounded-md border-[1px] gap-2'>
                        <Button
                            label='Create Soal'
                            variant='default'
                            useUpperCase
                            className=''
                            type='submit'
                            onClick={() => {
                                setDataBankSoal(null)
                            }}
                        />
                        <Button
                            label='Selesai'
                            variant='info'
                            useUpperCase
                            className=''
                            type='submit'
                            onClick={() => {
                                setIsConfirm(true);
                            }}
                        />
                    </div>
                </div>
                <Modal
                    onClose={() => modalServiceExample.closeModalHandling()}
                    closeOnOutsideClick
                    isModalOpen={modalServiceExample.isModalOpen}
                    className="!w-1/3 px-0" >
                    <ModalExample isModal={modalServiceExample} />
                </Modal>
            </form>
            <Modal
                onClose={() => modalServiceTemplate.closeModalHandling()}
                closeOnOutsideClick
                isModalOpen={modalServiceTemplate.isModalOpen}
                className="!w-1/3  px-0" >
                <form onSubmit={reactFormGroup.handleSubmit(onSubmitGroup)}>
                    <div className='flex flex-col gap-3 border-[1px] pt-4 px-3 pb-2 rounded-md bg-white'>
                        <div className='flex justify-between '>
                            <div className='text-[16px] font-bold flex items-center'>BUAT GROUP BARU</div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Input
                                    label='Title'
                                    placeholder='Enter Title'
                                    useUppercaseLabel
                                    isError={reactFormGroup.formState.errors.title && true}
                                    value={reactFormGroup.watch('title')}
                                    onChange={(e) => {
                                        reactFormGroup.setValue('title', e.target.value)
                                    }}
                                />
                                <Dropdown
                                    label='Tag'
                                    placeholder='Select Tag'
                                    useUppercaseLabel
                                    isSearchable
                                    isError={reactFormGroup.formState.errors.tag && true}
                                    value={reactFormGroup.watch('tag') as IDropdownItem<string>}
                                    onClick={(e) => {
                                        reactFormGroup.setValue('tag', e as IDropdownItem<string>)
                                    }}
                                    options={[
                                        { value: 'checkbox', label: 'checkbox' },
                                        { value: 'options', label: 'options' },
                                        { value: 'text', label: 'text' },
                                        { value: 'file', label: 'file' },
                                        { value: 'code', label: 'codes' },
                                    ]}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <TextArea
                                    label='Descriptiom'
                                    placeholder='Enter Description'
                                    useUppercaseLabel
                                    isError={reactFormGroup.formState.errors.desc && true}
                                    height={80}
                                    value={reactFormGroup.watch('desc')}
                                    onChange={(e) => {
                                        reactFormGroup.setValue('desc', e.target.value)
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-end  bg-white p-3 rounded-md border-[1px] gap-2'>
                        <Button
                            label='Batal'
                            variant='default'
                            useUpperCase
                            className=''
                            type='submit'
                            onClick={() => {
                                nav('/bank-soal')
                            }}
                        />
                        <Button
                            label='Create Template'
                            variant='info'
                            useUpperCase
                            className=''
                            type='submit'
                            onClick={() => {
                                nav('/bank-soal')
                            }}
                        />
                    </div>
                </form>
            </Modal>
            <ModalToast
                isOpen={isConfirm}
                type="info"
                title="Konfirmasi Data?"
                description={
                    'Apakah Soal-Soal yang kamu buat mau dijadikan Template ??'
                }
                onClose={() => {
                    nav('/bank-soal')
                }
                }
                onSubmit={() => {
                    setIsConfirm(false);
                    modalServiceTemplate.openModalHandling()
                }}
                submitLabel="IYA"
                closeLabel='TIDAK'
            />
        </>

    );
};

export default BankSoalCreate;
