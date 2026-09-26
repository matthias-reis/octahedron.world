import { createAsyncStore } from "@solidjs/router";
import { Head } from "~/components/head";
import { HomeTimeline } from "~/components/home-timeline";
import { HomeWorlds } from "~/components/home-worlds";
import { largeImageUrl } from "~/components/image-helpers";
import OctahedronLogo from "~/components/octahedron-logo";
import { useI18n } from "~/i18n/context";
import { sortRootItems } from "~/model/helpers";
import { getAllPosts, getAllRootRoutes } from "~/model/model";
import { getSite } from "~/site/context";
import MreisHome from "~/sites/mreis/pages/home";
import SeitenHome from "~/sites/seiten/pages/home";

/** Tuned by eye: enough entries that the timeline column reaches — but does not
    overshoot — the bottom of the three-column world grid next to it. */
const TIMELINE_LENGTH = 30;

export default function HomePage() {
  if (getSite() === "mreis") {
    return <MreisHome />;
  }
  if (getSite() === "seiten") {
    return <SeitenHome />;
  }

  const getItems = createAsyncStore(() => getAllRootRoutes());
  const getPosts = createAsyncStore(() => getAllPosts());
  const { t, locale } = useI18n();

  const items = () => sortRootItems(getItems() || []);

  // A post without an explicit language is English by convention, so it stays
  // visible in every locale; a translated pair collapses to the matching half.
  const posts = () =>
    (getPosts() || [])
      .filter((post) => !post.language || post.language === locale())
      .slice(0, TIMELINE_LENGTH);

  return (
    <div class="bg-can9">
      <Head />
      <main class="mx-auto mb-7 max-w-6xl">
        <div
          style={{ "background-image": `url(${largeImageUrl("_home")})` }}
          class="bg-cover bg-center aspect-image md:aspect-wide border border-transparent"
        >
          <div class="w-full h-full bg-center flex flex-col justify-center items-center text-center bg-linear-to-b from-transparent via-cb to-transparent">
            <h1 class="font-octa flex justify-center items-center gap-2 text-can2 text-4xl w-full">
              <span class="text-cad4 font-bold ">OCTAHEDRON</span>
              <OctahedronLogo class="text-cas4 w-6 h-6" />
              <span class="text-cad6 font-light">WORLD</span>
            </h1>
            <h2 class="text-can5 text-xl max-w-md font-lighter font-sans mt-3 text-balance">
              {t("home.tagline")}
            </h2>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 items-start">
          <div class="md:col-span-3 order-2 md:order-1">
            <HomeWorlds items={items()} />
          </div>
          <div class="md:col-span-2 order-1 md:order-2 self-stretch border border-transparent p-3 md:p-0">
            <HomeTimeline posts={posts()} />
          </div>
        </div>
      </main>
    </div>
  );
}
