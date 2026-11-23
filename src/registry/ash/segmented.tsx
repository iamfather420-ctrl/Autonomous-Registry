export type SegmentedOption = {
  value: string;
  label: string;
};

export type SegmentedProps = {
  label: string;
  value: string;
  options: SegmentedOption[];
  onChange?: (value: string) => void;
};

export function Segmented({ label, value, options, onChange }: SegmentedProps) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-stone-200 p-1">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange?.(option.value)}
            className={
              selected
                ? "h-9 min-w-11 rounded-md bg-stone-50 px-3 text-sm font-medium text-stone-900"
                : "h-9 min-w-11 rounded-md px-3 text-sm font-medium text-stone-500 hover:text-stone-900"
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
