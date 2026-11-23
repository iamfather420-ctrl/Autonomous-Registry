import { useState } from "react";
import { Button } from "@/registry/ash/button";
import { Chip } from "@/registry/ash/chip";
import { Field } from "@/registry/ash/field";
import { Meter } from "@/registry/ash/meter";
import { Notice } from "@/registry/ash/notice";
import { Panel } from "@/registry/ash/panel";
import { Segmented } from "@/registry/ash/segmented";
import { Snippet } from "@/registry/ash/snippet";
import { Stat } from "@/registry/ash/stat";
import { Timeline, type TimelineStep } from "@/registry/ash/timeline";

export function AshCompact({ name }: { name: string }) {
  switch (name) {
    case "button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button>Fire</Button>
          <Button variant="quiet">Hold</Button>
          <Button variant="outline">Inspect</Button>
        </div>
      );
    case "field":
      return <Field label="Registry name" value="ash" placeholder="ash" />;
    case "segmented":
      return (
        <Segmented
          label="Temperature"
          value="solid"
          options={[
            { value: "solid", label: "Solid" },
            { value: "quiet", label: "Quiet" },
            { value: "ink", label: "Ink" },
          ]}
        />
      );
    case "chip":
      return (
        <div className="flex flex-wrap justify-center gap-2">
          <Chip>Ready</Chip>
          <Chip tone="ember">Firing</Chip>
          <Chip tone="ink">Sealed</Chip>
          <Chip tone="quiet">Wait</Chip>
        </div>
      );
    case "notice":
      return <Notice title="Tree walked">11 component files kept from the public repo.</Notice>;
    case "meter":
      return <Meter label="Kiln heat" value={72} />;
    case "stat":
      return <Stat label="Items" value="10" detail="Served from /r" />;
    case "snippet":
      return <Snippet label="Install" value="npx shadcn@latest add /r/button.json" />;
    case "timeline":
      return (
        <Timeline
          steps={[
            { title: "Resolve", detail: "Public default branch", state: "done" },
            { title: "Seal", detail: "Registry JSON written", state: "current" },
          ]}
        />
      );
    case "panel":
      return (
        <Panel kicker="Ash" title="Button" action={<Chip tone="quiet">ui</Chip>}>
          <p className="text-sm text-stone-600">A pressable control with four temperatures.</p>
        </Panel>
      );
    default:
      return null;
  }
}

function ButtonPreview() {
  const [variant, setVariant] = useState<"solid" | "quiet" | "outline" | "ink">("solid");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap gap-2">
        <Segmented
          label="Variant"
          value={variant}
          onChange={(value) => setVariant(value as typeof variant)}
          options={[
            { value: "solid", label: "Solid" },
            { value: "quiet", label: "Quiet" },
            { value: "outline", label: "Outline" },
            { value: "ink", label: "Ink" },
          ]}
        />
        <Segmented
          label="Size"
          value={size}
          onChange={(value) => setSize(value as typeof size)}
          options={[
            { value: "sm", label: "Sm" },
            { value: "md", label: "Md" },
            { value: "lg", label: "Lg" },
          ]}
        />
      </div>
      <Button variant={variant} size={size} disabled={disabled} onClick={() => setDisabled(true)}>
        {disabled ? "Disabled" : "Press to disable"}
      </Button>
      {disabled ? (
        <button type="button" className="text-sm text-stone-600 underline" onClick={() => setDisabled(false)}>
          Reset
        </button>
      ) : null}
    </div>
  );
}

function FieldPreview() {
  const [name, setName] = useState("ash");
  const [repo, setRepo] = useState("");
  const error = repo.length > 0 && !repo.includes("/") ? "Use owner/repo" : undefined;
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Field label="Registry name" value={name} onChange={setName} hint="Kebab-case, unique in the registry." />
      <Field label="GitHub repo" value={repo} onChange={setRepo} placeholder="owner/repo" error={error} />
    </div>
  );
}

