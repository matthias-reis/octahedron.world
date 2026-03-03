import type { Options } from "hast-util-to-jsx-runtime";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import parse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { JSX } from "solid-js";
import { unified } from "unified";
import { hastToSolidJsx } from "./hast-to-solid";

export function parseMarkdown(
  s: string,
  components?: Options["components"],
): JSX.Element {
  // Parse markdown string to MDAST (Markdown Abstract Syntax Tree)
  const mdastTree = unified()
    .use(parse)
    .use(remarkMath) // Parse LaTeX math expressions
    .parse(s);

  // Transform MDAST to HAST (HTML Abstract Syntax Tree)
  const hastTree = unified()
    .use(remarkRehype)
    .use(rehypeKatex) // Render LaTeX equations with KaTeX
    .runSync(mdastTree);

  // Convert HAST to Solid JSX elements in the component's reactive context
  return hastToSolidJsx(hastTree, components ?? undefined);
}
