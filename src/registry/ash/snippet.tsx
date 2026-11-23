import { useState } from "react";

export type SnippetProps = {
  label?: string;
  value: string;
};

export function Snippet({ label = "Command", value }: SnippetProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg bg-stone-900">
      <div className="flex items-center justify-between gap-3 px-3 pt-2">
        <p className="text-xs font-medium tracking-wide text-stone-400">{label}</p>
        <button
          type="button"
          className="h-8 rounded-md px-2 text-xs font-medium text-stone-50 hover:bg-stone-800"
          onClick={() => {
            void navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            });
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-3 pb-3 font-mono text-sm break-all whitespace-pre-wrap text-stone-50">
        <code>{value}</code>
      </pre>
    </div>
  );
}
