import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";

export interface IPartisipan {
  nim: string;
  nama: string;
  foto: string;
  programStudi: string;
  konsentrasi: string;
  periodeMasuk: string;
  tahunKurikulum: number;
  status: 'Aktif' | 'Cuti' | 'Lulus' | 'Drop Out';
  noTelepon: string;
  emailPribadi: string;
  emailKampus: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string; // ISO date
  agama: string;
  suku: string;
  beratBadan: number;
  tinggiBadan: number;
  golonganDarah: 'A' | 'B' | 'AB' | 'O';
  transportasi: string;
  kewarganegaraan: string;
  ktp: string;
  paspor: string;
  noKk: string;
  statusNikah: 'Belum Menikah' | 'Menikah' | 'Cerai';
  pekerjaan: string;
  noRekening: string;
}

export interface IFormPartisipan {
  id: string
  nama: string
  email: string
  noTelepon: string
  kategori: string
  jenisKelamin: string
}

export interface IUsePartisipan {
  modalServiceCreate: IUseModal
  dataPartisipan: IPartisipan | null
  isConfirm: boolean
  isDelete: boolean
  reactForm: UseFormReturn<IFormPartisipan>
  setIsDelete: (e: boolean) => void
  setIsConfirm: (e: boolean) => void
  setDataPartisipan: (e: IPartisipan | null) => void
  hendleSave: (data: IPartisipan) => void
}