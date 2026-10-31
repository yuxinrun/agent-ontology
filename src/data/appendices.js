const appendixA = {
  id: 'A',
  number: 'A',
  slug: 'resources',
  kind: 'appendix',
  title: { zh: '附录 A · 学习资源地图', en: 'Appendix A · Learning resource map' },
  subtitle: { zh: '官方文档、标准、论文与中文社区，按学习顺序整理', en: 'Official docs, standards, papers, and Chinese communities, ordered for learning' },
  summary: {
    zh: '把散落在各处的资料整理成一条可执行的阅读路线：先建立概念，再读协议，最后看工程实践与论文。',
    en: 'A practical reading route through scattered resources: concepts first, then protocols, then engineering practice and papers.',
  },
  level: 'appendix',
  minutes: 10,
  icon: 'Library',
  accent: 'brand',
  tags: [
    { zh: '资源', en: 'Resources' },
    { zh: '阅读路线', en: 'Reading path' },
  ],
  sections: [
    {
      id: 'path',
      title: { zh: '推荐阅读顺序', en: 'Recommended reading order' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '不要从 OWL 规范第一页开始读。先建立「Agent 如何工作」的直觉，再看「如何把语义交给系统」，最后补形式化标准。下面按这个顺序分组。',
            en: 'Do not start at page one of the OWL spec. Build intuition for how agents work, then learn how to give semantics to the system, then fill in formal standards. The groups below follow that order.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { zh: '第一组 · Agent 基础', en: 'Group 1 · Agent fundamentals' },
              text: { zh: 'Anthropic 的 Building effective agents、OpenAI Agents SDK 文档、LangChain Agents 文档。目标是理解循环、工具、交接与护栏。', en: 'Anthropic’s Building effective agents, OpenAI Agents SDK docs, LangChain Agents docs. Goal: understand loops, tools, handoffs, and guardrails.' },
            },
            {
              title: { zh: '第二组 · 语义与本体', en: 'Group 2 · Semantics and ontology' },
              text: { zh: 'W3C OWL 2 概览、JSON-LD 1.1、Palantir Ontology 文档。目标是理解类、属性、关系、约束与「操作型本体」。', en: 'W3C OWL 2 overview, JSON-LD 1.1, Palantir Ontology docs. Goal: understand classes, properties, relations, constraints, and operational ontology.' },
            },
            {
              title: { zh: '第三组 · 协议与互操作', en: 'Group 3 · Protocols and interoperability' },
              text: { zh: 'MCP 规范、A2A 规范、AGENTS.md，以及 IoA 论文。目标是理解工具层、协作层与语义层如何分工。', en: 'MCP spec, A2A spec, AGENTS.md, and the IoA paper. Goal: understand the division of labor across tool, collaboration, and semantic layers.' },
            },
            {
              title: { zh: '第四组 · 工程与治理', en: 'Group 4 · Engineering and governance' },
              text: { zh: 'OpenAI 实践指南、Anthropic 多 Agent 研究系统复盘、OWASP LLM Top 10、NIST AI RMF。目标是能上线、能评估、能审计。', en: 'OpenAI practical guide, Anthropic’s multi-agent research system retrospective, OWASP LLM Top 10, NIST AI RMF. Goal: ship, evaluate, audit.' },
            },
          ],
        },
      ],
    },
    {
      id: 'official',
      title: { zh: '官方文档与规范', en: 'Official documentation and specifications' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '资源', en: 'Resource' },
            { zh: '维护方', en: 'Maintainer' },
            { zh: '为什么读', en: 'Why read it' },
          ],
          rows: [
            [{ zh: '[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)', en: '[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)' }, { zh: 'Anthropic', en: 'Anthropic' }, { zh: '最清晰的工作流 vs Agent 区分', en: 'The clearest workflow vs agent distinction' }],
            [{ zh: '[OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)', en: '[OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)' }, { zh: 'OpenAI', en: 'OpenAI' }, { zh: 'Agent / Handoff / Guardrail 的最小实现', en: 'Minimal implementation of agents, handoffs, guardrails' }],
            [{ zh: '[LangChain Agents](https://docs.langchain.com/oss/python/langchain/agents)', en: '[LangChain Agents](https://docs.langchain.com/oss/python/langchain/agents)' }, { zh: 'LangChain', en: 'LangChain' }, { zh: '工具调用、记忆与中间件生态', en: 'Tool calling, memory, middleware ecosystem' }],
            [{ zh: '[MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18)', en: '[MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18)' }, { zh: 'Model Context Protocol', en: 'Model Context Protocol' }, { zh: '工具、资源、提示词的标准接入方式', en: 'Standard way to expose tools, resources, prompts' }],
            [{ zh: '[A2A Protocol](https://a2a-protocol.org/latest/specification/)', en: '[A2A Protocol](https://a2a-protocol.org/latest/specification/)' }, { zh: 'Linux Foundation', en: 'Linux Foundation' }, { zh: 'Agent 发现、任务委派与结果回传', en: 'Agent discovery, task delegation, result return' }],
            [{ zh: '[OWL 2 Overview](https://www.w3.org/TR/owl2-overview/)', en: '[OWL 2 Overview](https://www.w3.org/TR/owl2-overview/)' }, { zh: 'W3C', en: 'W3C' }, { zh: '形式化本体的语言基础', en: 'Language foundations of formal ontologies' }],
            [{ zh: '[JSON-LD 1.1](https://www.w3.org/TR/json-ld11/)', en: '[JSON-LD 1.1](https://www.w3.org/TR/json-ld11/)' }, { zh: 'W3C', en: 'W3C' }, { zh: '让 JSON 携带可链接的语义', en: 'Make JSON carry linkable semantics' }],
            [{ zh: '[Palantir Ontology](https://www.palantir.com/docs/foundry/ontology/overview/)', en: '[Palantir Ontology](https://www.palantir.com/docs/foundry/ontology/overview/)' }, { zh: 'Palantir', en: 'Palantir' }, { zh: '操作型本体的工业级案例', en: 'Industrial example of operational ontology' }],
          ],
        },
      ],
    },
    {
      id: 'papers',
      title: { zh: '论文与研究', en: 'Papers and research' },
      blocks: [
        {
          type: 'list',
          items: [
            { zh: '[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)（2022）——推理与行动交替的经典范式。', en: '[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) (2022) — the classic reason-act loop.' },
            { zh: '[MRKL Systems](https://arxiv.org/abs/2205.00445)（2022）——模块化专家 + 路由器的雏形。', en: '[MRKL Systems](https://arxiv.org/abs/2205.00445) (2022) — modular experts plus a router.' },
            { zh: '[Self-Ask](https://arxiv.org/abs/2210.03350)（2022）——先拆子问题再回答。', en: '[Self-Ask](https://arxiv.org/abs/2210.03350) (2022) — decompose into sub-questions first.' },
            { zh: '[Toolformer](https://arxiv.org/abs/2302.04761)（2023）——模型自学何时调用工具。', en: '[Toolformer](https://arxiv.org/abs/2302.04761) (2023) — models learn when to call tools.' },
            { zh: '[Internet of Agents](https://arxiv.org/abs/2407.07061)（2024）——异构 Agent 的语义互联愿景。', en: '[Internet of Agents](https://arxiv.org/abs/2407.07061) (2024) — a vision for semantic interconnection of heterogeneous agents.' },
            { zh: '[A Survey of AI Agent Protocols](https://arxiv.org/abs/2504.16736)（2025）——协议生态的系统梳理。', en: '[A Survey of AI Agent Protocols](https://arxiv.org/abs/2504.16736) (2025) — a systematic survey of the protocol landscape.' },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '读论文的正确姿势', en: 'How to read a paper' },
          text: {
            zh: '先读摘要、图和结论，回答「它解决什么问题、代价是什么」。只有准备复现时，再进入方法与实验细节。',
            en: 'Read the abstract, figures, and conclusion first. Answer “what problem, at what cost”. Go into method and experiments only when you plan to reproduce.',
          },
        },
      ],
    },
    {
      id: 'chinese',
      title: { zh: '中文资料与社区', en: 'Chinese resources and communities' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '来源', en: 'Source' },
            { zh: '类型', en: 'Type' },
            { zh: '适合看什么', en: 'Best for' },
          ],
          rows: [
            [{ zh: '阿里云 · 百炼 / Agent 开发文档', en: 'Alibaba Cloud · Bailian / agent docs' }, { zh: '云厂商文档', en: 'Cloud vendor docs' }, { zh: '国内落地路径、模型与工具链', en: 'Local deployment paths, models, toolchains' }],
            [{ zh: '腾讯云 · 智能体开发平台', en: 'Tencent Cloud · agent platform' }, { zh: '云厂商文档', en: 'Cloud vendor docs' }, { zh: '插件、知识库与工作流编排', en: 'Plugins, knowledge bases, workflow orchestration' }],
            [{ zh: '百度智能云 · 千帆 AppBuilder', en: 'Baidu Cloud · Qianfan AppBuilder' }, { zh: '云厂商文档', en: 'Cloud vendor docs' }, { zh: 'RAG 与 Agent 的工程组合', en: 'Combining RAG and agents in practice' }],
            [{ zh: 'InfoQ 中文 · AI Agent 专题', en: 'InfoQ China · AI agent coverage' }, { zh: '技术媒体', en: 'Tech media' }, { zh: '行业案例与架构复盘', en: 'Industry cases and architecture retrospectives' }],
            [{ zh: '稀土掘金 · Agent / 知识图谱', en: 'Juejin · agents / knowledge graphs' }, { zh: '开发者社区', en: 'Developer community' }, { zh: '实现细节与踩坑记录', en: 'Implementation details and pitfalls' }],
            [{ zh: '人人都是产品经理 · AI 产品分析', en: 'Woshipm · AI product analysis' }, { zh: '产品社区', en: 'Product community' }, { zh: '业务视角与场景拆解', en: 'Business perspective and scenario breakdown' }],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '中外资料互补', en: 'They complement each other' },
          text: {
            zh: '英文资料偏协议与范式，中文资料偏落地与合规。做企业项目时，两边都要看。',
            en: 'English resources lean toward protocols and paradigms; Chinese resources lean toward deployment and compliance. Enterprise projects need both.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '先 Agent 基础，再语义本体，最后协议与治理。', en: 'Agent basics first, semantics next, protocols and governance last.' },
    { zh: '官方规范优先于二手解读，尤其是协议版本。', en: 'Prefer official specs over second-hand summaries, especially for protocol versions.' },
    { zh: '论文读问题与代价，工程文档读约束与坑。', en: 'Read papers for problems and trade-offs; read engineering docs for constraints and pitfalls.' },
  ],
  sources: [
    { label: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' }, url: 'https://www.anthropic.com/engineering/building-effective-agents' },
    { label: { zh: 'OpenAI Agents SDK', en: 'OpenAI Agents SDK' }, url: 'https://openai.github.io/openai-agents-python/' },
    { label: { zh: 'Model Context Protocol', en: 'Model Context Protocol' }, url: 'https://modelcontextprotocol.io/' },
  ],
}

