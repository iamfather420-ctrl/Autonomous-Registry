export const REGISTRY_ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
export const REGISTRY_SCHEMA = "https://ui.shadcn.com/schema/registry.json";

export const ITEM_TYPES = [
  "registry:ui",
  "registry:component",
  "registry:block",
  "registry:hook",
  "registry:lib",
  "registry:file",
] as const;

export type RegistryItemType = (typeof ITEM_TYPES)[number];

export type RegistryFile = {
  path: string;
  type: RegistryItemType;
  content?: string;
};

export type RegistryItem = {
  $schema: typeof REGISTRY_ITEM_SCHEMA;
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  categories?: string[];
  docs?: string;
  meta?: Record<string, string>;
};

export type RegistryDocument = {
  $schema: typeof REGISTRY_SCHEMA;
  name: string;
  homepage: string;
  items: RegistryItem[];
};

export type ParsedProp = {
  name: string;
  type: string;
  optional: boolean;
};

export type ParsedFile = {
  path: string;
  source: string;
  exports: string[];
  props: ParsedProp[];
  dependencies: string[];
  framework: "react" | "vue" | "svelte" | "unknown";
  suggestedType: RegistryItemType;
  suggestedName: string;
};

export type ForgeStep = {
  id: string;
  label: string;
  detail: string;
};

export type RepoSource = {
  owner: string;
  repo: string;
  branch: string;
  url: string;
};

export type ForgeSuccess = {
  ok: true;
  steps: ForgeStep[];
  registry: RegistryDocument;
  sealedBy: "parser" | "grok";
  seal: string;
  summary: string;
  source: RepoSource;
  note?: string;
};

export type ForgeFailure = {
  ok: false;
  error: string;
  steps: ForgeStep[];
};

export type ForgeResponse = ForgeSuccess | ForgeFailure;
