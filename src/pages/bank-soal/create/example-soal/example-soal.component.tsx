import Card from "component/card/card.component";
import Input from "component/input/input.component";
import { IUseModal } from "component/modal/modal.service";
import { dummyBankSoal } from "pages/bank-soal/bank-soal.dummy";
import { useState } from "react";

const tagColorMap: Record<string, string> = {
    Kategori: 'bg-blue-100 text-blue-800',
    Tipe: 'bg-green-100 text-green-800',
    Kesulitan: 'bg-yellow-100 text-yellow-800',
    Statistik: 'bg-gray-100 text-gray-700',
    Topik: 'bg-purple-100 text-purple-800',
    Level: 'bg-pink-100 text-pink-800',
    Sumber: 'bg-red-100 text-red-800',
};


const SoalCard = ({ item }: any) => {
    const [isScrollEnd, setIsScrollEnd] = useState(false);

    const handleTagScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
        setIsScrollEnd(isAtBottom);
    };

    return (
        <div className="p-4 border border-[--gray-v2] bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start gap-3 mb-2">
                <div className="flex-1">
                    <div className="text-lg font-bold text-[--gray-v8] flex items-center justify-between gap-2">
                        {item.title}
                        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[--success-v2] text-[--success-v7]">
                            Pilih
                        </span>
                    </div>
                    <p className="text-sm text-[--gray-v5]">{item.desc}</p>
                </div>
                <div className="flex gap-2 text-[--gray-v5]">
                    {/* <i className="ri-eye-line hover:text-[--info-v6] cursor-pointer" onClick={onPreview} />
                    <i className="ri-edit-2-line hover:text-[--info-v6] cursor-pointer" onClick={onEdit} />
                    <i className="ri-delete-bin-line hover:text-[--danger-v5] cursor-pointer" onClick={onDelete} /> */}
                </div>
            </div>

            {/* Tags */}
            <div className="relative mb-2 group">
                <div
                    className="flex flex-wrap gap-2 max-h-[110px] overflow-y-auto pr-1 scroll-smooth"
                    onScroll={handleTagScroll}
                >
                    {item.tag.map((tag: any, idxTag: number) => {
                        const colorClass = tagColorMap[tag.type] ?? 'bg-gray-100 text-[--gray-v8]';
                        return (
                            <span
                                key={idxTag + 'tag'}
                                className={`px-2 py-1 text-xs font-semibold rounded ${colorClass}`}
                            >
                                {tag.name}
                            </span>
                        );
                    })}
                </div>

                {!isScrollEnd && item.tag.length > 8 && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent text-center text-[10px] text-[--gray-v4]">
                        ...
                    </div>
                )}
            </div>

            {/* Metadata */}
            <div className="grid sm:grid-cols-2 text-xs text-[--gray-v5] gap-y-1">
                <div><span className="font-medium">Dibuat oleh:</span> Admin Utama</div>
                <div><span className="font-medium">Tanggal dibuat:</span> 2025-07-15 12:00</div>
                <div><span className="font-medium">Diperbarui oleh:</span> Dosen A</div>
                <div><span className="font-medium">Update terakhir:</span> 2025-07-30 14:00</div>
            </div>
        </div>
    );
};


const ModalExample = ({ isModal }: { isModal: IUseModal }) => {
    const [search, setSearch] = useState('');

    const filteredSchedulezes = dummyBankSoal.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="max-w-5xl  mx-auto space-y-3 border-[1px] rounded-md p-4">
                <Card>
                    <div className='flex justify-between items-center gap-2 px-2'>
                        <div className='text-[24px] font-bold'> Example </div>
                        <div className='flex justify-between items-center gap-2'>
                            <Input
                                icon='ri-search-line'
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                            <i
                                className='ri-close-large-line text-[18px] hover:text-[--danger-v5] cursor-pointer font-bold'
                                onClick={() => {
                                    isModal.closeModalHandling()
                                }} />
                        </div>
                    </div>
                </Card>

                {/* Card List - Scrollable vertically */}
                <div className="flex flex-col gap-2 h-[calc(100vh-20rem)] overflow-y-auto pr-2 mt-0 pb-4">
                    {filteredSchedulezes.map((item, idx) => (
                        <SoalCard
                            key={idx}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ModalExample;
