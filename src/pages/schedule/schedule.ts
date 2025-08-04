import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";

export interface ISchedule {
  title:string
  code:string
  durations:string
  testOpen:string
  testClose:string
  deadline:string
  idGroup:string
  nameGroup:string
  idQuizSoal:string
  quiz:string
  description:string
  note:string
}

export interface IFormSchedule {
  id: string
  nama: string
  email: string
  noTelepon: string
  kategori: IDropdownItem<string>
  jenisKelamin: string
}