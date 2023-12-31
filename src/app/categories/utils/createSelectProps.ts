import { IOptionValue, ISelectOption } from "../types";

interface Props {
  label: string;
  slug: string;
  onChange: (value: IOptionValue, option: ISelectOption) => void;
  // optional
  value?: IOptionValue;
  options?: ISelectOption[];
  id?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
}

export default function createSelectProps({
  label,
  slug,
  id,
  options,
  onChange,
}: Props) {
  return {
    ...(!!id && { id }),
    slug: slug || label.toLowerCase(),
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value: null,
    loading: false,
    options: options || [],
    placeholder: `Select a ${label.toLowerCase()}`,
    onChange: onChange,
  };
}
