import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Home,
  ListTree,
  Moon,
  Sun,
} from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { useTheme } from '../context/ThemeContext'
import { useDocMeta } from '../hooks/useElementSize'
import { getAdjacent, getDoc } from '../data'
import { author, levelMeta } from '../data/site'
import BlockRenderer from '../components/BlockRenderer'
import Sidebar from '../components/Sidebar'
import TableOfContents, { TocSheet } from '../components/TableOfContents'
import Icon from '../components/Icon'
import { LogoMark } from '../components/Logo'
import NotFound from './NotFound'

const levelStyles = {
  starter: 'border-success/20 bg-success/10 text-success',
  builder: 'border-brand/20 bg-brand/10 text-brand',
  production: 'border-brand-2/20 bg-brand-2/10 text-brand-2',
  appendix: 'border-accent/20 bg-accent/10 text-accent',
}

function MobileDocNav({ onToc }) {
  const { t } = useI18n()
  const { theme, cycleTheme } = useTheme()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/10 bg-panel/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl xl:hidden"
      aria-label={t('common.menuShort')}
    >
      <div className="grid grid-cols-4">
        <Link to="/" className="flex flex-col items-center gap-1 py-2.5 text-[9.5px] font-semibold text-muted transition-colors hover:text-brand">
          <Home size={17} />
          {t('common.home')}
        </Link>
        <Link to="/chapters" className="flex flex-col items-center gap-1 py-2.5 text-[9.5px] font-semibold text-muted transition-colors hover:text-brand">
          <BookOpen size={17} />
          {t('common.chapters')}
        </Link>
        <button type="button" onClick={onToc} className="flex flex-col items-center gap-1 py-2.5 text-[9.5px] font-semibold text-muted transition-colors hover:text-brand">
          <ListTree size={17} />
          {t('common.menuShort')}
        </button>
        <button
          type="button"
          onClick={cycleTheme}
          className="flex flex-col items-center gap-1 py-2.5 text-[9.5px] font-semibold text-muted transition-colors hover:text-brand"
          aria-label={t('common.theme')}
        >
          {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
          {t('common.theme')}
        </button>
      </div>
    </nav>
  )
}

