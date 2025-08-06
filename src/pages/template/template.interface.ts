import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { IBankSoal, IOptionItem } from "pages/bank-soal/bank-soal.interface";
import { UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

export interface ITemplateSoal {
  title: string
  desc: string
  tag: TagSoal[]
}

export interface TagSoal {
  name: string
  type: string
}

export interface IFormTemplateSoal {
  id: string
  title: string
  desc: string
  tag: IDropdownItem<string>
}
export interface IFormTemplateSoalNonId {
  title: string
  desc: string
  tag: IDropdownItem<string>
}

export interface ITemplateSoalDnd {
  title: string
  description: string
  partisipan: IFormTemplateSoal[]
}

export interface IColumnData {
  id: number;
  title: string;
  items: IBankSoal[];
}

export interface ITemplateSoalState {
  listData: IColumnData;
  AddData: IColumnData;
}

export interface DragItem {
  item: IFormTemplateSoal;
  index: number;
  from: keyof ITemplateSoalState;
}


export interface IUseTemplateSoalCreate {
  isConfirm: boolean
  reactForm: UseFormReturn<IFormTemplateSoal>
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
