import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Ghost,
  GitPullRequest,
  Headphones,
  MessagesSquare,
  Quote,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { dict } from '../i18n/dict'
import { useDocMeta } from '../hooks/useElementSize'
import { groupedChapters } from '../data'
import { officialSources } from '../data/site'
import { author } from '../data/site'
import Chart from '../components/Chart'
import ChapterCard from '../components/ChapterCard'
import HeroGraphic from '../components/HeroGraphic'
import { LogoMark } from '../components/Logo'

const painIcons = [Ghost, ShieldAlert, MessagesSquare]
const scenarioIcons = [Headphones, GitPullRequest, BarChart3]

const compareRows = {
  zh: [
    { rag: '补充资料：文档、FAQ、工单记录', onto: '补充结构：实体、关系、约束、动作' },
    { rag: '靠相似度找回片段', onto: '靠本体校验语义与权限' },
    { rag: '知道“说过什么”', onto: '知道“是什么、能做什么”' },
    { rag: '静态上下文，容易漂移', onto: '可版本化、可执行、可审计' },
  ],
  en: [
    { rag: 'Adds material: docs, FAQs, tickets', onto: 'Adds structure: entities, relations, constraints, actions' },
    { rag: 'Retrieves chunks by similarity', onto: 'Validates meaning and permissions against the ontology' },
    { rag: 'Knows what was said', onto: 'Knows what things are and what can be done' },
    { rag: 'Static context that drifts', onto: 'Versioned, executable, auditable' },
  ],
}

