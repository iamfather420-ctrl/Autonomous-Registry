import type { ReactNode } from "react";

const tones = {
  neutral: "bg-stone-200 text-stone-900",
  ember: "bg-orange-700 text-orange-50",
  ink: "bg-stone-900 text-stone-50",
  quiet: "border border-stone-300 bg-transparent text-stone-600",
} as const;

export type ChipProps = {
  tone?: "neutral" | "ember" | "ink" | "quiet";
  children?: ReactNode;
};

export function Chip({ tone = "neutral", children }: ChipProps) {
  return (
    <span className={`inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}
