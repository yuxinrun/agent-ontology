import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-typescript'
import { useI18n } from '../context/I18nContext'

const langLabels = {
  python: 'Python',
  json: 'JSON',
  jsonld: 'JSON-LD',
  bash: 'Shell',
  markdown: 'Markdown',
  md: 'Markdown',
  javascript: 'JavaScript',
  js: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      /* permission denied or insecure context: fall through */
    }
  }
  const area = document.createElement('textarea')
  area.value = text
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  document.body.removeChild(area)
}

export default function CodeBlock({ code, lang = 'text', filename, caption }) {
  const { t, pick } = useI18n()
  const [copied, setCopied] = useState(false)
  const grammar = Prism.languages[lang] || Prism.languages.markup
  const highlighted = Prism.highlight(code, grammar, lang)

  useEffect(() => {
    if (!copied) return undefined
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  const onCopy = async () => {
    try {
      await copyText(code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <figure className="my-6" data-reveal>
      <div className="code-window">
        <div className="code-header">
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="truncate font-mono text-[11px] text-white/55">
              {filename || langLabels[lang] || 'code'}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/40 sm:inline">
              {langLabels[lang] || lang}
            </span>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-white/55 transition-all duration-200 hover:bg-white/10 hover:text-white"
              aria-label={t('common.copy')}
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span className={copied ? 'text-emerald-400' : ''}>{copied ? t('common.copied') : t('common.copy')}</span>
            </button>
          </div>
        </div>
        <pre className="code-body scroll-thin">
          <code
            className={`language-${lang}`}
            // Prism escapes the source before highlighting; code is authored content, not user input.
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
      {caption ? (
        <figcaption className="mt-3 px-1 text-xs leading-relaxed text-muted">{pick(caption)}</figcaption>
      ) : null}
    </figure>
  )
}
