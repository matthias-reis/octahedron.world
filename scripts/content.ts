import { readFile, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { promisify } from "node:util";
import { glob } from "glob";
import { type HastParseResult, parse } from "hast-mds";
import type { Site } from "~/site/context";
import type { ItemMeta } from "~/types";
import { validateMicrosite } from "./validate-microsite";

const read = promisify(readFile);

/**
 * The unified document schema, shared byte for byte with the life-brain vault
 * (`src/documents/schema.ts` there). A file's id is its path under `_content/`
 * without `.md` — the same as its vault id — and relations point at those ids.
 *
 * - `publishedAs` is the slug; a file without it is not published.
 * - `format` picks the renderer. `format: none` keeps an item in data.json
 *   without a generated route (it owns a hand-written file route in
 *   src/routes/). `format: anchor` marks a relation target only — a site
 *   homepage, a series without a hub page — resolved here and then dropped,
 *   so it can never render as an (empty) page.
 * - The primary `parent` relation is the series (`group`), or — when it points
 *   at a site homepage anchor — makes the item a homepage root. A hub (some
 *   item's parent) without a series of its own is its own group, as before.
 *   The parent chain reaching `mreis-home` puts an item on mreis.me.
 * - `translation` / `related` relations become `ref` / `related` slugs.
 * - `time` is a date or a `{from, to}` range (`startDate` / `date`).
 */
type Relation = { rel: string; to: string };

type Document = {
  id: string;
  file: string;
  global: Record<string, unknown>;
  mds: HastParseResult;
};

const SITE_HOMES: Record<string, Site> = {
  "octahedron-home": "octahedron",
  "mreis-home": "mreis",
};

/** Keys life-brain keeps for itself; never part of the rendered item. */
const LIFE_BRAIN_ONLY = new Set([
  "type",
  "format",
  "publishedAs",
  "relations",
  "time",
  "tags",
  "weight",
]);

function relations(global: Record<string, unknown>): Relation[] {
  const value = global.relations;
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is Relation =>
      typeof item?.rel === "string" && typeof item?.to === "string",
  );
}

function timeFields(value: unknown): { date?: string; startDate?: string } {
  if (typeof value === "string") return { date: value };
  if (value && typeof value === "object") {
    const range = value as { from?: string; to?: string };
    return {
      ...(range.to ? { date: range.to } : {}),
      ...(range.from ? { startDate: range.from } : {}),
    };
  }
  return {};
}

async function readDocuments(): Promise<Document[]> {
  const files = await glob("_content/**/*.md", {
    cwd: process.cwd(),
    absolute: true,
  });
  const documents: Document[] = [];
  for (const file of files.sort()) {
    const raw = await read(file, "utf8");
    if (!raw.trimStart().startsWith("```")) {
      console.error(
        `[CON] ❌ not an MDS file: ${file} — every file in _content/ must open with a \`\`\`yaml @@ global scope`,
      );
      process.exit(1);
    }
    const result = parse(
      raw,
      new Set([
        "teaser",
        "cta",
        "group",
        "quest",
        "note",
        "calculator",
        "graphics",
        "spacetravel",
        "population",
        // microsite blocks (src/renderers/microsite/blocks.tsx)
        "callout",
        "cards",
        "contact",
        "features",
        "gallery",
        "image",
        "index",
        "rating",
        "stats",
        "video",
        "palette",
      ]),
    );
    if (!result.global) {
      console.error(
        `[CON] ❌ no MDS global scope in: ${file} — expected a \`\`\`yaml @@ block at the top of the file`,
      );
      process.exit(1);
    }
    const id = relative(join(process.cwd(), "_content"), file)
      .split(sep)
      .join("/")
      .replace(/\.md$/, "");
    documents.push({
      id,
      file,
      global: result.global as Record<string, unknown>,
      mds: result,
    });
  }
  return documents;
}

