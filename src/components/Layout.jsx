import { Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { useReveal } from '../hooks/useReveal'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop, { ReadingProgress } from './ScrollUI'

export default function Layout() {
  const { lang, t } = useI18n()
  const location = useLocation()
  useReveal([lang])

  const skip = () => {
    const main = document.getElementById('main')
    if (!main) return
    main.setAttribute('tabindex', '-1')
    main.focus({ preventScroll: true })
    main.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <button
        type="button"
        onClick={skip}
        className="fixed left-4 top-2 z-[120] -translate-y-20 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white transition-transform focus:translate-y-0"
      >
        {t('common.skipToContent')}
      </button>
      <ReadingProgress />
      <Navbar />
      <main id="main" key={`${lang}-${location.pathname}`} className="lang-swap flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
