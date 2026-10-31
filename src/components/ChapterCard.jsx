import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { levelMeta } from '../data/site'
import Icon from './Icon'

const accentStyles = {
  brand: { icon: 'text-brand', bg: 'bg-brand/10', ring: 'group-hover:ring-brand/25' },
  violet: { icon: 'text-brand-2', bg: 'bg-brand-2/10', ring: 'group-hover:ring-brand-2/25' },
  cyan: { icon: 'text-accent', bg: 'bg-accent/10', ring: 'group-hover:ring-accent/25' },
  pink: { icon: 'text-accent-2', bg: 'bg-accent-2/10', ring: 'group-hover:ring-accent-2/25' },
  emerald: { icon: 'text-success', bg: 'bg-success/10', ring: 'group-hover:ring-success/25' },
  amber: { icon: 'text-warning', bg: 'bg-warning/10', ring: 'group-hover:ring-warning/25' },
}

const levelStyles = {
  starter: 'border-success/20 bg-success/10 text-success',
  builder: 'border-brand/20 bg-brand/10 text-brand',
  production: 'border-brand-2/20 bg-brand-2/10 text-brand-2',
  appendix: 'border-accent/20 bg-accent/10 text-accent',
}

export default function ChapterCard({ doc, index = 0 }) {
  const { t, pick } = useI18n()
  const accent = accentStyles[doc.accent] || accentStyles.brand
  const level = levelMeta[doc.level] || levelMeta.builder
  const label =
    doc.kind === 'appendix' ? t('common.appendixLabel', { n: doc.id }) : t('common.chapter', { n: doc.number })

  return (
    <Link
      to={`/chapters/${doc.slug}`}
      className="card-interactive group flex h-full flex-col p-5 sm:p-6"
      style={{ '--reveal-delay': `${Math.min(index * 45, 320)}ms` }}
      data-reveal
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg} ${accent.icon} ring-1 ring-transparent transition-all duration-300 ${accent.ring}`}>
            <Icon name={doc.icon} size={18} />
          </span>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-faint">{label}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-faint">
              {doc.kind === 'appendix' ? t('common.appendices') : pick(level.label)}
            </p>
          </div>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${levelStyles[doc.level] || levelStyles.builder}`}>
          {pick(level.label)}
        </span>
      </div>

      <h3 className="mt-4 text-[15px] font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand sm:text-base">
        {pick(doc.title)}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[12px] leading-relaxed text-muted">{pick(doc.summary)}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {doc.tags.slice(0, 3).map((tag, tagIndex) => (
          <span key={tagIndex} className="rounded-full border border-line/10 bg-panel-2/60 px-2 py-0.5 text-[9.5px] text-faint">
            {pick(tag)}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line/10 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-faint">
          <Clock size={11} />
          {doc.minutes} {t('common.minutes')}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand transition-all duration-300 group-hover:gap-2">
          {t('common.readChapter')}
          <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  )
}
