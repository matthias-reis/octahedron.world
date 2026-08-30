import { A } from "@solidjs/router";
import { Download } from "lucide-solid";
import { For } from "solid-js";
import { ButtonLink, Buttons } from "~/ui/button";
import { Chips } from "~/ui/chips";
import { Head } from "~/ui/head";
import { LinkBox } from "~/ui/link-box";
import { H1, H2, H3 } from "../typography";

const skillsData = [
  {
    title: "Core Stack",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Remix",
      "Solid.js / SolidStart",
    ],
  },
  {
    title: "Styling, UX, Content",
    skills: ["Tailwind", "Advanced CSS", "Styled Components", "A11y", "SEO"],
  },
  {
    title: "Full Stack & APIs",
    skills: [
      "GraphQL",
      "REST",
      "tRPC / RPC",
      "Serverless",
      "TypeScript Backends",
      "Postgres",
      "MongoDB",
    ],
  },
  {
    title: "Infrastructure & CI",
    skills: ["GitHub Actions", "Vercel", "Coolify", "Firebase"],
  },
  {
    title: "Specials",
    skills: ["Markdown Pipelines", "Asset Optimisation (SVGO, Sharp)"],
  },
  {
    title: "Soft Skills",
    skills: ["Project Organisation", "People Management", "Agile"],
  },
];

const referencesData = [
  {
    title: "Bio für Kinder",
    url: "https://biospeiseplan.de",
    content:
      "SaaS platform for caterers: organic meal and cooking plans for kindergartens & schools — including cost and nutritional aggregation, shopping organisation, and an instance of Tina CMS for content and workshop management.",
    imageUrl: "/reference/biospeiseplan.jpg",
  },
  {
    title: "Sounds Vegan",
    url: "https://soundsvegan.com",
    content:
      "Music & lifestyle blog with band interviews, editorial content, and sustainability focus — built with react.js and Payload CMS, a custom fuzzy search and a lot of on-page SEO aspects.",
    imageUrl: "/reference/soundsvegan.jpg",
  },
  {
    title: "commonspace (in progress)",
    url: "https://commonspace.tech",
    content:
      "Open Source and federated social network for small groups built on the AT Protocol (Bluesky). Exploring decentralised identity, federated data, and modern social UX patterns.",
    imageUrl: "/reference/mosquito-social.jpg",
  },
  {
    title: "Octahedron World",
    url: "https://octahedron.world",
    content:
      "Constantly growing collection of short stories and digital experiments. One SolidStart app now serves two domains from a single content pipeline, whose building blocks — hast-mds and solid-mds — are published on npm.",
    imageUrl: "/reference/octahedron.jpg",
  },
];

export default function MreisPortfolio() {
  return (
    <main class="max-w-4xl mx-auto p-sxl">
      <Head
        title="Portfolio"
        description="Concept, web architecture, full stack engineering and consulting — selected freelance references of Matthias Reis."
      />

      <section class="space-y-slg mb-s2xl">
        <H1 class="!mb-smd">Project Portfolio</H1>
        <p>Concept ⋅ Web Architecture ⋅ Full Stack Engineering ⋅ Consulting</p>
        <p class="text-xl leading-relaxed">
          <A
            href="/cv"
            class="hover:underline underline-offset-2 text-col-hi-bg outline-offset-2 outline-col-hi-bg focus:outline-2"
          >
            In my main role
          </A>{" "}
          I lead the web frontend engineering team at XING.com, owning the full
          frontend layer of a high-scale application serving 300+ server-side
          rendered requests per second.
        </p>
        <p class="text-xl leading-relaxed">
          My freelance projects benefit directly from this: architectural
          thinking, production mindset, and real hands-on implementation — zero
          handoff friction.
        </p>
        <Buttons>
          <ButtonLink
            variant="secondary"
            href="/reference/portfolio.pdf"
            download="Matthias_Reis_Portfolio.pdf"
          >
            <Download class="w-[1.25rem] h-[1.25rem]" />
            Download PDF
          </ButtonLink>
          <ButtonLink href="/contact">Let's talk</ButtonLink>
        </Buttons>
      </section>

      <div class="mb-s3xl">
        <section class="space-y-sxl mb-s3xl">
          <H2 class="!mt-0">Skills & Expertise</H2>
          <div class="space-y-sxl max-w-3xl">
            <For each={skillsData}>
              {(category) => (
                <div class="space-y-ssm">
                  <H3 class="mb-ssm">{category.title}</H3>
                  <Chips
                    items={category.skills}
                    class="leading-relaxed text-col-fg-muted"
                  />
                </div>
              )}
            </For>
          </div>
        </section>

        <section class="space-y-sxl">
          <H2 class="!mt-0">Selected References</H2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-sxl">
            <For each={referencesData}>
              {(ref) => (
                <LinkBox
                  variant="card"
                  external
                  href={ref.url}
                  title={ref.title}
                  description={ref.content}
                  image={ref.imageUrl}
                  meta={
                    <span class="text-col-fg-muted text-sm">{ref.url}</span>
                  }
                />
              )}
            </For>
          </div>
        </section>
      </div>
    </main>
  );
}
