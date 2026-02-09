import { JSX } from 'solid-js';

export const Typography = {
  h1: (props: any) => (
    <h3
      class="text-4xl text-decent-600 font-octa font-bold mt-7 mb-6"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h4
      class="text-3xl text-decent-600 font-bold font-octa mt-5 mb-4"
      {...props}
    />
  ),
  p: (props: any) => <p class="my-2 leading-relaxed" {...props} />,
  ul: (props: any) => <ul class="list-disc list-outside ml-6" {...props} />,
  ol: (props: any) => <ol class="list-decimal list-outside ml-6" {...props} />,
  li: (props: any) => <li class="my-1 leading-relaxed" {...props} />,
  strong: (props: any) => <strong class="font-bold" {...props} />,
  em: (props: any) => <em class="font-italic" {...props} />,
  a: (props: any) => <a class="text-saturated-500 underline" {...props} />,
  img: (props: any) => (
    <img
      class="my-6 mx-auto rounded-lg shadow-md select-none"
      src={
        props.src?.startsWith('http') ? props.src : `/img/${props.src}/l.jpg`
      }
      draggable={false}
    />
  ),
};
