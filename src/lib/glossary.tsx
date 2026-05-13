import React from 'react'
import GlossaryTooltip from '@/components/GlossaryTooltip'
import glossaryData from '@/data/glossary.json'

const buildLowercaseMap = (obj: Record<string, string>) => {
  const map: Record<string, string> = {}
  Object.keys(obj).forEach(k => { map[k.toLowerCase()] = obj[k] })
  return map
}

const glossaryMap = buildLowercaseMap(glossaryData as Record<string, string>)

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function highlightContentWithGlossary(content: string): React.ReactNode[] {
  const terms = Object.keys(glossaryMap).sort((a, b) => b.length - a.length)
  if (!terms.length) return [content]

  const pattern = terms.map(escapeRegExp).join('|')
  const re = new RegExp(`\\b(${pattern})\\b`, 'gi')

  const nodes: React.ReactNode[] = []
  const seen = new Set<string>()
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(content)) !== null) {
    const idx = match.index
    if (lastIndex < idx) {
      nodes.push(content.slice(lastIndex, idx))
    }
    const matched = match[0]
    const key = matched.toLowerCase()
    const def = glossaryMap[key] || glossaryMap[key.replace(/'/g, "'")]
    if (def && !seen.has(key)) {
      seen.add(key)
      nodes.push(<GlossaryTooltip key={idx + '-' + matched} term={matched} definition={def} />)
    } else {
      nodes.push(matched)
    }
    lastIndex = re.lastIndex
  }

  if (lastIndex < content.length) {
    nodes.push(content.slice(lastIndex))
  }

  return nodes
}

export default highlightContentWithGlossary