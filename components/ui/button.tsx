import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "btn-primary glow-orange bg-[#F97316] text-white focus-visible:ring-[#F97316] hover:bg-[#EA6C00] dark:shadow-sop-orange": variant === "primary",
            "border border-[#F97316] text-[#F97316] focus-visible:ring-[#F97316] hover:bg-[#FFF4EE] dark:border-sop-border dark:text-sop-foreground dark:hover:bg-sop-hover": variant === "outline",
            "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#1A1A2E] dark:text-sop-muted dark:hover:bg-sop-hover dark:hover:text-sop-foreground": variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
