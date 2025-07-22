import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { DragItem, IFormPartisipanGroup, IPartisipan, IPartisipanGroupState, IUsePartisipanGroup } from '../partisipan-group.interface';
import { dummyPartipanData } from '../partisipan-group.dummy';
import { DroppableColumn } from './droppble-column/droppble-column.component';
import Textarea from 'component/text-area/text-area.component';


const PartisipanCreate = ({ service }: { service: IUsePartisipanGroup }) => {
    const [partisipan, setPartisipan] = useState<IPartisipanGroupState>({
        listData: {
            id: 1,
            title: 'List Partisipan',
            items: [...dummyPartipanData],
        },
        AddData: {
            id: 2,
            title: 'Add Data',
            items: [],
        },
    });

    const {
        modalServiceCreate,
        reactForm,
        dataPartisipanGroup,
        setDataPartisipanGroup,
    } = service;

    const {
        watch,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = reactForm;

    const onSubmit = (values: IFormPartisipanGroup) => {
        reactForm.reset({
            title: '',
            desc: '',
        });
    };

    const onDropHandler = (
        draggedItem: DragItem,
        toColumnKey: keyof IPartisipanGroupState
    ) => {
        const fromColumnKey = draggedItem.from;
        if (fromColumnKey === toColumnKey) return;

        const draggedData = draggedItem.item;

        setPartisipan((prev) => {
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
        item: IPartisipan,
        from: keyof IPartisipanGroupState
    ) => {
        const to = from === 'listData' ? 'AddData' : 'listData';

        setPartisipan((prev) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between mb-4 border-b px-4 py-3 bg-animasi'>
                <div className='text-[18px] font-bold'>Create Group Partisipan</div>
                <i
                    className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                    onClick={() => {
                        modalServiceCreate.closeModalHandling();
                        reactForm.reset({
                            title: '',
                            desc: '',
                        });
                        setDataPartisipanGroup(null);
                    }}
                />
            </div>

            <DndProvider backend={HTML5Backend}>
                <div className='grid grid-cols-2 px-2 gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2 border-[1px] rounded-md p-3'>
                            <Input
                                label='Title'
                                placeholder='Enter Title'
                                useUppercaseLabel
                                isError={!!errors.title}
                                value={watch('title')}
                                {...register('title')}
                            />
                            <Textarea
                                label='Description'
                                placeholder='Enter Description'
                                useUppercaseLabel
                                isError={!!errors.desc}
                                value={watch('desc')}
                                {...register('desc')}
                            />
                        </div>
                        <DroppableColumn
                            title={partisipan.AddData.title}
                            items={partisipan.AddData.items}
                            columnKey='AddData'
                            textButton='Remove'
                            onDropHandler={onDropHandler}
                            onToggleItem={handleToggleItem}
                        />
                    </div>

                    <DroppableColumn
                        title={partisipan.listData.title}
                        items={partisipan.listData.items}
                        height={'600'}
                        columnKey='listData'
                        textButton={'Add'}
                        onDropHandler={onDropHandler}
                        onToggleItem={handleToggleItem}
                    />
                </div>
            </DndProvider>

            <div className='flex justify-end p-2 border-t mt-2'>
                <Button
                    label='Save'
                    variant='default'
                    useUpperCase
                    className=''
                    type='submit'
                    onClick={() => {
                        setDataPartisipanGroup(null);
                        modalServiceCreate.closeModalHandling();
                    }}
                />
            </div>
        </form>
    );
};

export default PartisipanCreate;
