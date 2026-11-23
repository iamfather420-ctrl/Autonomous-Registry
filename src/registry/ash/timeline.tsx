export type TimelineStep = {
  title: string;
  detail: string;
  state: "done" | "current" | "wait";
};

export type TimelineProps = {
  steps: TimelineStep[];
};

export function Timeline({ steps }: TimelineProps) {
  return (
    <ol className="flex w-full flex-col">
      {steps.map((step, index) => (
        <li key={step.title} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3">
          <div className="flex flex-col items-center">
            <span
              className={
                step.state === "wait"
                  ? "mt-1.5 size-2.5 rounded-full bg-stone-300"
                  : step.state === "current"
                    ? "mt-1 size-3 rounded-full bg-orange-700 ring-4 ring-orange-200"
                    : "mt-1.5 size-2.5 rounded-full bg-orange-700"
              }
            />
            {index < steps.length - 1 ? <span className="mt-1 w-px flex-1 bg-stone-300" /> : null}
          </div>
          <div className={index === steps.length - 1 ? "pb-0" : "pb-5"}>
            <p className="text-sm font-medium text-stone-900">{step.title}</p>
            <p className="mt-0.5 text-sm text-stone-500">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