export default function ChapterPage() {
  const { slug } = useParams()
  const { lang, t, pick } = useI18n()
  const [tocOpen, setTocOpen] = useState(false)
  const doc = getDoc(slug)
  const adjacent = useMemo(() => getAdjacent(slug), [slug])
  const level = doc ? levelMeta[doc.level] || levelMeta.builder : null

  useDocMeta(
    doc ? `${pick(doc.title)} · ${t('common.brand')}` : t('common.notFoundTitle'),
    doc ? pick(doc.summary) : t('common.notFoundDesc'),
  )

  if (!doc) return <NotFound />

  const label =
    doc.kind === 'appendix' ? t('common.appendixLabel', { n: doc.id }) : t('common.chapter', { n: doc.number })
  const prevLabel = adjacent.prev
    ? adjacent.prev.kind === 'appendix'
      ? t('common.appendixLabel', { n: adjacent.prev.id })
      : t('common.chapter', { n: adjacent.prev.number })
    : ''
  const nextLabel = adjacent.next
    ? adjacent.next.kind === 'appendix'
      ? t('common.appendixLabel', { n: adjacent.next.id })
      : t('common.chapter', { n: adjacent.next.number })
    : ''

  return (
    <>
      <div className="container-page pb-24 pt-7 sm:pt-9 xl:pb-16">
        <div className="grid gap-9 lg:grid-cols-[238px_minmax(0,1fr)] xl:grid-cols-[238px_minmax(0,1fr)_216px] xl:gap-11">
          <Sidebar activeSlug={doc.slug} />

          <article className="min-w-0">
            <nav className="flex flex-wrap items-center gap-1.5 text-[10.5px] text-faint" aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-brand">
                {t('common.home')}
              </Link>
              <span>/</span>
              <Link to="/chapters" className="transition-colors hover:text-brand">
                {t('common.chapters')}
              </Link>
              <span>/</span>
              <span className="text-muted">{label}</span>
            </nav>

            <header className="relative mt-5 overflow-hidden rounded-3xl border border-line/10 bg-panel p-6 sm:p-8" data-reveal>
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-2 to-accent" aria-hidden="true" />
              <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
              <div className="relative flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-brand">
                  {label}
                </span>
                {level ? (
                  <span className={`rounded-full border px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider ${levelStyles[doc.level] || levelStyles.builder}`}>
                    {pick(level.label)}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1 text-[10px] text-faint">
                  <Clock size={11} />
                  {doc.minutes} {t('common.minutes')}
                </span>
              </div>

              <div className="relative mt-4 flex items-start gap-4">
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand sm:flex">
                  <Icon name={doc.icon} size={22} />
                </span>
                <div className="min-w-0">
                  <h1 className="text-[1.75rem] font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-[2.15rem]">
                    {pick(doc.title)}
                  </h1>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{pick(doc.subtitle)}</p>
                </div>
              </div>

              <div className="relative mt-5 rounded-2xl border border-line/10 bg-panel-2/60 p-4">
                <p className="text-[12.5px] leading-relaxed text-ink-2">{pick(doc.summary)}</p>
              </div>

              <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {doc.tags.map((tag, index) => (
                    <span key={index} className="rounded-full border border-line/10 px-2.5 py-0.5 text-[9.5px] text-faint">
                      {pick(tag)}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setTocOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-panel-2/70 px-3 py-1.5 text-[10.5px] font-semibold text-muted transition-colors hover:text-brand xl:hidden"
                >
                  <ListTree size={12} />
                  {t('common.toc')}
                </button>
              </div>
            </header>

            <div className="article-body mt-9">
              {doc.sections.map((section, index) => (
                <section key={section.id} id={section.id} className="anchor-heading mt-10 first:mt-0 scroll-mt-28">
                  <div className="mb-4 flex items-start gap-3">
                    <span className="mt-1 font-mono text-[10px] font-bold tracking-wider text-brand">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-[1.45rem]">
                      {pick(section.title)}
                    </h2>
                  </div>
                  <BlockRenderer blocks={section.blocks} />
                </section>
              ))}
            </div>

            <section className="mt-12 rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.07] via-brand-2/[0.04] to-accent/[0.05] p-5 sm:p-7" data-reveal>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                <CheckCircle2 size={14} />
                {t('common.keyTakeaways')}
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {doc.takeaways.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {pick(item)}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-9" data-reveal>
              <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
                <span className="h-px w-5 bg-gradient-to-r from-brand to-transparent" />
                {t('common.sources')}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {doc.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-start justify-between gap-3 rounded-xl border border-line/10 bg-panel-2/50 px-3.5 py-3 text-[11.5px] text-muted transition-all hover:border-brand/25 hover:text-brand"
                    >
                      <span>{pick(source.label)}</span>
                      <ArrowUpRight size={13} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 flex items-center justify-between border-t border-line/10 pt-5">
              <div className="flex items-center gap-2 text-[10.5px] text-faint">
                <LogoMark size={20} />
                <span>
                  {pick(author.name)} · {pick(author.brand)}
                </span>
              </div>
              <Link to="/chapters" className="text-[11px] font-semibold text-brand transition-colors hover:text-brand-2">
                {t('common.backToChapters')}
              </Link>
            </div>

            <nav className="mt-6 grid gap-3 sm:grid-cols-2" aria-label={t('common.chapters')}>
              {adjacent.prev ? (
                <Link
                  to={`/chapters/${adjacent.prev.slug}`}
                  className="group rounded-2xl border border-line/10 bg-panel p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
                >
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-faint">
                    <ArrowLeft size={12} />
                    {prevLabel}
                  </span>
                  <span className="mt-1.5 block text-[13px] font-semibold text-ink transition-colors group-hover:text-brand">
                    {pick(adjacent.prev.title)}
                  </span>
                </Link>
              ) : (
                <Link to="/chapters" className="group rounded-2xl border border-line/10 bg-panel p-4 transition-all hover:border-brand/30">
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-faint">
                    <ArrowLeft size={12} />
                    {t('common.backToChapters')}
                  </span>
                  <span className="mt-1.5 block text-[13px] font-semibold text-ink group-hover:text-brand">{t('common.allChapters')}</span>
                </Link>
              )}

              {adjacent.next ? (
                <Link
                  to={`/chapters/${adjacent.next.slug}`}
                  className="group rounded-2xl border border-line/10 bg-panel p-4 text-right transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
                >
                  <span className="flex items-center justify-end gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-faint">
                    {nextLabel}
                    <ArrowRight size={12} />
                  </span>
                  <span className="mt-1.5 block text-[13px] font-semibold text-ink transition-colors group-hover:text-brand">
                    {pick(adjacent.next.title)}
                  </span>
                </Link>
              ) : (
                <Link to="/about" className="group rounded-2xl border border-line/10 bg-panel p-4 text-right transition-all hover:border-brand/30">
                  <span className="flex items-center justify-end gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-faint">
                    {t('common.about')}
                    <ArrowRight size={12} />
                  </span>
                  <span className="mt-1.5 block text-[13px] font-semibold text-ink group-hover:text-brand">{t('home.authorCta')}</span>
                </Link>
              )}
            </nav>
          </article>

          <TableOfContents sections={doc.sections} />
        </div>
      </div>

      <TocSheet open={tocOpen} onClose={() => setTocOpen(false)} sections={doc.sections} />
      <MobileDocNav onToc={() => setTocOpen(true)} />
    </>
  )
}
