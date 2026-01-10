import { glob } from 'glob';
import { join } from 'node:path';
import { readFile, writeFileSync } from 'node:fs';
import { promisify } from 'node:util';
import frontmatter from 'front-matter';
import { FrontMatter, ItemMeta, Sec } from '~/types';

const read = promisify(readFile);

async function fm<T>(file: string) {
  const raw = await read(file, 'utf8');
  return frontmatter<T>(raw);
}

function parseContent(s: string): Sec[] {
  s = s
    .trim()
    .replace(/==> <(.*)> (.*)/g, '\n---\n{"type": "$1","payload": "$2"}\n---\n')
    .replace(/==> (.*)/g, '\n---\n{"type": "link","payload": "$1"}\n---\n');
  const sections = s
    .split('---')
    .map((section) => {
      const plainSection = section.trim();
      if (plainSection.startsWith('{') && plainSection.endsWith('}')) {
        return JSON.parse(plainSection);
      } else if (plainSection) {
        return { type: 'text', payload: plainSection };
      } else {
        return null;
      }
    })
    .filter(Boolean);
  return sections;
}

function wordCount(sections: Sec[]) {
  return sections.reduce(
    (acc, s) => {
      if (s.type === 'text' && s.payload) {
        acc.words += s.payload.split(' ').length;
        acc.chars += s.payload.length;
      }
      return acc;
    },
    { words: 0, chars: 0 }
  );
}

async function getMetaData(): Promise<Record<string, ItemMeta>> {
  const metaData = {} as Record<string, ItemMeta>;

  const files = await glob('_content/**/*.md', {
    cwd: process.cwd(),
    absolute: true,
  });

  for (const file of files) {
    const frontmatterData = await fm<FrontMatter>(file);
    const sections = parseContent(frontmatterData.body);
    const meta: ItemMeta = {
      ...frontmatterData.attributes,
      sections,
      ...wordCount(sections),
    };
    if (meta.title) {
      metaData[meta.slug] = meta;
      console.log(`[CON] 📄 <${meta.group}> ${meta.slug} | ${meta.title}`);
    }
  }
  return metaData;
}

async function run() {
  console.log('[CON] start');
  const metadata = await getMetaData();

  // Write data.json
  const json = JSON.stringify(metadata, null, 2);
  writeFileSync(join(process.cwd(), 'data.json'), json);

  // Write routes.json - array of all slugs
  const routes = Object.keys(metadata);
  const routesJson = JSON.stringify(routes, null, 2);
  writeFileSync(join(process.cwd(), 'routes.json'), routesJson);
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
  writeFileSync(join(process.cwd(), 'redirects.json'), redirectsJson);
  console.log(`[CON] 🔀 generated ${Object.keys(redirects).length} redirects`);

  console.log('[CON] 🏁 done');
}

run();