function SegmentedPreview() {
  const [value, setValue] = useState("parser");
  return (
    <div className="flex flex-col items-start gap-3">
      <Segmented
        label="Sealer"
        value={value}
        onChange={setValue}
        options={[
          { value: "parser", label: "Parser" },
          { value: "grok", label: "Grok" },
        ]}
      />
      <p className="text-sm text-stone-600">Sealed by {value === "grok" ? "Grok" : "the parser"}.</p>
    </div>
  );
}

function ChipPreview() {
  const tones = ["neutral", "ember", "ink", "quiet"] as const;
  return (
    <div className="flex flex-wrap gap-2">
      {tones.map((tone) => (
        <Chip key={tone} tone={tone}>
          {tone}
        </Chip>
      ))}
    </div>
  );
}

function NoticePreview() {
  const [tone, setTone] = useState<"note" | "ember" | "ink">("note");
  return (
    <div className="flex w-full flex-col gap-4">
      <Segmented
        label="Tone"
        value={tone}
        onChange={(value) => setTone(value as typeof tone)}
        options={[
          { value: "note", label: "Note" },
          { value: "ember", label: "Ember" },
          { value: "ink", label: "Ink" },
        ]}
      />
      <Notice tone={tone} title={tone === "ink" ? "Registry sealed" : "Still firing"}>
        {tone === "ember"
          ? "Grok rewrote titles. Source files were not changed."
          : "Eleven files kept. Nothing from this repo is executed."}
      </Notice>
    </div>
  );
}

function MeterPreview() {
  const [value, setValue] = useState(64);
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Meter label="Files kept" value={value} />
      <label className="flex items-center gap-3 text-sm text-stone-600">
        Heat
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label="Meter value"
          onChange={(event) => setValue(Number(event.target.value))}
          className="h-11 flex-1 accent-orange-700"
        />
      </label>
    </div>
  );
}

function StatPreview() {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <Stat label="Items" value="10" detail="Ash" />
      <Stat label="Deps" value="0" detail="Per primitive" />
      <Stat label="Schema" value="1" detail="registry.json" />
    </div>
  );
}

function SnippetPreview() {
  return <Snippet label="Install Button" value="npx shadcn@latest add https://example.com/r/button.json" />;
}

function TimelinePreview() {
  const [index, setIndex] = useState(1);
  const titles = [
    ["Resolve", "Read the default branch"],
    ["Walk", "Score component files"],
    ["Seal", "Write registry items"],
  ];
  const steps: TimelineStep[] = titles.map(([title, detail], stepIndex) => ({
    title,
    detail,
    state: stepIndex < index ? "done" : stepIndex === index ? "current" : "wait",
  }));
  return (
    <div className="flex w-full flex-col gap-4">
      <Timeline steps={steps} />
      <div className="flex gap-2">
        <Button variant="quiet" onClick={() => setIndex((n) => Math.max(0, n - 1))}>
          Back
        </Button>
        <Button onClick={() => setIndex((n) => Math.min(titles.length - 1, n + 1))}>Advance</Button>
      </div>
    </div>
  );
}

function PanelPreview() {
  return (
    <Panel kicker="Forge" title="cmdk" action={<Chip tone="ember">11 files</Chip>}>
      <div className="flex flex-col gap-4">
        <Stat label="Seal" value="a4c1" detail="Parser plus Grok" />
        <Button variant="ink">Download registry.json</Button>
      </div>
    </Panel>
  );
}

export function AshPreview({ name }: { name: string }) {
  switch (name) {
    case "button":
      return <ButtonPreview />;
    case "field":
      return <FieldPreview />;
    case "segmented":
      return <SegmentedPreview />;
    case "chip":
      return <ChipPreview />;
    case "notice":
      return <NoticePreview />;
    case "meter":
      return <MeterPreview />;
    case "stat":
      return <StatPreview />;
    case "snippet":
      return <SnippetPreview />;
    case "timeline":
      return <TimelinePreview />;
    case "panel":
      return <PanelPreview />;
    default:
      return null;
  }
}
