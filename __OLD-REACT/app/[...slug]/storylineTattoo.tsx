import Link from 'next/link';
import { Item } from '../../comp/item';
import { Boxed, Grid, GridItem, ReadBoxed, Section } from '../../comp/sections';
import { Tag, TagList } from '../../comp/tag';
import { getTagsByTagSlugs } from '../../core/data-layer';
import { getMonthName, getYearSpan } from '../../core/date-helpers';
import type { Layout } from './types';
import { LayoutFrame } from '../../comp/layout-frame';
import { PropsWithChildren } from 'react';

export const storylineTattooLayout: Layout = {
  components: {
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="font-bold font-condensed text-5xl md:text-6xl text-decent-500 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h2 className="font-light uppercase text-3xl tracking-wider text-decent-700 mb-6">
        {children}
      </h2>
    ),
    image: ({ payload }: PropsWithChildren<{ payload?: string }>) => (
      <img
        alt="Tattoo Photography"
        src={`/tattoos/${payload}.jpeg`}
        className="w-7/12 sm:w-6/12 md:w-4/12 mx-auto sm:float-right clear-both ml-3 my-4"
      />
    ),
  },
  Main: ({ item, sections, categoryItems, relatedItems }) => (
    <LayoutFrame className={item.colorSpace} withTextLogo>
      <div className="bg-[#132432]">
        <div className="text-center relative">
          <img
            src={`/img/${item.image || item.slug}-l.jpg`}
            alt={item.title}
            className="object-contain w-full z-0 mt-6 mb-8"
          />
          <div className="hidden">
            <h1>{item.title}</h1>
            {item.subTitle && <p>{item.subTitle}</p>}
          </div>
        </div>

        <p className="text-decent-600 text-lg max-w-lg mx-auto mb-7">
          {item.description}
        </p>

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
          Released between{' '}
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
      </div>
    </LayoutFrame>
  ),
};
