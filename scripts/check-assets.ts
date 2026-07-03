import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();
const appsRoot = join(repoRoot, "apps");
const assetExtensions = new Set([
  ".apng",
  ".avif",
  ".epub",
  ".gif",
  ".jpeg",
  ".jpg",
  ".mp4",
  ".pdf",
  ".png",
  ".svg",
  ".webm",
  ".webp"
]);

type AssetRef = {
  app: string;
  source: string;
  value: string;
};

function isExternal(value: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(value);
}

function extensionOf(value: string): string {
  const clean = value.split(/[?#]/, 1)[0].toLowerCase();
  const match = clean.match(/\.[a-z0-9]+$/);
  return match?.[0] ?? "";
}

function isAssetPath(value: string): boolean {
  return value.startsWith("/") && assetExtensions.has(extensionOf(value));
}

function collectStrings(value: unknown, refs: string[] = []): string[] {
  if (typeof value === "string") {
    refs.push(value);
    return refs;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, refs);
    return refs;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, refs);
  }
  return refs;
}

async function collectDataRefs(app: string, appDir: string): Promise<AssetRef[]> {
  const dataDir = join(appDir, "src", "data");
  if (!existsSync(dataDir)) return [];

  const refs: AssetRef[] = [];
  for (const file of readdirSync(dataDir).filter((name) => name.endsWith(".ts"))) {
    const fullPath = join(dataDir, file);
    const mod = await import(pathToFileURL(fullPath).href);
    const values = collectStrings(mod);
    for (const value of values) {
      if (isExternal(value) || !isAssetPath(value)) continue;
      refs.push({ app, source: relative(repoRoot, fullPath), value });
    }
  }
  return refs;
}

function collectDictionaryRefs(app: string, appDir: string): AssetRef[] {
  const dictionariesDir = join(appDir, "src", "dictionaries");
  if (!existsSync(dictionariesDir)) return [];

  const refs: AssetRef[] = [];
  for (const file of readdirSync(dictionariesDir).filter((name) => name.endsWith(".json"))) {
    const fullPath = join(dictionariesDir, file);
    const parsed = JSON.parse(readFileSync(fullPath, "utf8"));
    for (const value of collectStrings(parsed)) {
      if (isExternal(value) || !isAssetPath(value)) continue;
      refs.push({ app, source: relative(repoRoot, fullPath), value });
    }
  }
  return refs;
}

function localAssetExists(appDir: string, value: string): boolean {
  const clean = value.split(/[?#]/, 1)[0];
  return existsSync(join(appDir, "public", clean.replace(/^\//, "")));
}

const appNames = readdirSync(appsRoot).filter((name) => {
  const appDir = join(appsRoot, name);
  return existsSync(join(appDir, "package.json"));
});

const refs: AssetRef[] = [];
for (const app of appNames) {
  const appDir = join(appsRoot, app);
  refs.push(...collectDictionaryRefs(app, appDir));
  refs.push(...await collectDataRefs(app, appDir));
}

const missing = refs.filter((ref) => !localAssetExists(join(appsRoot, ref.app), ref.value));
const checked = refs.length;

if (missing.length) {
  console.error(`Asset check failed: ${missing.length} missing local assets out of ${checked} references.`);
  for (const ref of missing) {
    console.error(`- ${ref.app}: ${ref.value} referenced in ${ref.source}`);
  }
  process.exit(1);
}

console.log(`Asset check passed: ${checked} local asset references verified across ${appNames.length} apps.`);
