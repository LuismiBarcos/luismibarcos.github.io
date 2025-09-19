import { defineConfig } from "astro/config";
import { fileURLToPath, URL } from "url";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config.ts";
import {
  DEFAULT_LOCALE,
  LOCALES_TO_LANG,
  SUPPORTED_LOCALES,
} from "./src/i18n/config.ts";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  i18n: {
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: LOCALES_TO_LANG,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkToc,
        {
          heading:
            "(table[ -]of[ -])?contents?|toc|محتويات|المحتويات|جدول المحتويات",
        },
      ],
      [remarkCollapse, { test: "Table of contents" }],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss() as never],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
