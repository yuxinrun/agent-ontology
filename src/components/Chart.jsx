import { useEffect, useMemo, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Info, MousePointer2, RotateCcw } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { useTheme } from '../context/ThemeContext'
import { chartBuilders } from './charts/options'
import ErrorBoundary from './ErrorBoundary'

const patternLabels = {
  manager: 'Manager',
  handoff: 'Handoff',
  peer: 'Peer',
  coordinator: 'Coordinator',
}

const chartHeights = {
  performance: 380,
  evolution: 450,
  radar: 400,
  architecture: 420,
  multiagent: 400,
  er: 420,
  knowledge: 470,
}

function ChartCanvas({ kind = 'architecture', detail = false, title, desc }) {
  const { lang, t, pick } = useI18n()
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const [pattern, setPattern] = useState('manager')
  const [resetKey, setResetKey] = useState(0)
  const [error, setError] = useState(false)
  const titleText = pick(title)

  const option = useMemo(() => {
    const builder = chartBuilders[kind]
    if (!builder) return null
    try {
      return builder(lang, theme, detail, pattern)
    } catch (err) {
      console.error('Chart option error', err)
      return null
    }
  }, [kind, lang, theme, detail, pattern])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return undefined

    let chart
    try {
      chart = echarts.init(element, null, { renderer: 'canvas' })
    } catch (err) {
      console.error('Chart init error', err)
      setError(true)
      return undefined
    }

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => chart.resize())
        : null
    observer?.observe(element)
    const onWindowResize = () => chart.resize()
    window.addEventListener('resize', onWindowResize)

    chart.on('click', (params) => {
      if (params.dataType === 'node') {
        chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: params.dataIndex })
      }
    })

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', onWindowResize)
      chart.dispose()
    }
  }, [])

  useEffect(() => {
    const chart = containerRef.current ? echarts.getInstanceByDom(containerRef.current) : null
    if (!chart || !option) return
    try {
      chart.setOption(option, true)
      chart.resize()
    } catch (err) {
      console.error('Chart setOption error', err)
      setError(true)
    }
  }, [option, resetKey])

  const onReset = () => {
    setPattern('manager')
    setResetKey((value) => value + 1)
  }

  const height = chartHeights[kind] || 400
  const graphKinds = ['architecture', 'multiagent', 'er']
  const interactionHint =
    kind === 'knowledge'
      ? t('common.dragHint')
      : graphKinds.includes(kind)
        ? t('common.graphHint')
        : t('common.hoverHint')

  return (
    <section className="my-8" data-reveal>
      <div className="card-surface overflow-hidden">
        <div className="flex flex-col gap-4 p-5 pb-1 sm:p-6 sm:pb-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="max-w-2xl">
              <div className="kicker mb-2">
                {t('common.visual')} · {kind.toUpperCase()}
              </div>
              <h4 className="text-base font-bold tracking-tight text-ink sm:text-lg">{titleText}</h4>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{pick(desc)}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="data-pill" title={t('common.illustrative')}>
                <Info size={11} />
                {lang === 'zh' ? '示意数据' : 'Illustrative'}
              </span>
              <button type="button" className="btn-icon h-8 w-8" onClick={onReset} aria-label={t('common.reset')} title={t('common.reset')}>
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {kind === 'multiagent' ? (
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={titleText}>
              {Object.entries(patternLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={pattern === key}
                  onClick={() => setPattern(key)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
                    pattern === key
                      ? 'bg-brand text-white shadow-glow'
                      : 'border border-line/15 bg-panel-2/60 text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative px-2 pb-1 sm:px-3" style={{ height }}>
          {error || !option ? (
            <div className="flex h-full items-center justify-center text-sm text-muted">{t('common.chartError')}</div>
          ) : (
            <div
              ref={containerRef}
              className="h-full w-full"
              role="img"
              aria-label={titleText}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/10 px-5 py-3 sm:px-6">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] text-faint">
            <MousePointer2 size={11} />
            {interactionHint}
          </span>
          <span className="max-w-xl text-[10px] leading-relaxed text-faint">{t('common.illustrative')}</span>
        </div>
      </div>
    </section>
  )
}


export default function Chart(props) {
  const { t } = useI18n()
  return (
    <ErrorBoundary
      fallback={
        <div className="my-8 rounded-2xl border border-warning/30 bg-warning/[0.06] p-6 text-center text-sm text-muted">
          {t('common.chartError')}
        </div>
      }
    >
      <ChartCanvas {...props} />
    </ErrorBoundary>
  )
}
