// Configuração do Quartz v4 — copiada para _quartz/ durante o deploy (GitHub Actions).
// Edite aqui para alterar tema, plugins ou metadados do site.
// Estética: Deep Tech / Cyberpunk Corporativo (dark-only, neon cyan + roxo).
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
    baseUrl: "guilherme-machado-ceo.github.io/gabinete-polimata-atlantico-sul",
    ignorePatterns: [".obsidian", ".trash", "*.tmp", "_quartz", ".github", "customizations"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Syne",
        body: "Inter",
        code: "JetBrains Mono",
      },
      // Paleta Deep Tech — dark forçado: lightMode e darkMode compartilham a
      // mesma paleta neon, de modo que o site permanece sempre escuro mesmo
      // se o toggle de tema for acionado.
      colors: {
        lightMode: {
          light: "#050816",       // darkBackground
          lightgray: "#1e293b",   // darkLight
          gray: "#94a3b8",        // darkGray
          darkgray: "#e2e8f0",    // texto
          dark: "#f0f6fc",        // texto forte
          secondary: "#00f5ff",   // darkPrimary — cyan neon
          tertiary: "#7c3aed",    // darkSecondary — roxo profundo
          highlight: "rgba(0, 245, 255, 0.08)",
          textHighlight: "#00f5ff33",
        },
        darkMode: {
          light: "#050816",
          lightgray: "#1e293b",
          gray: "#94a3b8",
          darkgray: "#e2e8f0",
          dark: "#f0f6fc",
          secondary: "#00f5ff",
          tertiary: "#7c3aed",
          highlight: "rgba(0, 245, 255, 0.08)",
          textHighlight: "#00f5ff33",
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
          light: "github-dark",
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
