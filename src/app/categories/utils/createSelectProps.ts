import { IOptionValue, ISelectOption, SelectComponentProps } from "../types";

interface Props {
  label: string;
  slug: string;
  onChange: (value: IOptionValue, option: ISelectOption) => void;
  // optional
  value?: ISelectOption;
  // valueLabel?: string;
  options?: ISelectOption[];
  id?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
}

export default function createSelectProps({
  label,
  slug,
  onChange,
  value,
  // valueLabel = "",
  options = [],
  id,
  loading = false,
  name,
}: Props): SelectComponentProps {
  return {
    ...(!!id && { id }),
    slug: slug || label.toLowerCase(),
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value: { value: null, label: "" },
    // valueLabel,
    loading,
    options,
    name: name || label,
    placeholder: `Select a ${label.toLowerCase()}`,
    onChange: onChange,
  };
}
