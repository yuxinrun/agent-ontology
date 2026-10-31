import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { dict, interpolate, pick as pickValue } from '../i18n/dict'

const I18nContext = createContext(null)
const STORAGE_KEY = 'ao-lang'

const detectLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined') {
    return (navigator.language || 'zh').toLowerCase().startsWith('zh') ? 'zh' : 'en'
  }
  return 'zh'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((value) => {
    if (value === 'zh' || value === 'en') setLangState(value)
  }, [])

  const toggleLang = useCallback(() => setLangState((current) => (current === 'zh' ? 'en' : 'zh')), [])

  const t = useCallback(
    (key, vars) => {
      const path = String(key).split('.')
      let cursor = dict[lang]
      for (const part of path) {
        cursor = cursor?.[part]
      }
      if (typeof cursor !== 'string') cursor = key
      return interpolate(cursor, vars)
    },
    [lang],
  )

  const pick = useCallback((value) => pickValue(lang, value), [lang])

  const value = useMemo(() => ({ lang, setLang, toggleLang, t, pick }), [lang, setLang, toggleLang, t, pick])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
