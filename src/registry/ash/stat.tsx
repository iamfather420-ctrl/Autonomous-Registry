export type StatProps = {
  label: string;
  value: string;
  detail?: string;
};

export function Stat({ label, value, detail }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium tracking-wider text-stone-500 uppercase">{label}</p>
      <p className="text-4xl leading-none font-medium tracking-tight text-stone-900 tabular-nums">{value}</p>
      {detail ? <p className="text-sm text-stone-500">{detail}</p> : null}
    </div>
  );
}
