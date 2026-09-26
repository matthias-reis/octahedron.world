import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createPageCode } from "../src/sites/seiten/access";

/**
 * A client link for a seiten page, from the command line:
 *
 *   pnpm seiten-link <slug> [hours=48] [base=https://seiten.mreis.me]
 *
 * Needs the same SEITEN_SECRET as production in the environment — otherwise
 * the code is signed with the dev fallback and won't open anything live.
 * The admin overview on seiten.mreis.me does the same with a click.
 */

const [slug, hoursArg = "48", base = "https://seiten.mreis.me"] =
  process.argv.slice(2);
if (!slug) {
  console.error("usage: pnpm seiten-link <slug> [hours] [base-url]");
  process.exit(1);
}

const data = JSON.parse(
  readFileSync(join(process.cwd(), "data.json"), "utf-8"),
) as Record<string, { site?: string; access?: number }>;
const item = data[slug];
if (item?.site !== "seiten") {
  console.error(`no seiten page "${slug}" — run pnpm content first?`);
  process.exit(1);
}

const code = createPageCode(slug, item.access ?? 1, Number(hoursArg));
if (!code) {
  console.error("SEITEN_SECRET missing");
  process.exit(1);
}
console.log(`${base}/${slug}?k=${code.code}`);
console.log(
  `Code ${code.code} · gültig bis ${code.expires.toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`,
);
