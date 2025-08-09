import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";

export interface IStaff {
  uuid: string
  name: string
  email: string
  phone_number:string
  gander:string
  is_active:boolean
  user_type:string
  profile_picture:string
}

export interface IFormStaff {
  nama: string
  email: string
  noTelepon: string
  jenisKelamin: string
  profile_picture:string
}

export interface IUseStaff {
  modalServiceCreate: IUseModal
  dataStaff: IStaff | null
  isConfirm: boolean
  isDelete: boolean
  reactForm: UseFormReturn<IFormStaff>
  setIsDelete: (e: boolean) => void
  setIsConfirm: (e: boolean) => void
  setDataStaff: (e: IStaff | null) => void
}