import { describeParsed, safeName, titleFromName } from "@/lib/registry/parse";
import {
  REGISTRY_ITEM_SCHEMA,
  REGISTRY_SCHEMA,
  type ParsedFile,
  type RegistryDocument,
  type RegistryItem,
  type RegistryItemType,
} from "@/lib/registry/types";

export type ItemOverride = {
  path: string;
  name: string;
  title: string;
  description: string;
  type: RegistryItemType;
  category?: string;
};

const DOCS =
  "Installed files use Tailwind utilities only (stone and orange). They have no npm dependencies. Kiln does not execute registry source.";

function targetPath(type: RegistryItemType, name: string, sourcePath: string): string {
  const ext = sourcePath.match(/\.(tsx|ts|jsx|js|vue|svelte)$/)?.[0] ?? ".tsx";
  if (type === "registry:ui") return `registry/ui/${name}${ext}`;
  if (type === "registry:hook") return `registry/hooks/${name}${ext}`;
  if (type === "registry:lib") return `registry/lib/${name}${ext}`;
  if (type === "registry:block") return `registry/blocks/${name}${ext}`;
  return `registry/components/${name}${ext}`;
}

function categoryFor(type: RegistryItemType): string {
  if (type === "registry:ui") return "ui";
  if (type === "registry:hook") return "hook";
  if (type === "registry:lib") return "lib";
  if (type === "registry:block") return "block";
  return "component";
}

export function sealId(text: string): string {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function uniqueName(base: string, used: Set<string>): string {
  let name = base;
  let n = 2;
  while (used.has(name)) {
    name = `${base}-${n}`;
    n += 1;
  }
  used.add(name);
  return name;
}

export function toItem(file: ParsedFile, override: ItemOverride | undefined, name: string): RegistryItem {
  const type = override?.type ?? file.suggestedType;
  const meta: Record<string, string> = { sourcePath: file.path };
  if (file.framework !== "react") meta.framework = file.framework;
  const item: RegistryItem = {
    $schema: REGISTRY_ITEM_SCHEMA,
    name,
    type,
    title: override?.title?.trim() || titleFromName(name),
    description: override?.description?.trim() || describeParsed(file),
    files: [
      {
        path: targetPath(type, name, file.path),
        type,
        content: file.source,
      },
    ],
    categories: [override?.category?.trim() || categoryFor(type)],
    docs: DOCS,
    meta,
  };
  if (file.dependencies.length > 0) item.dependencies = file.dependencies;
  return item;
}

export function composeRegistry(options: {
  name: string;
  homepage: string;
  files: ParsedFile[];
  overrides?: ItemOverride[];
}): RegistryDocument {
  const overrides = new Map((options.overrides ?? []).map((item) => [item.path, item]));
  const selected =
    overrides.size > 0 ? options.files.filter((file) => overrides.has(file.path)) : options.files;

  const used = new Set<string>();
  const items = selected.map((file) => {
    const override = overrides.get(file.path);
    const base = safeName(override?.name || file.suggestedName, "item");
    return toItem(file, override, uniqueName(base, used));
  });

  return {
    $schema: REGISTRY_SCHEMA,
    name: safeName(options.name, "registry"),
    homepage: options.homepage,
    items,
  };
}

export function withoutContent(registry: RegistryDocument): RegistryDocument {
  return {
    ...registry,
    items: registry.items.map((item) => ({
      ...item,
      files: item.files.map(({ path, type }) => ({ path, type })),
    })),
  };
}

export function sealOf(registry: RegistryDocument): string {
  const body = registry.items
    .map((item) => `${item.name}\n${item.files.map((file) => file.content).join("\n")}`)
    .join("\n");
  return sealId(body);
}
