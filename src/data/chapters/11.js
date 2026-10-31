const chapter = {
  id: '11',
  number: 11,
  slug: 'pitfalls',
  kind: 'chapter',
  title: { zh: '踩坑与避坑：Ontology 开发的常见陷阱', en: 'Pitfalls: what breaks ontology projects' },
  subtitle: { zh: '过度设计、本体膨胀、语义歧义、性能与安全', en: 'Overdesign, bloat, ambiguity, performance, security' },
  summary: {
    zh: '总结本体项目最常见的五类坑：设计失衡、本体膨胀、语义歧义、性能取舍与权限合规，并给出可执行的避坑清单。',
    en: 'Five recurring failure modes — design imbalance, bloat, ambiguity, performance trade-offs, and security — with an actionable checklist.',
  },
  level: 'production',
  minutes: 18,
  icon: 'TriangleAlert',
  accent: 'pink',
  tags: [
    { zh: '避坑', en: 'Pitfalls' },
    { zh: '治理', en: 'Governance' },
    { zh: '安全', en: 'Security' },
  ],
  sections: [
    {
      id: 'overdesign',
      title: { zh: '过度设计 vs 设计不足', en: 'Overdesign vs underdesign' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '本体项目有两种经典死法。第一种是**过度设计**：一开始就想建「全公司统一本体」，画了 300 个实体，半年后没人维护。第二种是**设计不足**：所有语义都塞在 Prompt 里，模型一升级就全线漂移。两者都源于同一个问题：没有用真实任务来驱动建模。',
            en: 'Ontology projects die two ways. **Overdesign**: aiming for a company-wide ontology from day one, drawing 300 entities, abandoned in six months. **Underdesign**: stuffing all semantics into prompts, so a model upgrade causes drift. Both come from not letting real tasks drive the model.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '信号', en: 'Signal' },
            { zh: '可能是', en: 'Likely' },
            { zh: '处方', en: 'Fix' },
          ],
          rows: [
            [{ zh: '实体数量半年内翻三倍，使用率却下降', en: 'Entities triple in six months while usage drops' }, { zh: '本体膨胀', en: 'Bloat' }, { zh: '按查询频率与动作覆盖度裁剪', en: 'Prune by query frequency and action coverage' }],
            [{ zh: '每个需求都要改 Prompt 里的规则', en: 'Every requirement changes prompt rules' }, { zh: '设计不足', en: 'Underdesign' }, { zh: '把稳定约束迁移到本体与代码', en: 'Move stable constraints into ontology and code' }],
            [{ zh: '业务方看不懂本体，只有架构师看得懂', en: 'Only architects can read the ontology' }, { zh: '过度抽象', en: 'Over-abstraction' }, { zh: '用业务术语命名，补示例与查询', en: 'Use business terms, add examples and queries' }],
            [{ zh: '本体与真实数据对不上，需要人工映射', en: 'Ontology does not match data; manual mapping' }, { zh: '建模脱离数据源', en: 'Modeling detached from data' }, { zh: '从真实表与查询反推实体', en: 'Derive entities from real tables and queries' }],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '「大而全」是本体项目最大的坑', en: '“Big and complete” is the biggest trap' },
          text: {
            zh: '本体的价值密度不均匀。先把 20% 高频、高风险、可执行的语义做深，比铺 300 个没人用的实体更有价值。',
            en: 'Ontology value is unevenly distributed. Go deep on the 20% of high-frequency, high-risk, executable semantics instead of 300 unused entities.',
          },
        },
      ],
    },
    {
      id: 'bloat',
      title: { zh: '本体膨胀：如何控制复杂度', en: 'Bloat: controlling complexity' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '本体膨胀的典型表现：实体越来越多、关系越来越密、同义词越来越乱、没人敢删。复杂度不是线性增长的——每加一个实体，可能的组合关系是平方级。控制膨胀需要治理机制，而不只是「大家注意点」。',
            en: 'Bloat shows up as more entities, denser relations, messier synonyms, and nobody daring to delete. Complexity is not linear: every new entity creates quadratic relation possibilities. Controlling it needs governance, not reminders.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**设定预算**：每个领域第一版不超过 30 个实体、50 条关系、10 个动作。', en: '**Set budgets**: v1 per domain under 30 entities, 50 relations, 10 actions.' },
            { zh: '**按使用率排序**：连续两个季度没被查询或引用的概念，进入待废弃列表。', en: '**Rank by usage**: concepts untouched for two quarters enter a deprecation list.' },
            { zh: '**合并同义**：同义概念只保留一个 canonical ID，其余作为 alias。', en: '**Merge synonyms**: one canonical ID, the rest as aliases.' },
            { zh: '**关系类型受控**：新增关系类型需要评审，避免出现 40 种语义模糊的边。', en: '**Control relation types**: new relation types need review; avoid 40 vague edge types.' },
            { zh: '**版本与废弃**：每次变更记录原因、影响面与迁移路径。', en: '**Version and deprecate**: record reason, impact, and migration path for each change.' },
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'governance.py',
          code: `from dataclasses import dataclass, field
from datetime import date

@dataclass
class Concept:
    name: str
    owner: str
    last_used: date
    aliases: set[str] = field(default_factory=set)

def stale(concepts: list[Concept], today: date, days: int = 180):
    return [
        c for c in concepts
        if (today - c.last_used).days > days
    ]

def merge_aliases(concepts: list[Concept]) -> dict[str, str]:
    """建立 alias -> canonical ID 映射，并检测冲突。
    Build alias-to-canonical mapping and detect collisions."""
    index, conflicts = {}, []
    for concept in concepts:
        for alias in concept.aliases:
            key = alias.strip().lower()
            if key in index and index[key] != concept.name:
                conflicts.append((alias, index[key], concept.name))
            index[key] = concept.name
    return {"index": index, "conflicts": conflicts}`,
          caption: {
            zh: '治理代码化之后，「删不删」就不再靠开会吵架，而靠使用数据与冲突检测。',
            en: 'Codifying governance turns deletion debates into usage data and conflict detection.',
          },
        },
      ],
    },
    {
      id: 'ambiguity',
      title: { zh: '语义歧义与对齐难题', en: 'Ambiguity and alignment' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '语义歧义是最隐蔽的坑：系统能跑、日志没报错、结果却不可比。典型例子包括「活跃用户」口径不同、「退款」是否包含撤销、「客户」是否包含潜在客户。更糟的是同名不同义：两个系统都叫 `order`，一个指订单，一个指排序。',
            en: 'Ambiguity is the sneakiest pitfall: the system runs, logs are clean, results are incomparable. Examples: different definitions of active user, refund including cancellations or not, customer including prospects. Worse, same names with different meanings: two systems both have `order`, one an order, one a sort.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '歧义类型', en: 'Ambiguity type' },
            { zh: '例子', en: 'Example' },
            { zh: '处理方式', en: 'Handling' },
          ],
          rows: [
            [{ zh: '同义不同名', en: 'Synonyms' }, { zh: '客户 / 用户 / 往来单位', en: 'Customer / user / counterparty' }, { zh: 'canonical ID + alias 表', en: 'Canonical ID + alias table' }],
            [{ zh: '同名不同义', en: 'Homonyms' }, { zh: '两张表都叫 order', en: 'Two tables both named order' }, { zh: '命名空间 + 显式映射', en: 'Namespaces + explicit mapping' }],
            [{ zh: '口径不同', en: 'Different definitions' }, { zh: 'GMV 是否含退款', en: 'GMV including refunds or not' }, { zh: '公式化定义 + 版本', en: 'Formula definition + version' }],
            [{ zh: '粒度不同', en: 'Different grain' }, { zh: '日活按设备 vs 按账号', en: 'DAU by device vs by account' }, { zh: '显式声明 grain 与维度', en: 'Explicit grain and dimensions' }],
            [{ zh: '时间窗口不同', en: 'Different time windows' }, { zh: '“近 30 天”含不含今天', en: 'Does “last 30 days” include today' }, { zh: '统一半开区间约定', en: 'Standard half-open interval convention' }],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '每个指标都要有「反例」', en: 'Every metric needs counterexamples' },
          text: {
            zh: '定义「活跃用户」时，同时写明「不包含什么」：试用账号、内部账号、爬虫。反例比正例更能暴露歧义。',
            en: 'When defining active user, state what it excludes: trial accounts, internal accounts, bots. Counterexamples expose ambiguity better than examples.',
          },
        },
      ],
    },
    {
      id: 'performance',
      title: { zh: '性能：推理速度 vs 准确率', en: 'Performance: speed vs accuracy' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '本体校验本身通常比一次 LLM 调用便宜几个数量级，但在高并发或复杂规则链下仍会成为瓶颈。性能优化的目标不是「规则越少越好」，而是把规则分成**必须实时**、**可缓存**、**可异步**三类。',
            en: 'Ontology validation is usually orders of magnitude cheaper than an LLM call, but can still bottleneck under concurrency or long rule chains. The goal is not fewer rules, but classifying them into **must be real-time**, **cacheable**, and **asynchronous**.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '手段', en: 'Technique' },
            { zh: '做法', en: 'How' },
            { zh: '适用', en: 'Applies to' },
            { zh: '风险', en: 'Risk' },
          ],
          rows: [
            [{ zh: '规则分级', en: 'Rule tiering' }, { zh: '硬约束同步、软约束异步', en: 'Hard constraints sync, soft async' }, { zh: '长规则链', en: 'Long rule chains' }, { zh: '异步结果回滚复杂', en: 'Async rollback is complex' }],
            [{ zh: '缓存', en: 'Caching' }, { zh: '缓存实体与策略快照', en: 'Cache entity and policy snapshots' }, { zh: '读多写少', en: 'Read-heavy' }, { zh: '过期导致误判', en: 'Stale cache misjudges' }],
            [{ zh: '预计算', en: 'Precompute' }, { zh: '离线计算关系闭包', en: 'Offline relation closure' }, { zh: '图查询', en: 'Graph queries' }, { zh: '更新延迟', en: 'Update lag' }],
            [{ zh: '候选裁剪', en: 'Candidate pruning' }, { zh: '只校验相关子图', en: 'Validate only the relevant subgraph' }, { zh: '大图谱', en: 'Large graphs' }, { zh: '漏掉跨子图规则', en: 'Miss cross-subgraph rules' }],
            [{ zh: '快速拒绝', en: 'Fast reject' }, { zh: '先跑低成本检查', en: 'Run cheap checks first' }, { zh: '通用', en: 'General' }, { zh: '错误信息需完整', en: 'Keep reasons complete' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'policy_cache.py',
          code: `from functools import lru_cache
from time import monotonic

@lru_cache(maxsize=1024)
def load_policy(tenant: str, version: int) -> dict:
    # 模拟从数据库/配置中心加载 / simulate loading from DB or config
    return {"auto_limit": 200, "window_days": 30}

_cache: dict[tuple[str, int], tuple[float, dict]] = {}
TTL_SECONDS = 60

def get_policy(tenant: str, version: int) -> dict:
    key = (tenant, version)
    now = monotonic()
    cached = _cache.get(key)
    if cached and now - cached[0] < TTL_SECONDS:
        return cached[1]
    policy = load_policy(tenant, version)
    _cache[key] = (now, policy)
    return policy

print(get_policy("acme", 3)["auto_limit"])  # 200`,
          caption: {
            zh: '策略缓存必须带版本号与 TTL；本体变更时要能主动失效。',
            en: 'Policy caches need version keys and TTL; ontology changes must invalidate them proactively.',
          },
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '不要为了性能跳过硬约束', en: 'Never skip hard constraints for speed' },
          text: {
            zh: '金额上限、权限、合规校验属于硬约束，宁可慢一点也不能省。可以省的通常是解释生成、摘要和日志美化。',
            en: 'Amount limits, permissions, and compliance are hard constraints. Slow down if needed. What you can skip is explanation generation, summaries, and log beautification.',
          },
        },
      ],
    },
    {
      id: 'security',
      title: { zh: '安全与合规：本体层面的权限控制', en: 'Security and compliance at the ontology layer' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '本体会同时描述「世界」和「谁能操作世界」。如果权限只写在接口层，Agent 可以绕过语义直接调 API；如果权限写在本体动作上，所有调用路径都受同一套规则约束。合规要求（数据保留、跨境、脱敏）也应成为本体的属性。',
            en: 'Ontology describes both the world and who may act on it. If permissions live only at the API layer, agents can bypass semantics and call APIs directly. If permissions attach to ontology actions, every path obeys the same rules. Compliance requirements (retention, residency, redaction) should also be ontology properties.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '威胁', en: 'Threat' },
            { zh: '场景', en: 'Scenario' },
            { zh: '本体层对策', en: 'Ontology-layer mitigation' },
          ],
          rows: [
            [{ zh: '越权调用', en: 'Privilege escalation' }, { zh: '低权限 Agent 调到高权限工具', en: 'Low-privilege agent reaches a high-privilege tool' }, { zh: '动作权限 + 角色绑定 + 网关校验', en: 'Action permissions + role binding + gateway checks' }],
            [{ zh: '数据越界', en: 'Data boundary breach' }, { zh: '同一工具查到了其他租户数据', en: 'A tool returns another tenant’s data' }, { zh: '数据范围作为动作参数强制执行', en: 'Enforce data scope as an action parameter' }],
            [{ zh: '提示注入', en: 'Prompt injection' }, { zh: '文档内容诱导 Agent 改动作', en: 'Document content induces an action' }, { zh: '动作白名单 + 审批 + 输出编码', en: 'Action allowlist + approval + output encoding' }],
            [{ zh: '审计缺失', en: 'Missing audit' }, { zh: '无法证明谁改了什么', en: 'Cannot prove who changed what' }, { zh: '动作级审计日志 + trace_id', en: 'Action-level audit logs + trace_id' }],
            [{ zh: '合规漂移', en: 'Compliance drift' }, { zh: '新增字段未做脱敏', en: 'New field without redaction' }, { zh: '字段级敏感标记 + 自动检查', en: 'Field-level sensitivity tags + automated checks' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'field_policy.py',
          code: `SENSITIVE_FIELDS = {"email", "phone", "national_id", "bank_account"}

def project_fields(record: dict, role: str) -> dict:
    """按角色裁剪字段，默认拒绝敏感字段。
    Project fields by role; deny sensitive fields by default."""
    if role == "finance_auditor":
        return dict(record)
    return {
        key: value
        for key, value in record.items()
        if key not in SENSITIVE_FIELDS
    }

customer = {
    "customer_id": "C-1042",
    "email": "a@example.com",
    "phone": "+86-138-0000-0000",
    "tier": "vip",
}
print(project_fields(customer, "support_agent"))
# {'customer_id': 'C-1042', 'tier': 'vip'}`,
          caption: {
            zh: '字段级脱敏应该在数据出口统一做，而不是指望每个 Agent 自己记得。',
            en: 'Field redaction belongs at the data boundary, not in each agent’s memory.',
          },
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '权限是本体的一等公民', en: 'Permissions are first-class' },
          text: {
            zh: '如果权限模型是上线前补的，它大概率会被绕过。建模时就把「谁、在什么条件下、能对什么对象做什么」写清楚。',
            en: 'If permissions are bolted on before launch, they will be bypassed. Model who can do what, to which objects, under which conditions, from the start.',
          },
        },
      ],
    },
    {
      id: 'checklist',
      title: { zh: '上线前避坑清单', en: 'Pre-launch checklist' },
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            { zh: '本体第一版是否控制在可维护规模（领域 ≤30 实体）？', en: 'Is v1 maintainable (≤30 entities per domain)?' },
            { zh: '每个实体是否有稳定 ID、负责人和来源系统？', en: 'Does every entity have a stable ID, owner, and source system?' },
            { zh: '每个写动作是否有前置条件、权限、幂等与回滚？', en: 'Does every write action have preconditions, permissions, idempotency, and rollback?' },
            { zh: '高风险动作是否经过人工审批或双人复核？', en: 'Do high-risk actions require human approval or two-person review?' },
            { zh: '指标与术语是否有可执行定义和反例？', en: 'Do metrics and terms have executable definitions and counterexamples?' },
            { zh: '同义词、同名不同义是否被显式处理？', en: 'Are synonyms and homonyms handled explicitly?' },
            { zh: '本体变更是否有版本、迁移与回滚路径？', en: 'Do ontology changes have versions, migrations, and rollback?' },
            { zh: '校验是否在真实工具执行路径上？', en: 'Is validation on the actual tool execution path?' },
            { zh: '是否有 30+ 真实评测用例，含对抗输入？', en: 'Are there 30+ real evaluation cases, including adversarial inputs?' },
            { zh: 'trace 是否覆盖输入、动作、本体判定与最终状态？', en: 'Do traces cover input, actions, ontology decisions, and final state?' },
            { zh: '是否有全局开关、人工接管与降级方案？', en: 'Is there a kill switch, human takeover, and degradation plan?' },
            { zh: '敏感字段是否在数据出口统一脱敏？', en: 'Are sensitive fields redacted at the data boundary?' },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: '本体项目的失败，很少因为技术不够先进，多半因为边界没管好。',
            en: 'Ontology projects rarely fail because the tech is not advanced enough. They fail because boundaries were not governed.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '用真实任务驱动建模，避免「大而全」与「全塞 Prompt」两个极端。', en: 'Let real tasks drive modeling; avoid both “big and complete” and “all in the prompt”.' },
    { zh: '本体复杂度是平方级的，需要预算、使用率与废弃机制。', en: 'Ontology complexity grows quadratically; use budgets, usage metrics, and deprecation.' },
    { zh: '同义、同名不同义、口径与粒度差异，都要显式处理。', en: 'Handle synonyms, homonyms, definition, and grain differences explicitly.' },
    { zh: '性能优化要分级：硬约束不能省，软约束可缓存或异步。', en: 'Tier performance work: never skip hard constraints; cache or defer soft ones.' },
    { zh: '权限与合规应写进本体动作，而不是接口层的补丁。', en: 'Permissions and compliance belong in ontology actions, not API patches.' },
  ],
  sources: [
    {
      label: { zh: 'W3C · SHACL', en: 'W3C · SHACL' },
      url: 'https://www.w3.org/TR/shacl/',
    },
    {
      label: { zh: 'OWASP · Top 10 for LLM Applications', en: 'OWASP · Top 10 for LLM Applications' },
      url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
    },
    {
      label: { zh: 'Model Context Protocol · Security best practices', en: 'Model Context Protocol · Security best practices' },
      url: 'https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices',
    },
    {
      label: { zh: 'NIST · AI Risk Management Framework', en: 'NIST · AI Risk Management Framework' },
      url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    },
    {
      label: { zh: 'Palantir · Ontology and dynamic security', en: 'Palantir · Ontology and dynamic security' },
      url: 'https://www.palantir.com/docs/foundry/ontology/overview/',
    },
  ],
}

export default chapter
