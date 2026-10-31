import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { author, officialSources } from '../data/site'
import { LogoMark } from './Logo'

export default function Footer() {
  const { t, pick } = useI18n()

  return (
    <footer className="relative mt-20 border-t border-line/10 bg-bg-soft/50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,0.7fr)]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark size={40} />
              <div>
                <p className="text-sm font-extrabold tracking-tight text-ink">{t('common.brand')}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">{t('common.brandSub')}</p>
              </div>
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-muted">{t('footer.desc')}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.06] px-3 py-1.5 text-[11px] font-semibold text-brand">
              {t('footer.slogan')}
            </p>
            <a
              href={author.site}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-muted transition-colors hover:text-brand"
            >
              {author.siteLabel}
              <ArrowUpRight size={11} />
            </a>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{t('footer.handbook')}</p>
            <ul className="space-y-2">
              {[
                { to: '/chapters', label: t('footer.allChapters') },
                { to: '/chapters/what-is-agent-ontology', label: t('footer.firstChapter') },
                { to: '/chapters/multi-agent', label: t('footer.multiAgent') },
                { to: '/chapters/mcp-tool-ontology', label: t('footer.mcp') },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[12px] text-muted transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{t('footer.resources')}</p>
            <ul className="space-y-2">
              {[
                { to: '/chapters/resources', label: t('footer.resourcesLink') },
                { to: '/chapters/toolkit', label: t('footer.toolsLink') },
                { to: '/chapters/glossary', label: t('footer.glossaryLink') },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[12px] text-muted transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{t('footer.aboutCol')}</p>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-[12px] text-muted transition-colors hover:text-brand">
                  {t('footer.aboutAuthor')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[12px] text-muted transition-colors hover:text-brand">
                  {t('footer.aboutBrand')}
                </Link>
              </li>
              <li>
                <a
                  href={author.site}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-brand"
                >
                  {author.siteLabel}
                  <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line/10 pt-6">
          <p className="mb-3 text-[9.5px] font-bold uppercase tracking-[0.16em] text-faint">{t('footer.official')}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {officialSources.map((source) => (
              <a
                key={source.name}
                href={source.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[11px] text-muted transition-colors hover:text-brand"
              >
                {source.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line/10 pt-6 text-[10.5px] text-faint sm:flex-row sm:items-center">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{t('footer.builtWith')}</span>
            <span className="hidden h-3 w-px bg-line/20 sm:block" />
            <span>{pick(author.slogan)}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
