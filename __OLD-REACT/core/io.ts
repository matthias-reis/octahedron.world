import { readFile } from 'fs';
import { promisify } from 'util';
import { load } from 'js-yaml';
import frontmatter from 'front-matter';

const read = promisify(readFile);

export async function yaml(file: string) {
  const raw = await read(file, 'utf8');
  return load(raw);
}

export async function fm<T>(file: string) {
  const raw = await read(file, 'utf8');
  return frontmatter<T>(raw);
}
