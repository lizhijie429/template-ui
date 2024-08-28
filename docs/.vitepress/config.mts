import { nav } from "./utils/nav";
import { sidebar } from "./utils/sidebar";

import { defineConfig } from "vitepress";
import { mdPlugin } from "./config/plugins";

export default defineConfig({
  title: "Template UI",
  base: process.env.NODE_ENV === "production" ? "/templateui/" : "/",
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0,user-scalable=no",
      },
    ],
  ],

  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: "最后更新时间",
    nav,
    sidebar,
    search: { provider: "local" },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/lizhijie429/template-ui",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Evan You",
    },
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
});
