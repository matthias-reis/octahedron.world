import { query } from '@solidjs/router';
import { ItemMeta } from '~/types';

export const getRoute = query(async (slug: string) => {
  'use server';
  const { readFile } = await import('fs/promises');
  const { join } = await import('path');

  const dataPath = join(process.cwd(), 'data.json');
  const fileContent = await readFile(dataPath, 'utf-8');
  const data = JSON.parse(fileContent) as Record<string, ItemMeta>;

  return data[slug] || null;
}, 'route');

export async function getRedirect(slug: string) {
  'use server';
  const { readFile } = await import('fs/promises');
  const { join } = await import('path');

  const dataPath = join(process.cwd(), 'data.json');
  const fileContent = await readFile(dataPath, 'utf-8');
  const data = JSON.parse(fileContent) as Record<string, ItemMeta>;

  const redirects = Object.fromEntries(
    Object.values(data).map((item) => [item.alias, item.slug])
  );

  return redirects[slug] || null;
}

export async function getAllRoutes() {
  'use server';
  const { readFile } = await import('fs/promises');
  const { join } = await import('path');

  const dataPath = join(process.cwd(), 'data.json');
  const fileContent = await readFile(dataPath, 'utf-8');
  const data = JSON.parse(fileContent) as Record<string, ItemMeta>;

  return Object.values(data);
}

export const getAllRoutesForOverview = query(async () => {
  'use server';
  const { readFile } = await import('fs/promises');
  const { join } = await import('path');

  const dataPath = join(process.cwd(), 'data.json');
  const fileContent = await readFile(dataPath, 'utf-8');
  const data = JSON.parse(fileContent) as Record<string, ItemMeta>;

  return Object.values(data).map(({ slug, title, group, layout }) => ({
    slug,
    title,
    group,
    layout,
  }));
}, 'all-routes-overview');
