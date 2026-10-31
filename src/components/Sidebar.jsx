import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { groupedChapters } from '../data'
import { appendices } from '../data/appendices'
import { author } from '../data/site'
import { LogoMark } from './Logo'

export default function Sidebar({ activeSlug }) {
  const { t, pick } = useI18n()

  const linkClass = (slug) =>
    `sidebar-link ${activeSlug === slug ? 'is-active' : ''}`

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[calc(var(--header-h)+24px)] max-h-[calc(100vh-var(--header-h)-48px)] overflow-y-auto scroll-thin pb-8 pr-1">
        <Link
          to="/chapters"
          className="mb-4 flex items-center gap-2 rounded-xl border border-line/10 bg-panel-2/60 px-3 py-2.5 text-[12px] font-bold text-ink transition-colors hover:border-brand/30"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 text-brand">≡</span>
          {t('common.allChapters')}
        </Link>

        <nav aria-label={t('common.chapters')} className="space-y-5">
          {groupedChapters.map((group) => (
            <div key={group.id}>
              <p className="mb-2 px-2 text-[9.5px] font-bold uppercase tracking-[0.16em] text-faint">
                {pick(group.label)}
              </p>
              <ul className="space-y-0.5">
                {group.docs.map((doc) => (
                  <li key={doc.slug}>
                    <Link to={`/chapters/${doc.slug}`} className={linkClass(doc.slug)} aria-current={activeSlug === doc.slug ? 'page' : undefined}>
                      <span className={`w-5 shrink-0 font-mono text-[10px] font-bold ${activeSlug === doc.slug ? 'text-brand' : 'text-faint'}`}>
                        {String(doc.number).padStart(2, '0')}
                      </span>
                      <span className="line-clamp-2 leading-snug">{pick(doc.title)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-2 px-2 text-[9.5px] font-bold uppercase tracking-[0.16em] text-faint">
              {t('common.appendices')}
            </p>
            <ul className="space-y-0.5">
              {appendices.map((doc) => (
                <li key={doc.slug}>
                  <Link to={`/chapters/${doc.slug}`} className={linkClass(doc.slug)} aria-current={activeSlug === doc.slug ? 'page' : undefined}>
                    <span className={`w-5 shrink-0 text-center font-mono text-[10px] font-bold ${activeSlug === doc.slug ? 'text-brand' : 'text-faint'}`}>
                      {doc.id}
                    </span>
                    <span className="line-clamp-2 leading-snug">{pick(doc.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="brand-card mt-6 rounded-2xl p-4">
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <div>
              <p className="text-[11px] font-bold text-ink">{pick(author.brand)}</p>
              <p className="text-[9px] uppercase tracking-[0.12em] text-faint">{author.brandLatin}</p>
            </div>
          </div>
          <p className="mt-3 text-[10.5px] leading-relaxed text-muted">{pick(author.slogan)}</p>
          <a
            href={author.site}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-flex items-center gap-1 text-[10.5px] font-semibold text-brand transition-colors hover:text-brand-2"
          >
            {author.siteLabel}
            <ArrowUpRight size={10} />
          </a>
        </div>
      </div>
    </aside>
  )
}
