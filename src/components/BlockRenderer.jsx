import { AlertTriangle, CheckCircle2, Info, Lightbulb, Quote } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import Chart from './Chart'
import CodeBlock from './CodeBlock'
import Icon from './Icon'
import InlineText from './InlineText'

const calloutStyles = {
  info: {
    icon: Info,
    box: 'border-accent/25 bg-accent/[0.06]',
    iconBox: 'bg-accent/10 text-accent',
    title: 'text-accent',
  },
  tip: {
    icon: Lightbulb,
    box: 'border-success/25 bg-success/[0.06]',
    iconBox: 'bg-success/10 text-success',
    title: 'text-success',
  },
  warn: {
    icon: AlertTriangle,
    box: 'border-warning/30 bg-warning/[0.07]',
    iconBox: 'bg-warning/15 text-warning',
    title: 'text-warning',
  },
  success: {
    icon: CheckCircle2,
    box: 'border-success/25 bg-success/[0.06]',
    iconBox: 'bg-success/10 text-success',
    title: 'text-success',
  },
}

const cardColumns = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

function Callout({ block }) {
  const { pick } = useI18n()
  const style = calloutStyles[block.variant] || calloutStyles.info
  const CalloutIcon = style.icon
  return (
    <aside className={`my-6 rounded-2xl border p-4 sm:p-5 ${style.box}`} data-reveal>
      <div className="flex gap-3.5">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${style.iconBox}`}>
          <CalloutIcon size={16} />
        </span>
        <div className="min-w-0">
          {block.title ? <p className={`mb-1 text-sm font-bold ${style.title}`}>{pick(block.title)}</p> : null}
          <p className="text-[14px] leading-relaxed text-ink-2">{pick(block.text)}</p>
        </div>
      </div>
    </aside>
  )
}

function Cards({ block }) {
  const { pick } = useI18n()
  const columns = cardColumns[block.columns] || cardColumns[3]
  return (
    <div className={`my-6 grid gap-3.5 ${columns}`} data-reveal>
      {block.items.map((item, index) => (
        <div
          key={index}
          className="group rounded-2xl border border-line/10 bg-panel-2/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-glow"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
              <Icon name={item.icon} size={17} />
            </span>
            {item.tag ? (
              <span className="rounded-full border border-line/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-faint">
                {pick(item.tag)}
              </span>
            ) : null}
          </div>
          <p className="text-sm font-bold text-ink">{pick(item.title)}</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{pick(item.text)}</p>
        </div>
      ))}
    </div>
  )
}

function Table({ block }) {
  const { pick } = useI18n()
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-line/10" data-reveal>
      <div className="scroll-thin overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead>
            <tr className="bg-panel-2/80">
              {block.head.map((cell, index) => (
                <th
                  key={index}
                  scope="col"
                  className="whitespace-nowrap border-b border-line/10 px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.12em] text-muted"
                >
                  {pick(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-colors hover:bg-brand/[0.035]">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border-b border-line/10 px-4 py-3 align-top text-[12.5px] leading-relaxed ${
                      cellIndex === 0 ? 'font-semibold text-ink' : 'text-ink-2'
                    }`}
                  >
                    <InlineText text={pick(cell)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption ? (
        <figcaption className="border-t border-line/10 bg-panel-2/40 px-4 py-2.5 text-[11px] text-muted">
          {pick(block.caption)}
        </figcaption>
      ) : null}
    </figure>
  )
}

function List({ block }) {
  const { pick } = useI18n()
  const ordered = Boolean(block.ordered)
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag
      className={`my-5 space-y-3 marker:font-mono marker:text-brand/70 ${
        ordered ? 'list-decimal pl-6' : 'list-none'
      }`}
    >
      {block.items.map((item, index) => (
        <li
          key={index}
          className={`text-[15px] leading-[1.8] text-ink-2 ${
            ordered ? 'pl-1' : 'relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand/60'
          }`}
        >
          <InlineText text={pick(item)} />
        </li>
      ))}
    </Tag>
  )
}

function Steps({ block }) {
  const { pick } = useI18n()
  return (
    <ol className="my-7 space-y-0" data-reveal>
      {block.items.map((item, index) => (
        <li key={index} className="relative flex gap-4 pb-6 last:pb-0">
          {index < block.items.length - 1 ? (
            <span className="absolute left-[15px] top-9 h-[calc(100%-1.75rem)] w-px bg-gradient-to-b from-brand/35 to-line/10" aria-hidden="true" />
          ) : null}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand/10 font-mono text-[11px] font-bold text-brand">
            {index + 1}
          </span>
          <div className="min-w-0 pt-1">
            <p className="text-sm font-bold text-ink">{pick(item.title)}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{pick(item.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function QuoteBlock({ block }) {
  const { pick } = useI18n()
  return (
    <blockquote className="relative my-8 overflow-hidden rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/[0.07] via-brand-2/[0.05] to-accent/[0.05] p-6 sm:p-7" data-reveal>
      <Quote size={34} className="absolute right-5 top-4 text-brand/15" aria-hidden="true" />
      <p className="relative max-w-2xl text-base font-medium leading-relaxed text-ink sm:text-lg">
        “{pick(block.text)}”
      </p>
      <span className="mt-4 block h-px w-16 bg-gradient-to-r from-brand to-accent" aria-hidden="true" />
    </blockquote>
  )
}

export default function BlockRenderer({ blocks }) {
  const { pick } = useI18n()

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={index} className="mb-5">
                <InlineText text={pick(block.text)} />
              </p>
            )
          case 'callout':
            return <Callout key={index} block={block} />
          case 'cards':
            return <Cards key={index} block={block} />
          case 'table':
            return <Table key={index} block={block} />
          case 'list':
            return <List key={index} block={block} />
          case 'steps':
            return <Steps key={index} block={block} />
          case 'quote':
            return <QuoteBlock key={index} block={block} />
          case 'code':
            return (
              <CodeBlock
                key={index}
                code={block.code}
                lang={block.lang}
                filename={block.filename}
                caption={block.caption}
              />
            )
          case 'chart':
            return (
              <Chart
                key={index}
                kind={block.kind}
                detail={block.detail}
                title={block.title}
                desc={block.desc}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
