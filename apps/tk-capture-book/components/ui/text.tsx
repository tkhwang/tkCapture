import * as React from "react";

import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-foreground",
      heading: "text-foreground font-bold",
      title: "text-foreground font-semibold",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    size: {
      default: "text-base",
      xs: "text-xs",
      sm: "text-sm leading-4",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TextProps extends RNTextProps, VariantProps<typeof textVariants> {
  className?: string;
}

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <RNText ref={ref} className={cn(textVariants({ variant, size, className }))} {...props} />
    );
  },
);

Text.displayName = "Text";

export { Text, textVariants };
