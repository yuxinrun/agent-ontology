import { heroNodes } from '../data/site'
import { useI18n } from '../context/I18nContext'
import Icon from './Icon'
import { LogoMark } from './Logo'

const toneStyles = {
  brand: 'border-brand/25 bg-brand/[0.08] text-brand',
  violet: 'border-brand-2/25 bg-brand-2/[0.08] text-brand-2',
  cyan: 'border-accent/25 bg-accent/[0.08] text-accent',
  pink: 'border-accent-2/25 bg-accent-2/[0.08] text-accent-2',
  emerald: 'border-success/25 bg-success/[0.08] text-success',
  amber: 'border-warning/25 bg-warning/[0.08] text-warning',
}

const radius = 38
const nodes = heroNodes.map((node) => {
  const radians = (node.angle * Math.PI) / 180
  return {
    ...node,
    x: 50 + radius * Math.cos(radians),
    y: 50 + radius * Math.sin(radians),
  }
})

export default function HeroGraphic() {
  const { pick } = useI18n()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] select-none" aria-hidden="true">
      <div className="absolute inset-[9%] rounded-full border border-line/10" />
      <div className="absolute inset-[21%] rounded-full border border-dashed border-brand/20 animate-[spinSlow_70s_linear_infinite]" />
      <div className="absolute inset-[33%] rounded-full border border-line/10" />
      <div className="absolute inset-[30%] rounded-full bg-brand/10 blur-3xl animate-pulse-glow" />
      <div className="absolute inset-[16%] rounded-full bg-accent/10 blur-3xl" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="heroLine" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(var(--brand))" stopOpacity="0.5" />
            <stop offset="0.5" stopColor="rgb(var(--brand-2))" stopOpacity="0.35" />
            <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0.28" />
          </linearGradient>
        </defs>
        {nodes.map((node) => (
          <line
            key={node.key}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="url(#heroLine)"
            strokeWidth="0.35"
            strokeDasharray="1.6 1.8"
            style={{ animation: 'dashFlow 9s linear infinite' }}
          />
        ))}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="url(#heroLine)" strokeWidth="0.25" strokeDasharray="0.8 2.2" />
        {nodes.map((node) => (
          <circle key={`dot-${node.key}`} cx={node.x} cy={node.y} r="0.85" fill="rgb(var(--brand))" opacity="0.55" />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-[30px] border border-line/10 bg-panel/85 shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)] backdrop-blur-xl">
          <span className="absolute inset-0 rounded-[30px] border border-brand/25 animate-[pulseRing_4s_ease-out_infinite]" />
          <LogoMark size={62} />
        </div>
        <span className="mt-3 rounded-full border border-line/10 bg-panel/80 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted backdrop-blur">
          Agent Ontology
        </span>
      </div>

      {nodes.map((node, index) => (
        <div
          key={node.key}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%`, animation: `floatY ${6.5 + index * 0.4}s ease-in-out ${index * 0.35}s infinite` }}
        >
          <div className={`flex items-center gap-1.5 rounded-full border bg-panel/90 px-2.5 py-1.5 shadow-soft backdrop-blur-md ${toneStyles[node.tone] || toneStyles.brand}`}>
            <Icon name={node.icon} size={12} />
            <span className="whitespace-nowrap text-[10px] font-bold text-ink">{pick(node.label)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
