import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";

export interface IBankSoal {
  id: string
  title: string
  desc: string
  tag: TagSoal[]
}

export interface TagSoal {
  name: string
  type: string
}

export interface IOptionItem {
  type: string;
  value: string;
  isCorrect?: boolean;
}
export interface IFormBankSoal {
  title: string
  desc: string
  tag: IDropdownItem<string>
  kategori: IDropdownItem<string>
  type: IDropdownItem<string>
  options?: IOptionItem[];
}

export interface IFormBankSoalGroup {
  title: string
  desc: string
  tag: IDropdownItem<string>
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