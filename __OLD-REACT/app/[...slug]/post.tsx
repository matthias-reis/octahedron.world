import { PropsWithChildren } from 'react';
import { Item } from '../../comp/item';
import { LayoutFrame } from '../../comp/layout-frame';
import { Boxed, Grid, GridItem, ReadBoxed, Section } from '../../comp/sections';
import { Tag, TagList } from '../../comp/tag';
import { getItem, getTagsByTagSlugs } from '../../core/data-layer';
import { getFormattedDate } from '../../core/date-helpers';
import type { Layout } from './types';

export const postLayout: Layout = {
  components: {
    h1: ({ children }: PropsWithChildren) => (
      <h1 className="font-condensed font-bold text-5xl md:text-6xl text-decent-900 uppercase mt-8 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="font-bold font-condensed text-4xl md:text-3xl text-decent-900 mt-6 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h2 className="font-bold font-condensed text-4xl md:text-xl text-decent-900 mt-4 mb-4">
        {children}
      </h2>
    ),
    item: ({ payload }: PropsWithChildren<{ payload?: string }>) => {
      const other = getItem(payload || '');
      return <Item meta={other} />;
    },
  },
  Main: ({ item, sections, categoryItems, relatedItems }) => (
    <LayoutFrame className={item.colorSpace} withTextLogo>
      <div className="justify-center items-center bg-decent-300 mb-7 aspect-wide relative w-full">
        <div className="relative flex flex-col justify-center items-center z-10 aspect-wide bg-darkened w-full">
          <div className="text-decent-600 text-xl font-light font-condensed uppercase tracking-wider">
            {item.date && (
              <span>
                <strong className="font-bold">
                  {getFormattedDate(new Date(item.date))}
                </strong>{' '}
              </span>
            )}
            {item.category && (
              <span>
                in category{' '}
                <strong className="font-bold">{item.category}</strong>
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-condensed font-bold">
            {item.title}
          </h1>
          {item.subTitle && (
            <div className="text-decent-600 text-xl font-light uppercase tracking-wider">
              {item.subTitle}
            </div>
          )}
        </div>
        <img
          src={`/img/${item.image}-l.jpg`}
          alt={item.title}
          className="top-[0] object-contain w-full absolute z-0 max-h-[34rem] shadow-xl shadow-decent-100"
        />
      </div>
      {sections.map((section, i) => (
        <ReadBoxed key={i}>{section}</ReadBoxed>
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
      {categoryItems && categoryItems.length > 1 && (
        <Section headline={`Posts in Category ${item.category?.toUpperCase()}`}>
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
        <Section headline="Related Posts">
          <Grid>
            {relatedItems.map((item) => (
              <GridItem key={item.slug}>
                <Item meta={item} />
              </GridItem>
            ))}
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
