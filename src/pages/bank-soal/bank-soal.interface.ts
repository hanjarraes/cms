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
  kategori:string
}

export interface IUseBankSoal {
  modalServiceCreate: IUseModal
  dataBankSoal: IBankSoal | null
  isConfirm: boolean
  isDelete: boolean
  reactForm: UseFormReturn<IFormBankSoal>
  setIsDelete: (e: boolean) => void
  setIsConfirm: (e: boolean) => void
  setDataBankSoal: (e: IBankSoal | null) => void
  hendleSave: (data: IBankSoal) => void
}