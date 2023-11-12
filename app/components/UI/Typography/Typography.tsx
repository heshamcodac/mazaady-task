import React from "react";
import { TypographyProps } from "./Typography.types";

// use tailwind/custom classes to add color, size or any other properties.
const Typography: React.FC<TypographyProps> = ({
  as: Component = "p",
  className,
  capitalizeFirstLetter = true,
  children,
  ...props
}) => {
  // Capitalize the first letter if capitalizeFirstLetter is true
  const transformChildren = capitalizeFirstLetter
    ? React.Children.map(children, (child) =>
        typeof child === "string"
          ? child.charAt(0).toUpperCase() + child.slice(1)
          : child
      )
    : children;

  // You can spread any additional props to the Component
  return (
    <Component className={className} {...props}>
      {transformChildren}
    </Component>
  );
};

export default Typography;
