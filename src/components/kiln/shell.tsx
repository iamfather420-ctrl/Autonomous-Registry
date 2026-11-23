import { useState } from "react";
import { toast } from "sonner";

export const shellPrimary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-colors duration-150 hover:bg-fg/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:cursor-not-allowed disabled:opacity-40";

export const shellQuiet =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-bg-raised px-4 text-sm font-medium text-fg transition-colors duration-150 hover:border-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:cursor-not-allowed disabled:opacity-40";

export const shellInput =
  "h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted focus-visible:border-fg";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="5" y="5" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 21.5 16 9.5 22 21.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.4 17.4h7.2" stroke="var(--color-ember)" strokeWidth="1.75" />
    </svg>
  );
}

export function CopyButton({
  label,
  idle,
  done = "Copied",
  quiet = false,
  onCopy,
}: {
  label: string;
  idle?: string;
  done?: string;
  quiet?: boolean;
  onCopy: () => Promise<string | void> | string | void;
}) {
  const [state, setState] = useState<"idle" | "done">("idle");
  return (
    <button
      type="button"
      className={quiet ? shellQuiet : shellPrimary}
      onClick={() => {
        void Promise.resolve(onCopy())
          .then(async (value) => {
            if (typeof value === "string") await navigator.clipboard.writeText(value);
            setState("done");
            window.setTimeout(() => setState("idle"), 1400);
          })
          .catch(() => toast.error("Could not copy that."));
      }}
    >
      {state === "done" ? done : (idle ?? label)}
    </button>
  );
}

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
  toast.success("Copied");
}

export function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
