import Button from 'component/button/button.component';
import Card from 'component/card/card.component';
import Input from 'component/input/input.component';
import { useState } from 'react';

const dummyPeriodeData = [
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000001', years: '2024', semester: 'Genap', is_active: true, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000002', years: '2024', semester: 'Ganjil', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000003', years: '2023', semester: 'Genap', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000004', years: '2023', semester: 'Ganjil', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000005', years: '2022', semester: 'Genap', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000006', years: '2022', semester: 'Ganjil', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000007', years: '2021', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000008', years: '2021', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000009', years: '2020', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000010', years: '2020', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000011', years: '2019', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000012', years: '2019', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000013', years: '2018', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000014', years: '2018', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000015', years: '2017', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000016', years: '2017', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000017', years: '2016', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000018', years: '2016', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000019', years: '2015', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000020', years: '2015', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000021', years: '2014', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000022', years: '2014', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000023', years: '2013', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000024', years: '2013', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000025', years: '2012', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000026', years: '2012', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000027', years: '2011', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000028', years: '2011', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000029', years: '2010', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000030', years: '2010', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000004', years: '2023', semester: 'Ganjil', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000005', years: '2022', semester: 'Genap', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000006', years: '2022', semester: 'Ganjil', is_active: false, is_deleted: false },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000007', years: '2021', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000008', years: '2021', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000009', years: '2020', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000010', years: '2020', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000011', years: '2019', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000012', years: '2019', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000013', years: '2018', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000014', years: '2018', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000015', years: '2017', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000016', years: '2017', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000017', years: '2016', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000018', years: '2016', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000019', years: '2015', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000020', years: '2015', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000021', years: '2014', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000022', years: '2014', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000023', years: '2013', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000024', years: '2013', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000025', years: '2012', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000026', years: '2012', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000027', years: '2011', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000028', years: '2011', semester: 'Ganjil', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000029', years: '2010', semester: 'Genap', is_active: false, is_deleted: true },
    { uuid: 'a1f2c3e4-5678-490a-bcde-000000000030', years: '2010', semester: 'Ganjil', is_active: false, is_deleted: true }
];


const StudentGroup = () => {
    const [search, setSearch] = useState('');

    const filteredQuizzes = dummyPeriodeData.filter((item) =>
        item.years.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Available Quizzes</h1>

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
                        label='Add Periode'
                        variant='default'
                        className='min-w-fit'
                        onClick={() => { }}
                    />
                </div>


                {/* Card List - Scrollable vertically */}
                <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-2 max-h-[800px] overflow-y-auto pr-2 py-4 mt-0">
                    {filteredQuizzes.map((item) => (
                        <Card key={item.uuid}>
                            <div className='flex gap-2'>
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='flex justify-between'>
                                        {item.semester}
                                        <div className={`${item.is_active ? 'bg-[--green-v1]' : 'bg-[--red-v1]'} w-fit px-2 rounded-md`}>
                                            {item.years}
                                        </div>
                                    </div>
                                    <div className='text-xs item-center'>
                                        Last Update:
                                        <span className='text-[--gray-v3]'> 20 Dec 2025</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentGroup;
