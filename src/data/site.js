export const author = {
  name: { zh: '鱼心', en: 'Yuxin' },
  brand: { zh: '鱼心快跑', en: 'Yuxin Runs' },
  brandLatin: 'Yuxin Runs',
  site: 'https://www.yuxin.run',
  siteLabel: 'www.yuxin.run',
  slogan: { zh: '鱼心快跑，Bug 追不到。', en: 'Yuxin Rush, Bugs Gone.' },
  tagline: {
    zh: '写代码，也写那些踩过的坑。',
    en: 'Writing code, and writing down the scars.',
  },
}

export const parts = [
  {
    id: 'part-1',
    label: { zh: '第一部分 · 认知与架构', en: 'Part I · Mental models & architecture' },
    range: [1, 4],
  },
  {
    id: 'part-2',
    label: { zh: '第二部分 · 技术与协议', en: 'Part II · Techniques & protocols' },
    range: [5, 8],
  },
  {
    id: 'part-3',
    label: { zh: '第三部分 · 实战与进阶', en: 'Part III · Practice & advanced topics' },
    range: [9, 12],
  },
]

export const officialSources = [
  { name: 'Anthropic', href: 'https://www.anthropic.com/engineering/building-effective-agents' },
  { name: 'OpenAI', href: 'https://openai.github.io/openai-agents-python/' },
  { name: 'LangChain', href: 'https://docs.langchain.com/oss/python/langchain/agents' },
  { name: 'W3C OWL', href: 'https://www.w3.org/TR/owl2-overview/' },
  { name: 'IETF', href: 'https://datatracker.ietf.org/wg/dmsc/about/' },
  { name: 'Palantir', href: 'https://www.palantir.com/docs/foundry/ontology/overview/' },
  { name: 'Model Context Protocol', href: 'https://modelcontextprotocol.io/' },
  { name: 'A2A Protocol', href: 'https://a2a-protocol.org/' },
]

export const coreSources = [
  {
    label: 'Anthropic · Building effective agents',
    url: 'https://www.anthropic.com/engineering/building-effective-agents',
  },
  {
    label: 'Anthropic · How we built our multi-agent research system',
    url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
  },
  {
    label: 'OpenAI · A practical guide to building agents',
    url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
  },
  {
    label: 'OpenAI Agents SDK documentation',
    url: 'https://openai.github.io/openai-agents-python/',
  },
  {
    label: 'Model Context Protocol · Specification',
    url: 'https://modelcontextprotocol.io/specification/2025-06-18',
  },
  {
    label: 'AGENTS.md · A simple, open format for guiding coding agents',
    url: 'https://agents.md/',
  },
  {
    label: 'W3C · OWL 2 Web Ontology Language overview',
    url: 'https://www.w3.org/TR/owl2-overview/',
  },
  {
    label: 'W3C · JSON-LD 1.1',
    url: 'https://www.w3.org/TR/json-ld11/',
  },
]

export const heroNodes = [
  { key: 'role', icon: 'UserCog', label: { zh: '角色', en: 'Role' }, angle: -90, tone: 'brand' },
  { key: 'domain', icon: 'Boxes', label: { zh: '领域', en: 'Domain' }, angle: -30, tone: 'violet' },
  { key: 'intent', icon: 'MessageSquare', label: { zh: '意图', en: 'Intent' }, angle: 30, tone: 'cyan' },
  { key: 'capability', icon: 'Sparkles', label: { zh: '能力', en: 'Capability' }, angle: 90, tone: 'pink' },
  { key: 'tool', icon: 'Wrench', label: { zh: '工具', en: 'Tool' }, angle: 150, tone: 'emerald' },
  { key: 'policy', icon: 'ShieldCheck', label: { zh: '策略', en: 'Policy' }, angle: 210, tone: 'amber' },
]

export const levelMeta = {
  starter: { label: { zh: '入门', en: 'Starter' }, tone: 'emerald' },
  builder: { label: { zh: '进阶', en: 'Builder' }, tone: 'brand' },
  production: { label: { zh: '生产', en: 'Production' }, tone: 'violet' },
  appendix: { label: { zh: '附录', en: 'Appendix' }, tone: 'cyan' },
}

export const accentMap = {
  brand: { rgb: 'var(--brand)', className: 'text-brand' },
  violet: { rgb: 'var(--brand-2)', className: 'text-brand-2' },
  cyan: { rgb: 'var(--accent)', className: 'text-accent' },
  pink: { rgb: 'var(--accent-2)', className: 'text-accent-2' },
  emerald: { rgb: 'var(--success)', className: 'text-success' },
  amber: { rgb: 'var(--warning)', className: 'text-warning' },
}
