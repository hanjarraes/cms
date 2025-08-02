import Card from "component/card/card.component";
import Input from "component/input/input.component";
import { IUseModal } from "component/modal/modal.service";
import { dummyBankSoal } from "pages/bank-soal/bank-soal.dummy";
import { useState } from "react";


const ModalExample = ({ isModal }: { isModal: IUseModal }) => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummyBankSoal.filter((item) =>
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
                    {filteredQuizzes.map((item, idx) => (
                        <Card
                            key={idx}

                        >
                            <div className="flex justify-between items-start gap-5">
                                <div className='bg-animasi h-full flex justify-center rounded-md px-5'>
                                    <i className="ri-questionnaire-fill text-[55px]" />
                                </div>
                                <div className='flex w-full items-start'>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                        <div className='flex gap-2 mt-3 max-w-full overflow-x-auto'>
                                            {item.tag.map((tag, idxTag) => {
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
                                                        key={idxTag + 'idTag'}
                                                        className={`px-2 py-1 text-xs rounded-md font-bold min-w-fit  ${colorClass}`}
                                                    >
                                                        {tag.name}
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col h-[80px] justify-between'>
                                    <div className='text-[24px] flex gap-2'>
                                        {/* <i className="ri-delete-bin-line hover:text-[--danger-v5]" onClick={() => setIsDelete(true)} />
                                        <i className="ri-edit-2-line  hover:text-[--info-v5]" onClick={() => {
                                            setDataBankSoal(item)
                                        }} /> */}
                                        <div className='text-[14px] font-bold bg-[--success-v2] text-[--success-v7] hover:bg-[--success-v3]  flex items-center px-4 rounded-md cursor-pointer'>
                                            Pilih
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">Last Update: 12:00 PM </p>
                                </div>

                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ModalExample;
