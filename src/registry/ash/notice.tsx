import type { ReactNode } from "react";

export type NoticeProps = {
  tone?: "note" | "ember" | "ink";
  title: string;
  children?: ReactNode;
};

export function Notice({ tone = "note", title, children }: NoticeProps) {
  const ink = tone === "ink";
  const frame =
    tone === "ink"
      ? "border-stone-900 bg-stone-900"
      : tone === "ember"
        ? "border-orange-300 bg-orange-50"
        : "border-stone-300 bg-stone-50";
  return (
    <div role="status" className={`rounded-lg border px-4 py-3 ${frame}`}>
      <p className={`text-sm font-medium ${ink ? "text-stone-50" : "text-stone-900"}`}>{title}</p>
      {children ? (
        <p className={`mt-1 text-sm ${ink ? "text-stone-300" : "text-stone-600"}`}>{children}</p>
      ) : null}
    </div>
  );
}
