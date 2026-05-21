import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        {
          "bg-[#FFF4EE] text-[#F97316]": variant === "default" || variant === "primary",
          "bg-[#F9FAFB] text-[#6B7280]": variant === "secondary",
        },
        className
      )}
      {...props}
    />
  );
}
