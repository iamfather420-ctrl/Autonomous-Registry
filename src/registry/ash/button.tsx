import type { ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const variants = {
  solid: "bg-orange-700 text-orange-50 hover:bg-orange-800",
  quiet: "bg-stone-200 text-stone-900 hover:bg-stone-300",
  outline: "border border-stone-300 bg-stone-50 text-stone-900 hover:border-stone-900",
  ink: "bg-stone-900 text-stone-50 hover:bg-stone-800",
} as const;

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
} as const;

export type ButtonProps = {
  variant?: "solid" | "quiet" | "outline" | "ink";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export function Button({
  variant = "solid",
  size = "md",
  type = "button",
  disabled,
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700",
        "disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
