import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { CornerDownLeft, Search, X } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { useLockBody } from '../hooks/useElementSize'
import { getDoc, searchDocs } from '../data'

const quickSlugs = ['what-is-agent-ontology', 'multi-agent', 'mcp-tool-ontology', 'glossary']

export default function SearchDialog({ open, onClose }) {
  const { t, pick } = useI18n()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  useLockBody(open)

  const results = useMemo(() => searchDocs(query), [query])
  const quick = useMemo(() => quickSlugs.map((slug) => getDoc(slug)).filter(Boolean), [])
  const list = query.trim() ? results.map((item) => item.doc) : quick

  useEffect(() => {
    if (!open) return undefined
    setQuery('')
    setSelected(0)
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [query])

  if (!open) return null

  const go = (doc) => {
    if (!doc) return
    navigate(`/chapters/${doc.slug}`)
    onClose()
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((index) => (list.length ? (index + 1) % list.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((index) => (list.length ? (index - 1 + list.length) % list.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      go(list[selected])
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/45 px-4 pt-[10vh] backdrop-blur-sm sm:pt-[14vh]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('search.title')}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line/15 bg-panel shadow-[0_30px_90px_-30px_rgba(10,15,40,0.6)] animate-fade-up"
      >
        <div className="flex items-center gap-3 border-b border-line/10 px-4 py-3.5">
          <Search size={18} className="shrink-0 text-brand" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('common.searchPlaceholder')}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
            aria-label={t('common.searchPlaceholder')}
          />
          <button type="button" onClick={onClose} className="btn-icon h-8 w-8 shrink-0" aria-label={t('common.close')}>
            <X size={14} />
          </button>
        </div>

        <div className="max-h-[56vh] overflow-y-auto scroll-thin p-2">
          {!query.trim() ? (
            <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-faint">{t('search.quick')}</p>
          ) : null}
          {list.length ? (
            <ul className="space-y-1">
              {list.map((doc, index) => (
                <li key={doc.slug}>
                  <button
                    type="button"
                    onClick={() => go(doc)}
                    onMouseEnter={() => setSelected(index)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                      selected === index ? 'bg-brand/[0.08]' : 'hover:bg-line/[0.05]'
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-7 shrink-0 items-center rounded-lg border border-line/10 bg-panel-2 px-2 font-mono text-[10px] font-bold text-brand">
                      {doc.kind === 'appendix' ? doc.id : String(doc.number).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold text-ink">{pick(doc.title)}</span>
                      <span className="mt-0.5 line-clamp-1 block text-[11.5px] text-muted">{pick(doc.summary)}</span>
                    </span>
                    <span className="mt-1 hidden shrink-0 items-center gap-1 text-[10px] text-faint sm:flex">
                      {doc.kind === 'appendix'
                        ? t('common.appendixLabel', { n: doc.id })
                        : t('common.chapter', { n: doc.number })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-muted">{t('search.noResult')}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/10 bg-panel-2/60 px-4 py-2.5">
          <span className="text-[10px] text-faint">{t('search.tip')}</span>
          <span className="inline-flex items-center gap-2 text-[10px] text-faint">
            <kbd className="rounded border border-line/15 px-1.5 py-0.5">↑↓</kbd>
            <kbd className="rounded border border-line/15 px-1.5 py-0.5">Enter</kbd>
            <CornerDownLeft size={11} />
          </span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
