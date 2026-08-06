import { createAsync } from "@solidjs/router";
import dayjs from "dayjs";
import { For, Show } from "solid-js";
import { largeImageUrl } from "~/components/image-helpers";
import { Box } from "~/ui/box";
import { ButtonLink, Buttons } from "~/ui/button";
import { Chips } from "~/ui/chips";
import { Head } from "~/ui/head";
import { LinkBox } from "~/ui/link-box";
import { getMreisPosts } from "../posts";
import { H1, H2, H3 } from "../typography";

const skillsData = [
  {
    title: "Leadership, People & Org",
    skills: [
      "Mentoring and Guidance",
      "Org & Platform Strategy",
      "Agile Development",
      "Kaizen",
      "Communication",
      "Facilitation",
      "Connection",
      "Community Management",
    ],
  },
  {
    title: "Web Technologies",
    skills: [
      "Typescript",
      "React.js",
      "Solid.js",
      "Apollo GraphQL",
      "CSS in all Flavours",
    ],
  },
  {
    title: "Solution Spaces",
    skills: [
      "Maintaining high traffic servers",
      "Complex CI flows",
      "Monorepo Management",
      "Design System and DRY",
      "Web Performance and Core Web Vitals",
    ],
  },
  {
    title: "AI and Agentic Coding",
    skills: [
      "Claude / Claude Code",
      "VS Code Copilot / GH Copilot",
      "Chat GPT / Codex",
      "Gemini / Antigravity",
    ],
  },
];

const impactData = [
  {
    title: "Frontend Monorepo & Company Wide Migration Projects",
    content: "1.4M+ lines of code, steering a community of 40+ contributors.",
  },
  {
    title: "Technical Platform Ownership",
    content:
      "Ownership of a high-traffic frontend platform delivering up to 600 req/s with server side rendering technology.",
  },
  {
    title: "Scalable Standards",
    content:
      "Establishment of robust patterns across Continuous Delivery, Design Systems and Web Performance.",
  },
];

export default function MreisHome() {
  const latestPosts = createAsync(() => getMreisPosts(2));

  return (
    <main class="max-w-4xl mx-auto px-smd">
      <Head />

      <section class="space-y-slg mb-s3xl text-center">
        <H1 class="mx-auto max-w-3xl">Engineering Lead & Software Architect</H1>
        <p class="text-xl leading-relaxed max-w-2xl mx-auto mt-sxl">
          I am an engineer with over 20 years of experience building and
          evolving high-traffic large scale web platforms. I seek leadership
          roles where I can drive technical strategy and scale engineering
          organizations.
        </p>
        <p class="text-lg leading-relaxed text-col-fg-muted max-w-2xl mx-auto">
          Proven track record in leading high-performing teams, driving and
          defining frontend architecture in high scale web platforms, and
          delivering complex company-wide technical transformations.
        </p>
        <Buttons class="justify-center">
          <ButtonLink variant="secondary" href="/cv">
            View Professional CV
          </ButtonLink>
          <ButtonLink variant="secondary" href="/portfolio">
            View Portfolio
          </ButtonLink>
          <ButtonLink href="/contact">Contact Me</ButtonLink>
        </Buttons>
      </section>

      <section class="space-y-sxl mt-s3xl">
        <H2 class="!mt-0">Skills & Expertise</H2>
        <div class="space-y-slg max-w-3xl">
          <For each={skillsData}>
            {(category) => (
              <div>
                <H3 class="!mt-0 mb-ssm">{category.title}</H3>
                <Chips
                  items={category.skills}
                  class="leading-relaxed text-col-fg-muted"
                />
              </div>
            )}
          </For>
        </div>
      </section>

      <section class="space-y-sxl mt-s3xl">
        <H2 class="!mt-0">Selected Impact</H2>
        <div class="space-y-slg max-w-3xl">
          <For each={impactData}>
            {(impact) => (
              <Box title={impact.title}>
                <p class="m-0 leading-relaxed">{impact.content}</p>
              </Box>
            )}
          </For>
        </div>
      </section>

      <Show when={latestPosts()?.length}>
        <section class="space-y-sxl mt-s3xl mb-s3xl">
          <H2 class="!mt-0">Latest Posts</H2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-sxl">
            <For each={latestPosts()}>
              {(post) => (
                <LinkBox
                  variant="card"
                  href={`/${post.slug}`}
                  title={post.title}
                  description={
                    Array.isArray(post.description)
                      ? post.description.join(" ")
                      : post.description
                  }
                  image={post.image ? largeImageUrl(post.image) : undefined}
                  meta={
                    <Show when={post.date}>
                      {(date) => (
                        <span class="text-col-fg-muted text-sm">
                          {dayjs(date()).format("D MMMM YYYY")}
                        </span>
                      )}
                    </Show>
                  }
                />
              )}
            </For>
          </div>
          <Buttons>
            <ButtonLink variant="secondary" href="/posts">
              All posts
            </ButtonLink>
          </Buttons>
        </section>
      </Show>
    </main>
  );
}
