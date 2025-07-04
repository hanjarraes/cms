import { IUseModal } from "component/modal/modal.service";

export interface IStudent {
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


export interface IUseStudent {
  modalServiceDetails: IUseModal
  modalServiceCreate:IUseModal
  dataStudent: IStudent
  setDataStudent: (e: IStudent) => void
}