const FONT = '"Manrope Variable", "PingFang SC", "Microsoft YaHei", sans-serif'

const PALETTES = {
  light: {
    brand: '#4f46e5',
    brand2: '#7c3aed',
    accent: '#0891b2',
    accent2: '#db2777',
    success: '#059669',
    warning: '#d97706',
    danger: '#e11d48',
    ink: '#090e20',
    ink2: '#2d3752',
    muted: '#606c89',
    panel: '#ffffff',
    line: 'rgba(15, 23, 42, 0.14)',
    grid: 'rgba(15, 23, 42, 0.08)',
    labelBg: 'rgba(255, 255, 255, 0.92)',
  },
  dark: {
    brand: '#818cf8',
    brand2: '#a78bfa',
    accent: '#22d3ee',
    accent2: '#f472b6',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#fb7185',
    ink: '#eef2ff',
    ink2: '#c3cbe6',
    muted: '#8e9ab8',
    panel: '#0b1226',
    line: 'rgba(226, 232, 255, 0.16)',
    grid: 'rgba(226, 232, 255, 0.08)',
    labelBg: 'rgba(11, 18, 38, 0.9)',
  },
}

export const getPalette = (theme) => PALETTES[theme] || PALETTES.light

const L = (lang, zh, en) => (lang === 'zh' ? zh : en)

const axisLabel = (c, extra = {}) => ({
  color: c.muted,
  fontSize: 11,
  fontFamily: FONT,
  ...extra,
})

const tooltipBase = (c) => ({
  backgroundColor: c.panel,
  borderColor: c.line,
  borderWidth: 1,
  padding: [10, 14],
  textStyle: { color: c.ink, fontSize: 12, fontFamily: FONT, lineHeight: 19 },
  extraCssText: 'box-shadow:0 16px 44px -16px rgba(0,0,0,.38);border-radius:12px;',
})

const gradient = (from, to, horizontal = false) => ({
  type: 'linear',
  x: 0,
  y: 0,
  x2: horizontal ? 1 : 0,
  y2: horizontal ? 0 : 1,
  colorStops: [
    { offset: 0, color: from },
    { offset: 1, color: to },
  ],
})

