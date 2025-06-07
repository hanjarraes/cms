import Button from 'component/button/button.component';
import Input from 'component/input/input.component';
import { useState } from 'react';
import { students } from './student.dummy';
import Card from 'component/card/card.component';
import useStudent from './student.service';
import Modal from 'component/modal/modal.component';
import DetailsModal from './details/details.component';
import CreateModal from './Create/create.component';

const Student = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = students.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
    );
    const service = useStudent()
    const {
        modalServiceDetails,
        modalServiceCreate,
        setDataStudent
    } = service

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Student</h1>

                <div className='flex justify-between gap-2'>
                    <Input
                        icon='ri-search-line'
                        placeholder='Search'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        icon='ri-filter-2-line'
                        variant='default'
                        className='w-[50px]'
                        onClick={() => { }}
                    />
                    <Button
                        label='Add Create'
                        variant='default'
                        className='min-w-fit'
                        onClick={() => { modalServiceCreate.openModalHandling()}}
                    />
                </div>


                {/* Card List - Scrollable vertically */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[800px] overflow-y-auto pr-2 py-4 mt-0">
                    {filteredQuizzes.map((item, idx) => (
                        <Card
                            key={idx}
                            className="p-4 h-[250px]"
                            onClick={() => {
                                setDataStudent(item)
                                modalServiceDetails.openModalHandling()
                            }}
                        >
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <img
                                        src={item.foto}
                                        alt={item.nama}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-[--blue-v6] shadow-sm"
                                    />
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-[--green-v3] border-2 border-white rounded-full" />
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-800">{item.nama}</h2>
                                    <p className="text-sm text-gray-500">{item.nim}</p>
                                    <span className="inline-block mt-1 bg-[--green-v1] text-[--green-v4] text-xs font-semibold px-2 py-1 rounded-full">
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 space-y-2 text-sm text-gray-700">
                                <p><i className='ri-graduation-cap-line mr-2 text-[20px]' />{item.programStudi} - {item.konsentrasi}</p>
                                <p><i className='ri-mail-line mr-2 text-[20px]' />{item.emailKampus}</p>
                                <p><i className='ri-phone-line mr-2 text-[20px]' />{item.noTelepon}</p>
                                <p className="text-xs text-gray-400">Masuk: {item.periodeMasuk}</p>
                            </div>
                        </Card>
                    ))}
                    <Modal isModalOpen={modalServiceDetails.isModalOpen} className="!w-1/3  px-0" >
                        <DetailsModal service={service} />
                    </Modal>
                    <Modal isModalOpen={modalServiceCreate.isModalOpen} className="!w-1/3  px-0" >
                        <CreateModal service={service} />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Student;
