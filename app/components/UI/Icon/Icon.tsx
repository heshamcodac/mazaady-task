import React from "react";
import icons, { SVGProp } from "@icons";

export type IconType = keyof typeof icons;

type Props = SVGProp & {
  name: IconType;
};

export default function Icon({ name, size, color }: Props) {
  const Component = icons[name];

  return <Component size={size || 24} color={color} />;
}
