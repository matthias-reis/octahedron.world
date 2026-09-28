import { readFile, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { promisify } from "node:util";
import { glob } from "glob";
import { parse } from "hast-mds";
import type { Site } from "~/site/context";
import type { ItemMeta } from "~/types";
import { validateMicrosite } from "./validate-microsite";

const read = promisify(readFile);

function deriveSite(file: string, explicit: unknown): Site {
  // An explicit `site:` key in the MDS global scope overrides the folder rule.
  if (explicit === "mreis" || explicit === "octahedron" || explicit === "seiten") {
    return explicit;
  }
  const rel = relative(join(process.cwd(), "_content"), file);
  if (rel.startsWith(`seiten${sep}`)) return "seiten";
  return rel === "mreis" || rel.startsWith(`mreis${sep}`)
    ? "mreis"
    : "octahedron";
}

async function getMetaData(): Promise<Record<string, ItemMeta>> {
  const metaData = {} as Record<string, ItemMeta>;

  const files = await glob("_content/**/*.md", {
    cwd: process.cwd(),
    absolute: true,
  });

  for (const file of files) {
    const raw = await read(file, "utf8");
    const trimmed = raw.trimStart();

    if (!trimmed.startsWith("```")) {
      console.error(
        `[CON] ❌ not an MDS file: ${file} — every file in _content/ must open with a \`\`\`yaml @@ global scope`,
      );
      process.exit(1);
    }

    // Parse with hast-mds (server-side)
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

    const meta: ItemMeta = {
      ...(result.global as any),
      site: deriveSite(file, (result.global as any).site),
      mds: result,
    };

    if (!meta.title) {
      console.error(
        `[CON] ❌ missing \`title\` in the global scope of: ${file} — a page without a title cannot be published`,
      );
      process.exit(1);
    }

    if (meta.type === "microsite") {
      const problems = validateMicrosite(
        result,
        result.global as Record<string, unknown>,
      );
      if (problems.length > 0) {
        console.error(
          `[CON] ❌ microsite rules broken in: ${file}\n${problems.map((p) => `        - ${p}`).join("\n")}`,
        );
        process.exit(1);
      }
    }

    const existing = metaData[meta.slug];
    if (existing && existing.site !== meta.site) {
      console.error(
        `[CON] ❌ cross-site slug collision: "${meta.slug}" exists for ${existing.site}, skipping ${meta.site} entry from ${file}`,
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
