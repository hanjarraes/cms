import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

export interface IFormQuiz {
  id: string
}

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
  template:string
  description:string
  note:string
}

export interface IUseQuiz {
  isConfirm: boolean
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>
  modalServiceCreate: IUseModal
  dataQuiz: IQuiz | null
  isDelete: boolean
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
  setDataQuiz: React.Dispatch<React.SetStateAction<IQuiz | null>>
  reactForm: UseFormReturn<IFormQuiz>
  nav: NavigateFunction
}