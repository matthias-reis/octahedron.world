import { existsSync } from 'fs';
import { DynamicPageProps } from '../../../core/types';
import { redirect } from 'next/navigation';
import { fm } from '../../../core/io';
import { Boxed } from '../../../comp/sections';
import { parseMarkdown } from '../../../core/markdown';
import { getItem } from '../../../core/data-layer';
import { getFormattedTitle } from '../../../core/page-meta';
import { Metadata } from 'next';

export async function generateMetadata(
  props: DynamicPageProps
): Promise<Metadata> {
  const params = await props.params;
  const slug = params?.slug?.join('/') || '';
  const item = getItem(slug);
  if (!item) return {};
  return {
    title: getFormattedTitle(item.title),
  };
}

export default async function LegalPage(props: DynamicPageProps) {
  const params = await props.params;
  const slug = params?.slug;
  const file = `${process.cwd()}/_legal/${slug}.md`;
  if (!existsSync(file)) redirect('/');

  const frontMatter = await fm<{ title: string; superTitle?: string }>(file);

  return (
    <>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          {frontMatter.attributes.superTitle && (
            <p className="text-decent-600 text-xl font-light">
              {frontMatter.attributes.superTitle}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl">
            {frontMatter.attributes.title}
          </h1>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>
      <Boxed>
        {parseMarkdown(frontMatter.body, {
          h2: ({ children }) => (
            <h2 className="font-bold font-condensed text-3xl md:text-4xl text-decent-900 mt-6 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h2 className="font-bold font-condensed text-2xl text-decent-900 mt-5">
              {children}
            </h2>
          ),
          h4: ({ children }) => (
            <h2 className="font-bold font-condensed text-xl text-decent-900 mt-3">
              {children}
            </h2>
          ),
          p: ({ children }) => (
            <p className="text-lg font-serif leading-loose text-decent-700 mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="font-serif text-lg mb-4 list-outside list-disc text-decent-700">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="mb-3 ml-4 leading-loose">{children}</li>
          ),
          a: (props) => (
            <a className="underline underline-offset-4" {...props} />
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-decent-900">{children}</strong>
          ),
        })}
      </Boxed>
    </>
  );
}
