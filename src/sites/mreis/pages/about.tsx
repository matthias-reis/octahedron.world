import { A } from "@solidjs/router";
import { Check } from "lucide-solid";
import { For, Show } from "solid-js";
import { Box } from "~/ui/box";
import { Chips } from "~/ui/chips";
import { Head } from "~/ui/head";
import { ProfileBox } from "../profile-box";
import { H1, H2 } from "../typography";

type Experience = {
  role: string;
  roleDescription: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  highlights: string[];
};

const experiences: Experience[] = [
  {
    role: "Co-founder & CTO",
    roleDescription: "Architecture, engineering, event-day operations",
    company: "commonspace",
    period: "2026 - today",
    description:
      "A platform for communities and events: chat, posts, events, registration and admission control in one place.",
    skills: ["Platform Architecture", "Solid.js", "AI Agents / MCP", "Ops"],
    highlights: [
      "From a hackathon prototype to 15,000+ members in five months",
      "Five hackathons in Prague, Paris, Warsaw, Munich and London ran on it, two of them on the same weekend",
      "Rebuilt the prototype into a discovery platform plus community servers and migrated 45 events and 5,450 members in one go",
      "Made the platform operable by AI agents through MCP: jury feedback that took an organiser half a day became one prompt and an approval",
    ],
  },
  {
    role: "Team Lead Engineering",
    roleDescription: "People Manager, Platform Owner",
    company: "XING SE",
    period: "2019 - 2026",
    description: "",
    skills: ["Leadership", "Frontend Architecture", "Strategy"],
    highlights: [
      "Led the engineering teams 'Design System' and 'Web Platform' (up to 10 developers across web, iOS and Android)",
      "Responsible for the technical evolution of the whole frontend layer of XING.com (~600 req/s of server-side rendered content)",
      "Orchestrated big moves like the cloud migration and a monorepo with 1.4M+ lines of code and 40+ contributors",
      "Aligned tech, design and product across teams",
    ],
  },
  {
    role: "Frontend Architect",
    roleDescription: "Technology Owner",
    company: "XING SE",
    period: "2015 - 2019",
    description: "",
    skills: ["React.js", "Redux", "Apollo", "Typescript"],
    highlights: [
      "Introduced the React ecosystem (from version 0.10), which changed how developers and user flows worked across the company",
      "Drove several technology waves: Redux, Apollo, Typescript",
      "Onboarded and guided a community of 60+ frontend developers",
    ],
  },
  {
    role: "Web Architect",
    roleDescription: "Technology Driver",
    company: "VERLAGSGRUPPE WELTBILD GMBH",
    period: "2012 - 2015",
    description: "",
    skills: ["PHP", "JavaScript", "Angular", "E-Commerce"],
    highlights: [
      "Operated a high-traffic e-commerce platform with complex purchase funnels (it hit the 1 million euro minute once)",
      "Owned the whole frontend server stack",
      "Introduced an Angular (v1) back office and content management layer",
    ],
  },
  {
    role: "Software Engineer",
    roleDescription: "",
    company: "VERLAGSGRUPPE WELTBILD GMBH",
    period: "2011 - 2012",
    description: "",
    skills: ["PHP", "JavaScript"],
    highlights: [],
  },
  {
    role: "Software Engineer",
    roleDescription: "",
    company: "FILESPOTS & BWSO GMBH",
    period: "2009 - 2011",
    description: "Early single-page applications with ExtJS.",
    skills: ["ExtJS", "SPAs"],
    highlights: [],
  },
];

export default function MreisAbout() {
  return (
    <main class="py-s2xl min-h-screen font-sans">
      <Head
        title="Track record"
        description="What Matthias Reis has built: from early single-page apps to XING's frontend platform and commonspace."
      />

      <div class="px-smd mx-auto max-w-4xl">
        <div class="p-sxl md:p-s2xl mb-s3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-sxl">
          <div class="flex-1">
            <H1 class="mb-smd">Track record</H1>
            <p class="opacity-80 max-w-2xl text-xl font-sans">
              I have been building for the web since the early days of
              single-page apps: e-commerce under heavy load, the frontend
              platform of XING, and now commonspace. This is what came out of
              it.
            </p>
          </div>

          <ProfileBox />
        </div>

        <div class="relative border-l-2 border-col-border ml-ssm space-y-s2xl pb-s2xl mt-s2xl">
          <For each={experiences}>
            {(exp) => (
              <div class="relative pl-sxl md:pl-s2xl">
                <span class="absolute -left-[9px] top-sxl w-smd h-smd rounded-full bg-col-fg" />

                <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-ssm gap-ssm">
                  <div>
                    <p class="text-xl mt-sxs font-sans uppercase">
                      {exp.company}
                    </p>
                    <H2 noMargin>{exp.role}</H2>
                    <Show when={exp.roleDescription}>
                      <p class="font-sans mb-slg mt-ssm">
                        {exp.roleDescription}
                      </p>
                    </Show>
                  </div>
                  <span class="inline-block px-ssm py-sxs text-sm font-bold whitespace-nowrap bg-col-hi-bg/20 text-col-hi-bg rounded-full">
                    {exp.period}
                  </span>
                </div>

                <Show when={exp.description}>
                  <p class="text-col-fg-muted mb-slg text-lg leading-relaxed font-sans">
                    {exp.description}
                  </p>
                </Show>

                <Show when={exp.highlights.length > 0}>
                  <div class="mt-smd">
                    <Box title="Impact" class="font-sans">
                      <ul class="space-y-ssm font-sans mt-ssm">
                        <For each={exp.highlights}>
                          {(highlight) => (
                            <li class="flex gap-ssm items-start">
                              <Check class="mt-1.5 w-[1.25rem] h-[1.25rem] shrink-0" />
                              <span class="leading-relaxed text-lg">
                                {highlight}
                              </span>
                            </li>
                          )}
                        </For>
                      </ul>
                    </Box>
                  </div>
                </Show>

                <Show when={exp.skills.length > 0}>
                  <Chips items={exp.skills} class="mt-sxl" />
                </Show>
              </div>
            )}
          </For>
        </div>

        <div class="mt-s3xl pt-s2xl border-t border-col-border font-sans">
          <p class="text-col-fg-muted text-xl max-w-2xl">
            Selected projects are in the{" "}
            <A
              href="/portfolio"
              class="hover:underline underline-offset-2 text-col-hi-bg outline-offset-2 outline-col-hi-bg focus:outline-2"
            >
              portfolio
            </A>
            , and what I learn along the way in the{" "}
            <A
              href="/posts"
              class="hover:underline underline-offset-2 text-col-hi-bg outline-offset-2 outline-col-hi-bg focus:outline-2"
            >
              articles
            </A>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