async function getMetaData(): Promise<Record<string, ItemMeta>> {
  const metaData = {} as Record<string, ItemMeta>;
  const documents = await readDocuments();
  const byId = new Map(documents.map((document) => [document.id, document]));
  const slugOf = (id: string): string | undefined => {
    const slug = byId.get(id)?.global.publishedAs;
    return typeof slug === "string" ? slug : undefined;
  };
  const primaryParent = (document: Document): string | undefined =>
    relations(document.global).find((relation) => relation.rel === "parent")
      ?.to;
  const siteOf = (document: Document): Site => {
    if (document.id.startsWith("seiten/")) return "seiten";
    const seen = new Set<string>();
    let current: Document | undefined = document;
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      const home = SITE_HOMES[slugOf(current.id) ?? ""];
      if (home) return home;
      const parent = primaryParent(current);
      current = parent ? byId.get(parent) : undefined;
    }
    return "octahedron";
  };
  const warn = (document: Document, message: string) =>
    console.log(`[CON] ⚠️  ${document.id}: ${message}`);
  const hubs = new Set(
    documents
      .map(primaryParent)
      .filter((parent): parent is string => parent !== undefined),
  );

  for (const document of documents) {
    const { global } = document;
    const slug = slugOf(document.id);
    if (!slug) {
      warn(document, "no publishedAs — not published, skipped");
      continue;
    }
    if (global.format === "anchor") continue;

    const item: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(global))
      if (!LIFE_BRAIN_ONLY.has(key)) item[key] = value;

    const parent = primaryParent(document);
    if (parent) {
      const parentSlug = slugOf(parent);
      if (!parentSlug) warn(document, `parent '${parent}' is not published`);
      else if (SITE_HOMES[parentSlug]) item.root = true;
      else item.group = parentSlug;
    }
    if (item.group === undefined && hubs.has(document.id)) item.group = slug;
    const related: string[] = [];
    for (const relation of relations(global)) {
      if (relation.rel !== "translation" && relation.rel !== "related")
        continue;
      const target = slugOf(relation.to);
      if (!target) {
        warn(document, `${relation.rel} '${relation.to}' is not published`);
        continue;
      }
      if (relation.rel === "translation") item.ref = target;
      else related.push(target);
    }
    if (related.length) item.related = related;
    const tags = Array.isArray(global.tags)
      ? global.tags.filter(
          (tag): tag is string =>
            typeof tag === "string" && !tag.startsWith("state:"),
        )
      : [];
    if (tags.length) item.tags = tags;
    if (typeof global.weight === "number") item.weight = global.weight;

    const meta = {
      ...item,
      ...timeFields(global.time),
      slug,
      type: typeof global.format === "string" ? global.format : undefined,
      site: siteOf(document),
      mds: document.mds,
    } as ItemMeta;

    if (!meta.title) {
      console.error(
        `[CON] ❌ missing \`title\` in the global scope of: ${document.file} — a page without a title cannot be published`,
      );
      process.exit(1);
    }

    if (meta.type === "microsite") {
      const problems = validateMicrosite(document.mds, {
        ...document.global,
        slug,
      });
      if (problems.length > 0) {
        console.error(
          `[CON] ❌ microsite rules broken in: ${document.file}\n${problems.map((p) => `        - ${p}`).join("\n")}`,
        );
        process.exit(1);
      }
    }

    const existing = metaData[meta.slug];
    if (existing) {
      console.error(
        `[CON] ❌ duplicate publishedAs "${meta.slug}" (${existing.site} and ${meta.site}), skipping ${document.file}`,
      );
      continue;
    }
    metaData[meta.slug] = meta;
    console.log(
      `[CON] 📄 <${meta.type || "default"}> [${meta.site}] ${meta.slug} | ${meta.title}`,
    );
  }
  return metaData;
}

async function run() {
  console.log("[CON] start");
  const metadata = await getMetaData();

  // Write data.json
  const json = JSON.stringify(metadata, null, 2);
  writeFileSync(join(process.cwd(), "data.json"), json);

  // Write routes.json - array of route objects with slug + site.
  // `type: none` keeps an item in data.json but generates no route: those pages
  // own a hand-written file route in src/routes/.
  // seiten (client previews) is left out on purpose: routes.json ships in the
  // client bundle, and its slugs name the clients. Those pages resolve through
  // a catch-all route instead (src/app.tsx).
  const routes = Object.entries(metadata)
    .filter(([_, item]) => item.type !== "none" && item.site !== "seiten")
    .map(([slug, item]) => ({ slug, site: item.site }));
  const routesJson = JSON.stringify(routes, null, 2);
  writeFileSync(join(process.cwd(), "routes.json"), routesJson);
  console.log(`[CON] 🗺️  generated ${routes.length} routes`);

  // Write redirects.json - map of aliases to slugs
  const redirects: Record<string, string> = {};
  for (const [slug, item] of Object.entries(metadata)) {
    if (item.alias) {
      // Handle both string and array of aliases
      const aliases = Array.isArray(item.alias) ? item.alias : [item.alias];
      for (const alias of aliases) {
        if (alias === slug) {
          console.log(`[CON] ⚠️  alias identical to slug: "${alias}"`);
        }
        redirects[alias] = slug;
      }
    }
  }
  const redirectsJson = JSON.stringify(redirects, null, 2);
  writeFileSync(join(process.cwd(), "redirects.json"), redirectsJson);
  console.log(`[CON] 🔀 generated ${Object.keys(redirects).length} redirects`);

  console.log("[CON] 🏁 done");
}

run();
