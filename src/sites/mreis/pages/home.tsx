import { A, createAsync } from "@solidjs/router";
import dayjs from "dayjs";
import { For, Show } from "solid-js";
import { largeImageUrl } from "~/components/image-helpers";
import { ButtonLink, Buttons } from "~/ui/button";
import { Head } from "~/ui/head";
import { LinkBox } from "~/ui/link-box";
import { getMreisPosts } from "../posts";
import { H1, H2 } from "../typography";

const inlineLink =
  "hover:underline underline-offset-2 text-col-hi-bg outline-offset-2 outline-col-hi-bg focus:outline-2";

const commonspaceFacts = [
  { value: "18,000+", label: "members" },
  { value: "180+", label: "events on the platform" },
  { value: "17", label: "hackathons since May, from Prague to Seoul" },
  { value: "45", label: "events migrated in one go" },
];

const trackRecord = [
  "Frontend monorepo with 1.4M+ lines of code and 40+ contributors at XING",
  "Owner of a server-side rendered platform delivering up to 600 requests per second",
  "Introduced React at XING and onboarded a community of 60+ frontend developers",
];

const contactLinks = [
  { href: "mailto:mr@mreis.me", label: "Email" },
  {
    href: "https://www.linkedin.com/in/matthias-reis-439992214/",
    label: "LinkedIn",
  },
  { href: "https://github.com/matthias-reis", label: "GitHub" },
];

export default function MreisHome() {
  const posts = createAsync(() => getMreisPosts(6));

  return (
    <main class="max-w-4xl mx-auto px-smd">
      <Head />

      <section class="flex flex-col md:flex-row gap-sxl md:items-center mb-s3xl">
        <img
          src="/reference/matze.jpg"
          alt="Matthias Reis"
          class="w-32 h-32 md:w-44 md:h-44 object-cover rounded-full shrink-0"
        />
        <div class="space-y-smd">
          <H1 class="!mt-0 text-4xl md:text-5xl leading-tight">
            I build digital infrastructure for events and communities.
          </H1>
          <p class="text-xl leading-relaxed">
            For 20 years I have built and run large web platforms, eleven of
            them at XING as architect and team lead. Today I am co-founder and
            CTO of{" "}
            <a href="https://commonspace.tech" class={inlineLink}>
              commonspace
            </a>
            , a platform for communities and events.
          </p>
        </div>
      </section>

      <section class="space-y-slg mb-s3xl">
        <H2 class="!mt-0">Now: commonspace</H2>
        <p class="text-lg leading-relaxed max-w-3xl">
          It started as a prototype for one hackathon in Prague. Five months
          later the platform carries meetups, conferences and hackathons across
          Europe and Asia, and organisers can run it through AI agents. I am
          responsible for its technology, from architecture to event-day
          operations.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-smd">
          <For each={commonspaceFacts}>
            {(fact) => (
              <div class="border border-col-border rounded-lg p-slg">
                <p class="m-0 font-display text-3xl font-bold">{fact.value}</p>
                <p class="m-0 text-col-fg-muted leading-snug">{fact.label}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      <Show when={posts()?.length}>
        <section class="space-y-sxl mb-s3xl">
          <div class="space-y-ssm">
            <H2 class="!mt-0">Articles</H2>
            <p class="text-lg text-col-fg-muted max-w-3xl">
              What I learn while building: architecture, AI-assisted
              engineering, social networks and the software behind events.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-sxl">
            <For each={posts()}>
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
              All articles
            </ButtonLink>
          </Buttons>
        </section>
      </Show>

      <section class="space-y-slg mb-s3xl">
        <H2 class="!mt-0">Background</H2>
        <ul class="space-y-ssm text-lg leading-relaxed max-w-3xl list-disc pl-slg">
          <For each={trackRecord}>{(line) => <li>{line}</li>}</For>
        </ul>
        <p class="text-lg leading-relaxed">
          More in my{" "}
          <A href="/about" class={inlineLink}>
            track record
          </A>{" "}
          and the{" "}
          <A href="/portfolio" class={inlineLink}>
            project portfolio
          </A>
          .
        </p>
      </section>

      <section class="mb-s3xl border-t border-col-border pt-sxl">
        <p class="text-lg flex flex-wrap gap-x-slg gap-y-ssm">
          <For each={contactLinks}>
            {(link) => (
              <a href={link.href} class={inlineLink}>
                {link.label}
              </a>
            )}
          </For>
          <A href="/contact" class={inlineLink}>
            Contact
          </A>
        </p>
      </section>
    </main>
  );
}
