import { Check, Download } from "lucide-solid";
import { For, Show } from "solid-js";
import { Box } from "~/ui/box";
import { ButtonLink, Buttons } from "~/ui/button";
import { Chips } from "~/ui/chips";
import { Head } from "~/ui/head";
import { ProfileBox } from "../profile-box";
import { H1, H2 } from "../typography";

const experiences = [
  {
    role: "Team Lead Engineering",
    roleDescription: "People Manager, Platform Owner",
    company: "XING SE",
    period: "2019 - 2026",
    description: "",
    skills: [
      "Leadership",
      "Team Management",
      "Agile",
      "Frontend Architecture",
      "Strategy",
      "Cross Team Alignment",
      "Communication",
    ],
    highlights: [
      "People management for engineering teams 'Design System' and 'Web Platform' (up to 10 devs, web, iOS and Android platforms)",
      "Lead for two very different teams in parallel with consistently positive feedback from leadership, peers and direct reports",
      "Responsible for the technical evolution of the whole frontend layer at XING.com (delivering ~600 req/s SSR web content)",
      "Orchestrating big projects like cloud move or the migration to a monorepo structure with more than 1.4m lines of code and 40+ contributors",
      "Cross team alignment between tech, design and project management with excellent communication skills",
    ],
  },
  {
    role: "Frontend Architect",
    roleDescription: "Technology Owner",
    company: "XING SE",
    period: "2015 - 2019",
    description: "",
    skills: [
      "React.js",
      "Redux",
      "Apollo",
      "Typescript",
      "Mentoring",
      "Lateral Leadership",
    ],
    highlights: [
      "Introduced React.JS ecosystem (starting at version 0.10) that redefined dev collaboration and user flows in the company",
      "Several technology waves including Redux, Apollo, Typescript",
      "Onboarding and direction for a community of 60+ frontend developers",
    ],
  },
  {
    role: "Web Architect",
    roleDescription: "Technology Driver",
    company: "VERLAGSGRUPPE WELTBILD GMBH",
    period: "2012 - 2015",
    description: "",
    skills: [
      "PHP",
      "Javascript",
      "jQuery",
      "Angular",
      "E-Commerce",
      "High Traffic Engine",
    ],
    highlights: [
      "Operating a high traffic e-commerce platform including complex purchase funnels (hitting the 1 million Euro minute once)",
      "Responsible for the whole frontend server stack",
      "Tech Stack: PHP, Javascript, jQuery",
      "Introducing Angular (v1) based back office / content management layer",
      "Role directly evolved from my work as an engineer",
    ],
  },
  {
    role: "Software Engineer",
    roleDescription: "",
    company: "VERLAGSGRUPPE WELTBILD GMBH",
    period: "2011 - 2012",
    description: "",
    skills: ["PHP", "JavaScript", "Frontend Development"],
    highlights: [],
  },
  {
    role: "Software Engineer",
    roleDescription: "",
    company: "FILESPOTS & BWSO GMBH",
    period: "2009 - 2011",
    description: "",
    skills: ["ExtJS", "SPAs", "JavaScript"],
    highlights: ["Technologies: SPAs (early adopters) with ExtJS"],
  },
];

export default function MreisCv() {
  return (
    <main class="py-s2xl min-h-screen font-sans">
      <Head
        title="CV"
        description="Professional experience and successes of Matthias Reis."
      />

      <div class="px-smd mx-auto max-w-4xl">
        <div class="p-sxl md:p-s2xl mb-s3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-sxl">
          <div class="flex-1">
            <H1 class="mb-smd">Curriculum Vitae</H1>
            <p class="opacity-80 max-w-2xl text-xl font-sans mb-sxl">
              A summary of my professional journey, focusing on my roles,
              responsibilities, and key successes over the years.
            </p>
            <Buttons>
              <ButtonLink
                variant="secondary"
                href="/reference/cv.pdf"
                download="Matthias_Reis_CV.pdf"
              >
                <Download class="w-5 h-5" />
                Download PDF
              </ButtonLink>
              <ButtonLink href="/contact">Contact Me</ButtonLink>
            </Buttons>
          </div>

          <ProfileBox />
        </div>

        <div class="relative border-l-2 border-col-border ml-ssm space-y-s2xl pb-s2xl mt-s2xl">
          <For each={experiences}>
            {(exp) => (
              <div class="relative pl-sxl md:pl-s2xl">
                <span class="absolute -left-[9px] top-10 w-4 h-4 rounded-full bg-col-fg" />

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
                    <Box title="Key Successes" class="font-sans">
                      <ul class="space-y-ssm font-sans mt-ssm">
                        <For each={exp.highlights}>
                          {(highlight) => (
                            <li class="flex gap-ssm items-start">
                              <Check class="mt-1.5 w-5 h-5 shrink-0" />
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

        <div class="mt-s3xl pt-s2xl border-t border-col-border flex flex-col items-start font-sans">
          <p class="text-col-fg-muted mb-sxl text-xl max-w-2xl">
            For a comprehensive list of projects and technical details, please
            download the full portfolio.
          </p>
          <ButtonLink
            href="/reference/portfolio.pdf"
            download="Matthias_Reis_Portfolio.pdf"
          >
            <Download class="w-5 h-5" />
            Download PDF
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
