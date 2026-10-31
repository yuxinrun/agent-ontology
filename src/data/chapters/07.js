const chapter = {
  id: '07',
  number: 7,
  slug: 'semantic-interop',
  kind: 'chapter',
  title: { zh: '语义交互标准：Agent 之间怎么「说话」', en: 'Semantic interoperability: how agents talk' },
  subtitle: { zh: 'IoA 核心类、JSON-LD 与 AGENTS.md', en: 'IoA core classes, JSON-LD, and AGENTS.md' },
  summary: {
    zh: '从传输协议到语义层，讲清 Agent 之间共享意图、能力与任务的标准方式，以及本体对齐与协商的工程做法。',
    en: 'From transport to semantics: how agents share intents, capabilities, and tasks, plus practical ontology alignment and negotiation.',
  },
  level: 'production',
  minutes: 20,
  icon: 'MessagesSquare',
  accent: 'pink',
  tags: [
    { zh: 'IoA', en: 'IoA' },
    { zh: 'JSON-LD', en: 'JSON-LD' },
    { zh: 'AGENTS.md', en: 'AGENTS.md' },
  ],
  sections: [
    {
      id: 'why-shared-language',
      title: { zh: '为什么 Agent 之间需要「共同语言」？', en: 'Why agents need a shared language' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '两个 Agent 都能发 HTTP 请求，不代表它们能合作。传输层只保证「消息送达」，语义层才决定「对方是否理解、是否该接、接完谁负责」。MCP 主要解决 Agent 与工具之间的问题，A2A 解决 Agent 与 Agent 之间的问题，IoA（Internet of Agents）则试图把 Agent 发现、能力描述、意图与任务放到一个更完整的语义框架里。',
            en: 'Two agents both speaking HTTP does not mean they can collaborate. Transport guarantees delivery; semantics determines whether the receiver understands, should accept, and who owns the result. MCP connects agents to tools, A2A connects agents to agents, and IoA (Internet of Agents) aims at a broader semantic framework for discovery, capability description, intents, and tasks.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '层面', en: 'Layer' },
            { zh: '代表协议 / 规范', en: 'Representative standard' },
            { zh: '解决什么', en: 'Solves' },
            { zh: '不解决什么', en: 'Does not solve' },
          ],
          rows: [
            [{ zh: '工具接入', en: 'Tool access' }, { zh: 'MCP', en: 'MCP' }, { zh: '工具发现、调用、资源与提示词', en: 'Tool discovery, invocation, resources, prompts' }, { zh: 'Agent 之间的责任与语义对齐', en: 'Agent-to-agent ownership and alignment' }],
            [{ zh: 'Agent 互操作', en: 'Agent interop' }, { zh: 'A2A', en: 'A2A' }, { zh: 'Agent 卡片、任务生命周期、消息与工件', en: 'Agent cards, task lifecycle, messages, artifacts' }, { zh: '领域词表与业务规则', en: 'Domain vocabulary and business rules' }],
            [{ zh: '语义框架', en: 'Semantic framework' }, { zh: 'IoA 研究 / IETF DMSC 草案', en: 'IoA research / IETF DMSC drafts' }, { zh: 'Agent、能力、意图、任务、上下文的统一描述', en: 'Unified description of agents, capabilities, intents, tasks, context' }, { zh: '具体领域本体仍需自建', en: 'Domain ontology still yours to build' }],
            [{ zh: '仓库级指令', en: 'Repository instructions' }, { zh: 'AGENTS.md', en: 'AGENTS.md' }, { zh: '告诉编码 Agent 如何构建、测试与遵守约束', en: 'How coding agents build, test, and obey constraints' }, { zh: '运行时协作协议', en: 'Runtime collaboration protocol' }],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '传输、协议、语义是三件事', en: 'Transport, protocol, semantics' },
          text: {
            zh: 'JSON-RPC 是传输格式，A2A 定义任务与消息生命周期，本体定义「退款」「VIP」到底是什么意思。三者都要，但不要混为一谈。',
            en: 'JSON-RPC is a transport format. A2A defines task and message lifecycles. Ontology defines what “refund” and “VIP” mean. You need all three, but do not conflate them.',
          },
        },
      ],
    },
    {
      id: 'ioa-core',
      title: { zh: 'IoA 语义层核心类', en: 'IoA core semantic classes' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '无论是学术综述还是 IETF 的 Agent 网关草案，语义层通常围绕五个核心概念展开：**Agent、Capability、Intent、Task、Context**。它们回答了「谁、会什么、想要什么、正在做什么、在什么约束下做」。',
            en: 'Across academic surveys and IETF agent-gateway drafts, the semantic layer usually revolves around five concepts: **Agent, Capability, Intent, Task, Context**. They answer who, can do what, wants what, is doing what, and under which constraints.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '核心类', en: 'Class' },
            { zh: '定义', en: 'Definition' },
            { zh: '关键字段', en: 'Key fields' },
          ],
          rows: [
            [
              { zh: 'Agent', en: 'Agent' },
              { zh: '可被发现的协作主体', en: 'A discoverable collaborator' },
              { zh: 'ID、身份、端点、信任等级、支持的协议', en: 'ID, identity, endpoint, trust level, protocols' },
            ],
            [
              { zh: 'Capability', en: 'Capability' },
              { zh: 'Agent 能完成的能力', en: 'What an agent can do' },
              { zh: '名称、输入输出 schema、副作用、SLA、成本', en: 'Name, schemas, side effects, SLA, cost' },
            ],
            [
              { zh: 'Intent', en: 'Intent' },
              { zh: '请求方想达成的目标', en: 'The goal of the requester' },
              { zh: '意图类型、参数、约束、优先级', en: 'Type, parameters, constraints, priority' },
            ],
            [
              { zh: 'Task', en: 'Task' },
              { zh: '一次可追踪的执行实例', en: 'A traceable execution instance' },
              { zh: 'task_id、状态机、截止时间、结果、负责人', en: 'task_id, state machine, deadline, result, owner' },
            ],
            [
              { zh: 'Context', en: 'Context' },
              { zh: '执行所处的约束环境', en: 'The constraint environment' },
              { zh: '租户、权限、合规域、历史、locale', en: 'Tenant, permissions, compliance, history, locale' },
            ],
          ],
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'agent-card.json',
          code: `{
  "@context": {
    "ioa": "https://example.org/ioa#",
    "schema": "https://schema.org/",
    "capability": { "@id": "ioa:capability", "@type": "@id" },
    "supportsIntent": { "@id": "ioa:supportsIntent", "@type": "@id" }
  },
  "@id": "agent:support-01",
  "@type": "ioa:Agent",
  "schema:name": "Support Agent",
  "schema:description": "处理一线客服问题 / handles tier-1 support",
  "endpoint": "https://agents.example.com/support",
  "trustLevel": "internal",
  "capability": [
    {
      "@type": "ioa:Capability",
      "name": "refund_order",
      "inputSchema": "https://schemas.example.com/refund-input.json",
      "sideEffects": ["billing.refund_created"],
      "requiresApprovalAbove": 200
    }
  ],
  "supportsIntent": ["refund.request", "faq.answer", "ticket.create"],
  "context": { "tenant": "acme", "locale": "zh-CN", "compliance": ["retention-180d"] }
}`,
          caption: {
            zh: 'Agent 卡片是发现与路由的入口，但真实的业务语义仍要链接到企业本体。',
            en: 'An agent card is the entry point for discovery and routing, but real business semantics must still link to the enterprise ontology.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**Capability 要可验证**：有 schema、有示例、有副作用，不要只写一句「擅长退款」。', en: '**Capabilities must be verifiable**: schemas, examples, side effects — not just “good at refunds”.' },
            { zh: '**Intent 要可路由**：意图类型应映射到本体中的动作或任务类型。', en: '**Intents must be routable**: map intent types to ontology actions or task types.' },
            { zh: '**Task 要可追踪**：稳定的 task_id 与状态机，是跨 Agent 追责的基础。', en: '**Tasks must be traceable**: stable task IDs and state machines underpin cross-agent accountability.' },
            { zh: '**Context 要可执行**：租户、权限、合规域不能只是备注，要能被校验器读取。', en: '**Context must be executable**: tenant, permission, and compliance fields must be readable by validators.' },
          ],
        },
      ],
    },
    {
      id: 'json-ld',
      title: { zh: 'JSON-LD：给 JSON 注入语义', en: 'JSON-LD: injecting semantics into JSON' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '普通 JSON 的字段名只在当前系统里有意义。JSON-LD 通过 `@context` 把字段映射到全局 IRI，让「name」「customer」「amount」在不同系统间可对齐。它仍然是 JSON，易于传输；但多了可合并、可推理的语义。',
            en: 'Field names in plain JSON mean something only inside one system. JSON-LD uses `@context` to map fields to global IRIs, so “name”, “customer”, and “amount” align across systems. It is still JSON and easy to transport, but gains mergeable, inferable semantics.',
          },
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'refund-request.jsonld',
          code: `{
  "@context": {
    "@vocab": "https://schema.yuxin.example/ontology#",
    "amount": { "@id": "https://schema.yuxin.example/ontology#amount", "@type": "xsd:decimal" },
    "currency": "https://schema.yuxin.example/ontology#currency",
    "order": { "@id": "https://schema.yuxin.example/ontology#hasOrder", "@type": "@id" },
    "requestedBy": { "@id": "https://schema.yuxin.example/ontology#requestedBy", "@type": "@id" }
  },
  "@id": "https://tasks.example.com/refund/T-7781",
  "@type": "RefundRequest",
  "order": "https://data.example.com/order/O-7781",
  "amount": 120.00,
  "currency": "CNY",
  "requestedBy": "agent:support-01",
  "reason": "duplicate_charge",
  "requestedAt": "2026-10-31T09:20:00+08:00"
}`,
          caption: {
            zh: '同一个退款请求，带上 @context 之后，接收方不需要猜「amount 是分还是元」。',
            en: 'With @context, the receiver of a refund request does not have to guess whether amount is cents or yuan.',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '不要为每个字段发明新 IRI', en: 'Do not invent an IRI for every field' },
          text: {
            zh: '优先复用 schema.org、行业标准与公司统一本体；只有确实缺失时才自定义，并把映射关系写进本体仓库。',
            en: 'Reuse schema.org, industry standards, and company ontology first. Define new terms only when necessary, and store mappings in the ontology repository.',
          },
        },
      ],
    },
    {
      id: 'alignment',
      title: { zh: '本体对齐与协商', en: 'Ontology alignment and negotiation' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '两个组织合并、两个系统对接，最先打架的往往不是接口，而是词。A 的「客户」包含潜在客户，B 的「客户」只指已签约主体；A 的「退款」含撤销，B 的「退款」不含。本体对齐要做的，是建立映射、标注不等价、定义转换规则。',
            en: 'When two organizations merge or two systems integrate, the first conflict is often vocabulary, not interfaces. A’s “customer” includes prospects; B’s means signed accounts. A’s “refund” includes cancellations; B’s does not. Alignment builds mappings, marks non-equivalence, and defines transformations.',
          },
        },
        {
          type: 'steps',
          items: [
            { title: { zh: '1. 抽取术语', en: '1. Extract terms' }, text: { zh: '从双方 schema、文档、真实查询中抽取高频实体与关系。', en: 'Extract frequent entities and relations from schemas, docs, and real queries.' } },
            { title: { zh: '2. 建立候选映射', en: '2. Propose mappings' }, text: { zh: '用字符串、Embedding 与 LLM 生成候选，再人工确认。', en: 'Generate candidates with strings, embeddings, and LLMs; confirm with humans.' } },
            { title: { zh: '3. 标注关系', en: '3. Mark relations' }, text: { zh: '严格等价、包含、交叉、无关系，四类分开处理。', en: 'Separate exact equivalence, subsumption, overlap, and no relation.' } },
            { title: { zh: '4. 定义转换', en: '4. Define transforms' }, text: { zh: '单位、枚举、时间窗口、过滤条件，用可执行规则表达。', en: 'Express unit, enum, time-window, and filter transforms as executable rules.' } },
            { title: { zh: '5. 持续监控', en: '5. Monitor' }, text: { zh: '对齐不是一次性文档，要有漂移检测与版本记录。', en: 'Alignment is not a one-off document; add drift detection and versioning.' } },
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'alignment.py',
          code: `aliases = {
    "customer": {"client", "account", "客户", "往来单位"},
    "order": {"订单", "交易", "purchase"},
    "refund": {"退款", "退货", "reversal"},
}

def resolve(term: str) -> str | None:
    term = term.strip().lower()
    for canonical, names in aliases.items():
        if term == canonical or term in {n.lower() for n in names}:
            return canonical
    return None

def align(source: dict[str, str], target: dict[str, str]) -> dict:
    mapping, conflicts = {}, []
    for src_term, src_id in source.items():
        canonical = resolve(src_term)
        if canonical is None:
            conflicts.append((src_term, "unknown term / 未知术语"))
        elif canonical in target:
            mapping[src_id] = target[canonical]
        else:
            conflicts.append((src_term, "no target / 目标缺失"))
    return {"mapping": mapping, "conflicts": conflicts}

result = align(
    source={"客户": "crm:Account", "订单": "erp:Order"},
    target={"customer": "dw:dim_customer", "order": "dw:fact_order"},
)
print(result)
# {'mapping': {'crm:Account': 'dw:dim_customer', 'erp:Order': 'dw:fact_order'}, 'conflicts': []}`,
          caption: {
            zh: '别名表只是起点。真正的对齐要处理「包含但不等于」和「同名不同义」。',
            en: 'An alias table is only a start. Real alignment handles “subset but not equal” and “same name, different meaning”.',
          },
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '自动对齐必须有人把关', en: 'Automated alignment needs a human gate' },
          text: {
            zh: 'LLM 很擅长提出映射，也很擅长自信地提出错误映射。把「高置信 + 人工确认」作为上线条件，尤其是金额、合规与身份相关字段。',
            en: 'LLMs are good at proposing mappings and equally good at confidently proposing wrong ones. Require high confidence plus human confirmation, especially for money, compliance, and identity fields.',
          },
        },
      ],
    },
    {
      id: 'agents-md',
      title: { zh: 'AGENTS.md：项目级 Agent 指令标准', en: 'AGENTS.md: repository-level agent instructions' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '如果说 JSON-LD 管的是跨系统语义，AGENTS.md 管的是「Agent 在一个代码仓库里该怎么干活」。它是一份放在仓库根目录、面向编码 Agent 的说明书：怎么安装、怎么测试、哪些目录不能动、提交前要做什么。格式简单到不需要解析器，因此容易被各种工具采用。',
            en: 'If JSON-LD governs cross-system semantics, AGENTS.md governs how an agent works inside a repository. It is a root-level manual for coding agents: how to install, test, which directories are off-limits, and what to do before committing. It is simple enough to need no parser, which is why many tools adopt it.',
          },
        },
        {
          type: 'code',
          lang: 'markdown',
          filename: 'AGENTS.md',
          code: `# AGENTS.md

## Commands
- Install: \`pnpm install\`
- Test: \`pnpm test\`
- Lint: \`pnpm lint\`

## Architecture
- \`src/agents\` contains agent definitions and capability manifests.
- \`src/ontology\` contains entity and relation definitions. Do not hand-edit generated files.
- \`migrations/\` requires review; never rewrite existing migrations.

## Rules
- Run tests before proposing a commit.
- Do not add dependencies without approval.
- Never commit secrets. Use \`.env.local\` for local credentials.
- If a task touches permissions or billing, stop and request human review.

## Output
- Explain what changed and why.
- Include test output and any known limitations.`,
          caption: {
            zh: '好的 AGENTS.md 像好的 README：短、具体、可执行。越长，越容易被忽略。',
            en: 'A good AGENTS.md is like a good README: short, specific, executable. Longer usually means ignored.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**写命令，不写口号**：`pnpm test` 比「请确保代码质量」有用一百倍。', en: '**Commands over slogans**: `pnpm test` beats “ensure quality” a hundred times.' },
            { zh: '**写禁区**：哪些文件不能改、哪些操作必须审批，比能力描述更重要。', en: '**Write no-go zones**: which files are off-limits and which actions need approval matter more than capabilities.' },
            { zh: '**分层放置**：根目录写全局规则，子目录可放更具体的 AGENTS.md。', en: '**Layer it**: global rules at the root, more specific AGENTS.md files in subdirectories.' },
            { zh: '**随代码评审**：AGENTS.md 变更应该和代码变更一起评审。', en: '**Review it with code**: changes to AGENTS.md belong in the same review as code.' },
          ],
        },
      ],
    },
    {
      id: 'protocol-selection',
      title: { zh: '协议选型速查', en: 'Protocol selection cheatsheet' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '需求', en: 'Need' },
            { zh: '首选', en: 'First choice' },
            { zh: '补充', en: 'Complement' },
          ],
          rows: [
            [{ zh: '接数据库、文件系统、SaaS 工具', en: 'Connect databases, filesystems, SaaS tools' }, { zh: 'MCP', en: 'MCP' }, { zh: '自建能力注册表', en: 'Capability registry' }],
            [{ zh: '跨团队 / 跨厂商 Agent 协作', en: 'Cross-team or cross-vendor agent collaboration' }, { zh: 'A2A', en: 'A2A' }, { zh: 'IoA 语义模型、行业本体', en: 'IoA semantics, domain ontology' }],
            [{ zh: '让编码 Agent 遵守项目规范', en: 'Make coding agents follow project rules' }, { zh: 'AGENTS.md', en: 'AGENTS.md' }, { zh: 'CI 检查、CODEOWNERS', en: 'CI checks, CODEOWNERS' }],
            [{ zh: '跨系统数据语义一致', en: 'Cross-system semantic consistency' }, { zh: 'JSON-LD + OWL/SHACL', en: 'JSON-LD + OWL/SHACL' }, { zh: '本体对齐与治理流程', en: 'Ontology alignment and governance' }],
            [{ zh: '企业内部工具与 Agent 统一目录', en: 'Internal tool and agent catalog' }, { zh: '能力注册表 + MCP', en: 'Capability registry + MCP' }, { zh: '权限与审计网关', en: 'Permission and audit gateway' }],
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: { zh: '选型原则', en: 'Selection principle' },
          text: {
            zh: '先选能解决当前问题的最小标准，再为本体留扩展点。不要为了「支持未来互操作」而过早引入三层协议栈。',
            en: 'Pick the smallest standard that solves today’s problem and leave extension points for ontology. Do not stack three protocols early just to “support future interoperability”.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '传输、协议、语义是三件事；MCP 管工具，A2A 管 Agent，本体管含义。', en: 'Transport, protocol, and semantics differ: MCP for tools, A2A for agents, ontology for meaning.' },
    { zh: 'IoA 语义层围绕 Agent、Capability、Intent、Task、Context 五个核心类。', en: 'The IoA semantic layer centers on agent, capability, intent, task, and context.' },
    { zh: 'JSON-LD 用 @context 把本地字段映射到全局语义，是跨系统对齐的低成本起点。', en: 'JSON-LD maps local fields to global semantics via @context — a low-cost start for alignment.' },
    { zh: '本体对齐要区分等价、包含、交叉与无关系，并有人工把关。', en: 'Alignment must distinguish equivalence, subsumption, overlap, and no relation, with human review.' },
    { zh: 'AGENTS.md 是仓库级 Agent 契约：命令、禁区、评审规则。', en: 'AGENTS.md is a repository-level agent contract: commands, no-go zones, review rules.' },
  ],
  sources: [
    {
      label: { zh: 'IETF · DMSC Working Group', en: 'IETF · DMSC Working Group' },
      url: 'https://datatracker.ietf.org/wg/dmsc/about/',
    },
    {
      label: { zh: 'IETF · Multi-Agent Collaboration Protocol for Internet of Agents (draft)', en: 'IETF · Multi-Agent Collaboration Protocol for Internet of Agents (draft)' },
      url: 'https://datatracker.ietf.org/doc/draft-li-dmsc-macp/',
    },
    {
      label: { zh: 'arXiv · Internet of Agents: Fundamentals, Applications, and Challenges', en: 'arXiv · Internet of Agents: Fundamentals, Applications, and Challenges' },
      url: 'https://arxiv.org/abs/2505.07176',
    },
    {
      label: { zh: 'A2A Protocol · Specification', en: 'A2A Protocol · Specification' },
      url: 'https://a2a-protocol.org/latest/specification/',
    },
    {
      label: { zh: 'W3C · JSON-LD 1.1', en: 'W3C · JSON-LD 1.1' },
      url: 'https://www.w3.org/TR/json-ld11/',
    },
    {
      label: { zh: 'AGENTS.md · Open format for guiding coding agents', en: 'AGENTS.md · Open format for guiding coding agents' },
      url: 'https://agents.md/',
    },
  ],
}

export default chapter