export default function Home() {
  const { lang, t, pick } = useI18n()
  const home = dict[lang].home
  const common = dict[lang].common
  const rows = compareRows[lang] || compareRows.zh

  useDocMeta(
    lang === 'zh' ? '智能体本体论实战指南 · Agent Ontology Field Guide' : 'Agent Ontology Field Guide · 智能体本体论实战指南',
    home.heroDesc,
  )

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/10">
        <div className="absolute inset-0 bg-grid opacity-80" aria-hidden="true" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/20 blur-[110px]" aria-hidden="true" />
        <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:pb-24 lg:pt-20">
          <div>
            <span className="chip" data-reveal>
              <Sparkles size={12} className="text-brand" />
              {home.eyebrow}
            </span>
            <h1 className="mt-5 text-[2.15rem] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink sm:text-5xl xl:text-[3.55rem]" data-reveal style={{ '--reveal-delay': '60ms' }}>
              {home.heroTitleA}
              <br />
              <span className="gradient-text">{home.heroTitleB}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[14.5px] leading-[1.85] text-muted sm:text-[15.5px]" data-reveal style={{ '--reveal-delay': '120ms' }}>
              {home.heroDesc}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3" data-reveal style={{ '--reveal-delay': '180ms' }}>
              <Link to="/chapters/what-is-agent-ontology" className="btn-primary">
                {home.ctaPrimary}
                <ArrowRight size={15} />
              </Link>
              <Link to="/chapters" className="btn-secondary">
                <BookOpen size={15} />
                {home.ctaSecondary}
              </Link>
            </div>

            <p className="mt-5 flex max-w-xl items-start gap-2 text-[11px] leading-relaxed text-faint" data-reveal style={{ '--reveal-delay': '230ms' }}>
              <ShieldCheck size={13} className="mt-0.5 shrink-0 text-success" />
              {home.heroNote}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line/10 pt-6 sm:grid-cols-4" data-reveal style={{ '--reveal-delay': '280ms' }}>
              {home.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="stat-number">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-faint">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-reveal style={{ '--reveal-delay': '200ms' }}>
            <HeroGraphic />
            <div className="pointer-events-none absolute -bottom-2 left-1/2 hidden w-[88%] -translate-x-1/2 items-center justify-between rounded-2xl border border-line/10 bg-panel/75 px-4 py-2.5 shadow-soft backdrop-blur-md sm:flex">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">entity → relation → action</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                ontology online
              </span>
            </div>
          </div>
        </div>

        <div className="container-page relative border-t border-line/10 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="shrink-0 text-[9.5px] font-bold uppercase tracking-[0.18em] text-faint">{home.trust}</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {officialSources.map((source) => (
                <a
                  key={source.name}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[11px] font-semibold text-muted transition-colors hover:text-brand"
                >
                  {source.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="kicker">{home.painKicker}</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem]">{home.painTitle}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">{home.painDesc}</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {home.pains.map((pain, index) => {
            const PainIcon = painIcons[index] || Ghost
            return (
              <article
                key={pain.title}
                className="card-interactive group relative overflow-hidden p-6"
                data-reveal
                style={{ '--reveal-delay': `${index * 70}ms` }}
              >
                <span className="absolute right-4 top-3 font-mono text-[3.6rem] font-bold leading-none text-brand/[0.06] transition-colors group-hover:text-brand/[0.1]">
                  0{index + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-transform duration-300 group-hover:-rotate-6">
                  <PainIcon size={19} />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink">{pain.title}</h3>
                {lang === 'zh' ? <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-faint">{pain.en}</p> : null}
                <p className="mt-3 text-[12.5px] leading-relaxed text-muted">{pain.desc}</p>
                <span className="mt-5 block h-px w-full bg-gradient-to-r from-brand/30 via-brand/10 to-transparent" />
              </article>
            )
          })}
        </div>
      </section>

      {/* RAG vs ontology */}
      <section className="border-y border-line/10 bg-bg-soft/60 py-16 sm:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="kicker">{home.compareKicker}</span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem]">{home.compareTitle}</h2>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">{home.compareDesc}</p>
            <div className="mt-7 overflow-hidden rounded-2xl border border-line/10 bg-panel">
              {rows.map((row, index) => (
                <div key={index} className={`grid gap-3 px-4 py-3.5 sm:grid-cols-2 ${index > 0 ? 'border-t border-line/10' : ''}`}>
                  <div className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
                    <X size={13} className="mt-0.5 shrink-0 text-faint" />
                    {row.rag}
                  </div>
                  <div className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-2">
                    <Check size={13} className="mt-0.5 shrink-0 text-success" />
                    {row.onto}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Chart
            kind="performance"
            title={home.compareChartTitle}
            desc={home.compareChartDesc}
          />
        </div>
      </section>

      {/* Layers */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="kicker">{home.layersKicker}</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem]">{home.layersTitle}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">{home.layersDesc}</p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {home.layers.map((layer, index) => (
            <article key={layer.title} className="card-surface relative overflow-hidden p-6" data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
              <span className="chapter-card-num text-4xl font-extrabold">0{index + 1}</span>
              <h3 className="mt-4 text-base font-bold text-ink">{layer.title}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-faint">{layer.en}</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-muted">{layer.desc}</p>
              <p className="mt-5 rounded-lg border border-line/10 bg-panel-2/60 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.1em] text-faint">
                {layer.meta}
              </p>
            </article>
          ))}
        </div>

        <Chart kind="architecture" title={{ zh: '三层架构互动图', en: 'The three layers, interactive' }} desc={{ zh: '拖拽节点查看三层如何连接。完整说明见第 3 章。', en: 'Drag nodes to see how the layers connect. Full detail in chapter 3.' }} />
      </section>

      {/* Roadmap */}
      <section className="border-y border-line/10 bg-bg-soft/40 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="kicker">{home.roadmapKicker}</span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem]">{home.roadmapTitle}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{home.roadmapDesc}</p>
            </div>
            <Link to="/chapters" className="btn-secondary shrink-0">
              {t('common.allChapters')}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 space-y-10">
            {groupedChapters.map((group) => (
              <div key={group.id}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">{pick(group.label)}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-line/20 to-transparent" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.docs.map((doc, index) => (
                    <ChapterCard key={doc.slug} doc={doc} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="kicker">{home.scenariosKicker}</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem]">{home.scenariosTitle}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">{home.scenariosDesc}</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {home.scenarios.map((scenario, index) => {
            const ScenarioIcon = scenarioIcons[index] || BarChart3
            return (
              <Link
                key={scenario.title}
                to="/chapters/field-cases"
                className="group relative overflow-hidden rounded-3xl border border-line/10 bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
                data-reveal
                style={{ '--reveal-delay': `${index * 70}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand/[0.08] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <ScenarioIcon size={19} />
                  </span>
                  <span className="rounded-full border border-line/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-faint">
                    {scenario.tag}
                  </span>
                </div>
                <h3 className="relative mt-5 text-base font-bold text-ink transition-colors group-hover:text-brand">{scenario.title}</h3>
                <p className="relative mt-2 text-[12.5px] leading-relaxed text-muted">{scenario.desc}</p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand">
                  {t('common.readChapter')}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Author */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="brand-card relative overflow-hidden rounded-3xl p-6 sm:p-10" data-reveal>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-line/10 bg-panel/80 shadow-soft sm:h-24 sm:w-24">
                <LogoMark size={62} />
              </div>
              <div>
                <span className="kicker">{home.authorKicker}</span>
                <p className="mt-2 text-xl font-extrabold text-ink">{pick(author.name)}</p>
                <p className="mt-1 text-[11px] text-muted">
                  {pick(author.brand)} · {author.brandLatin}
                </p>
                <p className="mt-2 inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold text-brand">
                  {pick(author.slogan)}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{home.authorTitle}</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{home.authorDesc}</p>
              <div className="mt-4 flex items-center gap-3">
                <Quote size={18} className="shrink-0 text-brand/50" />
                <p className="text-sm font-medium italic text-ink-2">{home.authorQuote}</p>
              </div>
              <Link to="/about" className="link-arrow mt-5">
                {home.authorCta}
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand-2 to-accent px-6 py-12 text-center shadow-lift sm:px-10 sm:py-16" data-reveal>
          <div className="absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">
              <Sparkles size={12} />
              {common.brandSub}
            </span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{home.ctaTitle}</h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">{home.ctaDesc}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/chapters/what-is-agent-ontology" className="btn bg-white text-brand hover:-translate-y-0.5 hover:shadow-xl">
                {home.ctaBtn}
                <ArrowRight size={15} />
              </Link>
              <Link to="/chapters/glossary" className="btn border border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                {home.ctaBtn2}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
