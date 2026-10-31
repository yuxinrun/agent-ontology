const chapter = {
  id: '12',
  number: 12,
  slug: 'future',
  kind: 'chapter',
  title: { zh: '未来趋势：本体会成为 Agent 的操作系统吗？', en: 'The future: will ontology become the agent OS?' },
  subtitle: { zh: '从手工建模到自动演化，从单厂协议到跨厂商语义网络', en: 'From hand-built models to self-evolving semantics, from vendor protocols to a cross-vendor semantic web' },
  summary: {
    zh: '展望本体与 Agent 工程的五个趋势：通用本体 vs 领域本体、自动生成与自演化、跨厂商互操作、Agent 经济与本体市场，以及工程师的成长路线。',
    en: 'Five trends at the intersection of ontology and agent engineering: universal vs domain ontologies, auto-generation and self-evolution, cross-vendor interoperability, the agent economy, and a growth path for engineers.',
  },
  level: 'production',
  minutes: 16,
  icon: 'Telescope',
  accent: 'cyan',
  tags: [
    { zh: '趋势', en: 'Trends' },
    { zh: '互操作', en: 'Interop' },
    { zh: '成长', en: 'Career' },
  ],
  sections: [
    {
      id: 'universal-vs-domain',
      title: { zh: '通用本体 vs 领域本体：谁会赢？', en: 'Universal vs domain ontology: who wins?' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '过去十年，知识图谱领域反复争论一个问题：能不能建一个「通用本体」，把所有行业都覆盖？现实给出的答案偏向**分层混合**：上层用少量通用概念（Agent、Task、Capability、Policy、Observation）保证互操作，下层用领域本体承载真实业务语义。这很像互联网：TCP/IP 只有几十个核心概念，上层应用百花齐放。',
            en: 'For a decade the knowledge-graph community has argued whether one universal ontology can cover every industry. Reality points to a **layered hybrid**: a small upper ontology (Agent, Task, Capability, Policy, Observation) for interoperability, with domain ontologies carrying real business semantics. Like the internet: TCP/IP has a few dozen core concepts; applications flourish above it.',
          },
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              icon: 'Globe',
              title: { zh: '上层：极简通用层', en: 'Upper: minimal universal layer' },
              text: { zh: '角色、能力、意图、任务、上下文、策略。数量少、变化慢、跨行业可复用。', en: 'Role, capability, intent, task, context, policy. Few, stable, cross-industry.' },
              tag: { zh: '协议级', en: 'Protocol level' },
            },
            {
              icon: 'Building2',
              title: { zh: '中层：行业本体', en: 'Middle: industry ontology' },
              text: { zh: '金融的交易与合规、医疗的诊疗路径、制造的工单与设备。由行业联盟或大厂维护。', en: 'Finance trades and compliance, clinical pathways, manufacturing work orders and equipment. Maintained by alliances or large vendors.' },
              tag: { zh: '行业级', en: 'Industry level' },
            },
            {
              icon: 'Wrench',
              title: { zh: '下层：企业本体', en: 'Lower: enterprise ontology' },
              text: { zh: '本公司的客户分层、审批链、指标口径。变化最快，也最值钱。', en: 'Your customer tiers, approval chains, metric definitions. Fastest-changing and most valuable.' },
              tag: { zh: '企业级', en: 'Enterprise level' },
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '别从「通用」开始建', en: 'Do not start from “universal”' },
          text: {
            zh: '通用本体的诱惑很大，但它的价值只有在多个系统真正对接时才兑现。单团队起步时，先把企业本体做扎实，再用映射层对齐行业标准。',
            en: 'Universal ontologies are tempting, but their value only materializes when multiple systems actually connect. Start with a solid enterprise ontology, then map to industry standards.',
          },
        },
      ],
    },
    {
      id: 'auto-generation',
      title: { zh: '自动生成与自演化', en: 'Auto-generation and self-evolution' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'LLM 让本体建设从「专家手写」变成「人机协作」。可行的工作流是：从数据库 schema、API 文档、历史工单和代码中抽取候选概念，由模型生成草稿，再由领域专家审核，最后用真实查询与动作验证。注意顺序——**先有证据，再有概念**，而不是让模型凭空编一套漂亮的 schema。',
            en: 'LLMs turn ontology building from expert hand-writing into human-machine collaboration: extract candidate concepts from schemas, API docs, tickets, and code; let models draft; have domain experts review; validate with real queries and actions. Order matters — **evidence first, concepts second**, not a model inventing a pretty schema from thin air.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { zh: '1 · 收集证据', en: '1 · Collect evidence' },
              text: { zh: '表结构、字段注释、API 契约、Top 200 查询、工单标签、代码里的枚举。', en: 'Schemas, column comments, API contracts, top 200 queries, ticket labels, enums in code.' },
            },
            {
              title: { zh: '2 · 抽取候选', en: '2 · Extract candidates' },
              text: { zh: '用规则 + LLM 抽取实体、属性、关系和动作，每个候选附来源引用。', en: 'Rule + LLM extraction of entities, attributes, relations, actions; every candidate carries a source citation.' },
            },
            {
              title: { zh: '3 · 人工审核', en: '3 · Human review' },
              text: { zh: '领域专家只做三件事：命名、合并同义、确认约束。', en: 'Experts do three things: naming, merging synonyms, confirming constraints.' },
            },
            {
              title: { zh: '4 · 任务验证', en: '4 · Task validation' },
              text: { zh: '用真实任务跑通端到端动作，无法落地的概念不进主本体。', en: 'Run end-to-end actions on real tasks; concepts that cannot land stay out of the core ontology.' },
            },
            {
              title: { zh: '5 · 持续演化', en: '5 · Keep evolving' },
              text: { zh: '监控未命中概念、低频实体与冲突别名，形成变更提案。', en: 'Monitor misses, low-frequency entities, and alias conflicts; generate change proposals.' },
            },
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'candidate_extractor.py',
          code: `from dataclasses import dataclass

@dataclass
class Candidate:
    name: str
    kind: str          # entity | relation | action
    evidence: list[str]
    confidence: float

def propose(schema_rows: list[dict]) -> list[Candidate]:
    """从 schema 抽取候选概念，附带证据，不做命名裁决。
    Extract candidates with evidence; leave naming decisions to humans."""
    out = []
    for row in schema_rows:
        name = row["table"]
        if row.get("row_count", 0) < 1000:
            continue
        out.append(Candidate(
            name=name,
            kind="entity",
            evidence=[f"table:{name}", f"pk:{row.get('pk')}"],
            confidence=0.6 if row.get("fk") else 0.4,
        ))
    return out

schema = [
    {"table": "orders", "pk": "order_id", "fk": "customer_id", "row_count": 420000},
    {"table": "tmp_import_2023", "pk": "id", "fk": None, "row_count": 12},
]
for c in propose(schema):
    print(c.name, c.kind, c.confidence)
# orders entity 0.6`,
          caption: {
            zh: '自动化的边界：机器负责「找证据」，人负责「下定义」。',
            en: 'The boundary of automation: machines find evidence, humans make definitions.',
          },
        },
      ],
    },
    {
      id: 'interop',
      title: { zh: '跨厂商互操作：协议正在收敛', en: 'Cross-vendor interoperability: protocols are converging' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '2024 年之后，Agent 协议从各自为战走向分层收敛：**工具层**有 MCP，**Agent 协作层**有 A2A，**研究层**有 IoA 等语义网络方案，**身份与授权层**有 OAuth 2.1 与 SPIFFE 等成熟方案。趋势不是「一个协议统治一切」，而是「每层一个事实标准 + 跨层映射」。',
            en: 'Since 2024, agent protocols have converged in layers: **tool layer** MCP, **agent collaboration** A2A, **research** semantic networks like IoA, **identity and authorization** mature options like OAuth 2.1 and SPIFFE. The trend is not one protocol ruling all, but one de facto standard per layer plus cross-layer mapping.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '层', en: 'Layer' },
            { zh: '代表协议/标准', en: 'Representative standard' },
            { zh: '解决什么', en: 'Solves' },
            { zh: '本体角色', en: 'Ontology role' },
          ],
          rows: [
            [{ zh: '工具接入', en: 'Tool access' }, { zh: 'MCP', en: 'MCP' }, { zh: 'Agent 如何发现并调用工具', en: 'How agents discover and call tools' }, { zh: '工具描述、输入输出 schema', en: 'Tool descriptions, input/output schema' }],
            [{ zh: 'Agent 协作', en: 'Agent collaboration' }, { zh: 'A2A', en: 'A2A' }, { zh: 'Agent 之间如何委派与回传', en: 'How agents delegate and return results' }, { zh: 'Agent Card、技能与任务语义', en: 'Agent Card, skills, task semantics' }],
            [{ zh: '语义网络', en: 'Semantic web' }, { zh: 'IoA / JSON-LD / OWL', en: 'IoA / JSON-LD / OWL' }, { zh: '异构 Agent 的意图与能力对齐', en: 'Aligning intent and capability across heterogeneous agents' }, { zh: '概念对齐、上下文共享', en: 'Concept alignment, shared context' }],
            [{ zh: '身份授权', en: 'Identity' }, { zh: 'OAuth 2.1 / SPIFFE', en: 'OAuth 2.1 / SPIFFE' }, { zh: '谁代表谁、能做什么', en: 'Who acts for whom, and what they may do' }, { zh: '角色、策略、审计主体', en: 'Roles, policies, audit subjects' }],
            [{ zh: '编码协作', en: 'Coding collaboration' }, { zh: 'AGENTS.md', en: 'AGENTS.md' }, { zh: '人类如何向编码 Agent 交代规则', en: 'How humans brief coding agents' }, { zh: '约束、约定、验收标准', en: 'Constraints, conventions, acceptance criteria' }],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '协议解决传输，本体解决理解', en: 'Protocols move messages; ontologies create understanding' },
          text: {
            zh: '两个 Agent 都支持 MCP，不代表它们对「客户」的理解一致。协议让消息能到达，本体让消息有意义。',
            en: 'Two agents both supporting MCP does not mean they agree on what a customer is. Protocols deliver messages; ontologies make them meaningful.',
          },
        },
      ],
    },
    {
      id: 'agent-economy',
      title: { zh: 'Agent 经济与「本体市场」', en: 'The agent economy and ontology marketplaces' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '当 Agent 可以互相发现、委派和结算时，语义就成了交易基础设施。买家需要知道卖家 Agent 的「能力边界」，平台需要可比较的服务描述，审计方需要可验证的履约记录。这些都是本体问题，而不只是 API 问题。已经出现的雏形包括 Agent 目录、能力评分、按任务计费和可验证凭证。',
            en: 'When agents can discover, delegate to, and settle with each other, semantics become transaction infrastructure. Buyers need capability boundaries, platforms need comparable service descriptions, auditors need verifiable fulfillment records. These are ontology problems, not just API problems. Early forms include agent directories, capability scores, per-task billing, and verifiable credentials.',
          },
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              icon: 'Store',
              title: { zh: '能力目录', en: 'Capability catalog' },
              text: { zh: '每个 Agent 用统一 schema 声明输入、输出、SLA、价格与限制。', en: 'Every agent declares inputs, outputs, SLA, price, and limits in a shared schema.' },
              tag: { zh: '可发现', en: 'Discoverable' },
            },
            {
              icon: 'BadgeCheck',
              title: { zh: '可验证履约', en: 'Verifiable fulfillment' },
              text: { zh: '动作日志、签名与凭证让「它真的做了」可被第三方验证。', en: 'Action logs, signatures, and credentials let third parties verify “it really did it”.' },
              tag: { zh: '可审计', en: 'Auditable' },
            },
            {
              icon: 'Scale',
              title: { zh: '责任边界', en: 'Liability boundaries' },
              text: { zh: '委派链上的每个 Agent 都要有主体与授权记录。', en: 'Every agent in a delegation chain needs a principal and authorization record.' },
              tag: { zh: '可追责', en: 'Accountable' },
            },
            {
              icon: 'Coins',
              title: { zh: '计量与结算', en: 'Metering and settlement' },
              text: { zh: '按任务、按 token 还是按结果付费，需要统一的任务本体。', en: 'Per task, per token, or per outcome — all need a shared task ontology.' },
              tag: { zh: '可结算', en: 'Settleable' },
            },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: '互联网让数据包找到目的地，语义网想让意图找到执行者。Agent 经济只是这个愿景的商业版本。',
            en: 'The internet helps packets find destinations; the semantic web wants intent to find executors. The agent economy is the commercial version of that vision.',
          },
        },
      ],
    },
    {
      id: 'engineer-roadmap',
      title: { zh: '工程师的成长路线', en: 'A growth path for engineers' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '如果你是从后端、前端或数据岗位转到 Agent 工程，不需要先成为哲学博士。你需要的是三种能力的组合：**建模**（把业务说清楚）、**工程**（把语义变成可执行代码）、**评估**（证明它真的更好）。下面是一条可以照着走的路线。',
            en: 'If you are moving into agent engineering from backend, frontend, or data, you do not need a PhD in philosophy. You need three combined abilities: **modeling** (making the business explicit), **engineering** (turning semantics into executable code), and **evaluation** (proving it is actually better). Here is a route you can follow.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { zh: '阶段一 · 能读懂', en: 'Stage 1 · Read' },
              text: { zh: '理解实体、关系、约束、动作；能读懂一份 OWL/JSON-LD 文档；知道 RAG 与本体的边界。', en: 'Understand entities, relations, constraints, actions; read an OWL/JSON-LD document; know where RAG ends and ontology begins.' },
            },
            {
              title: { zh: '阶段二 · 能建模', en: 'Stage 2 · Model' },
              text: { zh: '为一个真实业务画出 20 个实体以内的本体，并写出字段级映射与动作契约。', en: 'Model a real business with under 20 entities, with field mappings and action contracts.' },
            },
            {
              title: { zh: '阶段三 · 能落地', en: 'Stage 3 · Ship' },
              text: { zh: '用 MCP 或函数调用把本体接到 Agent 上，跑通带权限与审计的端到端流程。', en: 'Connect the ontology to an agent via MCP or function calling; ship an end-to-end flow with permissions and audit.' },
            },
            {
              title: { zh: '阶段四 · 能评估', en: 'Stage 4 · Evaluate' },
              text: { zh: '建立 50 条以上评测集，度量任务成功率、越权率、延迟与成本。', en: 'Build a 50+ case eval set; measure task success, policy violations, latency, and cost.' },
            },
            {
              title: { zh: '阶段五 · 能治理', en: 'Stage 5 · Govern' },
              text: { zh: '让本体可持续演化：版本、废弃、别名冲突、跨团队评审。', en: 'Make the ontology sustainable: versions, deprecation, alias conflicts, cross-team review.' },
            },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: { zh: '本体能力是「复利型」技能', en: 'Ontology skills compound' },
          text: {
            zh: '模型会换代、框架会过时，但「把业务语义表达清楚」的能力不会贬值。它决定你是在调 API，还是在设计系统。',
            en: 'Models change and frameworks fade, but the ability to make business semantics explicit never depreciates. It decides whether you are calling APIs or designing systems.',
          },
        },
      ],
    },
    {
      id: 'closing',
      title: { zh: '写在最后：从地图到地形', en: 'Closing: from map to terrain' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '本体不是终点，而是一种让 Agent 看见地形的方式。地图再精美，也要有人去修路；语义再完整，也要有动作去改变世界。过去十二章我们从一个比喻出发，走到了协议、代码、案例与治理。真正的下一步不在书里，而在你手上的那个真实业务里。',
            en: 'Ontology is not a destination; it is a way to let agents see the terrain. A beautiful map still needs road builders; complete semantics still need actions that change the world. Over twelve chapters we moved from a metaphor to protocols, code, cases, and governance. The real next step is not in this guide, but in the real business on your desk.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '选一个你熟悉但混乱的领域，写出 10 个核心实体。', en: 'Pick a domain you know but that is messy; write down 10 core entities.' },
            { zh: '为其中 3 个实体补上动作、权限与失败回滚。', en: 'Add actions, permissions, and rollback to 3 of them.' },
            { zh: '接到一个 Agent 上，用 20 条真实任务跑一遍。', en: 'Connect them to an agent and run 20 real tasks.' },
            { zh: '把失败案例变成评测集与本体变更提案。', en: 'Turn failures into eval cases and ontology change proposals.' },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: 'Agent 的上限，往往不是模型的上限，而是我们对业务理解的上限。',
            en: 'An agent’s ceiling is rarely the model’s ceiling; it is the ceiling of our understanding of the business.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '通用本体与领域本体将长期分层共存，上层简、下层深。', en: 'Universal and domain ontologies will coexist in layers: thin at the top, deep at the bottom.' },
    { zh: '自动化的正确分工是机器找证据、人下定义、任务做验证。', en: 'Automation works best when machines find evidence, humans define, and tasks validate.' },
    { zh: '协议按层收敛：MCP 管工具，A2A 管协作，IoA/JSON-LD 管语义。', en: 'Protocols converge by layer: MCP for tools, A2A for collaboration, IoA/JSON-LD for semantics.' },
    { zh: 'Agent 经济的底座是可发现、可审计、可追责、可结算的语义。', en: 'The agent economy rests on discoverable, auditable, accountable, settleable semantics.' },
    { zh: '建模、工程与评估三合一，是 Agent 工程师的长期竞争力。', en: 'Modeling, engineering, and evaluation together are the durable edge for agent engineers.' },
  ],
  sources: [
    {
      label: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' },
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      label: { zh: 'Model Context Protocol · Specification', en: 'Model Context Protocol · Specification' },
      url: 'https://modelcontextprotocol.io/specification/2025-06-18',
    },
    {
      label: { zh: 'A2A Protocol · Specification', en: 'A2A Protocol · Specification' },
      url: 'https://a2a-protocol.org/latest/specification/',
    },
    {
      label: { zh: 'arXiv · Internet of Agents: Weaving a Web of Heterogeneous Agents', en: 'arXiv · Internet of Agents: Weaving a Web of Heterogeneous Agents' },
      url: 'https://arxiv.org/abs/2407.07061',
    },
    {
      label: { zh: 'W3C · OWL 2 Web Ontology Language', en: 'W3C · OWL 2 Web Ontology Language' },
      url: 'https://www.w3.org/TR/owl2-overview/',
    },
    {
      label: { zh: 'AGENTS.md · Open format for guiding coding agents', en: 'AGENTS.md · Open format for guiding coding agents' },
      url: 'https://agents.md/',
    },
  ],
}

export default chapter
