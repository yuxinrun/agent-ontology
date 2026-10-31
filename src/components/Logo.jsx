import { useId } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

export function LogoMark({ size = 38, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const bgId = `aoLogoBg-${uid}`
  const coreId = `aoLogoCore-${uid}`
  const glowId = `aoLogoGlow-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={bgId} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="0.52" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <radialGradient id={coreId} cx="0" cy="0" r="1" gradientTransform="translate(32 32) rotate(90) scale(13)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C7D2FE" />
        </radialGradient>
        <filter id={glowId} x="8" y="8" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="17" fill={`url(#${bgId})`} />
      <circle cx="32" cy="32" r="25" fill="#FFFFFF" fillOpacity="0.06" />
      <g stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.1">
        <path d="M32 32L32 13.5M32 32L48.4 22.5M32 32L48.4 41.5M32 32L32 50.5M32 32L15.6 41.5M32 32L15.6 22.5" />
      </g>
      <g stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="0.9">
        <path d="M32 13.5L48.4 41.5M48.4 22.5L15.6 41.5M48.4 41.5L15.6 22.5M15.6 22.5L32 50.5M32 13.5L15.6 41.5" />
      </g>
      <g fill="#FFFFFF">
        <circle cx="32" cy="13.5" r="3.1" />
        <circle cx="48.4" cy="22.5" r="3.1" />
        <circle cx="48.4" cy="41.5" r="3.1" />
        <circle cx="32" cy="50.5" r="3.1" />
        <circle cx="15.6" cy="41.5" r="3.1" />
        <circle cx="15.6" cy="22.5" r="3.1" />
      </g>
      <circle cx="32" cy="32" r="10" fill="#FFFFFF" fillOpacity="0.28" filter={`url(#${glowId})`} />
      <circle cx="32" cy="32" r="7" fill={`url(#${coreId})`} />
      <circle cx="32" cy="32" r="3.1" fill="#4F46E5" />
      <circle cx="34.6" cy="29.4" r="1.1" fill="#FFFFFF" fillOpacity="0.9" />
    </svg>
  )
}

export default function Logo({ to = '/', size = 38 }) {
  const { t } = useI18n()
  return (
    <Link to={to} className="group flex shrink-0 items-center gap-2.5" aria-label={`${t('common.brand')} · ${t('common.home')}`}>
      <span className="relative inline-flex transition-transform duration-500 group-hover:rotate-[12deg] group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgba(99,102,241,0.55)]">
        <LogoMark size={size} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-panel bg-success" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block text-[14px] font-extrabold tracking-tight text-ink transition-colors group-hover:text-brand sm:text-[15px]">
          {t('common.brand')}
        </span>
        <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.14em] text-faint">
          {t('common.brandSub')}
        </span>
      </span>
    </Link>
  )
}
