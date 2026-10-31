import c01 from './chapters/01'
import c02 from './chapters/02'
import c03 from './chapters/03'
import c04 from './chapters/04'
import c05 from './chapters/05'
import c06 from './chapters/06'
import c07 from './chapters/07'
import c08 from './chapters/08'
import c09 from './chapters/09'
import c10 from './chapters/10'
import c11 from './chapters/11'
import c12 from './chapters/12'
import { appendices } from './appendices'
import { parts } from './site'

export const chapters = [c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11, c12]

export const allDocs = [...chapters, ...appendices]

export const groupedChapters = parts.map((part) => ({
  ...part,
  docs: chapters.filter((chapter) => chapter.number >= part.range[0] && chapter.number <= part.range[1]),
}))

export function getDoc(slug) {
  return allDocs.find((doc) => doc.slug === slug)
}

export function getAdjacent(slug) {
  const index = allDocs.findIndex((doc) => doc.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? allDocs[index - 1] : null,
    next: index < allDocs.length - 1 ? allDocs[index + 1] : null,
  }
}

export function docLabel(doc) {
  if (!doc) return ''
  return doc.kind === 'appendix' ? `Appendix ${doc.id}` : `Chapter ${doc.number}`
}

export function searchDocs(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return allDocs
    .map((doc) => {
      const title = `${doc.title.zh} ${doc.title.en}`.toLowerCase()
      const summary = `${doc.summary.zh} ${doc.summary.en}`.toLowerCase()
      const sectionText = doc.sections
        .map((section) => `${section.title.zh} ${section.title.en}`)
        .join(' ')
        .toLowerCase()
      let score = 0
      if (title.includes(q)) score += 5
      if (summary.includes(q)) score += 3
      if (sectionText.includes(q)) score += 1
      return { doc, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}
