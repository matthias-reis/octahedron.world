import { existsSync } from "node:fs";
import { join } from "node:path";
import type { HastParseResult } from "hast-mds";

/**
 * Publishing rules for `type: microsite` pages (see
 * src/renderers/microsite/CLAUDE.md): a clean heading outline for search,
 * a complete sharing card, and every referenced image present on disk.
 * Returns human-readable problems; an empty list means the page is fine.
 */

type Node = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};

function walk(node: Node, visit: (n: Node) => void) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

function blockData(node: Node): Record<string, unknown> {
  const raw = node.properties?.data;
  if (typeof raw !== "string") return {};
  try {
    const data = JSON.parse(raw);
    return typeof data === "object" && data !== null ? data : {};
  } catch {
    return {};
  }
}

export function validateMicrosite(
  mds: HastParseResult,
  global: Record<string, unknown>,
): string[] {
  const problems: string[] = [];
  const slug = String(global.slug ?? "");
  const dir = join(process.cwd(), "_content", "mreis", slug);
  const exists = (file: unknown) =>
    typeof file === "string" && existsSync(join(dir, file));

  if (!slug.startsWith("p/")) {
    problems.push(`slug must start with "p/", got "${slug}"`);
  }

  // --- sharing card ---
  const og = (global.og ?? {}) as Record<string, unknown>;
  if (typeof global.description !== "string" || !global.description.trim()) {
    problems.push("`description` is required (meta + og:description)");
  }
  if (!og.image) {
    problems.push("`og.image` is required — a 1200×630 JPEG next to the page");
  } else if (!String(og.image).endsWith(".jpg")) {
    problems.push("`og.image` must be a .jpg");
  } else if (!exists(og.image)) {
    problems.push(`og image not found: ${join(dir, String(og.image))}`);
  }

  const brand = (global.brand ?? {}) as Record<string, unknown>;
  if (brand.logo !== undefined && !exists(brand.logo)) {
    problems.push(`logo not found: ${join(dir, String(brand.logo))}`);
  }

  // --- heading outline + images ---
  let h1Count = 0;
  let previous = 0;
  const steps = Object.values(mds.steps);

  steps.forEach((step, index) => {
    let firstHeading: number | undefined;

    const visual = (step.local as Record<string, unknown>).visual as
      | Record<string, unknown>
      | undefined;
    if (visual) {
      if (!exists(visual.src)) {
        problems.push(
          `section "${step.id}": visual not found: ${String(visual.src)}`,
        );
      }
      if (typeof visual.alt !== "string" || !visual.alt.trim()) {
        problems.push(`section "${step.id}": visual needs an \`alt\``);
      }
    }

    walk(step.body.node as Node, (node) => {
      if (node.type !== "element" || !node.tagName) return;

      const level = /^h([1-6])$/.exec(node.tagName)?.[1];
      if (level) {
        const n = Number(level);
        firstHeading ??= n;
        if (n === 1) h1Count++;
        if (previous && n > previous + 1) {
          problems.push(
            `section "${step.id}": h${n} follows h${previous} — no skipped levels`,
          );
        }
        previous = n;
      }

      if (node.tagName === "image") {
        const data = blockData(node);
        if (!exists(data.src)) {
          problems.push(
            `section "${step.id}": image not found: ${String(data.src)}`,
          );
        }
        if (typeof data.alt !== "string" || !data.alt.trim()) {
          problems.push(
            `section "${step.id}": image ${String(data.src)} needs an \`alt\``,
          );
        }
      }
    });

    if (index === 0 && firstHeading !== 1) {
      problems.push(`the first section ("${step.id}") must open with the h1`);
    }
    if (index > 0 && firstHeading !== undefined && firstHeading !== 2) {
      problems.push(
        `section "${step.id}" must open with an h2, not h${firstHeading}`,
      );
    }
  });

  if (h1Count !== 1) {
    problems.push(`exactly one h1 per page, found ${h1Count}`);
  }

  return problems;
}
