const chapter = {
  id: '04',
  number: 4,
  slug: 'enterprise-ontology',
  kind: 'chapter',
  title: { zh: '企业级本体模型：Role / Domain / Interaction', en: 'Enterprise ontology: role, domain, interaction' },
  subtitle: { zh: '让 Agent 知道「我是谁、我在哪、怎么和别人说话」', en: 'Help agents know who they are, where they are, and how to talk' },
  summary: {
    zh: '从角色本体、领域本体、交互本体三个子模型出发，讲清企业级 Agent 本体如何建模，以及神经符号耦合如何约束 LLM 推理。',
    en: 'Model enterprise agents through role, domain, and interaction ontologies, then constrain LLM reasoning with neuro-symbolic validation.',
  },
  level: 'builder',
  minutes: 20,
  icon: 'Network',
  accent: 'violet',
  tags: [
    { zh: '角色本体', en: 'Roles' },
    { zh: '领域建模', en: 'Domain modeling' },
    { zh: '神经符号', en: 'Neuro-symbolic' },
  ],
  sections: [
    {
      id: 'three-subontologies',
      title: { zh: '企业本体的三个子模型', en: 'Three sub-ontologies of an enterprise' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '一个企业级 Agent 本体，通常由三个互相咬合的子本体组成：**角色本体**回答「谁负责什么」，**领域本体**回答「业务里有哪些东西」，**交互本体**回答「它们怎么协作」。三者共享同一套实体 ID，否则就会出现「客服说的订单」和「财务说的订单」不是同一张订单的惨剧。',
            en: 'An enterprise agent ontology usually has three interlocking sub-ontologies: **role** (who owns what), **domain** (what exists in the business), and **interaction** (how they collaborate). They must share entity IDs, or the “order” known to support and the “order” known to finance will not be the same order.',
          },
        },
        {
          type: 'chart',
          kind: 'knowledge',
          title: { zh: '角色 / 领域 / 交互本体关系图', en: 'Role, domain, and interaction as a graph' },
          desc: {
            zh: '拖拽节点查看关系。中心是 Agent，周围连接角色、能力、领域实体、意图、工具与策略。',
            en: 'Drag nodes to explore. The agent sits at the center, connected to roles, capabilities, domain entities, intents, tools, and policies.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '子本体', en: 'Sub-ontology' },
            { zh: '核心问题', en: 'Core question' },
            { zh: '主要产物', en: 'Artifacts' },
          ],
          rows: [
            [
              { zh: '角色本体', en: 'Role ontology' },
              { zh: '谁负责？权限到哪？向谁升级？', en: 'Who owns it? What is the scope? To whom does it escalate?' },
              { zh: '角色、使命、能力、动作权限、升级链', en: 'Roles, missions, capabilities, action permissions, escalation chains' },
            ],
            [
              { zh: '领域本体', en: 'Domain ontology' },
              { zh: '业务对象是什么？怎么定义？', en: 'What are the business objects? How are they defined?' },
              { zh: '实体、属性、关系、枚举、口径、同义词', en: 'Entities, properties, relations, enums, definitions, synonyms' },
            ],
            [
              { zh: '交互本体', en: 'Interaction ontology' },
              { zh: '怎么请求、怎么交接、怎么追责？', en: 'How to request, hand off, and trace responsibility?' },
              { zh: '意图、消息、协议、SLA、信任与审计字段', en: 'Intents, messages, protocols, SLAs, trust and audit fields' },
            ],
          ],
        },
      ],
    },
    {
      id: 'role-ontology',
      title: { zh: '角色本体：身份、职责与边界', en: 'Role ontology: identity and boundaries' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '角色不是「人」，也不是「模型」。角色是一组**可执行的职责与权限边界**。同一个 Agent 可以扮演多个角色（例如工作日是客服、夜间只做只读查询），但每个角色必须有明确的使命、允许的动作和升级路径。',
            en: 'A role is not a person or a model. It is a bundle of **executable responsibilities and boundaries**. One agent can play several roles (support on weekdays, read-only lookup at night), but each role needs a clear mission, allowed actions, and escalation path.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'roles.py',
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Role:
    name: str
    mission: str
    capabilities: frozenset[str]
    allowed_actions: frozenset[str]
    data_scope: str = "own_tenant"
    escalates_to: str | None = None

tier1 = Role(
    name="tier1_support",
    mission="解决一线问题，不直接处理大额退款 / resolve tier-1 issues, no large refunds",
    capabilities=frozenset({"lookup_order", "answer_faq", "create_ticket"}),
    allowed_actions=frozenset({"refund_order_small"}),
    data_scope="tenant:acme",
    escalates_to="tier2_support",
)

def can(role: Role, action: str, amount: float = 0) -> bool:
    if action not in role.allowed_actions:
        return False
    if action == "refund_order_small" and amount > 200:
        return False  # 超过阈值必须升级 / escalate above threshold
    return True

print(can(tier1, "refund_order_small", 80))   # True
print(can(tier1, "refund_order_small", 500))  # False
print(can(tier1, "delete_account"))           # False`,
          caption: {
            zh: '把权限写成可执行函数，而不是写在 Prompt 里。Prompt 可以被注入，代码不会。',
            en: 'Encode permissions as executable checks, not prompt text. Prompts can be injected; code cannot.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**职责边界**：一句话说不清「这个角色不做什么」，通常说明边界没定义。', en: '**Boundary**: if you cannot state in one sentence what the role does not do, the boundary is undefined.' },
            { zh: '**数据范围**：租户、区域、字段级脱敏，都应绑定到角色，而不是全局配置。', en: '**Data scope**: tenant, region, field-level redaction should bind to the role, not a global config.' },
            { zh: '**升级路径**：Agent 不确定时找谁？升级链必须是本体的一部分。', en: '**Escalation**: who does the agent call when unsure? The escalation chain belongs in the ontology.' },
            { zh: '**时间与状态**：同角色在不同状态（试用、冻结、离职交接）下权限可能不同。', en: '**Time and state**: the same role may have different permissions in trial, frozen, or transition states.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '不要给角色起「超级 Agent」这种名字', en: 'Avoid names like “super agent”' },
          text: {
            zh: '角色名一旦含糊，权限就会被慢慢加满。命名应该像数据库角色一样具体：`tier1_support`、`billing_analyst_readonly`、`release_approver`。',
            en: 'Vague role names attract permission creep. Name roles like database roles: `tier1_support`, `billing_analyst_readonly`, `release_approver`.',
          },
        },
      ],
    },
    {
      id: 'domain-ontology',
      title: { zh: '领域本体：术语、实体与关系', en: 'Domain ontology: terms, entities, relations' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '领域本体是企业本体的地基。它要把「客户」「订单」「GMV」「活跃用户」这些业务词，变成有唯一 ID、明确字段、明确关系和明确口径的对象。最容易被忽略的是**同义词与口径**：销售叫「客户」，财务叫「往来单位」，客服叫「用户」——它们可能指同一个实体，也可能不是。',
            en: 'The domain ontology is the foundation. It turns business words like customer, order, GMV, and active user into objects with stable IDs, fields, relations, and definitions. The most neglected part is **synonyms and definitions**: sales says customer, finance says counterparty, support says user — they may or may not mean the same entity.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '要素', en: 'Element' },
            { zh: '必须写清', en: 'Must specify' },
            { zh: '反例', en: 'Anti-pattern' },
          ],
          rows: [
            [{ zh: '实体', en: 'Entity' }, { zh: '唯一 ID、来源系统、生命周期', en: 'Stable ID, source system, lifecycle' }, { zh: '「客户」同时指联系人和公司', en: '“Customer” means both contact and company' }],
            [{ zh: '属性', en: 'Property' }, { zh: '类型、单位、枚举、是否可空', en: 'Type, unit, enum, nullability' }, { zh: '金额用字符串且无币种', en: 'Amount as a string with no currency' }],
            [{ zh: '关系', en: 'Relation' }, { zh: '方向、基数、是否可传递', en: 'Direction, cardinality, transitivity' }, { zh: '订单「属于」客户但方向相反', en: 'Order “belongs to” customer in the wrong direction' }],
            [{ zh: '口径', en: 'Definition' }, { zh: '计算公式、时间窗口、排除项', en: 'Formula, time window, exclusions' }, { zh: 'GMV 是否含退款没人说得清', en: 'Nobody knows whether GMV includes refunds' }],
          ],
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'customer.jsonld',
          code: `{
  "@context": {
    "@vocab": "https://schema.yuxin.example/ontology#",
    "name": "https://schema.org/name",
    "tier": "https://schema.yuxin.example/ontology#tier",
    "hasOrder": { "@id": "https://schema.yuxin.example/ontology#hasOrder", "@type": "@id" }
  },
  "@id": "https://data.example.com/customer/C-1042",
  "@type": "Customer",
  "name": "Acme 制造 / Acme Manufacturing",
  "tier": "enterprise",
  "hasOrder": { "@id": "https://data.example.com/order/O-7781" }
}`,
          caption: {
            zh: 'JSON-LD 用 @context 把本地字段映射到全局语义，让不同系统的「name」可以对齐。',
            en: 'JSON-LD maps local fields to global semantics through @context, so “name” can align across systems.',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '口径要写成可执行定义', en: 'Make definitions executable' },
          text: {
            zh: '「高价值客户」不要只写一句解释，最好绑定到公式或查询：`sum(paid_orders.amount) over 12 months >= 100000`。这样 Agent 才不会每次自己发明口径。',
            en: 'Do not just describe “high-value customer”; bind it to a formula or query: `sum(paid_orders.amount) over 12 months >= 100000`. Then the agent cannot reinvent the definition each time.',
          },
        },
      ],
    },
    {
      id: 'interaction-ontology',
      title: { zh: '交互本体：协议、意图与协作规则', en: 'Interaction ontology: protocols, intents, collaboration' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '交互本体定义 Agent 之间「怎么说话」。它至少包含四层：**意图**（我要什么）、**消息**（数据长什么样）、**协议**（怎么送达、怎么重试）、**治理**（权限、SLA、审计）。很多多智能体项目失败，不是模型不聪明，而是交互层只有自然语言。',
            en: 'The interaction ontology defines how agents talk. It has at least four layers: **intent** (what I want), **message** (what the data looks like), **protocol** (delivery and retries), and **governance** (permissions, SLAs, audit). Many multi-agent projects fail not because models are weak, but because the interaction layer is only natural language.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '模式', en: 'Pattern' },
            { zh: '适用', en: 'Use when' },
            { zh: '风险', en: 'Risk' },
          ],
          rows: [
            [{ zh: '请求-响应', en: 'Request-response' }, { zh: '任务明确、可等待', en: 'Clear task, can wait' }, { zh: '超时与重复请求', en: 'Timeouts and duplicate requests' }],
            [{ zh: '移交 Handoff', en: 'Handoff' }, { zh: '需要更专业的 Agent 接手', en: 'A specialist should take over' }, { zh: '上下文丢失、责任不清', en: 'Lost context, unclear ownership' }],
            [{ zh: '协商', en: 'Negotiation' }, { zh: '资源冲突、价格与优先级', en: 'Resource conflicts, price, priority' }, { zh: '死循环、无限还价', en: 'Loops and endless bargaining' }],
            [{ zh: '广播', en: 'Broadcast' }, { zh: '状态变更通知多方', en: 'Notify multiple parties of a change' }, { zh: '消息风暴、幂等', en: 'Message storms, idempotency' }],
            [{ zh: '黑板共享', en: 'Blackboard' }, { zh: '多 Agent 共享中间结果', en: 'Agents share intermediate results' }, { zh: '脏读、写入冲突', en: 'Stale reads, write conflicts' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'handoff_message.py',
          code: `# pip install pydantic
from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field

class Handoff(BaseModel):
    message_id: str
    sender: str
    receiver: str
    intent: Literal["refund.request", "refund.approve", "faq.answer"]
    task_id: str
    payload: dict
    requires_approval: bool = False
    deadline: datetime | None = None
    trace_id: str = Field(description="全链路追踪 / end-to-end trace")

msg = Handoff(
    message_id="m-9f2c",
    sender="support_agent",
    receiver="billing_agent",
    intent="refund.request",
    task_id="t-7781",
    payload={"order_id": "O-7781", "amount": 120},
    trace_id="trace-42",
)
print(msg.model_dump_json(indent=2))`,
          caption: {
            zh: '消息 schema 里显式包含意图、审批要求、截止时间和 trace_id，责任才可追溯。',
            en: 'The message schema explicitly carries intent, approval requirement, deadline, and trace_id, making responsibility traceable.',
          },
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '自然语言是载荷，不是协议', en: 'Natural language is payload, not protocol' },
          text: {
            zh: '消息正文可以是自然语言，但意图、接收方、权限、超时、失败处理必须是结构化的。否则每次协作都像在群里 @ 一个不知道是否在线的人。',
            en: 'The message body can be natural language, but intent, receiver, permission, timeout, and failure handling must be structured. Otherwise collaboration is like @-mentioning someone who may not be online.',
          },
        },
      ],
    },
    {
      id: 'neuro-symbolic',
      title: { zh: '神经符号耦合：LLM 提议，本体裁决', en: 'Neuro-symbolic coupling: LLM proposes, ontology decides' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '本体约束 LLM 最实用的模式，不是「把本体塞进 Prompt 让模型自己遵守」，而是**分工**：LLM 负责理解、抽取、生成候选；符号系统负责校验、拒绝、要求修复。模型仍然聪明，但不再拥有最终裁决权。',
            en: 'The most practical way to constrain an LLM with ontology is not “stuff the ontology into the prompt and hope”. It is **division of labor**: the LLM understands, extracts, and proposes; a symbolic layer validates, rejects, and requests repair. The model stays smart but loses final authority.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'validate_candidate.py',
          code: `from dataclasses import dataclass
from typing import Callable

@dataclass(frozen=True)
class Constraint:
    name: str
    check: Callable[[dict], bool]
    message: str

constraints = [
    Constraint("amount_positive", lambda c: c["amount"] > 0, "金额必须为正 / amount must be positive"),
    Constraint("within_limit", lambda c: c["amount"] <= 200 or c["approved"], "超过 200 需审批 / approval required above 200"),
    Constraint("order_paid", lambda c: c["order_status"] == "paid", "订单未支付 / order not paid"),
]

def validate(claim: dict) -> list[str]:
    return [c.message for c in constraints if not c.check(claim)]

# LLM 抽取出的候选事实 / candidate facts proposed by the LLM
candidate = {"amount": 500, "approved": False, "order_status": "paid"}
errors = validate(candidate)
print(errors)
# ['超过 200 需审批 / approval required above 200']

# 修复循环 / repair loop（伪代码）:
# for attempt in range(2):
#     if not errors: break
#     candidate = llm.repair(candidate, errors)
#     errors = validate(candidate)
# if errors: escalate_to_human(candidate, errors)`,
          caption: {
            zh: '约束检查是纯函数，可测试、可审计、可离线回放。LLM 只负责提出候选，不负责放行。',
            en: 'Constraint checks are pure functions: testable, auditable, replayable offline. The LLM proposes; it does not approve.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**先约束后生成**：能枚举的取值、能校验的字段，不要交给模型自由发挥。', en: '**Constrain before generating**: enums and checkable fields should not be left to free-form generation.' },
            { zh: '**修复而不是一拒了之**：把错误信息回喂给模型，给它 1–2 次修复机会。', en: '**Repair instead of only rejecting**: feed errors back and allow one or two repair attempts.' },
            { zh: '**超限就升级**：修复失败时转人工或降级为只读，不要让模型「再想想」。', en: '**Escalate on failure**: after repair fails, hand off to a human or degrade to read-only. Do not ask the model to “think again”.' },
            { zh: '**记录拒绝原因**：拒绝理由是最有价值的评测数据。', en: '**Log rejection reasons**: they are the most valuable evaluation data.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '约束不是越多越好', en: 'More constraints is not better' },
          text: {
            zh: '过度约束会让 Agent 寸步难行，也会让本体维护成本失控。优先约束「高风险、可枚举、可执行」的部分；开放式创作留给模型。',
            en: 'Over-constraining paralyzes agents and inflates maintenance. Prioritize high-risk, enumerable, executable constraints; leave open-ended creation to the model.',
          },
        },
      ],
    },
    {
      id: 'rollout',
      title: { zh: '企业落地路径', en: 'Rolling it out in an enterprise' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { zh: '选一个高价值、边界清晰的场景', en: 'Pick one high-value, well-bounded scenario' },
              text: { zh: '客服退款、研发工单路由、指标查询都是好起点。避开「全公司知识助手」这种大而空的入口。', en: 'Refund support, ticket routing, and metric lookup are good starts. Avoid “company-wide knowledge assistant”.' },
            },
            {
              title: { zh: '先建领域本体，再建角色与交互', en: 'Domain first, then roles and interactions' },
              text: { zh: '没有稳定的实体和口径，角色与协议都是空中楼阁。先用 10–20 个实体打通一条链路。', en: 'Without stable entities and definitions, roles and protocols are castles in the air. Use 10–20 entities to complete one path.' },
            },
            {
              title: { zh: '把权限与审批固化到动作上', en: 'Bind permissions and approvals to actions' },
              text: { zh: '每个写动作都要有权限、前置条件、审批与回滚方案。只读动作可以更自由。', en: 'Every write action needs permissions, preconditions, approval, and rollback. Read actions can be freer.' },
            },
            {
              title: { zh: '用真实失败驱动本体演进', en: 'Evolve the ontology from real failures' },
              text: { zh: '每周复盘被拒绝的调用、人工接管和错误答案，把共性问题补进本体，而不是加长 Prompt。', en: 'Review rejected calls, human takeovers, and wrong answers weekly. Encode recurring issues into the ontology, not longer prompts.' },
            },
          ],
        },
      ],
    },
  ],
  takeaways: [
    { zh: '企业本体由角色、领域、交互三个子本体咬合而成，必须共享实体 ID。', en: 'Enterprise ontology is role, domain, and interaction ontologies interlocking over shared entity IDs.' },
    { zh: '角色是职责与权限边界，不是人格设定。', en: 'A role is a boundary of responsibility and permission, not a personality.' },
    { zh: '领域本体必须写清口径与同义词，否则 Agent 会自创定义。', en: 'Domain ontology must define metrics and synonyms, or agents will invent definitions.' },
    { zh: '交互层要结构化：意图、消息、协议、治理，自然语言只是载荷。', en: 'Interaction must be structured: intent, message, protocol, governance. Natural language is payload.' },
    { zh: '神经符号耦合的正确姿势是 LLM 提议、本体裁决、失败升级。', en: 'Neuro-symbolic coupling works as LLM proposes, ontology decides, failure escalates.' },
  ],
  sources: [
    {
      label: { zh: 'Palantir · Ontology semantic and kinetic elements', en: 'Palantir · Ontology semantic and kinetic elements' },
      url: 'https://www.palantir.com/docs/foundry/ontology/overview/',
    },
    {
      label: { zh: 'W3C · OWL 2 Web Ontology Language', en: 'W3C · OWL 2 Web Ontology Language' },
      url: 'https://www.w3.org/TR/owl2-overview/',
    },
    {
      label: { zh: 'W3C · Shapes Constraint Language (SHACL)', en: 'W3C · Shapes Constraint Language (SHACL)' },
      url: 'https://www.w3.org/TR/shacl/',
    },
    {
      label: { zh: 'W3C · JSON-LD 1.1', en: 'W3C · JSON-LD 1.1' },
      url: 'https://www.w3.org/TR/json-ld11/',
    },
    {
      label: { zh: 'arXiv · Internet of Agents: Fundamentals, Applications, and Challenges', en: 'arXiv · Internet of Agents: Fundamentals, Applications, and Challenges' },
      url: 'https://arxiv.org/abs/2505.07176',
    },
    {
      label: { zh: 'arXiv · LLM-based Agents Suffer from Hallucinations: A Survey', en: 'arXiv · LLM-based Agents Suffer from Hallucinations: A Survey' },
      url: 'https://arxiv.org/abs/2509.18970',
    },
  ],
}

export default chapter
