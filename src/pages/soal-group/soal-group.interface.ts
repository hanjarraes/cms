import { IDropdownItem } from "component/dropdown/dropdown.interface";
import { IUseModal } from "component/modal/modal.service";
import { UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

export interface ISoalGroup {
  title: string
  desc: string
  tag: TagSoal[]
}

export interface TagSoal {
  name: string
  type: string
}

export interface IFormSoalGroup {
  id: string
  title: string
  desc: string
  tag: string
  kategori: IDropdownItem<string>
  options?: string[]
}

export interface ISoalGroupDnd {
  title: string
  description: string
  partisipan: IFormSoalGroup[]
}

export interface IColumnData {
  id: number;
  title: string;
  items: IFormSoalGroup[];
}

export interface ISoalGroupState {
  listData: IColumnData;
  AddData: IColumnData;
}

export interface DragItem {
  item: IFormSoalGroup;
  index: number;
  from: keyof ISoalGroupState;
}


export interface IUseSoalGroup {
  nav: NavigateFunction
  dataSoalGroup: ISoalGroup | null
  isDelete: boolean
  reactForm: UseFormReturn<IFormSoalGroup>
  option: string
  setOption: (e: string) => void
  setIsDelete: (e: boolean) => void
  setDataSoalGroup: (e: ISoalGroup | null) => void
}


export interface IUseSoalGroupCreate {
  isConfirm: boolean
  reactForm: UseFormReturn<IFormSoalGroup>
  setIsConfirm: (e: boolean) => void
}