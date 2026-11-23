import type { ReactNode } from "react";

export type PanelProps = {
  kicker?: string;
  title: string;
  action?: ReactNode;
  children?: ReactNode;
};

export function Panel({ kicker, title, action, children }: PanelProps) {
  return (
    <section className="w-full rounded-xl border border-stone-300 bg-stone-50">
      <header className="flex items-start justify-between gap-3 border-b border-stone-200 px-4 py-3">
        <div>
          {kicker ? <p className="text-xs font-medium tracking-wider text-stone-500 uppercase">{kicker}</p> : null}
          <h3 className="text-base font-medium text-stone-900">{title}</h3>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}
