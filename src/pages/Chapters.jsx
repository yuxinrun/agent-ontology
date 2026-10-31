import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Compass, Layers3, Sparkles } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { dict } from '../i18n/dict'
import { useDocMeta } from '../hooks/useElementSize'
import { groupedChapters } from '../data'
import { appendices } from '../data/appendices'
import ChapterCard from '../components/ChapterCard'

const partIcons = [Compass, Layers3, Sparkles]

export default function Chapters() {
  const { lang, t, pick } = useI18n()
  const copy = dict[lang].chaptersPage
  useDocMeta(
    lang === 'zh' ? '全部章节 · 智能体本体论实战指南' : 'All chapters · Agent Ontology Field Guide',
    copy.desc,
  )

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line/10">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" aria-hidden="true" />
        <div className="container-page relative py-14 sm:py-20">
          <span className="kicker">{copy.kicker}</span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted sm:text-[15px]">{copy.desc}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/chapters/what-is-agent-ontology" className="btn-primary">
              {copy.start}
              <ArrowRight size={15} />
            </Link>
            <Link to="/chapters/glossary" className="btn-secondary">
              <BookOpen size={15} />
              {t('footer.glossaryLink')}
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {groupedChapters.map((group, index) => {
              const Icon = partIcons[index] || Layers3
              return (
                <div key={group.id} className="rounded-2xl border border-line/10 bg-panel/60 p-4 backdrop-blur">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon size={15} />
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">PART 0{index + 1}</span>
                  </div>
                  <p className="mt-2.5 text-[12.5px] font-semibold text-ink">{pick(group.label)}</p>
                  <p className="mt-1 text-[10.5px] text-muted">
                    {group.docs.length} {lang === 'zh' ? '章' : 'chapters'} · {group.docs.reduce((sum, doc) => sum + doc.minutes, 0)} {t('common.minutes')}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="container-page py-14 sm:py-16">
        <div className="space-y-14">
          {groupedChapters.map((group, groupIndex) => (
            <section key={group.id}>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-faint">PART 0{groupIndex + 1}</p>
                  <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{pick(group.label)}</h2>
                </div>
                <span className="hidden text-[11px] text-faint sm:block">
                  {group.docs[0]?.number}–{group.docs[group.docs.length - 1]?.number}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.docs.map((doc, index) => (
                  <ChapterCard key={doc.slug} doc={doc} index={index} />
                ))}
              </div>
            </section>
          ))}

          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-faint">APPENDICES</p>
                <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{copy.appendixTitle}</h2>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">{copy.appendixDesc}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {appendices.map((doc, index) => (
                <ChapterCard key={doc.slug} doc={doc} index={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
