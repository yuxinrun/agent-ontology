import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronRight, Menu, Search, X } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { useLockBody } from '../hooks/useElementSize'
import { appendices } from '../data/appendices'
import { groupedChapters } from '../data'
import Logo, { LogoMark } from './Logo'
import { LangToggle, ThemeToggle } from './Controls'
import SearchDialog from './SearchDialog'

const navItems = [
  { to: '/', labelKey: 'common.home', end: true },
  { to: '/chapters', labelKey: 'common.chapters' },
  { to: '/about', labelKey: 'common.about' },
]

function MobileDrawer({ open, onClose, onSearch }) {
  const { t, pick } = useI18n()
  useLockBody(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[90]" role="presentation">
      <div
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('common.menu')}
        className="absolute right-0 top-0 flex h-full w-[min(88vw,390px)] flex-col border-l border-line/10 bg-panel shadow-2xl animate-[drawerIn_0.32s_cubic-bezier(.2,.7,.2,1)_both]"
      >
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line/10 px-5">
          <Logo size={32} />
          <button type="button" onClick={onClose} className="btn-icon h-9 w-9" aria-label={t('common.closeMenu')}>
            <X size={16} />
          </button>
        </div>

        <div className="scroll-thin flex-1 overflow-y-auto px-4 py-4">
          <button
            type="button"
            onClick={() => {
              onClose()
              onSearch()
            }}
            className="mb-4 flex w-full items-center gap-3 rounded-xl border border-line/10 bg-panel-2/70 px-3.5 py-3 text-left text-sm text-muted transition-colors hover:border-brand/30 hover:text-ink"
          >
            <Search size={16} className="text-brand" />
            <span className="flex-1">{t('common.searchPlaceholder')}</span>
          </button>

          <nav className="mb-5 space-y-1" aria-label={t('common.home')}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-brand/10 text-brand' : 'text-ink-2 hover:bg-line/5'
                  }`
                }
              >
                {t(item.labelKey)}
                <ChevronRight size={14} />
              </NavLink>
            ))}
          </nav>

          <div className="space-y-5">
            {groupedChapters.map((group) => (
              <div key={group.id}>
                <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{pick(group.label)}</p>
                <ul className="space-y-0.5">
                  {group.docs.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        to={`/chapters/${doc.slug}`}
                        onClick={onClose}
                        className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-muted transition-colors hover:bg-brand/5 hover:text-ink"
                      >
                        <span className="mt-0.5 font-mono text-[10px] font-bold text-brand">
                          {String(doc.number).padStart(2, '0')}
                        </span>
                        <span className="line-clamp-2">{pick(doc.title)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{t('common.appendices')}</p>
              <ul className="space-y-0.5">
                {appendices.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      to={`/chapters/${doc.slug}`}
                      onClick={onClose}
                      className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-muted transition-colors hover:bg-brand/5 hover:text-ink"
                    >
                      <span className="mt-0.5 font-mono text-[10px] font-bold text-accent">{doc.id}</span>
                      <span className="line-clamp-2">{pick(doc.title)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-line/10 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="text-[10.5px] text-muted">{t('footer.slogan')}</span>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function Navbar() {
  const { t } = useI18n()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/10 glass-nav">
        <div className="container-page flex h-[var(--header-h)] items-center gap-4">
          <Logo size={36} />

          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label={t('common.home')}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-all duration-200 ${
                    isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-line/5 hover:text-ink'
                  }`
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
            <Link
              to="/chapters/resources"
              className="rounded-full px-3.5 py-2 text-[12.5px] font-semibold text-muted transition-all duration-200 hover:bg-line/5 hover:text-ink"
            >
              {t('footer.resources')}
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-full border border-line/10 bg-panel/60 px-3 text-[11.5px] text-muted transition-all duration-200 hover:border-brand/30 hover:text-ink sm:flex"
              aria-label={t('common.search')}
            >
              <Search size={14} />
              <span className="hidden md:inline">{t('common.search')}</span>
              <kbd className="ml-1 hidden rounded border border-line/15 px-1.5 py-0.5 font-mono text-[9px] text-faint md:inline">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="btn-icon h-9 w-9 sm:hidden"
              aria-label={t('common.search')}
            >
              <Search size={15} />
            </button>
            <LangToggle className="hidden sm:inline-flex" />
            <ThemeToggle className="h-9 w-9" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="btn-icon h-9 w-9 lg:hidden"
              aria-label={t('common.menu')}
              aria-expanded={menuOpen}
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
