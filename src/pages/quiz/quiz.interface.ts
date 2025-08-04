import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { IBankSoal, IOptionItem } from "pages/bank-soal/bank-soal.interface";
import { UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

export interface IQuizSoal {
  title: string
  desc: string
  tag: TagSoal[]
}

export interface TagSoal {
  name: string
  type: string
}

export interface IFormQuizSoal {
  id: string
  title: string
  desc: string
  tag: IDropdownItem<string>
}
export interface IFormQuizSoalNonId {
  title: string
  desc: string
  tag: IDropdownItem<string>
}

export interface IQuizSoalDnd {
  title: string
  description: string
  partisipan: IFormQuizSoal[]
}

export interface IColumnData {
  id: number;
  title: string;
  items: IBankSoal[];
}

export interface IQuizSoalState {
  listData: IColumnData;
  AddData: IColumnData;
}

export interface DragItem {
  item: IFormQuizSoal;
  index: number;
  from: keyof IQuizSoalState;
}


export interface IUseQuizSoalCreate {
  isConfirm: boolean
  reactForm: UseFormReturn<IFormQuizSoal>
  setIsConfirm: (e: boolean) => void
}


export interface IPreviewSoal {
  title: string
  desc: string
  tag: IDropdownItem<string>
  kategori: IDropdownItem<string>
  type: IDropdownItem<string>
  options?: IOptionItem[];
  soal:string
}
