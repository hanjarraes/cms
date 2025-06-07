import { useState } from "react";
import { IUseStudent } from "../student.interface";
import Input from "component/input/input.component";
import Button from "component/button/button.component";

export default function CreateModal({
    service
}: {
    service: IUseStudent
}) {
    const tabs = ["Akademik", "Pribadi", "Kontak"]

    const { dataStudent, modalServiceCreate } = service
    const [activeTab, setActiveTab] = useState("Akademik")

    const InfoItem = ({ icon, label, value }: { icon: string, label: string, value?: string | number }) => (
        <div className="flex gap-2 items-start py-2">
            <i className={`ri-${icon} text-lg text-blue-600 shrink-0`} />
            <div className="flex-1">
                <div className="text-sm text-gray-500">{label}</div>
                <div className="font-medium text-gray-800">{value || "-"}</div>
            </div>
        </div>
    )

    return (
        <div className="max-w-3xl mx-auto px-4 pt-5 pb-3">
            {/* Header */}
            <div className="flex justify-between">
                <div className="flex gap-4 items-center mb-4">
                    <img src={dataStudent.foto} alt="Foto" className="w-20 h-20 rounded-full object-cover" />
                    <div>
                        <h2 className="text-xl font-semibold">{dataStudent.nama}</h2>
                        <p className="text-sm text-gray-600">{dataStudent.nim} • {dataStudent.programStudi}</p>
                        <span className="text-sm inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 mt-1">{dataStudent.status}</span>
                    </div>
                </div>
                <i
                    className="ri-close-line text-[20px]  hover:text-[--red-v3] cursor-pointer text-[--gary-v4] h-fit px-1 rounded-full"
                    onClick={() => modalServiceCreate.closeModalHandling()}
                />
            </div>


            {/* Tabs */}
            <div className="flex border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium border-b-2 transition ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-500"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}

            {activeTab === "Akademik" && (
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-3">
                        <Input
                            label="Program Studi"
                            placeholder="Enter Program Studi"
                        />
                        <Input
                            label="Konsentrasi"
                            placeholder="Enter Konsentrasi"
                        />
                        <Input
                            label="Periode Masuk"
                            placeholder="Enter Periode Masuk"
                        />
                        <Input
                            label="Tahun Kurikulum"
                            placeholder="Enter Tahun Kurikulum"
                        />
                        <Input
                            label="No. Rekening"
                            placeholder="Enter No. Rekening"
                        />
                        <Input
                            label="Konsentrasi"
                            placeholder="Enter Konsentrasi"
                        />
                    </div>
                    <div className="border-t pt-2 flex justify-end">
                        <Button
                            label='Save'
                            variant='primary'
                            className='min-w-[100px]'
                            onClick={() => { }}
                        />
                    </div>
                </div>

            )}
            {activeTab === "Pribadi" && (
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-3">
                        <Input
                            label="Jenis Kelami"
                            placeholder="Enter Jenis Kelami"
                        />
                        <Input
                            label="Tempat Lahir"
                            placeholder="Enter Tempat Lahir"
                        />
                        <Input
                            label="Tanggal Lahir"
                            placeholder="Enter Tanggal Lahir"
                        />
                        <Input
                            label="Agama"
                            placeholder="Enter Agama"
                        />
                        <Input
                            label="Suku"
                            placeholder="Enter Suku"
                        />
                        <Input
                            label="Tinggi / Berat Badan"
                            placeholder="Enter Tinggi / Berat Badan"
                        />
                         <Input
                            label="Golongan Darah"
                            placeholder="Enter Golongan Darah"
                        />
                         <Input
                            label="Transportasi"
                            placeholder="Enter Transportasi"
                        />
                         <Input
                            label="Kewarganegaraan"
                            placeholder="Enter Kewarganegaraan"
                        />
                         <Input
                            label="Status Nikah"
                            placeholder="Enter Status Nikah"
                        />
                         <Input
                            label="Pekerjaan"
                            placeholder="Enter Pekerjaan"
                        />
                         <Input
                            label="No. KTP"
                            placeholder="Enter No. KTP"
                        />
                         <Input
                            label="No. Paspor"
                            placeholder="Enter No. Paspor"
                        />
                         <Input
                            label="No. KK"
                            placeholder="Enter No. KK"
                        />
                    </div>
                    <div className="border-t pt-2 flex justify-end">
                        <Button
                            label='Save'
                            variant='primary'
                            className='min-w-[100px]'
                            onClick={() => { }}
                        />
                    </div>
                </div>
            )}
            {activeTab === "Kontak" && (
                <div className="grid grid-cols-2">
                    <InfoItem icon="phone-line" label="No. Telepon" value={dataStudent.noTelepon} />
                    <InfoItem icon="mail-line" label="Email Pribadi" value={dataStudent.emailPribadi} />
                    <InfoItem icon="mail-open-line" label="Email Kampus" value={dataStudent.emailKampus} />
                </div>
            )}
        </div>
    );
}