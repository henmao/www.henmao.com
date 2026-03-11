import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  clientModules: ["./src/clientModules/gtag-fallback.js"],
  title: "100 个小游戏开发",
  tagline: "进度 2/100",
  favicon: "favicon.ico",

  // Set the production url of your site here
  url: "https://www.henmao.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "henmao", // Usually your GitHub org/user name.
  projectName: "www.henmao.com", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "notes",
          routeBasePath: "notes",
          sidebarPath: "./sidebars-notes.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-6W7C9317F6"
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "henmao",
      logo: {
        alt: "Logo",
        src: "img/logo.jpg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "notesSidebar",
          position: "left",
          label: "Notes",
        },
        {
          href: "https://github.com/henmao/www.henmao.com",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "X",
              href: "https://x.com/liurongqing100",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Notes",
              to: "/notes/devops/certbot",
            },
            {
              label: "GitHub",
              href: "https://github.com/henmao/www.henmao.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}  <a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备2020131308号-1</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
  ],
};

export default config;
