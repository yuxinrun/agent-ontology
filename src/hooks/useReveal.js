import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useReveal(deps = []) {
  const location = useLocation()

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!nodes.length) return undefined

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.94) {
        node.classList.add('is-visible')
      } else {
        observer.observe(node)
      }
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, ...deps])
}
