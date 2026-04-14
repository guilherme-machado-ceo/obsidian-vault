const SELECTOR = ".bento-card, main h2, main blockquote"

document.addEventListener("nav", () => {
  const targets = document.querySelectorAll<HTMLElement>(SELECTOR)
  if (targets.length === 0) return

  // Se o usuário prefere reduced motion, revela tudo imediatamente.
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReduced) {
    targets.forEach((el) => el.classList.add("revealed"))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  )

  targets.forEach((el) => observer.observe(el))

  window.addCleanup?.(() => observer.disconnect())
})
