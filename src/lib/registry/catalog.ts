import buttonSource from "@/registry/ash/button.tsx?raw";
import chipSource from "@/registry/ash/chip.tsx?raw";
import fieldSource from "@/registry/ash/field.tsx?raw";
import meterSource from "@/registry/ash/meter.tsx?raw";
import noticeSource from "@/registry/ash/notice.tsx?raw";
import panelSource from "@/registry/ash/panel.tsx?raw";
import segmentedSource from "@/registry/ash/segmented.tsx?raw";
import snippetSource from "@/registry/ash/snippet.tsx?raw";
import statSource from "@/registry/ash/stat.tsx?raw";
import timelineSource from "@/registry/ash/timeline.tsx?raw";
import { REGISTRY_ITEM_SCHEMA, REGISTRY_SCHEMA, type RegistryDocument, type RegistryItem } from "@/lib/registry/types";

export type AshProp = {
  name: string;
  type: string;
  required: boolean;
  detail: string;
};

export type AshEntry = {
  name: string;
  title: string;
  description: string;
  category: string;
  filename: string;
  source: string;
  props: AshProp[];
};

const DOCS =
  "Tailwind utilities only (stone and orange). No npm dependencies. The preview in Kiln renders this source; fetched repositories are never executed.";

export const ASH: AshEntry[] = [
  {
    name: "button",
    title: "Button",
    description: "Pressable control in four temperatures — solid, quiet, outline, and ink — and three heights.",
    category: "control",
    filename: "button.tsx",
    source: buttonSource,
    props: [
      { name: "variant", type: '"solid" | "quiet" | "outline" | "ink"', required: false, detail: "Visual temperature. Defaults to solid." },
      { name: "size", type: '"sm" | "md" | "lg"', required: false, detail: "Height and type size. Defaults to md." },
      { name: "type", type: '"button" | "submit" | "reset"', required: false, detail: "Native button type. Defaults to button." },
      { name: "disabled", type: "boolean", required: false, detail: "Blocks clicks and dims the control." },
      { name: "children", type: "ReactNode", required: false, detail: "Label or inner content." },
      { name: "onClick", type: "() => void", required: false, detail: "Click handler." },
    ],
  },
  {
    name: "field",
    title: "Field",
    description: "Labeled text input with optional hint or error, wired to aria-invalid and a described-by id.",
    category: "input",
    filename: "field.tsx",
    source: fieldSource,
    props: [
      { name: "label", type: "string", required: true, detail: "Visible label, associated with the input." },
      { name: "hint", type: "string", required: false, detail: "Helper text under the field." },
      { name: "error", type: "string", required: false, detail: "Replaces the hint and marks the field invalid." },
      { name: "value", type: "string", required: false, detail: "Controlled value." },
      { name: "placeholder", type: "string", required: false, detail: "Placeholder copy." },
      { name: "onChange", type: "(value: string) => void", required: false, detail: "Receives the next string, not the event." },
      { name: "type", type: "string", required: false, detail: "Input type. Defaults to text." },
      { name: "name", type: "string", required: false, detail: "Form field name." },
      { name: "readOnly", type: "boolean", required: false, detail: "Locks the input. Also implied when value is set without onChange." },
    ],
  },
  {
    name: "segmented",
    title: "Segmented",
    description: "Single-select control rendered as a radiogroup. One option is pressed at a time.",
    category: "control",
    filename: "segmented.tsx",
    source: segmentedSource,
    props: [
      { name: "label", type: "string", required: true, detail: "Accessible name for the radiogroup." },
      { name: "value", type: "string", required: true, detail: "Currently selected option value." },
      { name: "options", type: "SegmentedOption[]", required: true, detail: "Each option has a value and a label." },
      { name: "onChange", type: "(value: string) => void", required: false, detail: "Called with the next value." },
    ],
  },
  {
    name: "chip",
    title: "Chip",
    description: "Compact status marker. Neutral, ember, ink, or a quiet outline.",
    category: "status",
    filename: "chip.tsx",
    source: chipSource,
    props: [
      { name: "tone", type: '"neutral" | "ember" | "ink" | "quiet"', required: false, detail: "Defaults to neutral." },
      { name: "children", type: "ReactNode", required: false, detail: "Short status label." },
    ],
  },
  {
    name: "notice",
    title: "Notice",
    description: "Inline status block with a title, supporting text, and a note, ember, or ink tone.",
    category: "status",
    filename: "notice.tsx",
    source: noticeSource,
    props: [
      { name: "tone", type: '"note" | "ember" | "ink"', required: false, detail: "Defaults to note." },
      { name: "title", type: "string", required: true, detail: "Primary line." },
      { name: "children", type: "ReactNode", required: false, detail: "Supporting sentence." },
    ],
  },
  {
    name: "meter",
    title: "Meter",
    description: "Labeled progress meter with a numeric percent and an accessible value range.",
    category: "data",
    filename: "meter.tsx",
    source: meterSource,
    props: [
      { name: "label", type: "string", required: true, detail: "Visible name and accessible label." },
      { name: "value", type: "number", required: true, detail: "Current value, clamped to the range." },
      { name: "max", type: "number", required: false, detail: "Range maximum. Defaults to 100." },
    ],
  },
  {
    name: "stat",
    title: "Stat",
    description: "One figure, a small label, and an optional supporting line. Figures use tabular numbers.",
    category: "data",
    filename: "stat.tsx",
    source: statSource,
    props: [
      { name: "label", type: "string", required: true, detail: "Uppercase caption." },
      { name: "value", type: "string", required: true, detail: "The figure, already formatted." },
      { name: "detail", type: "string", required: false, detail: "Secondary line under the figure." },
    ],
  },
  {
    name: "snippet",
    title: "Snippet",
    description: "Monospace value with its own copy control and a short copied state.",
    category: "data",
    filename: "snippet.tsx",
    source: snippetSource,
    props: [
      { name: "label", type: "string", required: false, detail: "Caption. Defaults to Command." },
      { name: "value", type: "string", required: true, detail: "Exact text copied to the clipboard." },
    ],
  },
  {
    name: "timeline",
    title: "Timeline",
    description: "Ordered steps marked done, current, or waiting. Current steps carry an ember ring.",
    category: "data",
    filename: "timeline.tsx",
    source: timelineSource,
    props: [
      {
        name: "steps",
        type: "TimelineStep[]",
        required: true,
        detail: "Each step has a title, detail, and state: done, current, or wait.",
      },
    ],
  },
  {
    name: "panel",
    title: "Panel",
    description: "Titled surface with an optional kicker and a header action. Body is whatever you pass as children.",
    category: "surface",
    filename: "panel.tsx",
    source: panelSource,
    props: [
      { name: "kicker", type: "string", required: false, detail: "Small uppercase line above the title." },
      { name: "title", type: "string", required: true, detail: "Panel heading." },
      { name: "action", type: "ReactNode", required: false, detail: "Slot at the end of the header." },
      { name: "children", type: "ReactNode", required: false, detail: "Body content." },
    ],
  },
];

function itemFromEntry(entry: AshEntry, withContent: boolean): RegistryItem {
  return {
    $schema: REGISTRY_ITEM_SCHEMA,
    name: entry.name,
    type: "registry:ui",
    title: entry.title,
    description: entry.description,
    categories: [entry.category],
    docs: DOCS,
    files: [
      {
        path: `registry/ui/${entry.filename}`,
        type: "registry:ui",
        ...(withContent ? { content: entry.source } : {}),
      },
    ],
  };
}

export function ashRegistry(homepage: string, withContent = true): RegistryDocument {
  return {
    $schema: REGISTRY_SCHEMA,
    name: "ash",
    homepage,
    items: ASH.map((entry) => itemFromEntry(entry, withContent)),
  };
}

export function ashItem(name: string): AshEntry | undefined {
  return ASH.find((entry) => entry.name === name);
}

export const ASH_CATEGORIES = ["all", ...new Set(ASH.map((entry) => entry.category))];
