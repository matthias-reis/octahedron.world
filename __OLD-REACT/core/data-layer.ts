import { ItemMeta } from './types';
import rawMetaData from './data-layer.json';

const metaData = rawMetaData as Record<string, ItemMeta>;

const byDate = (a: ItemMeta, b: ItemMeta) =>
  new Date(b.date || '').getTime() - new Date(a.date || '').getTime();

const byRandom = (a: ItemMeta, b: ItemMeta) => 0.5 - Math.random();

export function getAllItems() {
  return Object.values(metaData).sort(byDate);
}

export function getPublicItems() {
  return getAllItems()
    .filter((i) => !i.hidden)
    .filter((i) => (i.language ?? 'en') !== 'de');
}

export function getStories() {
  return getPublicItems().filter((i) => i.type === 'storyline');
}

export function getPosts() {
  return getPublicItems().filter((i) => i.type === 'post');
}

export function getImages() {
  return getPublicItems().filter((i) => i.type === 'image');
}

export const getTopItems = () => {
  const images = getImages().sort(byRandom);
  const stories = getStories().sort(byRandom);
  const posts = getPosts();
  const ret = Array(63).fill(null);

  ret[2] = [images[0], 3];
  ret[14] = [images[1], 2];
  ret[25] = [images[2], 2];
  ret[39] = [images[3], 3];
  ret[47] = [images[4], 1];

  ret[5] = [stories[0], 2];
  ret[6] = [stories[1], 2];
  ret[15] = [stories[2], 2];
  ret[26] = [stories[3], 2];
  ret[50] = [stories[4], 3];
  ret[54] = [stories[5], 1];
  ret[56] = [stories[6], 1];
  ret[60] = [stories[7], 1];

  for (let i = 0; i < ret.length; i++) {
    if (ret[i] === null) {
      ret[i] = [posts.shift(), 1];
    }
  }

  return ret;
};

export function getItem(slug: string) {
  return metaData[slug];
}

export const getItemsBySlugs = (slugs: string[]) =>
  slugs.map(getItem).filter(Boolean).sort(byDate);

export const getItemsByCategory = (category?: string) =>
  category
    ? getPublicItems()
        .filter((i) => i.category === category)
        .sort(byDate)
    : [];

export function getTags() {
  const tags = {} as Record<string, ItemMeta[]>;

  for (const item of getPublicItems()) {
    for (const tag of item.tags ?? []) {
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(item);
    }
  }

  return Object.entries(tags)
    .map(([name, items]) => {
      return {
        name,
        slug: slugify(name),
        count: items.length,
        items,
      };
    })
    .sort((a, b) => b.count - a.count);
}

export function getTagByTagSlug(slug: string) {
  const tags = Object.fromEntries(getTags().map((t) => [t.slug, t]));
  return tags[slug];
}

export function getTagsByTagSlugs(tagNames: string[]) {
  const tags = Object.fromEntries(getTags().map((t) => [t.slug, t]));
  const slugs = tagNames.map(slugify);
  return slugs.map((slug) => tags[slug]).filter(Boolean);
}

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-');
}
