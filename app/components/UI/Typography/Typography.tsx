import React from "react";
import { TypographyProps } from "./types";

// use tailwind/custom classes to add color, size or any other properties.
const Typography: React.FC<TypographyProps> = ({
  as: Component = "p",
  className,
  capitalizeFirstLetter = false,
  children,
  color,
  size,
  dir,
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
    <Component
      className={className}
      // dir={dir}
      style={{ color: color, fontSize: size, direction: dir }}
      {...props}
    >
      {transformChildren}
    </Component>
  );
};

export default Typography;
