import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'ao-theme'

const getSystemTheme = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const readStored = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return ['light', 'dark', 'system'].includes(value) ? value : 'system'
  } catch {
    return 'system'
  }
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(readStored)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)
  const resolved = preference === 'system' ? systemTheme : preference
  const firstTheme = useRef(true)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolved
    root.style.colorScheme = resolved
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', resolved === 'dark' ? '#050816' : '#f5f7ff')
    try {
      localStorage.setItem(STORAGE_KEY, preference)
    } catch {
      /* storage may be unavailable */
    }
    if (firstTheme.current) {
      firstTheme.current = false
      return undefined
    }
    root.classList.add('theme-changing')
    const timer = window.setTimeout(() => root.classList.remove('theme-changing'), 380)
    return () => window.clearTimeout(timer)
  }, [resolved, preference])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setSystemTheme(event.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((value) => {
    setPreference(['light', 'dark', 'system'].includes(value) ? value : 'system')
  }, [])

  const cycleTheme = useCallback(() => {
    setPreference((current) => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'system'
      return 'light'
    })
  }, [])

  const value = useMemo(
    () => ({ theme: resolved, preference, systemTheme, setTheme, cycleTheme }),
    [resolved, preference, systemTheme, setTheme, cycleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
