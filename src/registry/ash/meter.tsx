export type MeterProps = {
  label: string;
  value: number;
  max?: number;
};

export function Meter({ label, value, max = 100 }: MeterProps) {
  const safeMax = max <= 0 ? 100 : max;
  const clamped = Math.min(safeMax, Math.max(0, value));
  const pct = Math.round((clamped / safeMax) * 100);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-stone-900">{label}</span>
        <span className="font-mono text-xs text-stone-500 tabular-nums">{pct}%</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.round(clamped)}
        className="h-2 overflow-hidden rounded-full bg-stone-200"
      >
        <div className="h-full rounded-full bg-orange-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
