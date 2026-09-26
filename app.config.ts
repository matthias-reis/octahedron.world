import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Access control and redirects for seiten.mreis.me (src/middleware.ts).
  middleware: "./src/middleware.ts",
  vite: {
    plugins: [tailwindcss()],
  },
});
