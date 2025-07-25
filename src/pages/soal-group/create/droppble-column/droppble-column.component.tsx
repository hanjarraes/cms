import Button from "component/button/button.component";
import Empty from "component/empty/empty.component";
import Input from "component/input/input.component";
import { DragItem, IFormSoalGroup, ISoalGroupState } from "pages/soal-group/soal-group.interface";
import { useMemo, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

const ItemTypes = {
    PARTICIPANT: 'PARTICIPANT',
};

const DraggableItem = ({
    item,
    index,
    from,
    textButton,
    onToggleItem,
}: {
    item: IFormSoalGroup;
    index: number;
    textButton: string
    from: keyof ISoalGroupState;
    onToggleItem: (item: IFormSoalGroup, from: keyof ISoalGroupState) => void;
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PARTICIPANT,
        item: { item, index, from },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`border p-2 rounded-md bg-white shadow cursor-move  flex justify-between items-center gap-2 ${isDragging ? 'opacity-50' : ''
                }`}
        >
            <div className="flex gap-2">
                <div className='h-full flex justify-center rounded-md px-3 border-[1px]'>
                    <i className="ri-user-line text-[38px]" />
                </div>
                <div>
                    <div className='font-semibold'>{item.title}</div>
                    <div className='text-sm text-[--gray-v4]'>{item.desc}</div>
                    <div className='text-sm text-[--gray-v4]'>{item.kategori.value}</div>
                </div>
            </div>
            <div className="px-2">
                <Button
                    label={textButton}
                    useUpperCase
                    onClick={() => onToggleItem(item, from)}
                />
            </div>
        </div>
    );
};

export const DroppableColumn = ({
    title,
    items,
    columnKey,
    textButton,
    onToggleItem,
    onDropHandler,
}: {
    title: string;
    textButton: string
    items: IFormSoalGroup[];
    columnKey: keyof ISoalGroupState;
    onToggleItem: (item: IFormSoalGroup, from: keyof ISoalGroupState) => void;
    onDropHandler: (
        draggedItem: DragItem,
        toColumnKey: keyof ISoalGroupState
    ) => void;
}) => {
    const [search, setSearch] = useState('');

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.PARTICIPANT,
        drop: (draggedItem: DragItem, monitor: DropTargetMonitor) => {
            onDropHandler(draggedItem, columnKey);
        },
    }));

    // 🧠 Filter logic
    const filteredItems = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return items;

        return items.filter((item) =>
            [item.title, item.desc,]
                .some((field) => field.toLowerCase().includes(keyword))
        );
    }, [items, search]);

    return (
        <div className=' gap-2' ref={drop}>
            <div className="flex justify-between items-center mb-3 gap-2">
                <div className='font-bold min-w-max'>{title}</div>
                <div className='flex gap-2 w-full'>
                    <Input
                        icon='ri-search-line'
                        placeholder='Search Partisipan'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
            </div>

            <div
                className={`flex flex-col gap-2 overflow-y-auto border-[1px] p-4 rounded-md 
                    h-[400px]`}
            >
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                        <DraggableItem
                            key={item.id}
                            item={item}
                            index={idx}
                            from={columnKey}
                            textButton={textButton}
                            onToggleItem={onToggleItem}
                        />
                    ))
                ) : (
                    <div className="text-sm text-gray-400 italic text-center">
                        <Empty />
                    </div>
                )}
            </div>
        </div>
    );
};
