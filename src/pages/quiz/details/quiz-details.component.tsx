import Input from 'component/input/input.component';
import { useState } from 'react';
import Card from 'component/card/card.component';
import useQuizDetails from './quiz-details.service';

import { dummyBankSoal } from 'pages/bank-soal/bank-soal.dummy';
import { dummyPartipanData } from 'pages/partisipan-group/partisipan-group.dummy';
import { useNavigate } from 'react-router-dom';
import Modal from 'component/modal/modal.component';
import Button from 'component/button/button.component';

const QuizDetails = () => {
    const nav = useNavigate()
    const [search, setSearch] = useState('');
    const [isScrollEnd, setIsScrollEnd] = useState(false);

    const handleTagScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
        setIsScrollEnd(isAtBottom);
    };

    const filteredQuizzes = dummyBankSoal.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const [filterStatus, setFilterStatus] = useState<null | 'correct' | 'wrong' | 'unanswered'>(null); // null | 'correct' | 'wrong' | 'unanswered'

    // Contoh data partisipan
    const partisipanList = [
        { name: 'Ilham', answer: 'Jakarta', correct: true, submitTime: '2025-08-02 09:41' },
        { name: 'Rina', answer: 'Bandung', correct: false, submitTime: '2025-08-02 09:43' },
        { name: 'Joko', answer: null, correct: false, submitTime: null },
        { name: 'Ilham', answer: 'Jakarta', correct: true, submitTime: '2025-08-02 09:41' },
        { name: 'Rina', answer: 'Bandung', correct: false, submitTime: '2025-08-02 09:43' },
        { name: 'Joko', answer: null, correct: false, submitTime: null },
        { name: 'Ilham', answer: 'Jakarta', correct: true, submitTime: '2025-08-02 09:41' },
        { name: 'Rina', answer: 'Bandung', correct: false, submitTime: '2025-08-02 09:43' },
        { name: 'Joko', answer: null, correct: false, submitTime: null },
        { name: 'Ilham', answer: 'Jakarta', correct: true, submitTime: '2025-08-02 09:41' },
        { name: 'Rina', answer: 'Bandung', correct: false, submitTime: '2025-08-02 09:43' },
        { name: 'Joko', answer: null, correct: false, submitTime: null },
        { name: 'Ilham', answer: 'Jakarta', correct: true, submitTime: '2025-08-02 09:41' },
        { name: 'Rina', answer: 'Bandung', correct: false, submitTime: '2025-08-02 09:43' },
        { name: 'Joko', answer: null, correct: false, submitTime: null },

    ];

    // Filtered data
    const filteredList = partisipanList.filter((p) => {
        if (filterStatus === 'correct') return p.correct === true;
        if (filterStatus === 'wrong') return p.correct === false && p.answer;
        if (filterStatus === 'unanswered') return !p.answer;
        return true; // default (tampilkan semua)
    });

    const service = useQuizDetails()
    const {
        modalPreviewPartisipan,
        modalPreviewSoal,
    } = service

    const tagColorMap: Record<string, string> = {
        Kategori: 'bg-blue-100 text-blue-800',
        Tipe: 'bg-[--success-v1] text-[--success-v8]',
        Kesulitan: 'bg-yellow-100 text-yellow-800',
        Statistik: 'bg-gray-100 text-gray-700',
        Topik: 'bg-purple-100 text-purple-800',
        Level: 'bg-pink-100 text-pink-800',
        Sumber: 'bg-red-100 text-red-800',
    };

    const Info = ({
        label,
        value,
        hint,
    }: {
        label: string;
        value: React.ReactNode;
        hint?: string;
    }) => (
        <div>
            <span className="font-medium text-[--gray-v8]">{label}:</span>{" "}
            <span>{value}</span>
            {hint && (
                <div className="text-[10px] text-[--gray-v4] mt-[2px]">{hint}</div>
            )}
        </div>
    );


    return (
        <div className="min-h-[calc(100vh-3.2rem)] p-6 bg-gray-50 ">
            <div className="max-w-5xl mx-auto mb-6">
                <button
                    onClick={() => nav(-1)}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[--primary-v6] transition-colors"
                >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[--primary-v1] group-hover:bg-[--primary-v2] transition">
                        <i className="ri-arrow-left-line text-[--primary-v6] group-hover:text-[--primary-v7] text-lg" />
                    </div>
                    <span className="group-hover:underline">Kembali ke Daftar Jadwal</span>
                </button>
            </div>
            <div className="max-w-5xl  mx-auto space-y-3">
                {/* Card List - Scrollable vertically */}
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 h-[calc(100vh-10rem)] overflow-y-auto pr-2 mt-0'>
                    <div className='flex flex-col gap-2'>
                        <Card>
                            <div className='flex justify-between items-center gap-2 px-2'>
                                <div className='text-[24px] font-bold'>Matematika Dasar </div>
                                <div className='flex justify-between gap-2'>
                                    <Input
                                        icon='ri-search-line'
                                        placeholder='Search'
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                                </div>
                            </div>
                        </Card>
                        <div className="grid grid-cols-1 gap-2 h-[calc(100vh-14.5rem)] overflow-y-auto mt-0">
                            {filteredQuizzes.map((item, idx) => (
                                <Card
                                    key={item.id}
                                    className="p-4 rounded-2xl border border-[--gray-v2] transition-shadow duration-300 cursor-pointer"
                                    animated
                                    onClick={() => {
                                        modalPreviewSoal.openModalHandling()
                                    }}
                                >
                                    <div className="flex flex-col gap-4">
                                        {/* Header */}
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-xl font-semibold text-[--gray-v10]">{item.title}</h2>
                                            <p className="text-sm text-[--gray-v6]">{item.desc}</p>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-dashed border-[--gray-v3]"></div>

                                        {/* Metadata */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 text-sm text-[--gray-v8]">
                                            <div className="flex items-center gap-1">
                                                <i className="ri-list-check mr-1 text-[--primary-v5]" />
                                                <span className="font-medium">Tipe:</span> Pilihan Ganda
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <i className="ri-bar-chart-2-line mr-1 text-[--warning-v5]" />
                                                <span className="font-medium">Kesulitan:</span> Mudah
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <i className="ri-time-line mr-1 text-[--info-v5]" />
                                                <span className="font-medium">Waktu:</span> 45 detik
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                            ))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <Card
                                key={1}
                            >
                                <div className="flex flex-col h-[calc(100vh-11.5rem)]">
                                    <div className='flex justify-between items-center gap-2 px-2 mb-4'>
                                        <div className='text-[24px] font-bold'>Partisipan </div>
                                        <div className='flex justify-between gap-2'>
                                            <Input
                                                icon='ri-search-line'
                                                placeholder='Search'
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <i className='ri-filter-2-line text-[24px] hover:text-[--info-v5]' onClick={() => { }} />
                                        </div>
                                    </div>

                                    <div className="flex-grow overflow-y-auto flex flex-col gap-2 px-2 py-2 bg-gray-50 rounded-lg border">
                                        {dummyPartipanData.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-4 bg-white shadow-sm rounded-xl p-4 border hover:shadow-md transition-shadow cursor-pointer hover:bg-[--info-v1]"
                                                onClick={() => modalPreviewPartisipan.openModalHandling()}
                                            >
                                                {/* Icon/avatar */}
                                                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-[--info-v6] rounded-full border">
                                                    <i className="ri-user-line text-xl" />
                                                </div>

                                                {/* Name & Email */}
                                                <div className="flex-1 flex flex-col">
                                                    <span className="text-sm font-medium text-gray-800">{item.nama}</span>
                                                    <span className="text-xs text-gray-500">{item.id}</span>
                                                    {/* Optional info like email or role */}
                                                    {item.email && (
                                                        <span className="text-xs text-gray-400 italic">{item.email}</span>
                                                    )}
                                                </div>

                                                {/* Badge Score */}
                                                <div className="text-xs font-medium bg-[--info-v6] text-white px-2 py-1 rounded-full">
                                                    90
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </Card>
                        </div>
                    </div>
                    <Modal
                        onClose={() => modalPreviewPartisipan.closeModalHandling()}
                        closeOnOutsideClick
                        isModalOpen={modalPreviewPartisipan.isModalOpen}
                        className="!w-3/3 max-w-[90vw] px-0 h-auto max-h-[90vh] overflow-y-auto"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-full">
                            {/* Kiri: Info Partisipan */}
                            <div className="space-y-6 relative">
                                {/* Header + Export */}
                                <div className="flex justify-between items-center border-b pb-3">
                                    <div>
                                        <h2 className="text-xl font-bold text-[--gray-v8]">Informasi Partisipan</h2>
                                        <p className="text-sm text-[--gray-v5]">Detail peserta, aktivitas ujian, dan monitoring sistem</p>
                                    </div>
                                    <i className="ri-file-excel-2-line bg-[--success-v1] text-[--success-v6] rounded-md px-2 py-1 cursor-pointer text-[24px] hover:bg-[--success-v2] " />
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Card 1 - Data Partisipan */}
                                    <div className="border rounded-xl p-5 shadow-sm bg-white">
                                        <h3 className="text-lg font-semibold text-[--gray-v8] mb-4 border-b pb-2">🧑 Data Peserta & Ujian</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[--gray-v6]">
                                            <Info label="Nama" value="Muhammad Ilham" />
                                            <Info label="Email" value="ilham@example.com" />
                                            <Info label="ID Peserta" value="UJIAN-00123" />
                                            <Info label="Tanggal Template" value="2025-08-02 09:30" />
                                            <Info label="Waktu Submit" value="2025-08-02 10:05" />
                                            <Info label="Durasi" value="35 menit" />
                                            <Info label="Kategori Template" value="Simulasi CBT 1" />
                                            <Info label="Jumlah Soal" value="40 soal" />
                                            <Info label="Nilai Minimal" value="75" />
                                            <Info label="Skor Akhir" value="85 / 100" />
                                            <div className="col-span-full">
                                                <span className="font-medium text-[--gray-v8]">Status:</span>
                                                <span className="ml-2 inline-block px-2 py-[2px] text-xs bg-[--success-v2] text-[--success-v7] rounded-full">Lulus</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2 - Aktivitas & Monitoring */}
                                    <div className="border rounded-xl p-5 shadow-sm bg-white">
                                        <h3 className="text-lg font-semibold text-[--gray-v8] mb-4 border-b pb-2">🖥️ Aktivitas & Monitoring</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[--gray-v6]">
                                            <Info label="Mouse keluar halaman" value="3 kali" />
                                            <Info label="Keluar dari kamera" value="1 kali" />
                                            <Info label="Rata-rata waktu per soal" value="52 detik" />
                                            <Info label="Tab Switching / Minimize" value="4 kali" />
                                            <Info label="Idle > 1 menit" value="2 kali" />
                                            <Info label="Copy-Paste / Klik Kanan" value="1 kali" />
                                            <Info label="Multiple Monitor Terdeteksi" value="Tidak" />
                                            <Info label="Browser / OS" value="Chrome 138 / macOS 14" />
                                            <Info label="Koneksi Terputus" value="1x (Reconnect 3 detik)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Kanan: Daftar Jawaban */}
                            <div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <div>
                                        <h2 className="text-xl font-bold text-[--gray-v8]">Informasi Soal</h2>
                                        <p className="text-sm text-[--gray-v5]">Detail Seluruh Soal yang sudah di kerjakan</p>
                                    </div>
                                </div>
                                <div className="space-y-5 bg-[--gray-v1] rounded-md p-6 mt-6 h-[600px] overflow-y-scroll">
                                    {[...Array(22)].map((_, i) => (
                                        <div key={i} className="p-4 bg-white border rounded-md shadow-sm space-y-3">
                                            {/* Soal */}
                                            <div className="text-sm text-[--gray-v7] font-medium">
                                                <span className="text-[--primary-v6] font-bold">Soal {i + 1}:</span>
                                                <div className="mt-1 text-[--gray-v7]">Apa ibu kota Indonesia?</div>
                                            </div>

                                            {/* Jawaban Benar */}
                                            <div className="text-xs text-[--success-v7] bg-green-[--success-v1] px-2 py-1 rounded inline-block">
                                                Jawaban Benar: <strong>Jakarta</strong>
                                            </div>

                                            {/* Jawaban Partisipan */}
                                            <div className="mt-2">
                                                <div className='flex items-center gap-2 mb-5'>
                                                    <div className="text-xs text-[--gray-v6]">Jawaban Partisipan:</div>
                                                    {/* Type: options */}
                                                    <div className="flex items-center gap-2">
                                                        <div className={`px-3 py-1 text-sm rounded-full font-medium ${true ? 'bg-[--success-v1] text-[--success-v8]' : 'bg-red-100 text-[--danger-v8]'}`}
                                                        >
                                                            Jakarta
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Jakarta', 'Surabaya', 'Malang', 'Sumatra Barat'].map((opt, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`px-2 py-1 text-xs rounded-full border 
                                                            ${opt === 'Jakarta' ? 'bg-[--success-v1] border-[--sucess-v3] text-[--success-v7]' : 'bg-gray-100 border-gray-300 text-gray-600'}`}
                                                        >
                                                            {opt}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Type: text */}
                                                {/* <div className="bg-gray-50 border rounded px-3 py-2 text-sm text-[--gray-v8]">
                                                jakarta
                                            </div> */}

                                                {/* Type: file */}
                                                {/* <div>
                                                <a
                                                    href="/uploads/jawaban123.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 text-sm underline"
                                                >
                                                    Lihat File Jawaban
                                                </a>
                                            </div> */}

                                                {/* Type: code */}
                                                {/* <pre className="bg-gray-900 text-white text-sm p-3 rounded overflow-auto">
                                                {`function helloWorld() {
                                                    console.log("Hello, world!");
                                                    }`}
                                            </pre> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end p-2 border-t mt-2'>
                            <Button
                                label='Close'
                                variant='default'
                                useUpperCase
                                className=''
                                onClick={() => {
                                    modalPreviewPartisipan.closeModalHandling()
                                }} />
                        </div>
                    </Modal>
                    <Modal
                        onClose={() => modalPreviewSoal.closeModalHandling()}
                        closeOnOutsideClick
                        isModalOpen={modalPreviewSoal.isModalOpen}
                        className="!w-3/3 max-w-[90vw] px-0 h-auto max-h-[90vh] overflow-y-auto"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-full">
                            {/* Kiri: Info Partisipan */}
                            <div className="space-y-6">
                                {/* Header */}
                                <div>
                                    <h2 className="text-2xl font-bold text-[--gray-v8]">📘 Informasi Soal</h2>
                                    <p className="text-sm text-[--gray-v5]">Detail soal, kunci jawaban, dan statistik performa partisipan</p>
                                </div>

                                {/* Card */}
                                <div className="rounded-xl shadow-md border bg-white p-6 space-y-6">
                                    {/* Metadata */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[--gray-v7]">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-list-check text-[--gray-v5]" />
                                            <span><strong className="text-[--gray-v8]">Tipe Soal:</strong> Pilihan Ganda</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="ri-signal-wifi-fill text-[--gray-v5]" />
                                            <span><strong className="text-[--gray-v8]">Kesulitan:</strong> Mudah</span>
                                        </div>
                                        <div className="flex items-center gap-2 col-span-full">
                                            <i className="ri-time-line text-[--gray-v5]" />
                                            <span><strong className="text-[--gray-v8]">Waktu Rata-rata:</strong> 45 detik</span>
                                        </div>
                                    </div>

                                    {/* Pertanyaan */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-[--gray-v8] mb-1">📝 Pertanyaan:</h3>
                                        <div className="bg-[--gray-v1] p-3 rounded-md text-[--gray-v7] text-sm">
                                            Apa ibu kota Indonesia?
                                        </div>
                                    </div>

                                    {/* Opsi Jawaban */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-[--gray-v8] mb-1">🎯 Opsi Jawaban:</h3>
                                        <ul className="grid grid-cols-2 gap-2 text-sm">
                                            {['Jakarta', 'Bandung', 'Surabaya', 'Medan'].map((opt, idx) => (
                                                <li key={idx} className="bg-[--gray-v1] px-3 py-1.5 rounded-md">{opt}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Jawaban Benar */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-[--gray-v8] mb-1">✅ Jawaban Benar:</h3>
                                        <span className="inline-block px-3 py-1 rounded-md bg-[--success-v1] text-[--success-v7] font-medium text-sm">
                                            Jakarta
                                        </span>
                                    </div>

                                    {/* Statistik & Filter */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-[--gray-v8] mb-2">📊 Statistik Jawaban:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { key: 'correct', label: 'Jawaban Benar', total: 12, color: 'success' },
                                                { key: 'wrong', label: 'Jawaban Salah', total: 5, color: 'danger' },
                                                { key: 'unanswered', label: 'Tidak Menjawab', total: 3, color: 'gray' },
                                            ].map(({ key, label, total, color }) => (
                                                <button
                                                    key={key}
                                                    onClick={() => setFilterStatus(key as 'correct' | 'wrong' | 'unanswered')}
                                                    className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center gap-1 transition-all duration-200
                ${filterStatus === key
                                                            ? `bg-[--${color}-v1] border-[--${color}-v3] text-[--${color}-v7]`
                                                            : 'bg-white border-[--gray-v3] text-[--gray-v6] hover:bg-[--gray-v1]'}`}
                                                >
                                                    <i className={`ri-checkbox-circle-fill text-[--${color}-v5]`} />
                                                    {label} ({total})
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => setFilterStatus(null)}
                                                className="text-xs px-3 py-1 rounded-full bg-white border border-[--gray-v3] text-[--gray-v6] hover:bg-[--gray-v1]"
                                            >
                                                Tampilkan Semua
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* Kanan: Daftar Jawaban */}
                            <div className="space-y-4 bg-[--gray-v1] rounded-md p-4 h-[600px] overflow-y-scroll mt-4">
                                {filteredList.map((p, i) => (
                                    <div key={i} className="bg-white p-4 rounded border shadow-sm text-sm text-[--gray-v7]">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="font-semibold text-[--gray-v8]">{p.name}</div>
                                            <div className={`text-xs px-2 py-[2px] rounded-full 
          ${!p.answer ? 'bg-[--gray-v3] text-[--gray-v7]'
                                                    : p.correct ? 'bg-[--success-v1] text-[--success-v7]'
                                                        : 'bg-[--danger-v1] text-[--danger-v7]'}`}>
                                                {!p.answer ? 'Tidak Menjawab' : p.correct ? 'Benar' : 'Salah'}
                                            </div>
                                        </div>
                                        {p.answer && (
                                            <div>
                                                <span className="font-medium">Jawaban:</span> {p.answer}
                                            </div>
                                        )}
                                        <div>
                                            <span className="font-medium">Submit:</span> {p.submitTime ?? '-'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className='flex justify-end p-2 border-t mt-2'>
                            <Button
                                label='Close'
                                variant='default'
                                useUpperCase
                                className=''
                                onClick={() => {
                                    modalPreviewSoal.closeModalHandling()
                                }} />
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default QuizDetails;