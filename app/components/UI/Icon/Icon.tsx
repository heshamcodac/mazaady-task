import React from "react";
import icons from "app/components/icons";
import { colors } from "tailwind.config";

export type IconType = keyof typeof icons;

type IconProps = {
  name: IconType;
  size?: number;
  fillColor?: string | undefined;
  strokeColor?: string | undefined;
  className?: string;
};

export default function Icon({
  name,
  size,
  fillColor,
  strokeColor,
  className,
}: IconProps) {
  const Component = icons[name];

  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor || "none"}
      stroke={fillColor ? "none" : strokeColor || colors.gray[700]}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <Component />
    </svg>
  );
}
