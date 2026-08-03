import { A } from "@solidjs/router";

export const Logo = () => (
  <A
    href="/"
    class="font-black font-sans tracking-tighter flex flex-col leading-none outline-offset-2 outline-col-hi-bg focus:outline-2 hover:outline-2 rounded-sm"
  >
    <span class="text-[20px] text-col-fg/50">mreis.me</span>
    <span class="text-[21px]">Matthias</span>
    <span class="text-[21px]">Reis</span>
  </A>
);
