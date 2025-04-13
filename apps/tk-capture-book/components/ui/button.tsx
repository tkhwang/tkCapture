import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, Text } from "react-native";

import { cn } from "@/lib/utils";

const buttonVariants = cva("flex-row items-center justify-center rounded-md", {
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive",
      outline: "border border-input bg-background",
      secondary: "bg-secondary",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-primary",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
      icon: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  textClass?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, textClass, variant, size, children, ...props }, ref) => {
    const isText = typeof children === "string";

    return (
      <Pressable className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {isText ? (
          <Text className={cn(buttonTextVariants({ variant, size }), textClass)}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