// ---------------------------------------------------------------------------
// Performance: with vs without ontology
// ---------------------------------------------------------------------------
export function performanceOption(lang, theme) {
  const c = getPalette(theme)
  const metrics = [
    { zh: '任务完成率', en: 'Task completion', without: 62, withOntology: 84 },
    { zh: '事实准确率', en: 'Factual accuracy', without: 71, withOntology: 93 },
    { zh: '合规通过率', en: 'Policy compliance', without: 55, withOntology: 97 },
    { zh: '工具调用正确率', en: 'Tool-call accuracy', without: 68, withOntology: 90 },
    { zh: '一次通过率', en: 'First-pass success', without: 49, withOntology: 79 },
    { zh: '低人工接管率', en: 'Low human takeover', without: 66, withOntology: 88 },
  ]
  return {
    animationDuration: 1100,
    animationEasing: 'cubicOut',
    animationDelay: (index) => index * 60,
    aria: {
      enabled: true,
      label: { description: L(lang, '有本体与无本体的生产指标对比', 'Production metrics with and without ontology') },
    },
    tooltip: {
      ...tooltipBase(c),
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(127,127,180,.08)' } },
      valueFormatter: (value) => `${value}%`,
    },
    legend: {
      top: 0,
      right: 0,
      icon: 'roundRect',
      itemWidth: 9,
      itemHeight: 9,
      itemGap: 16,
      textStyle: { color: c.muted, fontSize: 11, fontFamily: FONT },
    },
    grid: { left: 4, right: 42, top: 42, bottom: 6, containLabel: true },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: axisLabel(c, { formatter: '{value}%' }),
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: c.grid } },
    },
    yAxis: {
      type: 'category',
      data: metrics.map((m) => L(lang, m.zh, m.en)),
      axisLabel: axisLabel(c),
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: L(lang, '无本体', 'Without ontology'),
        type: 'bar',
        data: metrics.map((m) => m.without),
        barWidth: 9,
        itemStyle: { color: c.line, borderRadius: 6 },
        emphasis: { itemStyle: { color: c.muted } },
      },
      {
        name: L(lang, '有本体', 'With ontology'),
        type: 'bar',
        data: metrics.map((m) => m.withOntology),
        barWidth: 9,
        itemStyle: {
          color: gradient(c.brand, c.accent, true),
          borderRadius: 6,
          shadowBlur: 12,
          shadowColor: theme === 'dark' ? 'rgba(129,140,248,.35)' : 'rgba(79,70,229,.25)',
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: c.ink2,
          fontSize: 10,
          fontFamily: FONT,
          fontWeight: 600,
        },
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// Evolution timeline
// ---------------------------------------------------------------------------
export function evolutionOption(lang, theme) {
  const c = getPalette(theme)
  const lanes = [
    L(lang, '提示词', 'Prompting'),
    L(lang, '检索', 'Retrieval'),
    L(lang, '智能体', 'Agents'),
    L(lang, '本体与标准', 'Ontology & standards'),
  ]
  const events = [
    { year: 2017, lane: 0, name: L(lang, 'Transformer 论文', 'Transformer paper'), desc: L(lang, '注意力机制成为后续一切的基础。', 'Attention becomes the foundation for what follows.') },
    { year: 2020, lane: 0, name: L(lang, 'Few-shot Prompting', 'Few-shot prompting'), desc: L(lang, '用示例代替微调，Prompt 工程开始流行。', 'Examples replace fine-tuning; prompt engineering takes off.') },
    { year: 2022, lane: 0, name: L(lang, '思维链 CoT', 'Chain-of-Thought'), desc: L(lang, '让模型显式写出推理步骤。', 'Models write out reasoning steps explicitly.') },
    { year: 2023, lane: 0, name: L(lang, 'Prompt 工具化', 'Prompt tooling'), desc: L(lang, '模板、版本与评测进入工程流程。', 'Templates, versions, and evals enter the engineering workflow.') },

    { year: 2020, lane: 1, name: 'RAG', desc: L(lang, '检索增强生成把外部知识接入模型。', 'Retrieval-augmented generation brings external knowledge to the model.') },
    { year: 2023, lane: 1, name: L(lang, '向量数据库爆发', 'Vector DB boom'), desc: L(lang, '嵌入检索成为应用标配。', 'Embedding search becomes a default building block.') },
    { year: 2024, lane: 1, name: 'GraphRAG', desc: L(lang, '用图结构组织检索上下文，接近本体思维。', 'Graph-structured retrieval edges toward ontology thinking.') },

    { year: 2022, lane: 2, name: 'ReAct / MRKL', desc: L(lang, '推理与工具调用交替的范式成型。', 'Alternating reasoning and tool use takes shape.') },
    { year: 2023, lane: 2, name: L(lang, 'Function Calling', 'Function calling'), desc: L(lang, '模型原生支持结构化工具调用。', 'Models natively support structured tool calls.') },
    { year: 2023, lane: 2, name: 'AutoGPT', desc: L(lang, '自主循环的实验，也暴露了失控与成本问题。', 'Autonomous loops experiment — and expose control and cost problems.') },
    { year: 2024, lane: 2, name: L(lang, 'Agents SDK / Swarm', 'Agents SDK / Swarm'), desc: L(lang, '多 Agent 编排进入工程化阶段。', 'Multi-agent orchestration becomes engineering practice.') },
    { year: 2025, lane: 2, name: L(lang, '多 Agent 生产化', 'Multi-agent in production'), desc: L(lang, '权限、评测与可观测性成为重点。', 'Permissions, evals, and observability become the focus.') },

    { year: 2021, lane: 3, name: L(lang, '操作型本体', 'Operational ontology'), desc: L(lang, 'Palantir 把本体与业务动作结合。', 'Palantir combines ontology with business actions.') },
    { year: 2024, lane: 3, name: 'MCP', desc: L(lang, '工具接入出现跨厂商标准。', 'A cross-vendor standard for tool access appears.') },
    { year: 2025, lane: 3, name: L(lang, 'A2A / MCP 标准化', 'A2A / MCP standardization'), desc: L(lang, 'Agent 协作层协议开始收敛。', 'The collaboration layer starts to converge.') },
    { year: 2025, lane: 3, name: L(lang, 'IoA 语义互联', 'IoA semantic web'), desc: L(lang, '异构 Agent 的语义对齐成为研究热点。', 'Semantic alignment across heterogeneous agents becomes a research focus.') },
    { year: 2026, lane: 3, name: L(lang, '本体进入 Agent 栈', 'Ontology enters the agent stack'), desc: L(lang, '语义层从文档走向可执行运行时。', 'The semantic layer moves from docs into executable runtime.') },
  ]

  return {
    animationDuration: 900,
    animationEasing: 'cubicOut',
    aria: {
      enabled: true,
      label: { description: L(lang, 'Agent 技术演进时间轴', 'Agent technology timeline') },
    },
    tooltip: {
      ...tooltipBase(c),
      trigger: 'item',
      formatter: (params) => {
        const d = params.data
        return `<div style="max-width:250px"><div style="font-weight:700;margin-bottom:2px">${d.name}</div>
          <div style="color:${c.muted};font-size:11px;margin-bottom:6px">${d.year} · ${lanes[d.lane]}</div>
          <div style="color:${c.ink2};font-size:12px">${d.desc}</div></div>`
      },
    },
    grid: { left: 10, right: 24, top: 56, bottom: 26, containLabel: true },
    xAxis: {
      type: 'value',
      min: 2016.4,
      max: 2026.6,
      interval: 1,
      axisLabel: axisLabel(c, { formatter: (value) => `${Math.round(value)}` }),
      axisLine: { lineStyle: { color: c.line } },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: c.grid } },
    },
    yAxis: {
      type: 'category',
      data: lanes,
      axisLabel: axisLabel(c, { fontWeight: 600 }),
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: true, areaStyle: { color: ['rgba(127,127,180,0.025)', 'transparent'] } },
    },
    series: [
      {
        type: 'scatter',
        symbolSize: 15,
        data: events.map((event, index) => ({
          ...event,
          value: [event.year, event.lane],
          label: {
            position: event.lane === 3 ? 'bottom' : 'top',
            offset: event.lane === 3 ? [0, 8] : [0, -8],
          },
          itemStyle: {
            color: [c.brand, c.accent, c.brand2, c.success][event.lane],
            borderColor: c.panel,
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(99,102,241,.3)',
          },
          animationDelay: index * 45,
        })),
        label: {
          show: true,
          formatter: (params) => params.data.name,
          color: c.ink2,
          fontSize: 10,
          fontFamily: FONT,
          lineHeight: 13,
        },
        labelLayout: { hideOverlap: true },
        emphasis: {
          scale: 1.5,
          label: { color: c.ink, fontWeight: 700, fontSize: 11 },
          itemStyle: { shadowBlur: 20 },
        },
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// Radar
// ---------------------------------------------------------------------------
export function radarOption(lang, theme) {
  const c = getPalette(theme)
  const dims = [
    L(lang, '工具使用', 'Tool use'),
    L(lang, '自主性', 'Autonomy'),
    L(lang, '推理深度', 'Reasoning'),
    L(lang, '记忆', 'Memory'),
    L(lang, '协作', 'Collaboration'),
    L(lang, '可预测性', 'Predictability'),
  ]
  const series = [
    { name: 'ReAct', color: c.brand, values: [4.6, 4.1, 4.0, 3.0, 3.0, 3.6] },
    { name: 'MRKL', color: c.accent, values: [4.9, 3.4, 3.6, 2.6, 3.0, 4.2] },
    { name: 'Self-Ask', color: c.brand2, values: [2.0, 2.6, 4.6, 2.1, 2.4, 4.5] },
    { name: L(lang, '对话型', 'Conversational'), color: c.accent2, values: [2.2, 2.0, 2.3, 4.6, 4.4, 3.8] },
  ]
  return {
    animationDuration: 1000,
    aria: {
      enabled: true,
      label: { description: L(lang, 'Agent 类型能力雷达图', 'Agent capability radar') },
    },
    tooltip: {
      ...tooltipBase(c),
      trigger: 'item',
      formatter: (params) =>
        `<div style="font-weight:700;margin-bottom:4px">${params.name}</div>` +
        dims
          .map((d, index) => `<div style="display:flex;justify-content:space-between;gap:18px;color:${c.ink2}"><span>${d}</span><b>${params.value[index]}</b></div>`)
          .join(''),
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 18,
      textStyle: { color: c.muted, fontSize: 11, fontFamily: FONT },
    },
    radar: {
      radius: '62%',
      center: ['50%', '46%'],
      indicator: dims.map((name) => ({ name, max: 5 })),
      splitNumber: 5,
      axisName: { color: c.ink2, fontSize: 11, fontFamily: FONT },
      splitLine: { lineStyle: { color: c.grid } },
      splitArea: { areaStyle: { color: ['rgba(127,127,180,0.03)', 'transparent'] } },
      axisLine: { lineStyle: { color: c.grid } },
    },
    series: [
      {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 4,
        data: series.map((item) => ({
          name: item.name,
          value: item.values,
          lineStyle: { color: item.color, width: 2 },
          itemStyle: { color: item.color },
          areaStyle: { color: item.color, opacity: 0.07 },
        })),
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// Graphs
// ---------------------------------------------------------------------------
const graphTooltip = (c, lang) => ({
  ...tooltipBase(c),
  trigger: 'item',
  formatter: (params) => {
    if (params.dataType === 'edge') {
      return `<span style="font-weight:600">${params.data.label || ''}</span>`
    }
    const d = params.data
    return `<div style="max-width:260px"><div style="font-weight:700;margin-bottom:3px">${d.name}</div>
      <div style="color:${c.muted};font-size:10.5px;margin-bottom:6px">${d.kind || ''}</div>
      <div style="color:${c.ink2};font-size:12px;line-height:1.65">${d.desc || ''}</div></div>`
  },
})

function graphBase(c, lang) {
  return {
    animationDuration: 900,
    animationEasing: 'cubicOut',
    aria: {
      enabled: true,
      label: { description: L(lang, '本体关系图', 'Ontology graph') },
    },
    tooltip: graphTooltip(c, lang),
  }
}

const baseGraphSeries = (c, lang, nodes, edges, categories) => ({
  type: 'graph',
  layout: 'none',
  draggable: true,
  roam: false,
  symbol: 'circle',
  edgeSymbol: ['none', 'arrow'],
  edgeSymbolSize: 6,
  categories,
  data: nodes,
  links: edges,
  lineStyle: { color: c.line, width: 1.3, curveness: 0.08, opacity: 0.9 },
  emphasis: {
    focus: 'adjacency',
    scale: 1.12,
    lineStyle: { width: 2.6, color: c.brand, opacity: 1 },
    label: { fontWeight: 700 },
  },
  label: {
    show: true,
    position: 'bottom',
    distance: 6,
    color: c.ink2,
    fontSize: 10.5,
    fontFamily: FONT,
    fontWeight: 600,
  },
  labelLayout: { hideOverlap: true },
  itemStyle: { borderColor: c.panel, borderWidth: 2, shadowBlur: 14, shadowColor: 'rgba(79,70,229,0.2)' },
})

export function architectureOption(lang, theme, detail = false) {
  const c = getPalette(theme)
  const categories = [
    { name: L(lang, '抽象层', 'Abstraction'), itemStyle: { color: c.brand } },
    { name: L(lang, '语义层', 'Semantics'), itemStyle: { color: c.brand2 } },
    { name: L(lang, '执行层', 'Execution'), itemStyle: { color: c.accent } },
  ]

  const simple = {
    nodes: [
      ['AgentType', 'Agent 类型', 'Agent type', 16, 72, 0, '对 Agent 进行分类与能力标注，例如检索型、执行型、对话型。', 'Classifies agents and tags capabilities: retrieval, execution, conversation.'],
      ['Capability', '能力', 'Capability', 16, 50, 0, '用统一词汇描述 Agent 能做什么，是路由与发现的基础。', 'A shared vocabulary for what an agent can do; the basis of routing and discovery.'],
      ['Contract', '输入输出契约', 'I/O contract', 16, 28, 0, '定义输入输出结构与错误语义，保证调用方可预期。', 'Defines input/output shapes and error semantics so callers can rely on it.'],
      ['Role', '角色', 'Role', 50, 76, 1, '角色把能力与责任绑定，决定 Agent 的权限边界。', 'Roles bind capability to responsibility and set permission boundaries.'],
      ['Domain', '领域实体', 'Domain entity', 50, 50, 1, '业务对象及其关系，例如客户、订单、工单。', 'Business objects and relations: customer, order, ticket.'],
      ['Intent', '意图', 'Intent', 50, 24, 1, '用户或上游 Agent 想完成的事情，是任务分解的入口。', 'What a user or upstream agent wants; the entry point for task decomposition.'],
      ['AgentSet', 'Agent 集合', 'Agent set', 84, 76, 2, '可被部署和调度的一组 Agent 实例。', 'A deployable, schedulable group of agent instances.'],
      ['Registry', '注册中心', 'Registry', 84, 50, 2, '记录 Agent 与工具的能力、端点与健康状态。', 'Tracks capabilities, endpoints, and health of agents and tools.'],
      ['Tool', '工具', 'Tool', 84, 24, 2, '真正执行动作的接口，例如查询、退款、发邮件。', 'Interfaces that actually act: query, refund, send email.'],
    ],
    edges: [
      ['AgentType', 'Role', 'describes'],
      ['Capability', 'Domain', 'operates on'],
      ['Contract', 'Tool', 'invokes'],
      ['Role', 'AgentSet', 'instantiated as'],
      ['Domain', 'Registry', 'indexed by'],
      ['Intent', 'Tool', 'routes to'],
      ['Role', 'Intent', 'scopes'],
      ['Domain', 'Tool', 'grounds'],
    ],
  }

  const full = {
    nodes: [
      ['Taxonomy', '分类体系', 'Taxonomy', 14, 82, 0, 'Agent 类型、层级与能力标签的受控词表。', 'Controlled vocabulary for agent types, levels, and capability tags.'],
      ['Capability', '能力声明', 'Capability', 14, 60, 0, '可被检索与组合的能力描述，含输入输出与限制。', 'Searchable, composable capability descriptions with I/O and limits.'],
      ['Contract', '接口契约', 'Contract', 14, 38, 0, 'Schema、错误码、超时与幂等约定。', 'Schema, error codes, timeouts, and idempotency.'],
      ['AgentType', 'Agent 类型', 'Agent type', 14, 16, 0, '运行时实例的模板，绑定默认能力与策略。', 'Runtime template binding default capabilities and policies.'],
      ['Role', '角色', 'Role', 50, 88, 1, '职责、权限与可执行动作的组合。', 'Responsibilities, permissions, and allowed actions.'],
      ['Domain', '领域', 'Domain', 50, 68, 1, '业务对象、指标与口径所在的语义域。', 'The semantic domain of business objects, metrics, and definitions.'],
      ['Interaction', '交互', 'Interaction', 50, 48, 1, '意图、消息、交接与任务状态协议。', 'Intent, message, handoff, and task-state protocols.'],
      ['Relation', '关系', 'Relation', 50, 28, 1, 'Similar To / Chains With / Integrates With / Belongs To。', 'Similar To / Chains With / Integrates With / Belongs To.'],
      ['Policy', '策略', 'Policy', 50, 8, 1, '访问控制、审批、合规与降级规则。', 'Access control, approval, compliance, and degradation rules.'],
      ['AgentSet', 'Agent 集合', 'Agent set', 86, 86, 2, '可部署单元与副本策略。', 'Deployable units and replica strategy.'],
      ['Registry', '注册中心', 'Registry', 86, 68, 2, '能力发现、健康检查与版本路由。', 'Capability discovery, health checks, version routing.'],
      ['Tool', '工具', 'Tool', 86, 50, 2, '真实 API、数据库操作与消息发送。', 'Real APIs, database actions, messaging.'],
      ['Runtime', '运行时', 'Runtime', 86, 32, 2, '循环、上下文、重试与超时控制。', 'Loops, context, retries, and timeout control.'],
      ['Observability', '可观测性', 'Observability', 86, 14, 2, 'Trace、指标、审计与成本归因。', 'Traces, metrics, audit, and cost attribution.'],
    ],
    edges: [
      ['Taxonomy', 'AgentType', 'classifies'],
      ['Capability', 'Role', 'composes'],
      ['Contract', 'Interaction', 'shapes'],
      ['AgentType', 'AgentSet', 'deploys as'],
      ['Role', 'Policy', 'bounded by'],
      ['Role', 'AgentSet', 'instantiates'],
      ['Domain', 'Registry', 'indexed by'],
      ['Domain', 'Tool', 'grounds'],
      ['Interaction', 'Tool', 'invokes'],
      ['Interaction', 'Runtime', 'runs on'],
      ['Relation', 'Registry', 'resolves via'],
      ['Policy', 'Tool', 'gates'],
      ['Runtime', 'Observability', 'reports to'],
      ['AgentSet', 'Registry', 'registers'],
      ['Tool', 'Observability', 'traced by'],
      ['Contract', 'Runtime', 'enforced by'],
    ],
  }

  const model = detail ? full : simple
  const byId = Object.fromEntries(model.nodes.map((node) => [node[0], node]))
  const nodes = model.nodes.map(([id, zh, en, x, y, cat, descZh, descEn]) => ({
    id,
    name: L(lang, zh, en),
    x,
    y,
    category: cat,
    symbolSize: cat === 0 ? 38 : cat === 1 ? 46 : 40,
    kind: categories[cat].name,
    desc: L(lang, descZh, descEn),
  }))
  const edges = model.edges.map(([source, target, label]) => ({
    source,
    target,
    label: `${byId[source][1]} → ${byId[target][1]}`,
  }))

  return {
    ...graphBase(c, lang),
    aria: {
      enabled: true,
      label: { description: L(lang, 'Agent Ontology 三层架构图', 'Three-layer agent ontology diagram') },
    },
    series: [baseGraphSeries(c, lang, nodes, edges, categories)],
  }
}

// ---------------------------------------------------------------------------
// Multi-agent flows
// ---------------------------------------------------------------------------
export const MULTIAGENT_PATTERNS = ['manager', 'handoff', 'peer', 'coordinator']

export function multiagentOption(lang, theme, pattern = 'manager') {
  const c = getPalette(theme)
  const categories = [
    { name: L(lang, '协调者', 'Coordinator'), itemStyle: { color: c.brand } },
    { name: L(lang, '专家', 'Specialist'), itemStyle: { color: c.accent } },
    { name: L(lang, '外部系统', 'External'), itemStyle: { color: c.muted } },
  ]

  const configs = {
    manager: {
      nodes: [
        ['Manager', '管理者', 'Manager', 50, 52, 0, '把专家 Agent 当作工具调用，负责规划与汇总。', 'Calls specialist agents as tools; plans and aggregates.'],
        ['Research', '研究 Agent', 'Research agent', 18, 82, 1, '负责检索与事实核对。', 'Handles retrieval and fact checking.'],
        ['Writer', '写作 Agent', 'Writer agent', 82, 82, 1, '负责组织语言与输出。', 'Handles composition and output.'],
        ['Critic', '评审 Agent', 'Critic agent', 50, 14, 1, '检查一致性与风险，给出修改意见。', 'Checks consistency and risk; suggests revisions.'],
      ],
      edges: [
        ['Manager', 'Research', 'as tool'],
        ['Manager', 'Writer', 'as tool'],
        ['Manager', 'Critic', 'as tool'],
      ],
    },
    handoff: {
      nodes: [
        ['Triage', '分诊', 'Triage', 16, 52, 0, '识别意图并决定交给哪个专家。', 'Detects intent and routes to a specialist.'],
        ['Refund', '退款', 'Refunds', 58, 84, 1, '处理退款政策与审批。', 'Handles refund policy and approval.'],
        ['Billing', '计费', 'Billing', 58, 52, 1, '处理账单、发票与支付问题。', 'Handles bills, invoices, and payments.'],
        ['Tech', '技术支持', 'Tech support', 58, 20, 1, '处理产品故障与使用问题。', 'Handles product failures and usage issues.'],
        ['Human', '人工坐席', 'Human agent', 88, 52, 2, '高风险或高情绪场景的人工接管。', 'Human takeover for high-risk or high-emotion cases.'],
      ],
      edges: [
        ['Triage', 'Refund', 'handoff'],
        ['Triage', 'Billing', 'handoff'],
        ['Triage', 'Tech', 'handoff'],
        ['Refund', 'Human', 'escalate'],
        ['Billing', 'Human', 'escalate'],
      ],
    },
    peer: {
      nodes: [
        ['Planner', '规划者', 'Planner', 50, 84, 0, '拆分目标并分派子任务。', 'Decomposes goals and assigns subtasks.'],
        ['Researcher', '研究者', 'Researcher', 16, 46, 1, '收集证据与上下文。', 'Collects evidence and context.'],
        ['Builder', '执行者', 'Builder', 84, 46, 1, '执行工具调用与产出。', 'Executes tool calls and produces artifacts.'],
        ['Reviewer', '评审者', 'Reviewer', 50, 12, 1, '验证结果并反馈。', 'Validates results and gives feedback.'],
      ],
      edges: [
        ['Planner', 'Researcher', 'assign'],
        ['Planner', 'Builder', 'assign'],
        ['Researcher', 'Builder', 'message'],
        ['Builder', 'Reviewer', 'submit'],
        ['Reviewer', 'Planner', 'feedback'],
        ['Reviewer', 'Builder', 'revise'],
      ],
    },
    coordinator: {
      nodes: [
        ['Coordinator', '协调者', 'Coordinator', 50, 50, 0, '拆分任务、并行调度、汇总结果。', 'Splits work, schedules in parallel, aggregates results.'],
        ['R1', '检索 A', 'Researcher A', 16, 84, 1, '负责一个独立子问题。', 'Owns one independent sub-question.'],
        ['R2', '检索 B', 'Researcher B', 16, 16, 1, '负责另一个独立子问题。', 'Owns another independent sub-question.'],
        ['R3', '检索 C', 'Researcher C', 84, 84, 1, '负责外部数据与验证。', 'Handles external data and validation.'],
        ['Synth', '汇总', 'Synthesizer', 84, 18, 2, '合并结果、消解冲突并生成最终答复。', 'Merges results, resolves conflicts, and produces the answer.'],
      ],
      edges: [
        ['Coordinator', 'R1', 'dispatch'],
        ['Coordinator', 'R2', 'dispatch'],
        ['Coordinator', 'R3', 'dispatch'],
        ['R1', 'Synth', 'result'],
        ['R2', 'Synth', 'result'],
        ['R3', 'Synth', 'result'],
      ],
    },
  }

  const config = configs[pattern] || configs.manager
  const nodes = config.nodes.map(([id, zh, en, x, y, cat, descZh, descEn]) => ({
    id,
    name: L(lang, zh, en),
    x,
    y,
    category: cat,
    symbolSize: cat === 0 ? 58 : cat === 2 ? 36 : 46,
    symbol: cat === 0 ? 'roundRect' : cat === 2 ? 'diamond' : 'circle',
    kind: categories[cat].name,
    desc: L(lang, descZh, descEn),
  }))
  const edges = config.edges.map(([source, target, label]) => ({
    source,
    target,
    label,
    lineStyle:
      pattern === 'peer'
        ? { color: c.brand2, width: 1.4, curveness: 0.18 }
        : pattern === 'coordinator'
          ? { color: c.accent, width: 1.4, curveness: 0.08 }
          : { color: c.line, width: 1.4, curveness: 0.08 },
  }))
  const series = baseGraphSeries(c, lang, nodes, edges, categories)
  series.edgeLabel = {
    show: true,
    formatter: (params) => params.data.label,
    color: c.muted,
    fontSize: 9,
    fontFamily: FONT,
    backgroundColor: c.labelBg,
    padding: [2, 4],
    borderRadius: 4,
  }

  return {
    ...graphBase(c, lang),
    aria: {
      enabled: true,
      label: {
        description: L(lang, `多智能体协作：${pattern}`, `Multi-agent collaboration: ${pattern}`),
      },
    },
    series: [series],
  }
}

// ---------------------------------------------------------------------------
// ER graph
// ---------------------------------------------------------------------------
export function erOption(lang, theme) {
  const c = getPalette(theme)
  const categories = [
    { name: L(lang, '主体', 'Actor'), itemStyle: { color: c.brand } },
    { name: L(lang, '交易', 'Transaction'), itemStyle: { color: c.accent } },
    { name: L(lang, '知识', 'Knowledge'), itemStyle: { color: c.brand2 } },
    { name: L(lang, 'Agent', 'Agent'), itemStyle: { color: c.accent2 } },
  ]
  const nodes = [
    ['Customer', '客户', 'Customer', 14, 66, 0, '购买与沟通的主体，含分层与生命周期。', 'The buying and communicating actor, with tiers and lifecycle.'],
    ['Order', '订单', 'Order', 42, 82, 1, '交易主记录，关联支付、履约与退款。', 'The transaction record linked to payment, fulfillment, refunds.'],
    ['Payment', '支付', 'Payment', 76, 88, 1, '支付流水与状态，退款的前提。', 'Payment transactions and status; prerequisite for refunds.'],
    ['Refund', '退款', 'Refund', 76, 58, 1, '退款申请、审批与结果。', 'Refund request, approval, and outcome.'],
    ['Ticket', '工单', 'Ticket', 42, 50, 0, '一次客户请求，带优先级与 SLA。', 'A customer request with priority and SLA.'],
    ['Conversation', '对话', 'Conversation', 14, 30, 0, '多轮沟通记录，含情绪与意图。', 'Multi-turn communication with sentiment and intent.'],
    ['Article', '知识文章', 'Article', 42, 18, 2, '可被引用的解决方案与政策。', 'Citable solutions and policies.'],
    ['AgentRun', 'Agent 执行', 'Agent run', 78, 26, 3, '一次 Agent 处理的轨迹与动作。', 'The trace and actions of one agent handling.'],
  ]
  const edges = [
    ['Customer', 'Order', 'places'],
    ['Order', 'Payment', 'paid by'],
    ['Order', 'Refund', 'refunded via'],
    ['Customer', 'Ticket', 'raises'],
    ['Ticket', 'Conversation', 'has'],
    ['Ticket', 'Article', 'cites'],
    ['Ticket', 'AgentRun', 'handled by'],
    ['Order', 'Ticket', 'triggers'],
    ['AgentRun', 'Conversation', 'reads'],
  ]
  const series = baseGraphSeries(
    c,
    lang,
    nodes.map(([id, zh, en, x, y, cat, descZh, descEn]) => ({
      id,
      name: L(lang, zh, en),
      x,
      y,
      category: cat,
      symbolSize: cat === 0 ? 50 : 44,
      kind: categories[cat].name,
      desc: L(lang, descZh, descEn),
    })),
    edges.map(([source, target, label]) => ({ source, target, label, lineStyle: { color: c.line, curveness: 0.06 } })),
    categories,
  )
  series.edgeLabel = {
    show: true,
    formatter: (params) => params.data.label,
    color: c.muted,
    fontSize: 9,
    fontFamily: FONT,
    backgroundColor: c.labelBg,
    padding: [2, 4],
    borderRadius: 4,
  }

  return {
    ...graphBase(c, lang),
    aria: {
      enabled: true,
      label: { description: L(lang, '智能客服实体关系图', 'Customer support entity graph') },
    },
    series: [series],
  }
}

// ---------------------------------------------------------------------------
// Knowledge force graph
// ---------------------------------------------------------------------------
export function knowledgeOption(lang, theme) {
  const c = getPalette(theme)
  const categories = [
    { name: L(lang, '核心', 'Core'), itemStyle: { color: c.brand } },
    { name: L(lang, '角色与能力', 'Role & capability'), itemStyle: { color: c.brand2 } },
    { name: L(lang, '领域实体', 'Domain entity'), itemStyle: { color: c.accent } },
    { name: L(lang, '执行对象', 'Execution'), itemStyle: { color: c.accent2 } },
  ]
  const nodes = [
    ['Agent', 'Agent', 'Agent', 52, 1.7, 0, '中心执行主体，绑定角色、能力、工具与策略。', 'The central actor bound to roles, capabilities, tools, and policies.'],
    ['Role', '角色', 'Role', 34, 1.2, 1, '定义职责与权限边界。', 'Defines responsibilities and permission boundaries.'],
    ['Capability', '能力', 'Capability', 34, 1.5, 1, '可组合的能力声明。', 'Composable capability declarations.'],
    ['Policy', '策略', 'Policy', 34, 1.0, 1, '访问控制、审批与合规规则。', 'Access, approval, and compliance rules.'],
    ['Intent', '意图', 'Intent', 34, 1.8, 1, '上游请求的语义表达。', 'Semantic expression of an upstream request.'],
    ['Tool', '工具', 'Tool', 32, 1.4, 3, '真实执行动作的接口。', 'Interfaces that perform real actions.'],
    ['Customer', '客户', 'Customer', 30, 1.6, 2, '购买与沟通主体。', 'The buying and communicating actor.'],
    ['Order', '订单', 'Order', 30, 1.3, 2, '交易主记录。', 'The primary transaction record.'],
    ['Ticket', '工单', 'Ticket', 30, 1.1, 2, '客户请求与 SLA。', 'Customer requests and SLA.'],
    ['Refund', '退款', 'Refund', 26, 1.5, 3, '退款动作与审批流。', 'Refund action and approval flow.'],
    ['Query', '查询', 'Query', 26, 1.2, 3, '只读查询动作。', 'Read-only query action.'],
  ]
  const links = [
    ['Agent', 'Role'], ['Agent', 'Capability'], ['Agent', 'Policy'], ['Agent', 'Intent'], ['Agent', 'Tool'],
    ['Capability', 'Refund'], ['Capability', 'Query'], ['Intent', 'Customer'], ['Intent', 'Order'],
    ['Role', 'Ticket'], ['Tool', 'Refund'], ['Tool', 'Query'], ['Order', 'Customer'], ['Ticket', 'Customer'],
    ['Refund', 'Order'], ['Policy', 'Tool'],
  ]
  return {
    animationDuration: 1100,
    animationEasing: 'cubicOut',
    aria: {
      enabled: true,
      label: {
        description: L(lang, '角色、领域与交互本体关系图', 'Role, domain, and interaction ontology graph'),
      },
    },
    tooltip: graphTooltip(c, lang),
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
      textStyle: { color: c.muted, fontSize: 10, fontFamily: FONT },
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        force: { repulsion: 250, edgeLength: [58, 130], gravity: 0.07, layoutAnimation: true },
        categories,
        data: nodes.map(([id, zh, en, symbolSize, x, cat, descZh, descEn], index) => ({
          id,
          name: L(lang, zh, en),
          symbolSize: id === 'Agent' ? 62 : symbolSize,
          category: cat,
          x: x * 100,
          y: (index % 5) * 70,
          kind: categories[cat].name,
          desc: L(lang, descZh, descEn),
          label: {
            show: true,
            position: id === 'Agent' ? 'inside' : 'bottom',
            color: id === 'Agent' ? '#ffffff' : c.ink2,
            fontSize: id === 'Agent' ? 12 : 10.5,
            fontWeight: id === 'Agent' ? 700 : 600,
            fontFamily: FONT,
          },
        })),
        links: links.map(([source, target]) => ({
          source,
          target,
          lineStyle: { color: c.line, width: 1.2, curveness: 0.12, opacity: 0.8 },
        })),
        itemStyle: { borderColor: c.panel, borderWidth: 2, shadowBlur: 12, shadowColor: 'rgba(79,70,229,.18)' },
        lineStyle: { color: c.line, width: 1.2, curveness: 0.12, opacity: 0.8 },
        emphasis: {
          focus: 'adjacency',
          scale: 1.15,
          lineStyle: { width: 2.4, color: c.brand, opacity: 1 },
        },
        labelLayout: { hideOverlap: true },
      },
    ],
  }
}

export const chartBuilders = {
  performance: (lang, theme) => performanceOption(lang, theme),
  evolution: (lang, theme) => evolutionOption(lang, theme),
  radar: (lang, theme) => radarOption(lang, theme),
  architecture: (lang, theme, detail) => architectureOption(lang, theme, detail),
  multiagent: (lang, theme, detail, pattern) => multiagentOption(lang, theme, pattern),
  er: (lang, theme) => erOption(lang, theme),
  knowledge: (lang, theme) => knowledgeOption(lang, theme),
}
