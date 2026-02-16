import { JSX } from 'solid-js';

export const Typography = {
  h1: (props: any) => (
    <h3 class="text-4xl text-cad2 font-octa font-bold mt-7 mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h4 class="text-3xl text-cad2 font-bold font-octa mt-5 mb-4" {...props} />
  ),
  p: (props: any) => <p class="my-2 leading-relaxed text-can1" {...props} />,
  ul: (props: any) => (
    <ul class="list-disc list-outside ml-6 text-can1" {...props} />
  ),
  ol: (props: any) => (
    <ol class="list-decimal list-outside ml-6 text-can1" {...props} />
  ),
  li: (props: any) => <li class="my-1 leading-relaxed" {...props} />,
  strong: (props: any) => <strong class="font-bold text-cw" {...props} />,
  em: (props: any) => <em class="font-italic" {...props} />,
  a: (props: any) => <a class="text-saturated-500 underline" {...props} />,
  hr: (props: any) => <hr class="my-6 w-2/3 mx-auto border-cad5" {...props} />,
  img: (props: any) => (
    <img
      class="my-6 mx-auto rounded-lg shadow-md select-none"
      src={
        props.src?.startsWith('http') ? props.src : `/img/${props.src}/l.jpg`
      }
      alt={props.alt}
      draggable={false}
    />
  ),
};
