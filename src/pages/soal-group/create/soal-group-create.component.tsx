import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { DragItem, IFormSoalGroup, ISoalGroupState } from '../soal-group.interface';
import TextArea from 'component/text-area/text-area.component';
import { DndProvider } from 'react-dnd';
import { DroppableColumn } from './droppble-column/droppble-column.component';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { stepForm } from '../soal-group.dummy';
import useSoalGroupCreate from './soal-group-create.service';
import { useNavigate } from 'react-router-dom';
import ProgressionStep from 'component/progression-step/progression-step.component';
import Dropdown from 'component/dropdown/dropdown.component';
import { IDropdownItem } from 'component/dropdown/dropdown.interface';
import { dummyBankSoal } from 'pages/bank-soal/bank-soal.dummy';
import { IBankSoal } from 'pages/bank-soal/bank-soal.interface';

const SoalGroupCreate = () => {
    const nav = useNavigate()
    const [soalDnd, setSoalDnd] = useState<ISoalGroupState>({
        listData: {
            id: 1,
            title: 'List Soal',
            items: [...dummyBankSoal],
        },
        AddData: {
            id: 2,
            title: 'Add Data',
            items: [],
        },
    });

    const {
        isStep,
        setIsStep,
        reactForm,
    } = useSoalGroupCreate();

    const {
        watch,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = reactForm

    const onSubmit = (values: IFormSoalGroup) => {
        reactForm.reset({
            title: '',
            desc: '',
            tag: { value: '', label: '' },
        });
    };


    const onDropHandler = (
        draggedItem: DragItem,
        toColumnKey: keyof ISoalGroupState
    ) => {
        const fromColumnKey = draggedItem.from;
        if (fromColumnKey === toColumnKey) return;

        const draggedData = draggedItem.item;

        setSoalDnd((prev) => {
            const fromItems = [...prev[fromColumnKey].items];
            const toItems = [...prev[toColumnKey].items];

            const updatedFromItems = fromItems.filter((item) => item.id !== draggedData.id);
            const updatedToItems = [...toItems, draggedData];

            return {
                ...prev,
                [fromColumnKey]: {
                    ...prev[fromColumnKey],
                    items: updatedFromItems,
                },
                [toColumnKey]: {
                    ...prev[toColumnKey],
                    items: updatedToItems,
                },
            };
        });
    };

    const handleToggleItem = (
        item: IBankSoal,
        from: keyof ISoalGroupState
    ) => {
        const to = from === 'listData' ? 'AddData' : 'listData';

        setSoalDnd((prev) => {
            const fromItems = prev[from].items.filter((i) => i.id !== item.id);

            // Hindari duplikat jika item sudah ada di tujuan
            const isAlreadyExistInTarget = prev[to].items.some((i) => i.id === item.id);
            const toItems = isAlreadyExistInTarget
                ? prev[to].items
                : [item, ...prev[to].items]; // tambahkan di atas (prepend)

            return {
                ...prev,
                [from]: {
                    ...prev[from],
                    items: fromItems,
                },
                [to]: {
                    ...prev[to],
                    items: toItems,
                },
            };
        });
    };

    // h-[calc(100vh-6rem)]
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className='flex justify-center'>
                <div className='bg-[--white] flex flex-col m-4 rounded-md shadow-lg p-4'>
                    <div className='flex justify-center p-4'>
                        <ProgressionStep
                            steps={stepForm}
                            onChange={(step) => setIsStep(step)}
                            completedStep
                            selectedItem={isStep}
                        />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        {isStep.value === 'informasi' ? (
                            <div className='flex flex-col gap-3 border-[1px] pt-4 px-3 pb-2 rounded-md  w-[500px]'>
                                <div className='flex justify-between '>
                                    <div className='text-[16px] font-bold flex items-center'>INFORMASI GROUP</div>
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
                                    </div>
                                    <div className='flex flex-col gap-2'>
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

                        ) : (
                            <DndProvider backend={HTML5Backend}>
                                <div className="w-full max-w-screen px-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[calc(100vh-17rem)] overflow-auto">
                                        <DroppableColumn
                                            title={soalDnd.listData.title}
                                            items={soalDnd.listData.items}
                                            columnKey="listData"
                                            iconButton="ri-add-line"
                                            onDropHandler={onDropHandler}
                                            onToggleItem={handleToggleItem}
                                        />
                                        <DroppableColumn
                                            title={soalDnd.AddData.title}
                                            items={soalDnd.AddData.items}
                                            columnKey="AddData"
                                            iconButton="ri-delete-bin-5-line"
                                            onDropHandler={onDropHandler}
                                            onToggleItem={handleToggleItem}
                                        />
                                    </div>
                                </div>
                            </DndProvider>
                        )}

                        <div className='flex justify-between mt-3 w-full'>
                            <Button
                                label='Back'
                                variant='default'
                                useUpperCase
                                className='w-[150px]'
                                onClick={() => {
                                    nav(-1)
                                }} />

                            <Button
                                label={isStep.value === 'informasi' ? 'Next' : 'Save'}
                                variant='default'
                                useUpperCase
                                className='w-[150px]'
                                type='submit'
                                onClick={() => {
                                    if (isStep.value === 'informasi') {
                                        setIsStep(stepForm[1])

                                    } else {
                                        nav(-1)

                                    }
                                }} />
                        </div>
                    </div>
                </div>
            </div>

        </form>

    );
};

export default SoalGroupCreate;
