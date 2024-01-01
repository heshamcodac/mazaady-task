import { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

// option types
export type IOptionValue = string | null;
export interface ISelectOption
  extends Omit<DefaultOptionType, "children" | "parent" | "child"> {
  // valueLabel?: string;
  [key: string]: unknown;
}

// Select types
export interface SelectComponentProps {
  slug: string;
  label: string;
  value: any;
  // valueLabel: string;
  options: ISelectOption[] | any;
  id?: string;
  loading?: boolean;
  onChange?: (value: IOptionValue, option: ISelectOption) => void;
  name?: string;
  placeholder?: string;
}

export type BaseSelectData = {
  id: string;
  name: string;
  slug: string;
};

export type CategorySelectData = BaseSelectData & {
  children: CategorySelectData[];
  [key: string]: any;
};
export type CategoryChildrenSelectData = BaseSelectData & {
  options: ISelectOption[];
  [key: string]: any;
};
