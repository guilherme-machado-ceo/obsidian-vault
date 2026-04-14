// @ts-ignore
import scrollRevealScript from "./scripts/scrollReveal.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Componente invisível: apenas injeta o script afterDOMLoaded que observa
// elementos via IntersectionObserver e adiciona a classe `.revealed`.
const ScrollReveal: QuartzComponent = () => null

ScrollReveal.afterDOMLoaded = scrollRevealScript

export default (() => ScrollReveal) satisfies QuartzComponentConstructor
