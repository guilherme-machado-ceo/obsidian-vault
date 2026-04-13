// Configuração do Quartz v4 — copiada para _quartz/ durante o deploy (GitHub Actions).
// Edite aqui para alterar tema, plugins ou metadados do site.
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Guilherme Machado — Think Tank",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "pt-BR",
    baseUrl: "guilherme-machado-ceo.github.io/obsidian-vault",
    ignorePatterns: [".obsidian", ".trash", "*.tmp", "_quartz", ".github"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display",
        body: "Source Sans Pro",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f1",
          lightgray: "#e8e5d9",
          gray: "#9e9b8e",
          darkgray: "#3a3530",
          dark: "#1a1714",
          secondary: "#8b4513",
          tertiary: "#c17f3a",
          highlight: "rgba(139, 69, 19, 0.08)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1a1714",
          lightgray: "#2a2520",
          gray: "#6e6b5e",
          darkgray: "#c8c4b4",
          dark: "#f0ece0",
          secondary: "#c17f3a",
          tertiary: "#8b4513",
          highlight: "rgba(193, 127, 58, 0.08)",
          textHighlight: "#fff23620",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
