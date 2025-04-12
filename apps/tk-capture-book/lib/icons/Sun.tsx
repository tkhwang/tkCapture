import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { IconProps } from "./iconWithClassName";
import { cn } from "../utils";

export function Sun({ className, ...props }: IconProps) {
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
      <Path d="M12 12a1 1 0 0 0 0-2v2Z" />
      <Path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <Path d="M12 2v2" />
      <Path d="M12 20v2" />
      <Path d="m4.93 4.93 1.41 1.41" />
      <Path d="m17.66 17.66 1.41 1.41" />
      <Path d="M2 12h2" />
      <Path d="M20 12h2" />
      <Path d="m6.34 17.66-1.41 1.41" />
      <Path d="m19.07 4.93-1.41 1.41" />
    </Svg>
  );
}
