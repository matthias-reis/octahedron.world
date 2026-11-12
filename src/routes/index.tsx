import { createAsyncStore } from "@solidjs/router";
import { Head } from "~/components/head";
import { HomeMosaic } from "~/components/home-mosaic";
import { largeImageUrl } from "~/components/image-helpers";
import OctahedronLogo from "~/components/octahedron-logo";
import { useI18n } from "~/i18n/context";
import {
  getAllCompactRoutes,
  getAllPosts,
  getAllRootRoutes,
} from "~/model/model";
import { getSite } from "~/site/context";
import MreisHome from "~/sites/mreis/pages/home";
import SeitenHome from "~/sites/seiten/pages/home";

export default function HomePage() {
  if (getSite() === "mreis") {
    return <MreisHome />;
  }
  if (getSite() === "seiten") {
    return <SeitenHome />;
  }

  const getItems = createAsyncStore(() => getAllRootRoutes());
  const getPosts = createAsyncStore(() => getAllPosts());
  const getRoutes = createAsyncStore(() => getAllCompactRoutes());
  const { t, locale } = useI18n();

  const items = () => getItems() || [];
  const stamps = () =>
    Object.values(getRoutes() || {})
      .filter((item) => item.group === "stamps" && item.type === "lightbox")
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
      .slice(0, 7);

  // A post without an explicit language is English by convention, so it stays
  // visible in every locale; a translated pair collapses to the matching half.
  const posts = () =>
    (getPosts() || [])
      .filter((post) => !post.language || post.language === locale())
      .slice(0, 6);

  return (
    <div class="bg-can9">
      <Head />
      <main class="mx-auto mb-7 max-w-6xl">
        <div
          style={{ "background-image": `url(${largeImageUrl("_home")})` }}
          class="bg-cover bg-center aspect-image md:aspect-wide border-x-4 border-b-4 border-can9"
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
        <HomeMosaic items={items()} posts={posts()} stamps={stamps()} />
      </main>
    </div>
  );
}
