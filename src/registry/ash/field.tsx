import { useId } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
  name?: string;
  readOnly?: boolean;
};

export function Field({
  label,
  hint,
  error,
  value,
  placeholder,
  onChange,
  type = "text",
  name,
  readOnly,
}: FieldProps) {
  const autoId = useId();
  const help = error || hint;
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={autoId} className="text-sm font-medium text-stone-900">
        {label}
      </label>
      <input
        id={autoId}
        name={name}
        type={type}
        readOnly={readOnly || (value !== undefined && !onChange)}
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={help ? `${autoId}-help` : undefined}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={cx(
          "h-11 rounded-lg border bg-stone-50 px-3 text-sm text-stone-900 outline-none transition-colors",
          "placeholder:text-stone-400 focus-visible:border-stone-900",
          error ? "border-orange-700" : "border-stone-300",
        )}
      />
      {help ? (
        <p id={`${autoId}-help`} className={cx("text-xs", error ? "text-orange-800" : "text-stone-500")}>
          {help}
        </p>
      ) : null}
    </div>
  );
}
