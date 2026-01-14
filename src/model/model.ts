import { query } from '@solidjs/router';
import { CompactItemMeta, ItemMeta } from '~/types';

let cachedData: Record<string, ItemMeta> | null = null;

async function getData() {
  'use server';
  // Bypass cache in development mode for hot reloading
  if (cachedData && process.env.NODE_ENV !== 'development') {
    return cachedData;
  }

  const { readFile } = await import('fs/promises');
  const { join } = await import('path');

  const dataPath = join(process.cwd(), 'data.json');
  const fileContent = await readFile(dataPath, 'utf-8');
  cachedData = JSON.parse(fileContent) as Record<string, ItemMeta>;

  return cachedData;
}

export const getRoute = query(async (slug: string) => {
  'use server';
  const data = await getData();
  return data[slug] || null;
}, 'route');

export async function getRedirect(slug: string) {
  'use server';
  const data = await getData();

  const redirects = Object.fromEntries(
    Object.values(data).map((item) => [item.alias, item.slug])
  );

  return redirects[slug] || null;
}

export async function getAllRoutes() {
  'use server';
  const data = await getData();
  return Object.values(data);
}

export const getAllCompactRoutes: () => Promise<
  Record<string, CompactItemMeta>
> = query(async () => {
  'use server';
  const data = await getData();

  return Object.fromEntries(
    Object.entries(data).map(
      ([
        key,
        {
          slug,
          title,
          group,
          layout,
          image,
          description,
          superTitle,
          subTitle,
        },
      ]) => {
        return [
          slug,
          {
            slug,
            title,
            group,
            layout,
            image,
            description,
            superTitle,
            subTitle,
          },
        ];
      }
    )
  );
}, 'all-routes-overview');

export const getAllRootRoutes = query(async () => {
  'use server';
  const data = await getData();

  const availableItems = Object.values(data)
    .filter((item) => item.root)
    .map(({ slug, title, image, description, group, weight }) => ({
      slug,
      title,
      group,
      image,
      description,
      weight: weight ?? 0,
    }));
  return availableItems as CompactItemMeta[];
}, 'all-root-routes');
