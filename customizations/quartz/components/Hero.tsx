// @ts-ignore
import heroScript from "./scripts/hero.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Hero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  // Só renderiza na homepage
  if (fileData.slug !== "index") return null

  return (
    <section class="deeptech-hero">
      <h1 class="hero-title">Guilherme Machado</h1>
      <p class="hero-subtitle">
        <span class="typewriter-text" data-typewriter>
          Pesquisador Independente
        </span>
        <span class="typewriter-cursor" aria-hidden="true">|</span>
      </p>
    </section>
  )
}

Hero.afterDOMLoaded = heroScript

Hero.css = `
.deeptech-hero {
  padding: 4rem 1rem 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.deeptech-hero .hero-title {
  font-family: "Syne", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1.25rem 0;
  background: linear-gradient(135deg, #00f5ff, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 245, 255, 0.25);
}

.deeptech-hero .hero-subtitle {
  font-family: "JetBrains Mono", monospace;
  color: #a78bfa;
  font-size: clamp(1rem, 2vw, 1.25rem);
  min-height: 1.5em;
  margin: 0;
  opacity: 1;
  transform: none;
}

.deeptech-hero .typewriter-cursor {
  display: inline-block;
  color: #00f5ff;
  margin-left: 2px;
  animation: deeptech-blink 1s step-end infinite;
}

@keyframes deeptech-blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

@media (max-width: 480px) {
  .deeptech-hero {
    padding: 2.5rem 1rem 1.5rem;
  }
}
`

export default (() => Hero) satisfies QuartzComponentConstructor
