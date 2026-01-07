import Link from 'next/link';
import { Item } from '../../comp/item';
import { Boxed, Grid, GridItem, ReadBoxed, Section } from '../../comp/sections';
import { Tag, TagList } from '../../comp/tag';
import { getTagsByTagSlugs } from '../../core/data-layer';
import { getMonthName, getYearSpan } from '../../core/date-helpers';
import type { Layout } from './types';
import { LayoutFrame } from '../../comp/layout-frame';
import { PropsWithChildren } from 'react';

export const storylineLayout: Layout = {
  components: {
    h1: ({ children }: PropsWithChildren) => (
      <h1 className="font-condensed font-bold text-5xl md:text-8xl text-decent-900 uppercase mb-3">
        {children}
      </h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="font-bold font-condensed text-4xl md:text-5xl text-decent-900 mt-7 mb-4">
        {children}
      </h2>
    ),
  },
  Main: ({ item, sections, categoryItems, relatedItems }) => (
    <LayoutFrame className={item.colorSpace} withTextLogo>
      <div className="text-center mb-5">
        <p className="text-decent-600 text-xl uppercase tracking-wider mb-5">
          {item.language === 'de' && '🇩🇪  '}
          {item.superTitle}
          {item.unfinished && ' (in the making)'}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif">
          {item.title}
        </h1>
        {item.subTitle && (
          <p className="text-decent-600 text-xl mt-4">{item.subTitle}</p>
        )}
      </div>
      {item.description && (
        <p className="text-decent-700 text-lg text-center max-w-xl mx-auto">
          {item.description}
        </p>
      )}
      <img
        src={`/img/${item.image || item.slug}-l.jpg`}
        alt={item.title}
        className="object-contain w-full max-w-3xl mx-auto z-0 mt-6 mb-8"
      />
      {item.language === 'de' && item.ref && (
        <Boxed className="text-right mb-5">
          <Link
            href={`/${item.ref}`}
            className="text-decent-600 hover:text-decent-700"
          >
            🇬🇧 English version available
          </Link>
        </Boxed>
      )}
      {item.language === 'en' && item.ref && (
        <Boxed className="text-right mb-5">
          <Link
            href={`/${item.ref}`}
            className="text-decent-600 hover:text-decent-700"
          >
            🇩🇪 Deutsche Version verfügbar
          </Link>
        </Boxed>
      )}
      {item.unfinished && (
        <Boxed className="text-right">
          <p className="w-5/12 ml-auto mb-6">
            This storyline is not yet finished. Some chapters are missing. If
            you return regularly, you can jump to the{' '}
            <a
              href="#end"
              className="text-decent-600 underline underline-offset-4 hover:text-decent-700"
            >
              last&nbsp;part
            </a>{' '}
            to see the previously added changes.
          </p>
        </Boxed>
      )}
      {sections.map((section, i) => (
        <ReadBoxed
          key={i}
          Component="section"
          id={i === sections.length - 1 ? 'end' : `part-${i}`}
          className={item.unfinished ? 'last-of-type:bg-decent-300' : ''}
        >
          {section}
        </ReadBoxed>
      ))}
      <ReadBoxed className="mt-7">
        <p>{}</p>
      </ReadBoxed>
      {item.tags && (
        <ReadBoxed className="mt-7">
          <TagList className="mt-5">
            {getTagsByTagSlugs(item.tags).map((tag) => (
              <Tag key={tag.slug} tag={tag} />
            ))}
          </TagList>
        </ReadBoxed>
      )}
      <hr className="w-1/2 mx-auto my-6 border-decent-300" />
      <Boxed className="text-center text-decent-500">
        {item.words} words released between{' '}
        {getMonthName(new Date(item.startDate || Date.now()))} and{' '}
        {getMonthName(new Date(item.date || Date.now()))}
        <br />©{' '}
        {getYearSpan(
          new Date(item.startDate || Date.now()),
          new Date(item.date || Date.now())
        )}{' '}
        Octahedron World, Matthias Reis
      </Boxed>
      <hr className="w-1/2 mx-auto my-6 border-decent-300" />
      {categoryItems && categoryItems.length > 1 && (
        <Section
          headline={`Other Posts in Category ${item.category?.toUpperCase()}`}
        >
          <Grid>
            {categoryItems.map((item) => (
              <GridItem key={item.slug}>
                <Item meta={item} />
              </GridItem>
            ))}
            {Array(3 - (categoryItems.length % 3))
              .fill('')
              .map((_, i) => (
                <GridItem key={i} />
              ))}
          </Grid>
        </Section>
      )}
      {relatedItems && relatedItems.length > 0 && (
        <Section headline="Related Pages">
          <Grid>
            {relatedItems.map((item) => {
              return (
                <GridItem key={item.slug}>
                  <Item meta={item} />
                </GridItem>
              );
            })}
            {Array(3 - (relatedItems.length % 3))
              .fill('')
              .map((_, i) => (
                <GridItem key={i} />
              ))}
          </Grid>
        </Section>
      )}
    </LayoutFrame>
  ),
};
