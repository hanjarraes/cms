import Button from "component/button/button.component";
import CheckBox from "component/checkbox/checkbox.component";
import Empty from "component/empty/empty.component";
import Input from "component/input/input.component";
import Modal from "component/modal/modal.component";
import { useModal } from "component/modal/modal.service";
import Tooltip from "component/tooltip/tooltip.component";
import { IBankSoal } from "pages/bank-soal/bank-soal.interface";
import { dummyOptionsSoal, dummyCheckboxSoal, dummyTextSoal, dummyFileSoal, dummyCodeSoal } from "pages/template/template.dummy";
import { DragItem, ITemplateSoalState } from "pages/template/template.interface";
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
    from: keyof ITemplateSoalState;
    onToggleItem: (item: IBankSoal, from: keyof ITemplateSoalState) => void;
}) => {
    const modalPreview = useModal()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.soal,
        item: { item, index, from },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // dummyOptionsSoal, dummyCheckboxSoal, dummyTextSoal, dummyFileSoal, dummyCodeSoal
    const previewSoal = dummyOptionsSoal

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
                                Tipe: 'bg-green-100 text-[--success-v7]',
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
                className="!w-2/3 max-w-[90vw] px-0 h-auto max-h-[90vh] overflow-y-auto"
            >
                <div className="space-y-4">
                    <div className='flex justify-between border-b px-4 py-3 bg-animasi'>
                        <div className='text-[18px] font-bold'>    Preview Soal</div>
                        <i
                            className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                            onClick={() => {
                                modalPreview.closeModalHandling();
                            }}
                        />
                    </div>
                    <div className="px-6 space-y-4 pb-5">
                        <div>
                            <h2 className="text-lg font-bold text-[--gray-v8]">{previewSoal?.title}</h2>
                            <p className="text-sm text-[--gray-v5]">{previewSoal?.desc}</p>
                        </div>

                        {/* Tag */}
                        <div className="flex flex-wrap gap-2 text-xs">
                            <span className="bg-blue-100 text-[--info-800] px-2 py-1 rounded-full">
                                Tag: {previewSoal?.tag?.label}
                            </span>
                            <span className="bg-green-100 text-[--success-v7] px-2 py-1 rounded-full">
                                Kategori: {previewSoal?.kategori?.label}
                            </span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                Tipe: {previewSoal?.type?.label}
                            </span>
                        </div>

                        {/* Soal (dari editor HTML) */}
                        <div className="prose max-w-full bg-gray-50 p-4 rounded-md border">
                            <div dangerouslySetInnerHTML={{ __html: previewSoal?.soal ?? '' }} />
                        </div>

                        {/* Opsi Jawaban */}
                        {['options', 'checkbox'].includes(String(previewSoal?.type?.value)) && (
                            <div className="space-y-2 mt-4">
                                <div className="flex flex-col gap-2 mt-2">
                                    {previewSoal?.options?.map((option, idx) => (
                                        <CheckBox
                                            key={idx}
                                            type={previewSoal.type.value as 'options' | 'checkbox'}
                                            label={option.value}
                                            checked={option.isCorrect ?? false}
                                            onChange={() => { }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tipe Jawaban Lain */}
                        {['text', 'file', 'code'].includes(String(previewSoal?.type?.value)) && (
                            <div className="mt-4 text-sm text-[--gray-v6] italic">
                                Tipe soal ini menggunakan jawaban berbentuk{' '}
                                <strong>{previewSoal?.type?.label}</strong>. Preview jawaban tidak tersedia.
                            </div>
                        )}
                    </div>

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
    columnKey: keyof ITemplateSoalState;
    onToggleItem: (item: IBankSoal, from: keyof ITemplateSoalState) => void;
    onDropHandler: (
        draggedItem: DragItem,
        toColumnKey: keyof ITemplateSoalState
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
