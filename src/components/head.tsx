import { Title, Meta } from '@solidjs/meta';
import { Component } from 'solid-js';
import { largeImageUrl } from './image-helpers';

export const Head: Component<{
  title?: string;
  description?: string;
  image?: string;
}> = ({
  title = 'Welcome',
  description = 'Ephemeral Thoughts about Life, the Universe and Everything...',
  image = '_home',
}) => (
  <>
    <Title>{title} | OCTAHEDRON ◆ WORLD</Title>
    <Meta name="description" content={description} />
    <Meta
      property="og:title"
      content={title === 'Welcome' ? 'OCTAHEDRON ◆ WORLD' : title}
    />
    <Meta property="og:description" content={description} />
    <Meta property="og:image" content={largeImageUrl(image)} />
  </>
);
