import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";

export interface IPartisipanGroup {
  title: string
  description: string
  partisipan: IPartisipan[]
}

export interface IPartisipan {
  id: string
  nama: string
  email: string
  noTelepon: string
  kategori: string
  jenisKelamin: string
}

export interface IFormPartisipanGroup {
  title: string
  desc: string
}


export interface IColumnData {
  id: number;
  title: string;
  items: IPartisipan[];
}

export interface IPartisipanGroupState {
  listData: IColumnData;
  AddData: IColumnData;
}

export interface DragItem {
  item: IPartisipan;
  index: number;
  from: keyof IPartisipanGroupState;
}


export interface IUsePartisipanGroup {
  modalServiceCreate: IUseModal
  dataPartisipanGroup: IPartisipanGroup | null
  isConfirm: boolean
  isDelete: boolean
  reactForm: UseFormReturn<IFormPartisipanGroup>
  setIsDelete: (e: boolean) => void
  setIsConfirm: (e: boolean) => void
  setDataPartisipanGroup: (e: IPartisipanGroup | null) => void
  hendleSave: (data: IPartisipanGroup) => void
}