import { glob } from 'glob';
import { join, parse } from 'path';
import { FrontMatter, ItemMeta } from './types';
import { fm } from './io';
import { writeFileSync } from 'fs';

function parseContent(s: string) {
  s = s
    .trim()
    .replace(/==> <(.*)> (.*)/g, '\n---\n{"type": "$1","payload": "$2"}\n---\n')
    .replace(/==> (.*)/g, '\n---\n{"type": "link","payload": "$1"}\n---\n');
  const sections = s
    .split('---')
    .map((section) => section.trim())
    .filter(Boolean);
  return sections;
}

function wordCount(sections: string[]) {
  return sections.reduce((acc, section) => {
    if (!section.startsWith('@@')) {
      acc += section.split(' ').length;
    }
    return acc;
  }, 0);
}

function refineMeta(item: Omit<ItemMeta, 'words'>): ItemMeta {
  const words = wordCount(
    item.sections.filter((s) => typeof s === 'string') as string[]
  );
  const sections = item.sections.map((s) => {
    const section = typeof s === 'string' ? s.trim() : '';
    if (section.startsWith('{"')) {
      return JSON.parse(section);
    } else {
      return section;
    }
  });

  if (item.type === 'storyline') {
    return { ...item, sections, words };
  }
  if (item.type === 'post') {
    return {
      ...item,
      sections,
      image: item.image || `posts/${slugify(item.category || 'General')}`,
      superTitle: 'Post',
      words,
    };
  }
  if (item.type === 'image') {
    return {
      ...item,
      sections,
      image: item.slug,
      superTitle: item.category || 'Image',
      words,
    };
  } else {
    //should not happen
    return { ...item, sections, type: 'post', words };
  }
}

async function getMetaData(): Promise<Record<string, ItemMeta>> {
  const metaData = {} as Record<string, ItemMeta>;

  // we only have md files under /content, so we can simply parse all of them first

  const files = await glob('_content/**/*.md', {
    cwd: process.cwd(),
    absolute: true,
  });

  for (const file of files) {
    const slug = file
      .replace(process.cwd() + '/_content/', '')
      .replace('.md', '')
      .replace('/index', '')
      .replace('_', '');

    const name = parse(file).name;
    const hidden = name.startsWith('_');
    const type = slug.split('/').at(0)?.slice(0, -1) as
      | 'storyline'
      | 'post'
      | 'image';
    const frontmatter = await fm<FrontMatter>(file);
    const unrefinedMeta: Omit<ItemMeta, 'words'> = {
      ...frontmatter.attributes,
      slug,
      name: name.replace('_', ''),
      type,
      hidden,
      sections: parseContent(frontmatter.body),
    };
    const meta = refineMeta(unrefinedMeta);
    if (meta.title) {
      metaData[slug] = meta;
      console.log(`[PRE] <${meta.type}> ${slug}`);
    }
  }
  return metaData;
}

async function run() {
  console.log('[PRE] start');
  const metadata = await getMetaData();
  const json = JSON.stringify(metadata, null, 2);
  writeFileSync(join(__dirname, 'data-layer.json'), json);
  console.log('[PRE] done');
}

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-');
}

run();
