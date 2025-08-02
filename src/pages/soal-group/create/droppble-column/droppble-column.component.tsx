import Button from "component/button/button.component";
import Empty from "component/empty/empty.component";
import Input from "component/input/input.component";
import Modal from "component/modal/modal.component";
import { useModal } from "component/modal/modal.service";
import Tooltip from "component/tooltip/tooltip.component";
import { IBankSoal } from "pages/bank-soal/bank-soal.interface";
import { DragItem, ISoalGroupState } from "pages/soal-group/soal-group.interface";
import { useMemo, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

const ItemTypes = {
    soal: 'Soal',
};

const DraggableItem = ({
    item,
    index,
    from,
    iconButton,
    onToggleItem,
}: {
    item: IBankSoal;
    index: number;
    iconButton: string
    from: keyof ISoalGroupState;
    onToggleItem: (item: IBankSoal, from: keyof ISoalGroupState) => void;
}) => {
    const modalPreview = useModal()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.soal,
        item: { item, index, from },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`border p-3 rounded-md bg-white shadow cursor-move flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${isDragging ? 'opacity-50' : ''}`}
        >
            <div className="flex-1 min-w-0">
                <div className="font-semibold flex items-center">
                    {item.title}
                    <Tooltip isShow isHover parentInputClassName='!w-[30px]' className='min-w-max font-normal' text='Preview Soal'>
                        <i className="ri-eye-line cursor-pointer hover:text-[--info-v5] font-normal mx-2 text-[20px]" onClick={() => modalPreview.openModalHandling()} />
                    </Tooltip>
                </div>
                <div className="text-sm text-[--gray-v4]  break-words  w-[300px] sm:w-full md:w-full">{item.desc}</div>
                <div className="text-sm flex gap-2 mt-1 overflow-x-auto w-[300px] sm:w-full md:w-full">
                    {Array.isArray(item.tag)
                        ? item.tag.map((tag, i) => {
                            const tagColorMap: Record<string, string> = {
                                Kategori: 'bg-blue-100 text-blue-800',
                                Tipe: 'bg-green-100 text-green-800',
                                Kesulitan: 'bg-yellow-100 text-yellow-800',
                                Statistik: 'bg-gray-100 text-gray-700',
                                Topik: 'bg-purple-100 text-purple-800',
                                Level: 'bg-pink-100 text-pink-800',
                                Sumber: 'bg-red-100 text-red-800',
                            };
                            const colorClass = tagColorMap[tag.type] ?? 'bg-gray-100 text-gray-800';
                            return (
                                <div
                                    key={i + 'idTag'}
                                    className={`px-2 py-1 text-xs rounded-md font-bold whitespace-nowrap ${colorClass}`}
                                >
                                    {tag.name}
                                </div>
                            );
                        })
                        : item.tag}
                </div>
            </div>
            <div className="sm:px-2 w-full sm:w-auto">
                <Button
                    icon={iconButton}
                    useUpperCase
                    onClick={() => onToggleItem(item, from)}
                    className="w-full sm:w-auto"
                    iconClassName="px-2"
                />
            </div>
            <Modal
                onClose={() => modalPreview.closeModalHandling()}
                closeOnOutsideClick
                isModalOpen={modalPreview.isModalOpen}
                className="!w-1/3  px-0 h-[500px]" >
                <div className="p-4 font-bold">
                    Privew Soal
                </div>
            </Modal>
        </div>
    );
};

export const DroppableColumn = ({
    title,
    items,
    columnKey,
    iconButton,
    onToggleItem,
    onDropHandler,
}: {
    title: string;
    iconButton: string
    items: IBankSoal[];
    columnKey: keyof ISoalGroupState;
    onToggleItem: (item: IBankSoal, from: keyof ISoalGroupState) => void;
    onDropHandler: (
        draggedItem: DragItem,
        toColumnKey: keyof ISoalGroupState
    ) => void;
}) => {
    const [search, setSearch] = useState('');

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.soal,
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
        <div className='w-full flex flex-col' ref={drop}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <div className="font-bold min-w-max">{title}</div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <i className="ri-filter-2-line text-[24px]" />
                    <Input
                        icon="ri-search-line"
                        parentInputClassName="w-full sm:w-[250px]"
                        placeholder="Search Partisipan"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
            </div>

            <div
                className={`flex flex-grow  flex-col gap-2 overflow-y-auto border-[1px] p-4 rounded-md 
                    h-[400px]`}
            >
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                        <DraggableItem
                            key={item.id}
                            item={item}
                            index={idx}
                            from={columnKey}
                            iconButton={iconButton}
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
