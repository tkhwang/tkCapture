import type { SvgProps } from "react-native-svg";

/**
 * A utility to extend SvgProps with className for NativeWind
 */
export interface IconProps extends SvgProps {
  className?: string;
}
