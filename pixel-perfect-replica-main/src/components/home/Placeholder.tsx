import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PlaceholderProps = {
  label?: string;
  variant?: "solid" | "dashed" | "strong";
  className?: string;
  children?: ReactNode;
};

/** Grey wireframe stand-in for every image, logo, video or screen. */
export function Placeholder({ label, variant = "solid", className, children }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg text-center",
        variant === "solid" && "border border-placeholder-border bg-placeholder",
        variant === "strong" && "bg-placeholder-strong",
        variant === "dashed" && "border border-dashed border-placeholder-border bg-surface",
        className,
      )}
    >
      {children}
      {label && (
        <span className="px-2 font-mono text-[0.68rem] leading-tight tracking-wide text-placeholder-foreground">
          [{label}]
        </span>
      )}
    </div>
  );
}

/** Thin grey bar standing in for a line of text. */
export function Line({ className }: { className?: string }) {
  return <div className={cn("h-2 rounded-full bg-placeholder-strong", className)} />;
}
