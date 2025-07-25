import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { DragItem, IFormSoalGroup, ISoalGroupState } from '../soal-group.interface';
import TextArea from 'component/text-area/text-area.component';
import { DndProvider } from 'react-dnd';
import { DroppableColumn } from './droppble-column/droppble-column.component';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { dummySoalGroupCreate } from '../soal-group.dummy';
import useSoalGroupCreate from './soal-group-create.service';
import { useNavigate } from 'react-router-dom';

const SoalGroupCreate = () => {
    const nav = useNavigate()
    const [soalDnd, setSoalDnd] = useState<ISoalGroupState>({
        listData: {
            id: 1,
            title: 'List Soal',
            items: [...dummySoalGroupCreate],
        },
        AddData: {
            id: 2,
            title: 'Add Data',
            items: [],
        },
    });

    const {
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
            tag: '',
            kategori: { value: '', label: '' },
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
        item: IFormSoalGroup,
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


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className='bg-[--white] flex flex-col m-4  h-[calc(100vh-6rem)] '>
                <div className='flex-grow grid grid-cols-2 gap-2 overflow-y-auto p-4'>
                    <DndProvider backend={HTML5Backend}>
                        <div className='flex flex-col gap-2'>
                            <DroppableColumn
                                title={soalDnd.listData.title}
                                items={soalDnd.listData.items}
                                columnKey='listData'
                                textButton={'Add'}
                                onDropHandler={onDropHandler}
                                onToggleItem={handleToggleItem}
                            />
                            <DroppableColumn
                                title={soalDnd.AddData.title}
                                items={soalDnd.AddData.items}
                                columnKey='AddData'
                                textButton='Remove'
                                onDropHandler={onDropHandler}
                                onToggleItem={handleToggleItem}
                            />
                        </div>
                    </DndProvider>
                    <div className='flex flex-col gap-2'>
                        <div className='pt-4 px-3'>
                            <div className='text-[16px] font-bold mb-2'>INFORMASI TEMPLATE</div>
                            <div className='flex flex-col gap-2'>
                                <Input
                                    label='Title'
                                    placeholder='Enter Title'
                                    useUppercaseLabel
                                    isError={errors.title && true}
                                    value={watch('title')}
                                    {...register('title')}
                                />
                                <TextArea
                                    label='Description'
                                    placeholder='Enter Description'
                                    useUppercaseLabel
                                    isError={errors.title && true}
                                    value={watch('title')}
                                    {...register('title')}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col flex-grow p-4'>
                            <div className='text-[16px] font-bold'>PREVIEW SOAL</div>
                            <div className='flex-grow gap-2 border-[1px] rounded-md'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between p-2 border-t mt-2'>
                    <Button
                        label='Back'
                        variant='default'
                        useUpperCase
                        className=''
                        onClick={() => {
                            nav(-1)
                        }} />

                    <Button
                        label='Save'
                        variant='default'
                        useUpperCase
                        className=''
                        type='submit'
                        onClick={() => {

                        }} />
                </div>
            </div>
        </form>

    );
};

export default SoalGroupCreate;
