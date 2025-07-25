import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";

export interface IBankSoal {
  title: string
  desc: string
  tag: TagSoal[]
}

export interface TagSoal {
  name: string
  type: string
}

export interface IFormBankSoal {
  title: string
  desc: string
  tag: string
  kategori: IDropdownItem<string>
  options?: string[]
}

export interface IUseBankSoal {
  modalServiceCreate: IUseModal
  dataBankSoal: IBankSoal | null
  isConfirm: boolean
  isDelete: boolean
  reactForm: UseFormReturn<IFormBankSoal>
  option: string
  setOption: (e: string) => void
  setIsDelete: (e: boolean) => void
  setIsConfirm: (e: boolean) => void
  setDataBankSoal: (e: IBankSoal | null) => void
  hendleSave: (data: IBankSoal) => void


}