import { useLocation } from "@solidjs/router";
import { createEffect, type ParentComponent, Suspense } from "solid-js";
import { Footer } from "~/components/footer";
import Nav from "~/components/nav";
import { colorSpace, setColorSpace } from "~/store/color-space";

/** octahedron.world's layout: colour-space wrapper, slide-out nav, footer. */
export const OctahedronShell: ParentComponent = (props) => {
  const location = useLocation();

  createEffect(() => {
    // Set colorSpace based on pathname to avoid flicker from a
    // two-step reset→override pattern. Add more routes here as needed.
    if (location.pathname.startsWith("/pcsc-one")) {
      setColorSpace("pcsc-one");
    } else {
      setColorSpace("petrol");
    }
  });

  return (
    <div class={colorSpace()}>
      <Nav />
      <Suspense>
        <div class="bg-cb">
          {props.children}
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};
