import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useI18n } from '../context/I18nContext'

export function ThemeToggle({ className = '' }) {
  const { preference, cycleTheme } = useTheme()
  const { t } = useI18n()
  const Icon = preference === 'dark' ? Moon : preference === 'light' ? Sun : Monitor
  const label =
    preference === 'dark'
      ? t('common.themeDark')
      : preference === 'light'
        ? t('common.themeLight')
        : t('common.themeSystem')

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`btn-icon ${className}`}
      aria-label={`${t('common.theme')}: ${label}`}
      title={`${t('common.theme')} · ${label}`}
    >
      <Icon size={16} className="transition-transform duration-500 hover:rotate-12" />
    </button>
  )
}

export function LangToggle({ className = '' }) {
  const { lang, toggleLang, t } = useI18n()
  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`relative inline-flex h-9 items-center rounded-full border border-line/15 bg-panel-2/70 p-0.5 text-[10.5px] font-bold tracking-wide transition-all duration-300 hover:border-brand/35 ${className}`}
      aria-label={`${t('common.language')}: ${lang === 'zh' ? 'English' : '中文'}`}
      title={t('common.language')}
    >
      <span
        className={`absolute top-0.5 h-8 w-9 rounded-full bg-brand/10 transition-transform duration-300 ${
          lang === 'en' ? 'translate-x-[36px]' : 'translate-x-0.5'
        }`}
        aria-hidden="true"
      />
      <span className={`relative z-10 flex h-8 w-9 items-center justify-center transition-colors ${lang === 'zh' ? 'text-brand' : 'text-faint'}`}>
        中
      </span>
      <span className={`relative z-10 flex h-8 w-9 items-center justify-center transition-colors ${lang === 'en' ? 'text-brand' : 'text-faint'}`}>
        EN
      </span>
    </button>
  )
}
