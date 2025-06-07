import { useState } from "react";
import { IUseStudent } from "../student.interface";

export default function DetailsModal({
    service
}: {
    service: IUseStudent
}) {
    const tabs = ["Akademik", "Pribadi", "Kontak"]

    const { dataStudent, modalServiceDetails } = service
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
        <div className="max-w-3xl mx-auto p-4">
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
                    className="ri-close-line text-[20px] text-[--white] hover:bg-[--red-v3] cursor-pointer bg-[--blue-v4] h-fit px-1 rounded-full"
                    onClick={() => modalServiceDetails.closeModalHandling()}
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
                <div className="grid grid-cols-3">
                    <InfoItem icon="book-open-line" label="Program Studi" value={dataStudent.programStudi} />
                    <InfoItem icon="function-line" label="Konsentrasi" value={dataStudent.konsentrasi} />
                    <InfoItem icon="calendar-line" label="Periode Masuk" value={dataStudent.periodeMasuk} />
                    <InfoItem icon="file-list-3-line" label="Tahun Kurikulum" value={dataStudent.tahunKurikulum} />
                    <InfoItem icon="bank-card-line" label="No. Rekening" value={dataStudent.noRekening} />
                </div>
            )}
            {activeTab === "Pribadi" && (
                <div className="grid grid-cols-3">
                    <InfoItem icon="id-card-line" label="Jenis Kelamin" value={dataStudent.jenisKelamin} />
                    <InfoItem icon="map-pin-line" label="Tempat Lahir" value={dataStudent.tempatLahir} />
                    <InfoItem icon="calendar-2-line" label="Tanggal Lahir" value={dataStudent.tanggalLahir} />
                    <InfoItem icon="user-heart-line" label="Agama" value={dataStudent.agama} />
                    <InfoItem icon="emotion-line" label="Suku" value={dataStudent.suku} />
                    <InfoItem icon="body-scan-line" label="Tinggi / Berat Badan" value={`${dataStudent.tinggiBadan} cm / ${dataStudent.beratBadan} kg`} />
                    <InfoItem icon="drop-line" label="Golongan Darah" value={dataStudent.golonganDarah} />
                    <InfoItem icon="car-line" label="Transportasi" value={dataStudent.transportasi} />
                    <InfoItem icon="flag-line" label="Kewarganegaraan" value={dataStudent.kewarganegaraan} />
                    <InfoItem icon="heart-pulse-line" label="Status Nikah" value={dataStudent.statusNikah} />
                    <InfoItem icon="briefcase-line" label="Pekerjaan" value={dataStudent.pekerjaan} />
                    <InfoItem icon="id-card-line" label="No. KTP" value={dataStudent.ktp} />
                    <InfoItem icon="passport-line" label="No. Paspor" value={dataStudent.paspor} />
                    <InfoItem icon="contacts-line" label="No. KK" value={dataStudent.noKk} />
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