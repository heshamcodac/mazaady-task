export type TypographyProps = {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "li"
    | "label"
    | "span"
    | "small"
    | "code";
  className?: string;
  capitalizeFirstLetter?: boolean;
  children: React.ReactNode;
};
