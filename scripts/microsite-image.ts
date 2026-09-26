import { mkdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import sharp from "sharp";

/**
 * Turns a source image into a microsite's optimised assets, next to the page:
 * `_content/mreis/p/<page>/`.
 *
 *   pnpm ms-image <input> <page> <name>          → <name>.webp (≤1600w) + <name>-800.webp
 *   pnpm ms-image <input> <page> <name> --wide   → <name>.webp (≤2400w) + <name>-800.webp (1200w), for full-bleed backdrops
 *   pnpm ms-image <input> <page> <name> --logo   → <name>.webp (≤480w, alpha kept)
 *   pnpm ms-image <input> <page> og --og         → og.jpg (1200×630, cropped)
 *
 * The renderer picks the files up through `import.meta.glob` (see
 * src/renderers/microsite/assets.ts), so they ship fingerprinted.
 */

const [input, page, name, ...flags] = process.argv.slice(2);

if (!input || !page || !name) {
  console.error(
    "usage: pnpm ms-image <input> <page> <name> [--wide | --logo | --og] [--position <sharp position>]",
  );
  process.exit(1);
}

const positionFlag = flags.indexOf("--position");
const position =
  positionFlag >= 0 ? (flags[positionFlag + 1] ?? "attention") : "attention";

const dir = join(process.cwd(), "_content", "mreis", "p", page);
mkdirSync(dir, { recursive: true });

function report(file: string) {
  const kb = (statSync(file).size / 1024).toFixed(0);
  console.log(
    `[IMG] ${join("_content/mreis/p", page, basename(file))} ${kb} kB`,
  );
}

async function webp(width: number, file: string, quality: number) {
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(file);
  report(file);
}

if (flags.includes("--og")) {
  const file = join(dir, "og.jpg");
  await sharp(input)
    .rotate()
    .resize(1200, 630, { fit: "cover", position })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(file);
  report(file);
} else if (flags.includes("--wide")) {
  // The small variant keeps the `-800` name so the srcset helper finds it.
  await webp(2400, join(dir, `${name}.webp`), 72);
  await webp(1200, join(dir, `${name}-800.webp`), 72);
} else if (flags.includes("--logo")) {
  await webp(480, join(dir, `${name}.webp`), 90);
} else {
  await webp(1600, join(dir, `${name}.webp`), 76);
  await webp(800, join(dir, `${name}-800.webp`), 76);
}