const appendixB = {
  id: 'B',
  number: 'B',
  slug: 'toolkit',
  kind: 'appendix',
  title: { zh: '附录 B · 工具与协议速查表', en: 'Appendix B · Tools and protocols cheat sheet' },
  subtitle: { zh: '建模、运行时、协议、评测四类工具的选型参考', en: 'Selection reference across modeling, runtime, protocol, and evaluation tools' },
  summary: {
    zh: '一张按用途分类的速查表：什么时候用 OWL，什么时候用 JSON-LD，什么时候只需要 Pydantic。',
    en: 'A use-case cheat sheet: when to use OWL, when JSON-LD is enough, and when Pydantic is all you need.',
  },
  level: 'appendix',
  minutes: 8,
  icon: 'Table2',
  accent: 'violet',
  tags: [
    { zh: '速查', en: 'Cheat sheet' },
    { zh: '选型', en: 'Selection' },
  ],
  sections: [
    {
      id: 'modeling-tools',
      title: { zh: '建模工具怎么选', en: 'Choosing a modeling tool' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '工具/格式', en: 'Tool / format' },
            { zh: '适合', en: 'Best for' },
            { zh: '不适合', en: 'Avoid when' },
            { zh: '学习成本', en: 'Learning curve' },
          ],
          rows: [
            [{ zh: 'Pydantic / JSON Schema', en: 'Pydantic / JSON Schema' }, { zh: '单服务、强类型、工具入参校验', en: 'Single service, strong typing, tool argument validation' }, { zh: '跨系统语义对齐', en: 'Cross-system semantic alignment' }, { zh: '低', en: 'Low' }],
            [{ zh: 'JSON-LD', en: 'JSON-LD' }, { zh: '在 JSON 上附加可链接语义', en: 'Add linkable semantics to JSON' }, { zh: '复杂逻辑推理', en: 'Complex logical inference' }, { zh: '中', en: 'Medium' }],
            [{ zh: 'RDF / OWL', en: 'RDF / OWL' }, { zh: '形式化类层次、约束与推理', en: 'Formal class hierarchy, constraints, inference' }, { zh: '小团队快速上线', en: 'Small teams shipping fast' }, { zh: '高', en: 'High' }],
            [{ zh: 'Property Graph（Neo4j 等）', en: 'Property graph (Neo4j etc.)' }, { zh: '关系查询、路径分析', en: 'Relation queries, path analysis' }, { zh: '开放世界语义推理', en: 'Open-world semantic inference' }, { zh: '中', en: 'Medium' }],
            [{ zh: 'SHACL', en: 'SHACL' }, { zh: '对 RDF 数据做形状校验', en: 'Shape validation over RDF' }, { zh: '非 RDF 数据', en: 'Non-RDF data' }, { zh: '中高', en: 'Medium-high' }],
            [{ zh: '业务术语表（Glossary）', en: 'Business glossary' }, { zh: '统一命名与口径', en: 'Naming and metric definitions' }, { zh: '机器可执行约束', en: 'Machine-executable constraints' }, { zh: '低', en: 'Low' }],
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: { zh: '最小可用组合', en: 'The minimal viable stack' },
          text: {
            zh: '大多数团队的第一版只需要：Pydantic 定义实体与动作 + JSON 术语表 + 一个数据库。等跨团队对接时，再引入 JSON-LD 或 OWL。',
            en: 'Most teams’ v1 needs only Pydantic entities and actions, a JSON glossary, and a database. Add JSON-LD or OWL when cross-team integration arrives.',
          },
        },
      ],
    },
    {
      id: 'runtime',
      title: { zh: '运行时与编排', en: 'Runtime and orchestration' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '工具', en: 'Tool' },
            { zh: '定位', en: 'Role' },
            { zh: '关键能力', en: 'Key capability' },
            { zh: '注意', en: 'Watch out' },
          ],
          rows: [
            [{ zh: 'OpenAI Agents SDK', en: 'OpenAI Agents SDK' }, { zh: '轻量 Agent 运行时', en: 'Lightweight agent runtime' }, { zh: 'Agents、Handoffs、Guardrails、Tracing', en: 'Agents, handoffs, guardrails, tracing' }, { zh: '模型供应商绑定', en: 'Model vendor coupling' }],
            [{ zh: 'LangGraph', en: 'LangGraph' }, { zh: '图状工作流', en: 'Graph workflows' }, { zh: '状态、检查点、人工介入', en: 'State, checkpoints, human-in-the-loop' }, { zh: '图复杂度上升快', en: 'Graph complexity grows fast' }],
            [{ zh: 'LangChain', en: 'LangChain' }, { zh: '集成生态', en: 'Integration ecosystem' }, { zh: '工具、检索、模型适配', en: 'Tools, retrieval, model adapters' }, { zh: '版本变动频繁', en: 'Frequent version changes' }],
            [{ zh: 'MCP Server', en: 'MCP server' }, { zh: '工具接入层', en: 'Tool access layer' }, { zh: '跨客户端复用工具与资源', en: 'Reuse tools and resources across clients' }, { zh: '安全与权限边界', en: 'Security and permission boundaries' }],
            [{ zh: 'A2A', en: 'A2A' }, { zh: 'Agent 间协作', en: 'Agent-to-agent collaboration' }, { zh: '跨厂商任务委派', en: 'Cross-vendor task delegation' }, { zh: '信任与身份', en: 'Trust and identity' }],
          ],
        },
      ],
    },
    {
      id: 'evaluation',
      title: { zh: '评测与可观测性', en: 'Evaluation and observability' },
      blocks: [
        {
          type: 'list',
          items: [
            { zh: '**任务成功率**：端到端完成比例，按业务场景分组。', en: '**Task success**: end-to-end completion rate, grouped by scenario.' },
            { zh: '**约束违反率**：硬约束被绕过的次数，目标为 0。', en: '**Constraint violations**: hard constraints bypassed, target zero.' },
            { zh: '**工具选择准确率**：选对工具与参数的比例。', en: '**Tool selection accuracy**: correct tool and arguments.' },
            { zh: '**平均轮次与延迟**：完成任务的循环次数与 P95 延迟。', en: '**Turns and latency**: loop count and P95 latency.' },
            { zh: '**单任务成本**：token + 工具调用 + 人工介入成本。', en: '**Cost per task**: tokens + tool calls + human intervention.' },
            { zh: '**人工接管率**：需要人接手的任务比例。', en: '**Human takeover rate**: share of tasks needing a human.' },
          ],
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'eval-case.json',
          code: `{
  "id": "refund-004",
  "input": "我上个月买的耳机想退，订单号 A-1029",
  "expected": {
    "action": "refund.create",
    "constraints": ["within_30_days", "amount_lte_500"],
    "requires_human": false
  },
  "forbidden": ["refund.create without order lookup"],
  "tags": ["support", "refund", "happy-path"]
}`,
          caption: {
            zh: '评测用例要同时写「应该做什么」和「绝不能做什么」。',
            en: 'Eval cases should state both what must happen and what must never happen.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '从 Pydantic + 术语表起步，按需升级到 JSON-LD/OWL。', en: 'Start with Pydantic plus a glossary; upgrade to JSON-LD/OWL as needed.' },
    { zh: '运行时选型看状态管理、人工介入与可观测性。', en: 'Choose runtimes by state management, human-in-the-loop, and observability.' },
    { zh: '评测用例必须包含禁止行为。', en: 'Eval cases must include forbidden behaviors.' },
  ],
  sources: [
    { label: { zh: 'W3C · SHACL', en: 'W3C · SHACL' }, url: 'https://www.w3.org/TR/shacl/' },
    { label: { zh: 'Model Context Protocol', en: 'Model Context Protocol' }, url: 'https://modelcontextprotocol.io/' },
    { label: { zh: 'LangGraph documentation', en: 'LangGraph documentation' }, url: 'https://langchain-ai.github.io/langgraph/' },
  ],
}

const glossaryRows = [
  ['Agent', '智能体', '能感知环境、做出决策并执行动作的系统；通常由模型、工具与循环组成。', 'A system that perceives, decides, and acts; typically a model, tools, and a loop.'],
  ['Ontology', '本体', '对某个领域中概念、关系、约束与动作的显式、可共享的形式化描述。', 'An explicit, shareable formal description of concepts, relations, constraints, and actions in a domain.'],
  ['Entity', '实体', '领域中被独立识别和引用的对象，如客户、订单、工单。', 'An independently identifiable object in a domain, such as a customer, order, or ticket.'],
  ['Relation', '关系', '两个实体之间的有向语义连接，如“属于”“依赖”“相似于”。', 'A directed semantic link between entities, such as belongs-to, depends-on, or similar-to.'],
  ['Constraint', '约束', '对实体状态或动作必须成立的条件，如金额上限、时间窗口。', 'A condition that must hold for entity states or actions, such as amount limits or time windows.'],
  ['Action', '动作', '本体中可被执行的操作，带前置条件、权限、副作用与回滚。', 'An executable operation with preconditions, permissions, effects, and rollback.'],
  ['Abstraction Layer', '抽象层', '把业务对象抽象为实体、属性与类型的层次。', 'The layer that abstracts business objects into entities, attributes, and types.'],
  ['Semantic Layer', '语义层', '定义概念含义、关系与对齐规则的层次。', 'The layer defining meaning, relations, and alignment rules.'],
  ['Execution Layer', '执行层', '把语义映射到真实工具、API 与动作的层次。', 'The layer mapping semantics to real tools, APIs, and actions.'],
  ['Role Ontology', '角色本体', '描述有哪些 Agent 角色、职责与权限边界的本体。', 'An ontology describing agent roles, responsibilities, and permission boundaries.'],
  ['Domain Ontology', '领域本体', '描述业务实体、关系与指标口径的本体。', 'An ontology of business entities, relations, and metric definitions.'],
  ['Interaction Ontology', '交互本体', '描述意图、消息、交接与任务状态的协议语义。', 'Protocol semantics for intents, messages, handoffs, and task states.'],
  ['Neuro-symbolic', '神经符号', '神经网络负责提议与生成，符号系统负责约束与验证的混合架构。', 'A hybrid where neural models propose and symbolic systems constrain and verify.'],
  ['ReAct', '推理-行动循环', '让模型交替进行推理与工具调用的范式。', 'A paradigm alternating reasoning and tool calls.'],
  ['MRKL', '模块化推理', '将专家模块与路由器组合的系统架构。', 'An architecture combining expert modules with a router.'],
  ['Self-Ask', '自问自答', '先分解子问题、再逐一回答的推理策略。', 'A strategy that decomposes sub-questions and answers them one by one.'],
  ['Handoff', '交接', '把一个任务或会话的控制权转给另一个 Agent。', 'Transferring control of a task or conversation to another agent.'],
  ['Manager Pattern', '管理者模式', '由一个中心 Agent 调用多个专家 Agent 作为工具的编排方式。', 'An orchestration where a central agent calls specialist agents as tools.'],
  ['Coordinator', '协调者', '负责拆分任务、并行调度与汇总结果的 Agent。', 'An agent that decomposes tasks, schedules in parallel, and aggregates results.'],
  ['MCP', '模型上下文协议', '标准化模型与工具、资源、提示词之间接入方式的开放协议。', 'An open protocol standardizing how models access tools, resources, and prompts.'],
  ['Host / Client / Server', '宿主 / 客户端 / 服务端', 'MCP 的三层角色：应用宿主、协议客户端、工具服务端。', 'MCP’s three roles: application host, protocol client, tool server.'],
  ['A2A', 'Agent 间协议', '面向 Agent 发现、任务委派与结果回传的互操作协议。', 'An interoperability protocol for agent discovery, delegation, and results.'],
  ['IoA', '智能体互联网', '面向异构 Agent 语义互联的研究愿景与协议探索。', 'A research vision and protocol exploration for semantic interconnection of heterogeneous agents.'],
  ['Agent Card', 'Agent 名片', '描述 Agent 身份、能力、端点与认证方式的元数据。', 'Metadata describing an agent’s identity, capabilities, endpoint, and auth.'],
  ['JSON-LD', '链接数据 JSON', '在 JSON 中通过 @context 表达可链接语义的格式。', 'A JSON format expressing linkable semantics via @context.'],
  ['AGENTS.md', 'Agent 约定文件', '放在代码仓库中、用于指导编码 Agent 的约定与约束文件。', 'A repository file that gives coding agents conventions and constraints.'],
  ['Guardrail', '护栏', '在输入、输出或动作前后执行的检查与限制。', 'Checks and limits applied before or after inputs, outputs, or actions.'],
  ['Grounding', '接地', '让模型输出锚定到可验证数据或来源的过程。', 'Anchoring model output to verifiable data or sources.'],
  ['RAG', '检索增强生成', '先检索外部知识再生成回答的模式。', 'Retrieving external knowledge before generating an answer.'],
  ['Trace', '链路追踪', '记录一次任务中输入、决策、动作与结果的完整轨迹。', 'The full record of inputs, decisions, actions, and results for a task.'],
  ['Evaluation Set', '评测集', '用于衡量 Agent 行为是否符合预期的真实任务集合。', 'A set of real tasks used to measure whether agent behavior meets expectations.'],
]

const appendixC = {
  id: 'C',
  number: 'C',
  slug: 'glossary',
  kind: 'appendix',
  title: { zh: '附录 C · 中英双语术语表', en: 'Appendix C · Bilingual glossary' },
  subtitle: { zh: '30 个高频术语，中英对照 + 一句话解释', en: '30 high-frequency terms with bilingual definitions' },
  summary: {
    zh: '中英对照的 Agent 与本体术语表，方便读文档、写设计稿和跨团队沟通。',
    en: 'A bilingual glossary of agent and ontology terms for reading docs, writing designs, and cross-team communication.',
  },
  level: 'appendix',
  minutes: 6,
  icon: 'Languages',
  accent: 'cyan',
  tags: [
    { zh: '术语', en: 'Glossary' },
    { zh: '双语', en: 'Bilingual' },
  ],
  sections: [
    {
      id: 'terms',
      title: { zh: '核心术语', en: 'Core terms' },
      blocks: [
        {
          type: 'table',
          caption: {
            zh: '建议在团队内统一第一列的英文术语，避免同一概念出现三种叫法。',
            en: 'Standardize the English term in the first column across your team to avoid three names for one concept.',
          },
          head: [
            { zh: 'Term', en: 'Term' },
            { zh: '中文', en: 'Chinese' },
            { zh: '解释', en: 'Definition' },
          ],
          rows: glossaryRows.map(([en, zh, zhDesc, enDesc]) => [
            { zh: `${en}`, en: `${en}` },
            { zh, en: zh },
            { zh: zhDesc, en: enDesc },
          ]),
        },
      ],
    },
    {
      id: 'usage',
      title: { zh: '怎么用这张表', en: 'How to use this table' },
      blocks: [
        {
          type: 'list',
          items: [
            { zh: '写设计文档时，首次出现术语用「中文（English）」格式。', en: 'In design docs, use “Chinese (English)” on first mention.' },
            { zh: '代码里的类型名用英文术语，不用拼音缩写。', en: 'Use English terms in code type names, not pinyin abbreviations.' },
            { zh: '跨团队接口的字段名以本表为准，有分歧就升级到本体评审。', en: 'Cross-team field names follow this table; escalate disagreements to ontology review.' },
            { zh: '新术语先加表再进本体，避免口头约定扩散。', en: 'Add new terms to the table before the ontology; avoid spreading verbal agreements.' },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: '术语表是本体的最小可用版本，也是团队共识的第一次显式化。',
            en: 'A glossary is the minimum viable ontology and the first explicit form of team consensus.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '30 个术语覆盖了日常设计与评审的绝大多数场景。', en: 'Thirty terms cover most day-to-day design and review conversations.' },
    { zh: '统一英文术语，能显著降低跨团队沟通成本。', en: 'Standardizing English terms significantly lowers cross-team communication cost.' },
    { zh: '术语表是本体治理的入口，不是文档装饰。', en: 'A glossary is the entry point to ontology governance, not documentation decoration.' },
  ],
  sources: [
    { label: { zh: 'W3C · OWL 2 Overview', en: 'W3C · OWL 2 Overview' }, url: 'https://www.w3.org/TR/owl2-overview/' },
    { label: { zh: 'Model Context Protocol · Concepts', en: 'Model Context Protocol · Concepts' }, url: 'https://modelcontextprotocol.io/docs/learn/architecture' },
    { label: { zh: 'OpenAI Agents SDK · Documentation', en: 'OpenAI Agents SDK · Documentation' }, url: 'https://openai.github.io/openai-agents-python/' },
  ],
}

export const appendices = [appendixA, appendixB, appendixC]

export default appendices
