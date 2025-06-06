import * as React from "react";

import Svg, { Path } from "react-native-svg";

import { cn } from "../utils";

import { IconProps } from "./iconWithClassName";

export function MoonStar({ className, ...props }: IconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      {...props}
    >
      <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <Path d="M19 3v4" />
      <Path d="M21 5h-4" />
    </Svg>
  );
}
