import { readFile, writeFileSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";
import { glob } from "glob";
import { parse } from "hast-mds";
import type { ItemMeta } from "~/types";

const read = promisify(readFile);

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
      console.log(`[CON] ⚠️  Skipping non-MDS file: ${file}`);
      continue;
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
      ]),
    );
    if (!result.global) {
      console.log(`[CON] ⚠️  No MDS Global Scope found in: ${file}`);
      continue;
    }

    const meta: ItemMeta = {
      ...(result.global as any),
      mds: result,
    };

    if (meta.title) {
      metaData[meta.slug] = meta;
      console.log(
        `[CON] 📄 <${meta.type || "default"}> ${meta.slug} | ${meta.title}`,
      );
    }
  }
  return metaData;
}

async function run() {
  console.log("[CON] start");
  const metadata = await getMetaData();

  // Write data.json
  const json = JSON.stringify(metadata, null, 2);
  writeFileSync(join(process.cwd(), "data.json"), json);

  // Write routes.json - array of route objects with slug only (all are MDS now)
  const routes = Object.entries(metadata)
    .filter(([_, item]) => item.type !== "none")
    .map(([slug]) => ({ slug }));
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
