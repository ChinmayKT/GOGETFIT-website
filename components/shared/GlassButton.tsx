import type { ComponentProps } from "react";
import SmartLink from "@/components/shared/SmartLink";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof SmartLink> & { variant?: "primary" | "glass" };

export default function GlassButton({ variant = "glass", className, ...rest }: Props) {
  return (
    <SmartLink
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-sm font-semibold select-none transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.98]",
        variant === "primary"
          ? "bg-primary text-on-primary hover:bg-primary-soft"
          : "glass text-white hover:bg-raised",
        className
      )}
      {...rest}
    />
  );
}
