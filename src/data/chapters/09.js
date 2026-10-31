const chapter = {
  id: '09',
  number: 9,
  slug: 'build-ontology-system',
  kind: 'chapter',
  title: { zh: '从零搭建你的第一个 Ontology 系统', en: 'Build your first ontology system' },
  subtitle: { zh: '五步走：领域建模 → 角色 → 协议 → 推理 → LLM', en: 'Five steps: domain, roles, protocol, reasoning, LLM' },
  summary: {
    zh: '用客服退款场景，从零搭建一个可运行的本体系统：定义实体与约束、接入 LangChain 工具调用、并用评测集验证。',
    en: 'Build a runnable ontology system for refund support: entities and constraints, LangChain tool calling, and an evaluation harness.',
  },
  level: 'production',
  minutes: 28,
  icon: 'Hammer',
  accent: 'brand',
  tags: [
    { zh: '实战', en: 'Hands-on' },
    { zh: 'LangChain', en: 'LangChain' },
    { zh: '评测', en: 'Evaluation' },
  ],
  sections: [
    {
      id: 'goal',
      title: { zh: '目标与边界', en: 'Goal and scope' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '我们要做一个电商客服 Agent：用户说「帮我退款」，Agent 能查订单、判断是否符合政策、在允许范围内发起退款；超过阈值时要求审批或升级人工。目标不是做一个「万能客服」，而是做一个**边界清楚、可以评测**的退款场景。',
            en: 'We will build an e-commerce support agent: a user says “refund my order”; the agent looks up the order, checks policy, and issues a refund within limits; above the threshold it requires approval or escalates. The goal is not a universal support bot, but a **well-bounded, evaluable** refund scenario.',
          },
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            { icon: 'Target', title: { zh: '范围内', en: 'In scope' }, text: { zh: '查订单、退款政策、发退款、升级人工。', en: 'Look up orders, apply refund policy, issue refunds, escalate.' } },
            { icon: 'Ban', title: { zh: '范围外', en: 'Out of scope' }, text: { zh: '修改收货地址、处理支付纠纷、修改客户等级。', en: 'Change addresses, handle chargebacks, edit customer tier.' } },
            { icon: 'Gauge', title: { zh: '成功标准', en: 'Success' }, text: { zh: '任务成功率 ≥85%，约束违规 0，人工接管可解释。', en: '≥85% task success, zero constraint violations, explainable takeovers.' } },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '先画边界，再写代码', en: 'Boundaries before code' },
          text: {
            zh: '把「不做什么」写进本体，比把「要做什么」写进 Prompt 更重要。范围外的请求应该有明确的拒绝或升级路径。',
            en: 'Writing “what not to do” into the ontology matters more than writing “what to do” into the prompt. Out-of-scope requests need explicit rejection or escalation.',
          },
        },
      ],
    },
    {
      id: 'step-domain',
      title: { zh: '步骤 1：梳理业务实体与关系', en: 'Step 1: Model entities and relations' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '先把退款场景里出现的名词列出来：客户、订单、退款单、政策、审批。再定义它们的唯一标识、状态与关系。注意「退款单」是动作产生的实体，不是动作本身。',
            en: 'List the nouns in the refund scenario: customer, order, refund, policy, approval. Define stable IDs, states, and relations. A refund record is an entity produced by an action, not the action itself.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'ontology/entities.py',
          code: `from dataclasses import dataclass, field

@dataclass(frozen=True)
class Entity:
    name: str
    fields: dict[str, str]
    description: str = ""

@dataclass(frozen=True)
class Relation:
    name: str
    source: str
    target: str

@dataclass(frozen=True)
class Action:
    name: str
    entity: str
    params: dict[str, str]
    requires: tuple[str, ...]
    permissions: tuple[str, ...]

@dataclass
class Ontology:
    entities: dict[str, Entity] = field(default_factory=dict)
    relations: dict[str, Relation] = field(default_factory=dict)
    actions: dict[str, Action] = field(default_factory=dict)

    def add(self, item):
        bucket = {
            "Entity": self.entities,
            "Relation": self.relations,
            "Action": self.actions,
        }[type(item).__name__]
        bucket[item.name] = item

support = Ontology()
support.add(Entity("Customer", {"customer_id": "string", "tier": "normal|vip|enterprise"}))
support.add(Entity("Order", {"order_id": "string", "amount": "decimal", "status": "paid|refunded|cancelled"}))
support.add(Entity("Refund", {"refund_id": "string", "amount": "decimal", "status": "submitted|approved|rejected"}))
support.add(Relation("placed_by", "Order", "Customer"))
support.add(Relation("generated_from", "Refund", "Order"))
support.add(Action(
    name="refund_order",
    entity="Order",
    params={"order_id": "string", "amount": "decimal"},
    requires=("order_paid", "within_window", "approval_if_needed"),
    permissions=("billing:write",),
))
print(list(support.entities), list(support.actions))
# ['Customer', 'Order', 'Refund'] ['refund_order']`,
          caption: {
            zh: '实体、关系、动作先落在代码里，后面才能生成 schema、校验与文档。',
            en: 'Entities, relations, and actions live in code first; schemas, validation, and docs can be generated later.',
          },
        },
      ],
    },
    {
      id: 'step-roles',
      title: { zh: '步骤 2：定义角色与能力边界', en: 'Step 2: Define roles and boundaries' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '同一个退款能力，客服和主管的权限不同。把「谁能退多少」写进角色，而不是写进系统提示词。这样即使模型被注入，越权调用也会在工具前被拦截。',
            en: 'The same refund capability differs for support and managers. Encode “who can refund how much” in roles, not system prompts. Even under injection, unauthorized calls are blocked before the tool runs.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'ontology/roles.py',
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Role:
    name: str
    capabilities: frozenset[str]
    data_scope: str
    approval_limit: float = 0.0

ROLES = {
    "tier1": Role(
        name="tier1_support",
        capabilities=frozenset({"lookup_order", "refund_order"}),
        data_scope="tenant:acme",
        approval_limit=0.0,
    ),
    "manager": Role(
        name="support_manager",
        capabilities=frozenset({"lookup_order", "refund_order", "approve_refund"}),
        data_scope="tenant:acme",
        approval_limit=1000.0,
    ),
}

def authorize(role: Role, action: str, amount: float) -> tuple[bool, str]:
    if action not in role.capabilities:
        return False, f"{role.name} cannot call {action}"
    if action == "refund_order" and amount > 200 and role.approval_limit < amount:
        return False, "approval required / 需要主管审批"
    return True, "ok"

print(authorize(ROLES["tier1"], "refund_order", 120))   # (True, 'ok')
print(authorize(ROLES["tier1"], "refund_order", 500))   # (False, approval required...)`,
          caption: {
            zh: '授权是纯函数，可单元测试，也可以在生产中作为工具调用的前置钩子。',
            en: 'Authorization is a pure function: unit-testable and usable as a pre-tool hook in production.',
          },
        },
      ],
    },
    {
      id: 'step-protocol',
      title: { zh: '步骤 3：设计交互协议与数据格式', en: 'Step 3: Design the interaction protocol' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '退款可能需要客服、账务、主管三方协作。用一个显式的消息 schema 定义请求、审批与结果，避免「在对话里随口答应」。',
            en: 'Refunds may involve support, billing, and a manager. Define requests, approvals, and results with an explicit message schema instead of casual agreement in chat.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'protocols/messages.py',
          code: `# pip install pydantic
from datetime import datetime
from typing import Literal
from pydantic import BaseModel

class RefundRequest(BaseModel):
    task_id: str
    order_id: str
    amount: float
    requested_by: str
    reason: Literal["duplicate_charge", "damaged", "not_received", "other"]
    approval_id: str | None = None
    trace_id: str

class RefundResult(BaseModel):
    task_id: str
    status: Literal["submitted", "approved", "rejected", "escalated"]
    refund_id: str | None = None
    reason: str | None = None
    completed_at: datetime | None = None

req = RefundRequest(
    task_id="t-7781", order_id="O-7781", amount=120,
    requested_by="support_agent", reason="duplicate_charge", trace_id="trace-42",
)
print(req.model_dump(exclude_none=True))`,
          caption: {
            zh: 'schema 之外，还需要定义状态机与超时：submitted → approved/rejected/escalated。',
            en: 'Beyond the schema, define a state machine and timeouts: submitted → approved/rejected/escalated.',
          },
        },
      ],
    },
    {
      id: 'step-reasoning',
      title: { zh: '步骤 4：实现语义层与推理引擎', en: 'Step 4: Build the semantic layer and reasoner' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '推理引擎不需要一上来就上复杂逻辑编程。先用「事实 + 规则 + 前置条件」跑通：订单是否已支付、是否在退款窗口、是否需要审批。失败时返回结构化原因，而不是一句「操作失败」。',
            en: 'You do not need heavy logic programming at first. Start with facts, rules, and preconditions: paid, within window, approval needed. Return structured reasons on failure, not a vague “operation failed”.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'ontology/reasoner.py',
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class RefundFacts:
    order_status: str
    days_since_purchase: int
    amount: float
    customer_tier: str
    approval_id: str | None = None

def evaluate(facts: RefundFacts) -> tuple[bool, list[str]]:
    """返回是否允许，以及所有失败原因。
    Return whether allowed, plus every failed precondition."""
    failures = []
    if facts.order_status != "paid":
        failures.append("order_not_paid")
    if facts.days_since_purchase > 30:
        failures.append("outside_refund_window")
    if facts.amount > 200 and not facts.approval_id:
        failures.append("approval_required")
    if facts.amount > 5000:
        failures.append("above_hard_limit")
    return (not failures, failures)

def risk_level(facts: RefundFacts) -> str:
    score = 0
    if facts.customer_tier != "vip":
        score += 1
    if facts.amount > 500:
        score += 2
    if facts.days_since_purchase > 20:
        score += 1
    return "high" if score >= 3 else "normal"

facts = RefundFacts("paid", 12, 500, "vip")
print(evaluate(facts))       # (False, ['approval_required'])
print(risk_level(facts))     # normal`,
          caption: {
            zh: '规则引擎的价值在于「可解释」：每个拒绝都能对应到具体前置条件。',
            en: 'The value of a rule engine is explainability: every rejection maps to a specific precondition.',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '规则要能回放', en: 'Rules must be replayable' },
          text: {
            zh: '把事实快照、规则版本和判定结果一起写入 trace。线上出现争议时，可以离线回放「当时为什么拒绝」。',
            en: 'Write the fact snapshot, rule version, and decision into the trace. When disputes arise, replay why it was rejected.',
          },
        },
      ],
    },
    {
      id: 'step-llm',
      title: { zh: '步骤 5：接入 LLM 与工具集', en: 'Step 5: Connect the LLM and tools' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '现在把本体接到 LangChain。关键不是「让模型自由调用工具」，而是在每次工具调用前跑一遍本体校验；拒绝原因作为工具结果回填，让模型有机会解释或升级。',
            en: 'Now connect the ontology to LangChain. The point is not letting the model call tools freely, but running ontology validation before each call. Rejection reasons return as tool results so the model can explain or escalate.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'agents/support_agent.py',
          code: `# pip install langchain-openai
from dataclasses import dataclass
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, ToolMessage
from langchain_core.tools import tool

@tool
def lookup_order(order_id: str) -> dict:
    """查询订单状态、金额与客户等级。只读。
    Look up order status, amount, and customer tier. Read-only."""
    return {"order_id": order_id, "status": "paid", "amount": 120.0, "tier": "vip"}

@tool
def refund_order(order_id: str, amount: float) -> dict:
    """对已支付订单发起退款。不可逆。
    Refund a paid order. Irreversible."""
    return {"refund_id": "R-7781", "order_id": order_id, "amount": amount}

TOOLS = [lookup_order, refund_order]
TOOL_MAP = {t.name: t for t in TOOLS}

@dataclass
class Decision:
    allowed: bool
    reason: str

class OntologyGuard:
    def validate(self, name: str, args: dict, context: dict) -> Decision:
        if name == "refund_order":
            if args.get("amount", 0) > 200 and not context.get("approval_id"):
                return Decision(False, "超过 200 需主管审批 / approval required above 200")
        return Decision(True, "ok")

llm = ChatOpenAI(model="gpt-4.1-mini", temperature=0).bind_tools(TOOLS)
guard = OntologyGuard()

def run_agent(question: str, context: dict, max_steps: int = 4) -> str:
    messages = [HumanMessage(question)]
    for _ in range(max_steps):
        ai = llm.invoke(messages)
        messages.append(ai)
        if not ai.tool_calls:
            return ai.content

        for call in ai.tool_calls:
            decision = guard.validate(call["name"], call["args"], context)
            if not decision.allowed:
                messages.append(ToolMessage(
                    content=f"REJECTED: {decision.reason}",
                    tool_call_id=call["id"],
                ))
                continue
            result = TOOL_MAP[call["name"]].invoke(call["args"])
            messages.append(ToolMessage(content=str(result), tool_call_id=call["id"]))

    return "达到最大步数 / max steps reached"

print(run_agent("帮我退了订单 O-7781，金额 120", {"approval_id": None}))
# 模型会先查订单，再尝试退款；若金额超限，会收到 REJECTED 并升级说明。
# The model checks the order first, then attempts the refund; an over-limit amount comes back REJECTED and escalates.`,
          caption: {
            zh: '这一版仍是最小实现。生产还需：会话状态、审批流、幂等、超时、重试、trace 与人工接管 UI。',
            en: 'This is still minimal. Production adds session state, approval flows, idempotency, timeouts, retries, traces, and a takeover UI.',
          },
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '不要让模型「绕过」校验', en: 'Do not let the model bypass validation' },
          text: {
            zh: '校验必须在工具执行的代码路径上，而不是靠提示词要求模型「先调用 validate」。模型可以忘，代码不会。',
            en: 'Validation must sit on the actual tool execution path, not rely on a prompt telling the model to call validate first. Models forget; code does not.',
          },
        },
      ],
    },
    {
      id: 'evaluate',
      title: { zh: '步骤 6：评测与迭代', en: 'Step 6: Evaluate and iterate' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '没有评测的本体系统，只能靠感觉迭代。先准备 30 条真实案例：常见、边界、对抗。每条包含用户输入、期望结果、必须满足的约束，以及是否应升级人工。',
            en: 'Without evaluation, an ontology system is tuned by vibes. Prepare 30 real cases: common, edge, adversarial. Each includes input, expected outcome, required constraints, and whether escalation is expected.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '指标', en: 'Metric' },
            { zh: '定义', en: 'Definition' },
            { zh: '目标（示例）', en: 'Target (example)' },
          ],
          rows: [
            [{ zh: '任务成功率', en: 'Task success' }, { zh: '最终状态符合期望的案例占比', en: 'Share of cases with expected final state' }, { zh: '≥ 85%', en: '≥ 85%' }],
            [{ zh: '约束违规率', en: 'Constraint violation' }, { zh: '产生越权 / 非法动作的占比', en: 'Share with unauthorized or illegal actions' }, { zh: '0', en: '0' }],
            [{ zh: '升级准确率', en: 'Escalation accuracy' }, { zh: '该升级时升级、不该升级时不升级', en: 'Escalates when needed, not otherwise' }, { zh: '≥ 90%', en: '≥ 90%' }],
            [{ zh: '平均工具调用', en: 'Avg tool calls' }, { zh: '每任务调用次数，衡量绕路', en: 'Calls per task, a proxy for detours' }, { zh: '≤ 3', en: '≤ 3' }],
            [{ zh: '成本 / 延迟', en: 'Cost / latency' }, { zh: '每任务 token 成本与 p95 延迟', en: 'Token cost and p95 latency per task' }, { zh: '按业务定', en: 'Business-defined' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'evals/run_eval.py',
          code: `import json

cases = [
    {
        "input": "订单 O-1001 重复扣款，退 120 元",
        "expected_status": "submitted",
        "must_not": ["approval_required"],
    },
    {
        "input": "订单 O-1002 退 800 元",
        "expected_status": "escalated",
        "must_not": ["refund_without_approval"],
    },
]

def run_case(case: dict) -> dict:
    result = run_agent(case["input"], {"approval_id": None})
    return {"input": case["input"], "result": result}

results = [run_case(c) for c in cases]
print(json.dumps(results, ensure_ascii=False, indent=2))`,
          caption: {
            zh: '真实评测还要接执行环境、记录 trace、比较最终状态，而不是比较模型输出文本。',
            en: 'Real evaluation hooks into the execution environment, records traces, and compares final states rather than text output.',
          },
        },
      ],
    },
    {
      id: 'structure',
      title: { zh: '项目结构与上线清单', en: 'Project layout and launch checklist' },
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          filename: 'project-tree.txt',
          code: `support-ontology/
├── ontology/
│   ├── entities.py        # 实体、关系、动作 / entities, relations, actions
│   ├── roles.py           # 角色与权限 / roles and permissions
│   ├── reasoner.py        # 规则与前置条件 / rules and preconditions
│   └── schema.json        # 导出给工具 / exported schemas
├── agents/
│   ├── support_agent.py   # LLM 循环 / LLM loop
│   └── tools.py           # 工具实现 / tool implementations
├── protocols/
│   └── messages.py        # 交互协议 / interaction protocol
├── evals/
│   ├── cases.jsonl        # 真实案例 / real cases
│   └── run_eval.py        # 评测脚本 / evaluation script
└── app.py                 # 服务入口 / service entry`,
          caption: {
            zh: '本体、Agent、协议、评测分目录管理，才能让不同角色各改各的。',
            en: 'Separate ontology, agents, protocols, and evals so different roles can own different parts.',
          },
        },
        {
          type: 'list',
          ordered: true,
          items: [
            { zh: '所有写动作都有前置条件、权限与幂等键。', en: 'Every write action has preconditions, permissions, and idempotency keys.' },
            { zh: '拒绝原因结构化，能回喂给模型，也能进入评测。', en: 'Rejection reasons are structured, fed back to the model, and captured by evaluation.' },
            { zh: '30 条以上真实用例覆盖常见、边界、对抗输入。', en: '30+ real cases cover common, edge, and adversarial inputs.' },
            { zh: 'trace 包含输入、工具调用、本体判定、最终状态与人工接管。', en: 'Traces include input, tool calls, ontology decisions, final state, and takeover.' },
            { zh: '有全局开关与人工接管入口。', en: 'A kill switch and human takeover entry point exist.' },
            { zh: '本体版本与规则版本可回滚。', en: 'Ontology and rule versions are rollback-capable.' },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: '先让系统「不会做错」，再让它「做得更多」。顺序反了，就得在凌晨三点补课。',
            en: 'First make the system unable to do wrong; then let it do more. Reverse the order and you will study at 3 a.m.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '从一个边界清晰的场景开始，先定义范围外行为。', en: 'Start with one well-bounded scenario and define out-of-scope behavior first.' },
    { zh: '实体、关系、动作、前置条件都应是代码，而不是提示词。', en: 'Entities, relations, actions, and preconditions belong in code, not prompts.' },
    { zh: '授权与约束要挂在真实工具执行路径上。', en: 'Authorization and constraints must sit on the actual tool execution path.' },
    { zh: '交互协议要显式定义状态机、审批与 trace。', en: 'Interaction protocols must define state machines, approvals, and traces.' },
    { zh: '没有评测集，就没有迭代方向。', en: 'Without an evaluation set, there is no direction for iteration.' },
  ],
  sources: [
    {
      label: { zh: 'LangChain · Agents documentation', en: 'LangChain · Agents documentation' },
      url: 'https://docs.langchain.com/oss/python/langchain/agents',
    },
    {
      label: { zh: 'LangChain · Tool calling', en: 'LangChain · Tool calling' },
      url: 'https://docs.langchain.com/oss/python/langchain/tools',
    },
    {
      label: { zh: 'OpenAI · Function calling guide', en: 'OpenAI · Function calling guide' },
      url: 'https://platform.openai.com/docs/guides/function-calling',
    },
    {
      label: { zh: 'Pydantic · Documentation', en: 'Pydantic · Documentation' },
      url: 'https://docs.pydantic.dev/latest/',
    },
    {
      label: { zh: 'W3C · SHACL', en: 'W3C · SHACL' },
      url: 'https://www.w3.org/TR/shacl/',
    },
    {
      label: { zh: 'Palantir · Ontology documentation', en: 'Palantir · Ontology documentation' },
      url: 'https://www.palantir.com/docs/foundry/ontology/overview/',
    },
  ],
}

export default chapter
