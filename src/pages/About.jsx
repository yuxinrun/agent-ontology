import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Code2, HeartHandshake, Quote, RefreshCw, Sparkles } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { dict } from '../i18n/dict'
import { useDocMeta } from '../hooks/useElementSize'
import { author, officialSources } from '../data/site'
import { LogoMark } from '../components/Logo'

const principleIcons = [BadgeCheck, Code2, HeartHandshake, RefreshCw]

export default function About() {
  const { lang, t, pick } = useI18n()
  const copy = dict[lang].about
  useDocMeta(
    lang === 'zh' ? '关于作者与鱼心快跑 · 智能体本体论实战指南' : 'About the author and Yuxin Runs · Agent Ontology Field Guide',
    copy.intro,
  )

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line/10">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/15 blur-[110px]" aria-hidden="true" />
        <div className="container-page relative py-14 sm:py-20">
          <span className="kicker">{copy.kicker}</span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-muted sm:text-[15px]">{copy.intro}</p>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line/10 bg-panel/60 p-4 backdrop-blur">
                <p className="stat-number">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-faint">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="card-surface p-6 sm:p-8" data-reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-line/10 bg-panel-2">
                <LogoMark size={44} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{t('common.author')}</p>
                <h2 className="mt-1 text-xl font-extrabold text-ink">{pick(author.name)}</h2>
                <p className="text-[11px] text-muted">
                  {lang === 'zh' ? `${pick(author.brand)} · ${author.brandLatin}` : author.brandLatin}
                </p>
              </div>
            </div>
            <h3 className="mt-6 text-base font-bold text-ink">{copy.authorTitle}</h3>
            <p className="mt-3 text-[13px] leading-[1.85] text-muted">{copy.authorBody}</p>
            <p className="mt-3 text-[13px] leading-[1.85] text-muted">{copy.authorBody2}</p>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-brand/[0.06] p-4">
              <Quote size={20} className="mt-0.5 shrink-0 text-brand/50" />
              <p className="text-sm font-medium italic text-ink-2">{pick(author.tagline)}</p>
            </div>
          </section>

          <section className="brand-card relative overflow-hidden rounded-3xl p-6 sm:p-8" data-reveal style={{ '--reveal-delay': '70ms' }}>
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/[0.08] px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-brand">
                <Sparkles size={11} />
                {pick(author.brand)}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{copy.brandTitle}</h2>
              <p className="mt-3 text-[13px] leading-[1.85] text-muted">{copy.brandBody}</p>
              <p className="mt-5 rounded-2xl border border-brand/15 bg-panel/60 px-4 py-3 text-sm font-semibold text-brand">
                {copy.brandSlogan}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line/10 bg-panel/60 p-3">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-faint">Brand</p>
                  <p className="mt-1 text-[12px] font-semibold text-ink">{author.brandLatin}</p>
                </div>
                <div className="rounded-xl border border-line/10 bg-panel/60 p-3">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-faint">Slogan</p>
                  <p className="mt-1 text-[12px] font-semibold text-ink">{pick(author.slogan)}</p>
                </div>
              </div>
              <a
                href={author.site}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow mt-6"
              >
                {copy.brandLink}
                <ArrowRight size={13} />
              </a>
            </div>
          </section>
        </div>

        <section className="mt-14" data-reveal>
          <div className="mb-6 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-faint">EDITORIAL PRINCIPLES</p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{copy.projectTitle}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.principles.map((principle, index) => {
              const PrincipleIcon = principleIcons[index] || BadgeCheck
              return (
                <div
                  key={principle.title}
                  className="card-interactive flex gap-4 p-5"
                  data-reveal
                  style={{ '--reveal-delay': `${index * 60}ms` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <PrincipleIcon size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{principle.title}</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{principle.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-line/10 bg-panel p-6 sm:p-8" data-reveal>
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-faint">{copy.contactTitle}</p>
              <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted">{copy.contactDesc}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {officialSources.slice(0, 5).map((source) => (
                  <a
                    key={source.name}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[10.5px] text-faint transition-colors hover:text-brand"
                  >
                    {source.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={author.site} target="_blank" rel="noreferrer noopener" className="btn-primary">
                {copy.brandLink}
                <ArrowRight size={14} />
              </a>
              <Link to="/chapters" className="btn-secondary">
                {copy.backHome}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
