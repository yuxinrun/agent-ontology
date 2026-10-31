import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { useLockBody } from '../hooks/useElementSize'
import { useScrollSpy } from '../hooks/useScrollSpy'

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (!element) return
  const top = element.getBoundingClientRect().top + window.scrollY - 100
  window.scrollTo({ top, behavior: 'smooth' })
}

export function TocLinks({ sections, activeId, onNavigate }) {
  const { pick } = useI18n()
  return (
    <ul className="space-y-0.5">
      {sections.map((section) => (
        <li key={section.id}>
          <button
            type="button"
            onClick={() => {
              scrollToSection(section.id)
              onNavigate?.()
            }}
            className={`toc-link w-full text-left ${activeId === section.id ? 'is-active' : ''}`}
          >
            {pick(section.title)}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function TableOfContents({ sections }) {
  const { t } = useI18n()
  const ids = useMemo(() => sections.map((section) => section.id), [sections])
  const activeId = useScrollSpy(ids)

  if (!sections.length) return null

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-[calc(var(--header-h)+28px)] max-h-[calc(100vh-var(--header-h)-56px)] overflow-y-auto scroll-thin pb-8 pl-1">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
          <span className="h-1 w-1 rounded-full bg-brand" />
          {t('common.toc')}
        </p>
        <nav aria-label={t('common.onThisPage')}>
          <TocLinks sections={sections} activeId={activeId} />
        </nav>
        <div className="mt-6 rounded-xl border border-line/10 bg-panel-2/50 p-3">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-faint">{t('common.level')}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-success/60" />
            <span className="h-1.5 flex-1 rounded-full bg-brand/60" />
            <span className="h-1.5 flex-1 rounded-full bg-brand-2/60" />
          </div>
          <div className="mt-1.5 flex justify-between text-[9px] text-faint">
            <span>{t('common.starter')}</span>
            <span>{t('common.builder')}</span>
            <span>{t('common.production')}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export function TocSheet({ open, onClose, sections }) {
  const { t, lang } = useI18n()
  const ids = useMemo(() => sections.map((section) => section.id), [sections])
  const activeId = useScrollSpy(ids)
  useLockBody(open)

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[95] xl:hidden" role="presentation">
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('common.toc')}
        className="absolute inset-x-0 bottom-0 max-h-[72vh] overflow-hidden rounded-t-3xl border-t border-line/10 bg-panel shadow-2xl animate-[sheetIn_0.3s_cubic-bezier(.2,.7,.2,1)_both]"
      >
        <div className="flex items-center justify-between border-b border-line/10 px-5 py-3.5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{t('common.onThisPage')}</p>
            <p className="mt-0.5 text-sm font-bold text-ink">{t('common.toc')}</p>
          </div>
          <button type="button" onClick={onClose} className="btn-icon h-9 w-9" aria-label={t('common.close')}>
            <X size={16} />
          </button>
        </div>
        <div className="scroll-thin max-h-[58vh] overflow-y-auto px-3 py-2">
          <TocLinks sections={sections} activeId={activeId} onNavigate={onClose} />
        </div>
        <div className="border-t border-line/10 px-5 py-3 text-[10px] text-faint">
          {sections.length} {lang === 'zh' ? '个小节 · 点击跳转' : 'sections · tap to jump'}
        </div>
      </div>
    </div>,
    document.body,
  )
}
