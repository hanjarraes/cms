import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";

export interface IQuiz {
  title:string
  code:string
  durations:string
  testOpen:string
  testClose:string
  deadline:string
  idGroup:string
  nameGroup:string
  idTemplateSoal:string
  templateSoal:string
  description:string
  note:string
}

export interface IFormQuiz {
  id: string
  nama: string
  email: string
  noTelepon: string
  kategori: IDropdownItem<string>
  jenisKelamin: string
}