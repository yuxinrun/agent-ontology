import { Link } from 'react-router-dom'
import { ArrowLeft, Compass, Network } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { useDocMeta } from '../hooks/useElementSize'

export default function NotFound() {
  const { t, lang } = useI18n()
  useDocMeta(
    `${t('common.notFoundTitle')} · ${t('common.brand')}`,
    t('common.notFoundDesc'),
  )

  return (
    <div className="container-page flex min-h-[64vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] border border-brand/20 bg-brand/10">
        <span className="absolute inset-0 rounded-[28px] border border-brand/25 animate-[pulseRing_3.5s_ease-out_infinite]" />
        <Network size={38} className="text-brand" />
      </div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-faint">ERROR 404 · UNDEFINED NODE</p>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{t('common.notFoundTitle')}</h1>
      <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted">{t('common.notFoundDesc')}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <ArrowLeft size={15} />
          {t('common.goHome')}
        </Link>
        <Link to="/chapters" className="btn-secondary">
          <Compass size={15} />
          {t('common.allChapters')}
        </Link>
      </div>
      <p className="mt-8 text-[10.5px] text-faint">{lang === 'zh' ? '提示：试试搜索「本体」「MCP」或「多智能体」。' : 'Tip: try searching for “ontology”, “MCP”, or “multi-agent”.'}</p>
    </div>
  )
}
