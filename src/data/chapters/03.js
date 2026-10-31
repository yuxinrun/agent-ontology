const chapter = {
  id: '03',
  number: 3,
  slug: 'three-layers',
  kind: 'chapter',
  title: { zh: '三层架构详解：抽象层、语义层、执行层', en: 'Inside the three layers' },
  subtitle: { zh: '把「Agent 会什么」拆成可维护的三件事', en: 'Split “what agents can do” into three maintainable concerns' },
  summary: {
    zh: '逐层拆解抽象、语义、执行三层的职责、产物与交互契约，并给出可运行的最小示例。',
    en: 'A layer-by-layer breakdown of abstraction, semantics, and execution: responsibilities, artifacts, contracts, and runnable examples.',
  },
  level: 'builder',
  minutes: 18,
  icon: 'Layers',
  accent: 'cyan',
  tags: [
    { zh: '架构', en: 'Architecture' },
    { zh: '能力模型', en: 'Capabilities' },
    { zh: '运行时', en: 'Runtime' },
  ],
  sections: [
    {
      id: 'why-three',
      title: { zh: '为什么是三层？', en: 'Why three layers?' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '很多团队做 Agent 平台，最后做成了一锅粥：Agent 定义、Prompt、工具、权限、部署信息全塞在一个 YAML 里。改一个模型版本，权限逻辑跟着抖；加一个 Agent，路由表跟着乱。三层架构的目的不是画得好看，而是让三类变化互不牵连。',
            en: 'Many agent platforms end up as a stew: agent definitions, prompts, tools, permissions, and deployment data all stuffed into one YAML. A model upgrade shakes permission logic; a new agent wrecks routing. The three-layer architecture is not for pretty diagrams; it keeps three kinds of change from colliding.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '层', en: 'Layer' },
            { zh: '关注点', en: 'Concern' },
            { zh: '典型问题', en: 'Typical question' },
            { zh: '谁维护', en: 'Owner' },
          ],
          rows: [
            [
              { zh: '抽象层', en: 'Abstraction' },
              { zh: '类型与能力', en: 'Types and capabilities' },
              { zh: '这个 Agent 能完成哪些任务？', en: 'Which tasks can this agent complete?' },
              { zh: '平台 / 产品团队', en: 'Platform / product' },
            ],
            [
              { zh: '语义层', en: 'Semantic' },
              { zh: '业务语义与关系', en: 'Business semantics and relations' },
              { zh: '「客户」「高价值」到底怎么定义？', en: 'What exactly is a customer or high-value?' },
              { zh: '领域专家 + 数据团队', en: 'Domain experts + data' },
            ],
            [
              { zh: '执行层', en: 'Execution' },
              { zh: '部署、路由、观测', en: 'Deployment, routing, observability' },
              { zh: '请求应该打到哪个实例？', en: 'Which instance should serve this request?' },
              { zh: '基础设施 / SRE', en: 'Infrastructure / SRE' },
            ],
          ],
        },
        {
          type: 'chart',
          kind: 'architecture',
          detail: true,
          title: { zh: '三层架构详解', en: 'The three layers in detail' },
          desc: {
            zh: '每层包含关键节点与跨层连接。拖拽查看全貌，点击节点阅读职责说明。',
            en: 'Key nodes and cross-layer links. Drag to explore, click nodes for responsibilities.',
          },
        },
        {
          type: 'p',
          text: {
            zh: '三层之间靠**契约**连接：抽象层输出能力描述，语义层输出角色与关系，执行层输出可调用端点。契约稳定，内部实现随便换；契约混乱，换什么都出事。',
            en: 'The layers are connected by **contracts**: abstraction exports capabilities, semantics exports roles and relations, execution exports callable endpoints. Stable contracts let implementations change freely; messy contracts make any change dangerous.',
          },
        },
      ],
    },
    {
      id: 'abstraction',
      title: { zh: '抽象层：Agent 分类体系与能力标签', en: 'Abstraction: taxonomy and capabilities' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '抽象层要回答两个问题：**有哪些类型的 Agent**，以及**每个 Agent 声明自己会什么**。注意「会什么」不是一段自然语言自夸，而是带输入输出、副作用和权限的结构化能力。',
            en: 'The abstraction layer answers two questions: **which types of agents exist**, and **what each agent claims to do**. “What it does” is not a natural-language boast; it is a structured capability with inputs, outputs, side effects, and permissions.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'abstraction.py',
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Capability:
    name: str
    description: str
    input_schema: dict
    output_schema: dict
    side_effects: tuple[str, ...] = ()    # 副作用 / side effects
    permissions: tuple[str, ...] = ()     # 所需权限 / required permissions

@dataclass(frozen=True)
class AgentType:
    name: str
    goal: str
    capabilities: tuple[Capability, ...]
    model_hint: str = "tool-calling"      # 能力要求，不绑定厂商 / capability, not vendor

refund = Capability(
    name="refund_order",
    description="对已支付订单发起退款 / refund a paid order",
    input_schema={"order_id": "string", "amount": "number"},
    output_schema={"refund_id": "string", "status": "string"},
    side_effects=("order.status=refunded", "billing.refund_created"),
    permissions=("billing:write", "order:write"),
)

support_agent = AgentType(
    name="support_agent",
    goal="解决一线客服问题，必要时升级 / resolve tier-1 issues, escalate when needed",
    capabilities=(refund,),
)
print(support_agent.capabilities[0].permissions)
# ('billing:write', 'order:write')`,
          caption: {
            zh: '能力描述应该让调度器、权限系统和评测系统都能直接使用，而不只是给人看。',
            en: 'Capability descriptions should be directly usable by schedulers, permission systems, and evaluation harnesses, not just readable by humans.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '字段', en: 'Field' },
            { zh: '作用', en: 'Purpose' },
            { zh: '常见错误', en: 'Common mistake' },
          ],
          rows: [
            [{ zh: 'name', en: 'name' }, { zh: '稳定标识，供路由与日志使用', en: 'Stable identifier for routing and logs' }, { zh: '用自然语言当 ID', en: 'Using prose as an ID' }],
            [{ zh: 'input_schema', en: 'input_schema' }, { zh: '参数类型、必填项、枚举', en: 'Types, required fields, enums' }, { zh: '只写 `object` 不写字段', en: 'Declaring `object` without fields' }],
            [{ zh: 'side_effects', en: 'side_effects' }, { zh: '告诉调度器是否需要审批', en: 'Tells the orchestrator if approval is needed' }, { zh: '把写操作标成只读', en: 'Marking writes as read-only' }],
            [{ zh: 'permissions', en: 'permissions' }, { zh: '最小权限与审计依据', en: 'Least privilege and audit basis' }, { zh: '所有 Agent 共用一个超级 token', en: 'Every agent sharing one super token' }],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '能力 ≠ 工具', en: 'Capability is not a tool' },
          text: {
            zh: '能力是「业务上能完成什么」，工具是「用哪个 API 完成」。同一能力可以有多个实现：真人客服、规则引擎、LLM Agent。把二者混为一谈，会导致权限与替换策略全部锁死。',
            en: 'A capability is “what can be done in the business”; a tool is “which API does it”. One capability can have many implementations: a human, a rule engine, or an LLM agent. Conflating them locks permissions and substitution.',
          },
        },
      ],
    },
    {
      id: 'semantic',
      title: { zh: '语义层：角色、领域与关系图谱', en: 'Semantics: roles, domains, and relations' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '语义层是本体最「像本体」的部分。它定义角色（谁负责什么）、领域（业务实体与术语）、交互（怎么说话、怎么交接），以及 Agent 之间的关系图谱。关系不是装饰，它直接决定路由、复用与权限继承。',
            en: 'The semantic layer is the most ontology-like part. It defines roles (who owns what), domains (entities and terms), interactions (how to talk and hand off), and the relation graph among agents. Relations are not decoration; they drive routing, reuse, and permission inheritance.',
          },
        },
        {
          type: 'cards',
          columns: 4,
          items: [
            {
              icon: 'Copy',
              title: { zh: 'Similar To', en: 'Similar To' },
              text: { zh: '能力相近，可互为备份或候选。用于容灾与 A/B。', en: 'Similar capability, usable as a fallback or candidate. Good for resilience and A/B tests.' },
            },
            {
              icon: 'Link2',
              title: { zh: 'Chains With', en: 'Chains With' },
              text: { zh: '输出可作为下游输入，形成可编排的流水线。', en: 'Its output feeds a downstream agent, forming an orchestration pipeline.' },
            },
            {
              icon: 'Plug',
              title: { zh: 'Integrates With', en: 'Integrates With' },
              text: { zh: '通过工具或协议集成，通常跨系统、跨团队。', en: 'Integrates through tools or protocols, often across systems and teams.' },
            },
            {
              icon: 'FolderTree',
              title: { zh: 'Belongs To', en: 'Belongs To' },
              text: { zh: '归属某个业务域或组织，继承其策略与预算。', en: 'Belongs to a business domain or org, inheriting policy and budget.' },
            },
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'relation_graph.py',
          code: `from collections import defaultdict, deque

relations = [
    ("support_agent", "similar_to", "success_agent"),
    ("support_agent", "chains_with", "refund_agent"),
    ("refund_agent", "integrates_with", "billing_mcp"),
    ("support_agent", "belongs_to", "customer_service"),
]

graph = defaultdict(list)
for src, rel, dst in relations:
    graph[src].append((rel, dst))

def neighbors(agent: str, relation: str | None = None, max_depth: int = 2):
    """按关系类型做有界遍历 / bounded traversal by relation type"""
    seen, queue, out = {agent}, deque([(agent, 0)]), []
    while queue:
        node, depth = queue.popleft()
        if depth >= max_depth:
            continue
        for rel, nxt in graph[node]:
            if relation and rel != relation:
                continue
            if nxt not in seen:
                seen.add(nxt)
                out.append((rel, nxt))
                queue.append((nxt, depth + 1))
    return out

print(neighbors("support_agent", relation="chains_with"))
# [('chains_with', 'refund_agent')]`,
          caption: {
            zh: '关系遍历可以用来做路由、影响分析与权限传播。生产环境建议加深度上限与环路检测。',
            en: 'Relation traversal supports routing, impact analysis, and permission propagation. Cap depth and detect cycles in production.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '关系', en: 'Relation' },
            { zh: '语义', en: 'Meaning' },
            { zh: '工程用途', en: 'Engineering use' },
          ],
          rows: [
            [{ zh: 'Similar To', en: 'Similar To' }, { zh: '能力相近但不等价', en: 'Similar capability, not equivalent' }, { zh: '降级、候选、迁移', en: 'Fallback, candidates, migration' }],
            [{ zh: 'Chains With', en: 'Chains With' }, { zh: '输入输出可衔接', en: 'Compatible input/output' }, { zh: '流水线编排、DAG 生成', en: 'Pipeline orchestration, DAG generation' }],
            [{ zh: 'Integrates With', en: 'Integrates With' }, { zh: '通过接口协作', en: 'Collaborates through an interface' }, { zh: '工具注册、协议选择', en: 'Tool registry, protocol choice' }],
            [{ zh: 'Belongs To', en: 'Belongs To' }, { zh: '归属与责任边界', en: 'Ownership and responsibility' }, { zh: '权限继承、预算、审计', en: 'Permission inheritance, budget, audit' }],
          ],
        },
      ],
    },
    {
      id: 'execution',
      title: { zh: '执行层：Agent 集合与可部署单元', en: 'Execution: agent sets and deployable units' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '执行层把「语义上存在的 Agent」变成「进程里能调用的服务」。它至少包含四件事：注册表（谁在线）、路由（该找谁）、运行时（怎么跑）、观测（出了什么事）。',
            en: 'The execution layer turns semantically defined agents into callable services. At minimum it includes a registry (who is online), routing (who to call), runtime (how it runs), and observability (what happened).',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { zh: '注册', en: 'Register' },
              text: { zh: '可部署单元启动时上报能力、区域、版本、并发与健康状态。', en: 'A deployable reports capabilities, region, version, concurrency, and health at startup.' },
            },
            {
              title: { zh: '发现', en: 'Discover' },
              text: { zh: '调度器按能力、区域、版本与权限筛选候选实例，而不是按 Agent 名字硬编码。', en: 'The scheduler filters candidates by capability, region, version, and permission — not hard-coded agent names.' },
            },
            {
              title: { zh: '路由', en: 'Route' },
              text: { zh: '根据负载、延迟、灰度比例选择实例；失败时回退到 Similar To。', en: 'Choose an instance by load, latency, and rollout; fall back along Similar To on failure.' },
            },
            {
              title: { zh: '观测与回收', en: 'Observe and reclaim' },
              text: { zh: '记录 trace、成本、错误；不健康的单元自动下线，保留回滚版本。', en: 'Record traces, cost, and errors; retire unhealthy units and keep rollback versions.' },
            },
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'registry.py',
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Deployment:
    agent_id: str
    endpoint: str
    capabilities: frozenset[str]
    region: str = "cn-east-1"
    max_concurrency: int = 8
    version: str = "1.0.0"

class Registry:
    def __init__(self, deployments: list[Deployment]):
        self._items = deployments

    def candidates(self, capability: str, region: str | None = None):
        return [
            d for d in self._items
            if capability in d.capabilities
            and (region is None or d.region == region)
        ]

    def route(self, capability: str, region: str | None = None) -> Deployment:
        found = self.candidates(capability, region)
        if not found:
            raise LookupError(f"no deployment for {capability}")
        # 简化示例：按并发上限降序 / simplified: highest concurrency first
        return max(found, key=lambda d: d.max_concurrency)

registry = Registry([
    Deployment("refund-agent-a", "http://refund-a:8080", frozenset({"refund_order"})),
    Deployment("refund-agent-b", "http://refund-b:8080", frozenset({"refund_order"})),
])
print(registry.route("refund_order").endpoint)
# http://refund-a:8080`,
          caption: {
            zh: '真实路由还应考虑实时负载、熔断、灰度与租户隔离。示例刻意保持最小。',
            en: 'Real routing also considers live load, circuit breaking, rollout, and tenant isolation. The example stays deliberately minimal.',
          },
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '可部署单元的粒度', en: 'Deployable granularity' },
          text: {
            zh: '一个可部署单元可以承载多个「逻辑 Agent」，只要它们的模型、工具和权限边界相近。粒度太细，运维成本爆炸；太粗，升级互相牵连。',
            en: 'One deployable can host several logical agents if their model, tools, and permission boundaries are similar. Too fine, ops cost explodes; too coarse, upgrades collide.',
          },
        },
      ],
    },
    {
      id: 'contracts',
      title: { zh: '层间契约：让变化可控', en: 'Cross-layer contracts: making change safe' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '三层架构真正的价值，是让变化被隔离。要做到这一点，层间必须有明确契约：版本号、向后兼容策略、废弃流程，以及「谁可以改什么」的治理规则。',
            en: 'The real value of layering is isolating change. That requires explicit contracts between layers: versions, backward compatibility, deprecation, and who may change what.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '契约', en: 'Contract' },
            { zh: '生产者 → 消费者', en: 'Producer → consumer' },
            { zh: '兼容策略', en: 'Compatibility' },
          ],
          rows: [
            [
              { zh: '能力描述', en: 'Capability spec' },
              { zh: '抽象层 → 语义层 / 执行层', en: 'Abstraction → semantics / execution' },
              { zh: '只增字段，不改语义；废弃走双写期', en: 'Add fields only; deprecate with dual-write' },
            ],
            [
              { zh: '角色与关系', en: 'Roles and relations' },
              { zh: '语义层 → 编排器', en: 'Semantics → orchestrator' },
              { zh: '关系类型受控扩展，保留旧关系', en: 'Extend relation types in a controlled way, keep old ones' },
            ],
            [
              { zh: '端点与协议', en: 'Endpoint and protocol' },
              { zh: '执行层 → 网关 / 客户端', en: 'Execution → gateway / client' },
              { zh: '版本化路由，灰度切流', en: 'Versioned routing with canary' },
            ],
            [
              { zh: 'trace 字段', en: 'Trace fields' },
              { zh: '全层 → 观测平台', en: 'All layers → observability' },
              { zh: '新增字段可选，禁止静默改义', en: 'New fields optional; never silently change meaning' },
            ],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '别让 Prompt 成为隐式契约', en: 'Do not let prompts become implicit contracts' },
          text: {
            zh: '如果某个 Agent 依赖另一个 Agent 的 Prompt 里「大概会输出 JSON」，这就是隐式契约。它会在某次模型升级后悄悄失效。把输入输出 schema 显式化，再用测试锁住。',
            en: 'If one agent relies on another’s prompt “usually producing JSON”, that is an implicit contract. It will silently break after a model upgrade. Make the schema explicit and lock it with tests.',
          },
        },
      ],
    },
    {
      id: 'checklist',
      title: { zh: '三层架构自检清单', en: 'A three-layer self-check' },
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            { zh: '每个 Agent 的能力是否有稳定 ID、输入输出 schema 与副作用说明？', en: 'Does every agent capability have a stable ID, input/output schema, and side-effect description?' },
            { zh: '能力与工具是否解耦？同一能力能否换实现？', en: 'Are capabilities decoupled from tools? Can one capability swap implementations?' },
            { zh: '角色是否有明确的职责边界、权限和升级路径？', en: 'Does every role have clear responsibility boundaries, permissions, and escalation paths?' },
            { zh: '关系图谱是否支持遍历，并有深度与环路保护？', en: 'Does the relation graph support traversal with depth and cycle protection?' },
            { zh: '可部署单元是否上报能力与健康状态？', en: 'Do deployables report capabilities and health?' },
            { zh: '路由是否能按能力而不是硬编码名称工作？', en: 'Does routing work by capability rather than hard-coded names?' },
            { zh: '层间契约是否版本化，是否有兼容性测试？', en: 'Are cross-layer contracts versioned and compatibility-tested?' },
            { zh: '是否记录了 trace、成本与失败原因，且能回放？', en: 'Are traces, cost, and failures recorded and replayable?' },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: '好的架构不是让你写得更少，而是让你改的时候知道会坏在哪。',
            en: 'Good architecture does not let you write less. It tells you what will break when you change something.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '三层架构的核心是隔离三类变化：能力、语义、运行。', en: 'The three layers isolate three kinds of change: capability, semantics, runtime.' },
    { zh: '能力是业务描述，工具是实现细节，二者必须解耦。', en: 'Capabilities describe the business; tools are implementation details. Keep them decoupled.' },
    { zh: '关系图谱直接影响路由、复用与权限继承。', en: 'The relation graph drives routing, reuse, and permission inheritance.' },
    { zh: '执行层要按能力发现与路由，而不是硬编码 Agent 名称。', en: 'Execution should discover and route by capability, not hard-coded agent names.' },
    { zh: '层间契约要版本化，Prompt 不能充当隐式契约。', en: 'Cross-layer contracts must be versioned; prompts cannot serve as implicit contracts.' },
  ],
  sources: [
    {
      label: { zh: 'Palantir · Ontology 概念与元素', en: 'Palantir · Ontology concepts and elements' },
      url: 'https://www.palantir.com/docs/foundry/ontology/overview/',
    },
    {
      label: { zh: 'W3C · OWL 2 Web Ontology Language', en: 'W3C · OWL 2 Web Ontology Language' },
      url: 'https://www.w3.org/TR/owl2-overview/',
    },
    {
      label: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' },
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      label: { zh: 'OpenAI Agents SDK · Agents, handoffs, guardrails, tracing', en: 'OpenAI Agents SDK · Agents, handoffs, guardrails, tracing' },
      url: 'https://openai.github.io/openai-agents-python/',
    },
    {
      label: { zh: 'LangGraph · Stateful orchestration', en: 'LangGraph · Stateful orchestration' },
      url: 'https://langchain-ai.github.io/langgraph/',
    },
    {
      label: { zh: 'Model Context Protocol · Specification', en: 'Model Context Protocol · Specification' },
      url: 'https://modelcontextprotocol.io/specification/2025-06-18',
    },
  ],
}

export default chapter
