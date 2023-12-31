import { SelectComponentProps } from "../types";

type Props = {
  label: string;
  slug: string;
  id?: string;
};

export default function createBaseSelectProps({
  label,
  slug,
  id,
}: Props): SelectComponentProps {
  return {
    ...(!!id && { id }),
    slug: slug || label.toLowerCase(),
    label: label.charAt(0).toUpperCase() + label.slice(1),
    options: [],
    value: null,
    loading: false,
    placeholder: `Select a ${label.toLowerCase()}`,
  };
}
