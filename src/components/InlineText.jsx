import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/

export default function InlineText({ text }) {
  if (text == null) return null
  const parts = String(text).split(TOKEN)
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index}>{part.slice(1, -1)}</code>
        }
        const link = part.match(LINK)
        if (link) {
          const [, label, href] = link
          if (href.startsWith('/')) {
            return (
              <Link key={index} to={href} className="article-link">
                {label}
              </Link>
            )
          }
          return (
            <a
              key={index}
              href={href}
              className="article-link"
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
            >
              {label}
            </a>
          )
        }
        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}
