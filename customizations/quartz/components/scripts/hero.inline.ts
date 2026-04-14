const PHRASES = [
  "Pesquisador Independente",
  "Fundador & CEO — Hubstry Deep Tech",
  "Linguista · Semioticista · Builder",
  "Rio de Janeiro — em construção permanente",
]

const TYPE_SPEED = 75
const DELETE_SPEED = 40
const HOLD_MS = 1800

document.addEventListener("nav", () => {
  const el = document.querySelector<HTMLElement>("[data-typewriter]")
  if (!el) return

  let phraseIdx = 0
  let charIdx = PHRASES[0].length // começa com a primeira frase já escrita
  let deleting = false
  let timer: number | undefined

  const tick = () => {
    const phrase = PHRASES[phraseIdx]

    if (!deleting) {
      charIdx++
      el.textContent = phrase.slice(0, charIdx)
      if (charIdx >= phrase.length) {
        deleting = true
        timer = window.setTimeout(tick, HOLD_MS)
        return
      }
      timer = window.setTimeout(tick, TYPE_SPEED)
    } else {
      charIdx--
      el.textContent = phrase.slice(0, charIdx)
      if (charIdx <= 0) {
        deleting = false
        phraseIdx = (phraseIdx + 1) % PHRASES.length
      }
      timer = window.setTimeout(tick, DELETE_SPEED)
    }
  }

  // Começa com a primeira frase visível e pausa antes de apagar
  el.textContent = PHRASES[0]
  deleting = true
  timer = window.setTimeout(tick, HOLD_MS)

  window.addCleanup?.(() => {
    if (timer !== undefined) window.clearTimeout(timer)
  })
})
