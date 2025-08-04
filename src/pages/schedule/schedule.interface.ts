import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

export interface IFormSchedule {
  id: string
}

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

export interface IUseSchedule {
  isConfirm: boolean
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>
  modalServiceCreate: IUseModal
  dataSchedule: ISchedule | null
  isDelete: boolean
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
  setDataSchedule: React.Dispatch<React.SetStateAction<ISchedule | null>>
  reactForm: UseFormReturn<IFormSchedule>
  nav: NavigateFunction
}