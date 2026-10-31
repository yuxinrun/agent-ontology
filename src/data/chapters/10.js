const chapter = {
  id: '10',
  number: 10,
  slug: 'field-cases',
  kind: 'chapter',
  title: { zh: '落地实战：三个业务场景的 Ontology 设计', en: 'Field cases: ontology design for three scenarios' },
  subtitle: { zh: '智能客服、研发效能、数据分析', en: 'Support, engineering productivity, and analytics' },
  summary: {
    zh: '三个可直接套用的场景：实体关系图、核心代码、效果评估与踩坑点，覆盖客服、研发与数据分析。',
    en: 'Three reusable scenarios with entity-relationship diagrams, core code, evaluation, and pitfalls across support, engineering, and analytics.',
  },
  level: 'production',
  minutes: 24,
  icon: 'Boxes',
  accent: 'amber',
  tags: [
    { zh: '客服', en: 'Support' },
    { zh: '研发效能', en: 'Engineering' },
    { zh: '数据分析', en: 'Analytics' },
  ],
  sections: [
    {
      id: 'support',
      title: { zh: '场景一：智能客服系统的本体设计', en: 'Scenario 1: customer support ontology' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '客服是本体落地的最佳起点：实体清晰、动作明确、错误代价可衡量。核心不是让 Agent「会聊天」，而是让它知道客户、订单、工单、退款、知识库之间的真实关系，并在政策边界内行动。',
            en: 'Support is the best starting point for ontology: clear entities, concrete actions, measurable error costs. The goal is not a chatty agent, but one that knows the real relations among customers, orders, tickets, refunds, and knowledge articles, and acts within policy.',
          },
        },
        {
          type: 'chart',
          kind: 'er',
          title: { zh: '智能客服实体关系图', en: 'Customer support entity graph' },
          desc: {
            zh: '客户、订单、工单、退款、对话与知识库文章之间的关系。拖拽节点查看全貌。',
            en: 'Relations among customers, orders, tickets, refunds, conversations, and articles. Drag nodes to explore.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '实体', en: 'Entity' },
            { zh: '关键字段', en: 'Key fields' },
            { zh: '关键动作', en: 'Key actions' },
          ],
          rows: [
            [{ zh: 'Customer 客户', en: 'Customer' }, { zh: 'customer_id、tier、lifetime_value、locale', en: 'customer_id, tier, lifetime_value, locale' }, { zh: '查询、标记风险、升级', en: 'Lookup, flag risk, escalate' }],
            [{ zh: 'Order 订单', en: 'Order' }, { zh: 'order_id、amount、status、paid_at', en: 'order_id, amount, status, paid_at' }, { zh: '查询、退款、取消', en: 'Lookup, refund, cancel' }],
            [{ zh: 'Ticket 工单', en: 'Ticket' }, { zh: 'ticket_id、priority、status、owner', en: 'ticket_id, priority, status, owner' }, { zh: '创建、分配、关闭', en: 'Create, assign, close' }],
            [{ zh: 'Refund 退款', en: 'Refund' }, { zh: 'refund_id、amount、approval_id、status', en: 'refund_id, amount, approval_id, status' }, { zh: '提交、审批、拒绝', en: 'Submit, approve, reject' }],
            [{ zh: 'Article 知识文章', en: 'Article' }, { zh: 'article_id、policy_version、scope', en: 'article_id, policy_version, scope' }, { zh: '检索、引用', en: 'Retrieve, cite' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'support_policy.py',
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class RefundPolicy:
    window_days: int = 30
    auto_limit: float = 200.0
    hard_limit: float = 5000.0
    vip_auto_limit: float = 1000.0

POLICY = RefundPolicy()

def refund_decision(tier: str, amount: float, days: int, paid: bool) -> tuple[str, str]:
    if not paid:
        return "reject", "order_not_paid"
    if days > POLICY.window_days:
        return "reject", "outside_window"
    if amount > POLICY.hard_limit:
        return "reject", "above_hard_limit"
    auto_limit = POLICY.vip_auto_limit if tier == "vip" else POLICY.auto_limit
    if amount > auto_limit:
        return "escalate", "approval_required"
    return "approve", "within_auto_limit"

print(refund_decision("vip", 800, 12, True))    # ('approve', 'within_auto_limit')
print(refund_decision("normal", 800, 12, True)) # ('escalate', 'approval_required')
print(refund_decision("vip", 6000, 12, True))   # ('reject', 'above_hard_limit')`,
          caption: {
            zh: '政策也是本体的一部分：它决定动作是否允许，以及是否需要人工介入。',
            en: 'Policy is part of the ontology: it decides whether an action is allowed and when a human is needed.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '指标', en: 'Metric' },
            { zh: '上线前', en: 'Before' },
            { zh: '上线后（示例）', en: 'After (example)' },
            { zh: '说明', en: 'Note' },
          ],
          rows: [
            [{ zh: '一次解决率', en: 'First-contact resolution' }, { zh: '54%', en: '54%' }, { zh: '71%', en: '71%' }, { zh: '政策与实体关系清晰后减少来回确认', en: 'Clear policies and relations reduce back-and-forth' }],
            [{ zh: '违规退款', en: 'Unauthorized refunds' }, { zh: '每月 14 起', en: '14 / month' }, { zh: '0', en: '0' }, { zh: '前置条件在工具层强制', en: 'Preconditions enforced at the tool layer' }],
            [{ zh: '平均处理时长', en: 'Average handling time' }, { zh: '9.2 分钟', en: '9.2 min' }, { zh: '4.8 分钟', en: '4.8 min' }, { zh: '查数与判断自动化', en: 'Lookup and decisions automated' }],
            [{ zh: '转人工率', en: 'Escalation rate' }, { zh: '38%', en: '38%' }, { zh: '22%', en: '22%' }, { zh: '该升级的仍有明确路径', en: 'Escalation paths remain explicit' }],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '客服本体的头号坑', en: 'Top support pitfall' },
          text: {
            zh: '把「话术」当本体。话术是表现层，随时可改；退款政策、实体关系与权限才是稳定层。反过来建，会让每次改文案都像改架构。',
            en: 'Treating scripts as ontology. Scripts are presentation and change often; refund policy, entity relations, and permissions are stable. Reverse them and every copy change feels like an architecture change.',
          },
        },
      ],
    },
    {
      id: 'engineering',
      title: { zh: '场景二：研发效能 Agent 的本体设计', en: 'Scenario 2: engineering productivity ontology' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '研发效能 Agent 处理的是 Issue、PR、流水线、发布与代码库。它的风险不在「答错一句话」，而在「改错一行代码、发错一个版本」。因此本体的重点从领域知识转向**操作边界**：谁能改哪些路径、哪些动作必须评审、发布需要哪些门禁。',
            en: 'Engineering agents deal with issues, PRs, pipelines, releases, and repositories. The risk is not a wrong sentence but a wrong line of code or a wrong release. The ontology shifts from domain knowledge to **operating boundaries**: who may edit which paths, which actions require review, which gates a release needs.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '实体 / 概念', en: 'Entity / concept' },
            { zh: '关系', en: 'Relations' },
            { zh: '受控动作', en: 'Governed actions' },
          ],
          rows: [
            [{ zh: 'Repository 代码库', en: 'Repository' }, { zh: 'owns、depends_on、owned_by', en: 'owns, depends_on, owned_by' }, { zh: '读、分支、合并', en: 'Read, branch, merge' }],
            [{ zh: 'Issue 工单', en: 'Issue' }, { zh: 'blocks、relates_to、assigned_to', en: 'blocks, relates_to, assigned_to' }, { zh: '创建、标记、关闭', en: 'Create, label, close' }],
            [{ zh: 'Pull Request', en: 'Pull request' }, { zh: 'fixes、reviewed_by、deploys', en: 'fixes, reviewed_by, deploys' }, { zh: '创建、评论、合并', en: 'Create, comment, merge' }],
            [{ zh: 'Policy 策略', en: 'Policy' }, { zh: 'applies_to、requires', en: 'applies_to, requires' }, { zh: '校验、阻断', en: 'Validate, block' }],
            [{ zh: 'Release 发布', en: 'Release' }, { zh: 'contains、approved_by', en: 'contains, approved_by' }, { zh: '构建、灰度、回滚', en: 'Build, canary, roll back' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'repo_policy.py',
          code: `from dataclasses import dataclass

PROTECTED_PATHS = ("migrations/", "infra/", ".github/workflows/")
HIGH_RISK_ACTIONS = {"merge_pr", "deploy_production", "delete_branch"}

@dataclass(frozen=True)
class ChangeRequest:
    action: str
    paths: tuple[str, ...]
    tests_passed: bool
    approvals: int
    author: str

def check_change(req: ChangeRequest) -> tuple[bool, list[str]]:
    problems = []
    if req.action in HIGH_RISK_ACTIONS and req.approvals < 2:
        problems.append("needs_two_approvals")
    if not req.tests_passed:
        problems.append("tests_not_passed")
    if any(p.startswith(PROTECTED_PATHS) for p in req.paths):
        problems.append("protected_path_requires_owner")
    return (not problems, problems)

req = ChangeRequest("merge_pr", ("src/api/handler.py",), True, 1, "agent-42")
print(check_change(req))  # (False, ['needs_two_approvals'])`,
          caption: {
            zh: '把「什么算高风险」写成代码和策略，Agent 只能在满足门禁时执行。',
            en: 'Encode what counts as high risk in code and policy; agents may act only when gates pass.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**路径级权限**：保护 `migrations/`、CI 配置、基础设施目录，默认只读。', en: '**Path-level permissions**: protect migrations, CI config, and infra; read-only by default.' },
            { zh: '**动作分级**：读、写、合并、发布，四级权限分别授权。', en: '**Action tiers**: read, write, merge, release as four permission levels.' },
            { zh: '**证据链**：PR 必须关联 Issue、测试结果与评审记录。', en: '**Evidence chain**: PRs must link issues, test results, and reviews.' },
            { zh: '**可回滚**：发布动作必须带版本、灰度与回滚方案。', en: '**Reversible**: releases carry version, canary, and rollback plans.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '别让 Agent 拥有「合并并发布」的超级权限', en: 'Avoid “merge and deploy” superpowers' },
          text: {
            zh: '把合并、发布、回滚拆成独立动作，分别授权与审计。一个动作包打天下，出了事连哪一步错的都查不清。',
            en: 'Split merge, deploy, and rollback into separate actions with separate authorization and audit. Bundling them makes failures untraceable.',
          },
        },
      ],
    },
    {
      id: 'analytics',
      title: { zh: '场景三：数据分析 Agent 的本体设计', en: 'Scenario 3: analytics agent ontology' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '数据分析 Agent 最怕「SQL 抽奖」：同一个「月活」在不同报表里有三种口径，Agent 随手写一条 SQL，结果看起来合理但完全不可比。分析本体要定义指标、维度、粒度、口径、血缘与权限，让查询有唯一语义。',
            en: 'Analytics agents fear “SQL roulette”: monthly active users has three definitions across reports. The agent writes a plausible query that is not comparable. An analytics ontology defines metrics, dimensions, grain, definitions, lineage, and permissions so a query has one semantics.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '概念', en: 'Concept' },
            { zh: '必须定义', en: 'Must define' },
            { zh: '例子', en: 'Example' },
          ],
          rows: [
            [{ zh: 'Metric 指标', en: 'Metric' }, { zh: '公式、过滤、时间窗口', en: 'Formula, filters, time window' }, { zh: 'GMV：已支付订单金额，扣除退款', en: 'GMV: paid order amount minus refunds' }],
            [{ zh: 'Dimension 维度', en: 'Dimension' }, { zh: '层级、枚举、是否可下钻', en: 'Hierarchy, enum, drill-down' }, { zh: '地区 → 省份 → 城市', en: 'Region → province → city' }],
            [{ zh: 'Grain 粒度', en: 'Grain' }, { zh: '一行代表什么', en: 'What one row means' }, { zh: '每客户每天一行', en: 'One row per customer per day' }],
            [{ zh: 'Lineage 血缘', en: 'Lineage' }, { zh: '上游表、转换、负责人', en: 'Upstream, transforms, owner' }, { zh: 'dwd_order → dws_gmv_daily', en: 'dwd_order → dws_gmv_daily' }],
            [{ zh: 'Permission 权限', en: 'Permission' }, { zh: '行级、列级、导出限制', en: 'Row, column, export limits' }, { zh: '财务字段需财务角色', en: 'Finance fields require finance role' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'metrics.py',
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Metric:
    name: str
    sql: str
    grain: str
    owner: str
    description: str

GMV = Metric(
    name="gmv",
    sql="SUM(paid_amount) - SUM(refund_amount)",
    grain="order_day",
    owner="finance_data",
    description="已支付订单金额扣除退款 / paid order amount minus refunds",
)

# Agent 不允许凭空拼口径，只能选择已注册指标
# The agent may not invent a metric definition; it can only pick a registered one.
CATALOG = {m.name: m for m in [GMV]}

def resolve_metric(name: str) -> Metric:
    if name not in CATALOG:
        raise KeyError(f"metric not registered: {name}")
    return CATALOG[name]

def build_query(metric: str, dimension: str, month: str) -> str:
    m = resolve_metric(metric)
    return f"""
SELECT {dimension}, {m.sql} AS {m.name}
FROM dws_order_daily
WHERE month = '{month}'
GROUP BY {dimension};
"""

print(build_query("gmv", "region", "2026-10"))`,
          caption: {
            zh: '指标注册表让 Agent 从「写 SQL」变成「选指标 + 选维度」，可审计性大幅提升。',
            en: 'A metric registry shifts the agent from writing SQL to choosing metrics and dimensions, greatly improving auditability.',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '给分析 Agent 加「口径确认」', en: 'Add definition confirmation' },
          text: {
            zh: '当用户的问题涉及多义指标时，先返回候选口径与差异，再让用户确认。这比事后解释「为什么两个报表对不上」便宜得多。',
            en: 'When a question involves ambiguous metrics, return candidate definitions and differences for confirmation. It is cheaper than explaining later why two reports disagree.',
          },
        },
      ],
    },
    {
      id: 'reuse',
      title: { zh: '场景对比与可复用模式', en: 'Cross-scenario patterns' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '模式', en: 'Pattern' },
            { zh: '客服', en: 'Support' },
            { zh: '研发', en: 'Engineering' },
            { zh: '分析', en: 'Analytics' },
          ],
          rows: [
            [{ zh: '核心实体', en: 'Core entities' }, { zh: '客户 / 订单 / 工单', en: 'Customer / order / ticket' }, { zh: '仓库 / PR / 发布', en: 'Repo / PR / release' }, { zh: '指标 / 维度 / 表', en: 'Metric / dimension / table' }],
            [{ zh: '高风险动作', en: 'Risky actions' }, { zh: '退款、改等级', en: 'Refund, tier change' }, { zh: '合并、发布', en: 'Merge, deploy' }, { zh: '导出、改口径', en: 'Export, redefine metric' }],
            [{ zh: '本体重点', en: 'Focus' }, { zh: '政策与权限', en: 'Policy and permissions' }, { zh: '路径与门禁', en: 'Paths and gates' }, { zh: '口径与血缘', en: 'Definitions and lineage' }],
            [{ zh: '主要指标', en: 'Main metric' }, { zh: '一次解决率', en: 'First-contact resolution' }, { zh: '变更失败率', en: 'Change failure rate' }, { zh: '查询准确率', en: 'Query accuracy' }],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            { zh: '**先定义高风险动作**：写操作、不可逆操作、跨租户操作，优先建模。', en: '**Define risky actions first**: writes, irreversible operations, cross-tenant operations.' },
            { zh: '**实体 ID 必须跨系统稳定**：否则关系图谱只是幻觉。', en: '**Entity IDs must be stable across systems**, or the relation graph is fiction.' },
            { zh: '**把口径与政策变成代码**：可测试、可审计、可回放。', en: '**Turn definitions and policies into code**: testable, auditable, replayable.' },
            { zh: '**评测按场景定制**：客服看解决率，研发看变更失败率，分析看口径准确率。', en: '**Customize evaluation**: resolution for support, change failure rate for engineering, definition accuracy for analytics.' },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: '三个场景的实体不同，但本体的骨架相同：对象、关系、约束、动作，以及谁可以做什么。',
            en: 'The entities differ, but the skeleton is the same: objects, relations, constraints, actions, and who may do what.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '客服本体优先建模政策、实体关系与退款边界。', en: 'Support ontology prioritizes policies, entity relations, and refund boundaries.' },
    { zh: '研发效能本体的核心是路径级权限与发布门禁。', en: 'Engineering ontology centers on path-level permissions and release gates.' },
    { zh: '分析本体用指标注册表消灭「SQL 抽奖」。', en: 'Analytics ontology uses a metric registry to end SQL roulette.' },
    { zh: '三个场景共享同一骨架：对象、关系、约束、动作、责任。', en: 'All three share the skeleton: objects, relations, constraints, actions, ownership.' },
    { zh: '评测指标必须按场景定制，不能只看「回答得像不像」。', en: 'Evaluation must be scenario-specific; “sounds right” is not enough.' },
  ],
  sources: [
    {
      label: { zh: 'Palantir · Foundry Ontology 文档', en: 'Palantir · Foundry Ontology documentation' },
      url: 'https://www.palantir.com/docs/foundry/ontology/overview/',
    },
    {
      label: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' },
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      label: { zh: 'OpenAI · A practical guide to building agents', en: 'OpenAI · A practical guide to building agents' },
      url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    },
    {
      label: { zh: 'Google · Agent2Agent protocol', en: 'Google · Agent2Agent protocol' },
      url: 'https://a2a-protocol.org/',
    },
    {
      label: { zh: 'Model Context Protocol · Specification', en: 'Model Context Protocol · Specification' },
      url: 'https://modelcontextprotocol.io/specification/2025-06-18',
    },
  ],
}

export default chapter
