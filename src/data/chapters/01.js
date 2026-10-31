const chapter = {
  id: '01',
  number: 1,
  slug: 'what-is-agent-ontology',
  kind: 'chapter',
  title: { zh: '开门见山：什么是 Agent Ontology？', en: 'What is Agent Ontology, really?' },
  subtitle: { zh: '给 Agent 画一张业务地图', en: 'Give your agent a map of the business' },
  summary: {
    zh: '从“新员工入职”的比喻讲起，说清 Agent Ontology 是什么、为什么 RAG 之后仍然需要它，以及它的三层架构。',
    en: 'Starting from a new-hire metaphor, this chapter explains what agent ontology is, why RAG alone is not enough, and how the three layers fit together.',
  },
  level: 'starter',
  minutes: 16,
  icon: 'Compass',
  accent: 'brand',
  tags: [
    { zh: '本体论', en: 'Ontology' },
    { zh: 'RAG', en: 'RAG' },
    { zh: '三层架构', en: 'Three layers' },
  ],
  sections: [
    {
      id: 'business-map',
      title: { zh: '先讲人话：给 Agent 画一张业务地图', en: 'In plain words: draw your agent a business map' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '想象你招了一个智商 180 的新员工。他读过全世界的书，第一天上班就让他处理客户退款。结果他既不知道公司里「客户」「订单」「退款单」分别对应哪张表，也不知道什么状态的订单能退、超过多少钱要主管审批。于是他非常自信地，把一笔 5000 元的订单退了。',
            en: 'Imagine hiring a new employee with an IQ of 180. They have read every book in the world, and on day one you ask them to process a customer refund. They do not know which table represents a customer, an order, or a refund; they do not know which order states are refundable, or when a supervisor must approve. So they confidently refund a $5,000 order.',
          },
        },
        {
          type: 'p',
          text: {
            zh: '大模型就是这位新员工：世界知识满格，业务上下文为零。**Agent Ontology（智能体本体论）就是那张业务地图**——把业务里的对象、关系、约束和可执行动作，写成机器能读、多个 Agent 能共享的形式。它不是给人类看的流程图，而是给 Agent 看的「世界说明书」。',
            en: 'That new employee is the model: full of world knowledge, empty of business context. **Agent Ontology is the map**: a machine-readable, shared description of the objects, relations, constraints, and executable actions in a domain. It is not a flowchart for humans. It is a world manual for agents.',
          },
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '一句话定义', en: 'One-sentence definition' },
          text: {
            zh: '本体（Ontology）是对共享概念模型的形式化、显式描述。放到 Agent 场景里：它定义 Agent 世界里有哪些实体、实体之间如何关联、哪些状态与动作合法，以及多个 Agent 如何用同一套语义协作。',
            en: 'An ontology is a formal, explicit specification of a shared conceptualization. In agent systems, it defines which entities exist, how they relate, which states and actions are legal, and how multiple agents share the same semantics.',
          },
        },
        {
          type: 'cards',
          columns: 4,
          items: [
            {
              icon: 'Boxes',
              title: { zh: '对象 Entities', en: 'Entities' },
              text: { zh: '客户、订单、工单、知识库文章。每个对象有唯一标识、字段和生命周期。', en: 'Customer, order, ticket, KB article. Each has an identity, fields, and a lifecycle.' },
            },
            {
              icon: 'Share2',
              title: { zh: '关系 Relations', en: 'Relations' },
              text: { zh: '客户「拥有」订单，订单「产生」工单，工单「引用」文章。关系本身也有语义。', en: 'A customer owns orders; an order creates tickets; a ticket cites articles. Relations carry meaning.' },
            },
            {
              icon: 'ShieldCheck',
              title: { zh: '约束 Constraints', en: 'Constraints' },
              text: { zh: '未支付的订单不能退款；单个 Agent 不得直接修改财务记录。规则让系统可校验。', en: 'Unpaid orders cannot be refunded; no single agent may edit financial records directly. Rules make the system checkable.' },
            },
            {
              icon: 'Zap',
              title: { zh: '动作 Actions', en: 'Actions' },
              text: { zh: '创建工单、发送邮件、发起退款。动作声明前置条件、副作用与权限。', en: 'Create a ticket, send an email, issue a refund. Actions declare preconditions, side effects, and permissions.' },
            },
          ],
        },
        {
          type: 'p',
          text: {
            zh: '注意，本体不是「知识图谱的美化版」。知识图谱常回答「有什么、连着什么」，本体还要回答「什么关系合法」「什么动作允许」「冲突时听谁的」。Palantir 干脆把企业本体称为 **operational layer**：它既描述世界，也驱动行动。',
            en: 'Note that ontology is not merely a prettier knowledge graph. A knowledge graph often answers “what exists and what connects to what”. An ontology also answers “which relations are legal”, “which actions are allowed”, and “who wins when rules conflict”. Palantir calls its enterprise ontology an **operational layer**: it describes the world and drives action in it.',
          },
        },
      ],
    },
    {
      id: 'why-after-rag',
      title: { zh: 'RAG 之后，为什么还需要 Ontology？', en: 'Why ontology after RAG?' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'RAG 解决的是「资料从哪里找」。它把文档切块、向量化、按相似度召回，让模型回答时有据可依。但请试着回答这个问题：**「找出上个月退款金额超过 1000 元、且属于 VIP 的客户，并按城市汇总」**。向量检索可能找到退款政策、VIP 规则和几段客户对话，却很难完成跨表 Join、聚合计算，更难判断「这单到底能不能退」。',
            en: 'RAG answers “where do I find the material”. It chunks documents, embeds them, and retrieves by similarity, so the model has evidence when answering. Now try this question: **“Find customers who refunded more than $1,000 last month and are VIP, then summarize by city.”** Vector search may find the refund policy, VIP rules, and a few conversations, but it struggles to join tables, aggregate numbers, and decide whether a specific refund is legal.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**RAG 强在语义召回**：用户问得含糊，它也能找到相关段落。', en: '**RAG excels at semantic recall**: even fuzzy questions retrieve relevant passages.' },
            { zh: '**RAG 弱在全局结构**：切片之后，实体之间的关系、口径和约束一起被切碎了。', en: '**RAG is weak on global structure**: chunking shreds entity relations, metric definitions, and constraints.' },
            { zh: '**RAG 不负责执行**：它不会告诉你「这个动作需要主管审批」，更不会在越权时拦住 Agent。', en: '**RAG does not govern execution**: it will not tell you an action needs approval, still less block an unauthorized agent.' },
            { zh: '**本体补的是骨架**：对象、关系、规则、动作；RAG 补的是血肉：文档、案例、最新政策。', en: '**Ontology adds the skeleton**: objects, relations, rules, actions. RAG adds the flesh: documents, cases, fresh policies.' },
          ],
        },
        {
          type: 'table',
          caption: {
            zh: 'RAG 与 Ontology 不是替代关系，而是分工关系。',
            en: 'RAG and ontology are not substitutes. They are a division of labor.',
          },
          head: [
            { zh: '维度', en: 'Dimension' },
            { zh: 'RAG', en: 'RAG' },
            { zh: 'Ontology', en: 'Ontology' },
            { zh: '组合使用', en: 'Combined' },
          ],
          rows: [
            [
              { zh: '知识形态', en: 'Knowledge form' },
              { zh: '文档块 + 向量', en: 'Chunks + vectors' },
              { zh: '实体 + 关系 + 规则', en: 'Entities + relations + rules' },
              { zh: '本体作骨架，文档作血肉', en: 'Ontology skeleton, documents as flesh' },
            ],
            [
              { zh: '擅长问题', en: 'Best at' },
              { zh: '「文档里怎么说？」', en: '“What do the docs say?”' },
              { zh: '「业务上能不能做？」', en: '“What is legal in the business?”' },
              { zh: '「基于证据完成动作」', en: '“Act on evidence, safely”' },
            ],
            [
              { zh: '主要短板', en: 'Main weakness' },
              { zh: '无全局结构、难多跳推理', en: 'No global structure, weak multi-hop reasoning' },
              { zh: '建设成本高、更新有治理成本', en: 'Expensive to build and govern' },
              { zh: '需要两套索引与一致性治理', en: 'Two indexes and consistency to govern' },
            ],
            [
              { zh: '典型失败', en: 'Typical failure' },
              { zh: '召回正确，结论错误', en: 'Right evidence, wrong conclusion' },
              { zh: '模型不知道最新政策', en: 'Model misses the latest policy' },
              { zh: '同步滞后导致规则与文档冲突', en: 'Stale sync creates rule/document conflicts' },
            ],
          ],
        },
        {
          type: 'chart',
          kind: 'performance',
          title: { zh: '有本体 vs 无本体：生产指标对比', en: 'With vs without ontology: production metrics' },
          desc: {
            zh: '固定模型与工具集，加入本体约束后，典型生产任务的完成率、事实准确率与合规率变化。',
            en: 'Holding the model and tools constant, typical changes in task completion, factual accuracy, and policy compliance after adding ontology constraints.',
          },
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '别把 RAG 扔了', en: 'Do not throw RAG away' },
          text: {
            zh: '本体擅长结构和规则，但写不进所有长尾知识。生产系统通常是「本体骨架 + 混合检索」：先用本体确定实体、口径和权限，再用 RAG 拉取最新文档与案例。GraphRAG 可以理解为两者之间的一个折中。',
            en: 'Ontology handles structure and rules, but cannot encode every long-tail fact. Production systems usually combine an ontology skeleton with hybrid retrieval: ontology pins down entities, definitions, and permissions; RAG brings fresh documents and cases. GraphRAG sits somewhere in between.',
          },
        },
      ],
    },
    {
      id: 'three-pains',
      title: { zh: '本体解决的三个真问题', en: 'The three real problems ontology solves' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '把 Agent 用到生产环境，翻车方式看起来千奇百怪，根因往往就三个：**幻觉、不可控、难协作**。本体不是万能药，但它恰好对着这三个根因下手。',
            en: 'Production agent failures look wildly different, but they usually come from three roots: **hallucination, uncontrollability, and misalignment**. Ontology is not a cure-all, but it targets exactly these roots.',
          },
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              icon: 'Ghost',
              tag: { zh: '幻觉', en: 'Hallucination' },
              title: { zh: '一本正经地胡说', en: 'Confidently wrong' },
              text: {
                zh: '模型不知道「客户等级」有哪些合法取值，于是编出一个「钻石 Plus VIP」。本体给出枚举、外键与约束，让答案可以被程序校验。',
                en: 'The model does not know the legal values of customer tier, so it invents “Diamond Plus VIP”. Ontology provides enums, foreign keys, and constraints so answers can be checked programmatically.',
              },
            },
            {
              icon: 'ShieldAlert',
              tag: { zh: '不可控', en: 'Control' },
              title: { zh: '越能干，越让人害怕', en: 'Capability without boundaries' },
              text: {
                zh: 'Agent 能发邮件、改订单、退款。没有角色与动作前置条件，它越自主，杀伤半径越大。本体把权限写在动作上，而不是写在祈祷里。',
                en: 'The agent can send email, edit orders, and refund. Without roles and action preconditions, autonomy expands the blast radius. Ontology attaches permissions to actions instead of hoping for the best.',
              },
            },
            {
              icon: 'MessagesSquare',
              tag: { zh: '协作', en: 'Collaboration' },
              title: { zh: '每个 Agent 都在自说自话', en: 'Agents with private dialects' },
              text: {
                zh: '同一个「高价值客户」，销售 Agent 看 GMV，客服 Agent 看投诉次数，财务 Agent 看回款。不共享词表和关系，交接就会变成传话游戏。',
                en: 'For “high-value customer”, sales looks at GMV, support at complaint count, finance at collections. Without a shared vocabulary and relations, handoffs become a game of telephone.',
              },
            },
          ],
        },
        {
          type: 'p',
          text: {
            zh: '举个更具体的例子。客服 Agent 看到知识库写着「VIP 客户可优先退款」，于是准备直接退款 5000 元。如果本体里定义了 `refund_order` 动作的前置条件——订单已支付、在退款窗口内、金额超过阈值需要主管审批——Agent 在调用工具前就会收到一条明确的拒绝理由，而不是等财务月底对账时才发现。**本体把「聪明」变成了「可验收」。**',
            en: 'A concrete example: the support agent reads “VIP customers get priority refunds” and tries to refund $5,000 directly. If the ontology defines preconditions for `refund_order` — order paid, within the refund window, supervisor approval above a threshold — the agent receives a clear rejection before calling the tool, rather than finance discovering it at month-end close. **Ontology turns “smart” into “verifiable”.**',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '一个判断标准', en: 'A quick test' },
          text: {
            zh: '如果一个问题答错之后，你说不清「错在哪一步、违反了哪条规则」，那它就不该交给纯 Prompt。先补本体，再让模型自由发挥。',
            en: 'If you cannot explain, after a wrong answer, which step failed and which rule was violated, the task should not rely on prompting alone. Add ontology first, then let the model improvise.',
          },
        },
      ],
    },
    {
      id: 'three-layers',
      title: { zh: '一张图看懂 Agent Ontology 的三层架构', en: 'The three-layer architecture on one page' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'Agent Ontology 不是一个巨大的 JSON 文件，而是三层关注点分离的系统。你可以把它类比成编程语言：抽象层是类型系统，语义层是领域模型，执行层是运行时。三层各自演化，靠契约连接。',
            en: 'Agent ontology is not one giant JSON file. It is a system with three separated concerns, analogous to a programming language: abstraction is the type system, semantics is the domain model, execution is the runtime. Each layer evolves independently, connected by contracts.',
          },
        },
        {
          type: 'chart',
          kind: 'architecture',
          title: { zh: 'Agent Ontology 三层架构', en: 'The three-layer agent ontology' },
          desc: {
            zh: '从「有哪些 Agent」到「如何理解彼此」，再到「如何部署执行」。节点可拖拽，点击查看说明。',
            en: 'From “which agents exist” to “how they understand each other” to “how they run”. Nodes are draggable; click for details.',
          },
        },
        {
          type: 'p',
          text: {
            zh: '**抽象层（Abstraction Layer）** 定义 Agent 的类型与能力标签，回答「这个 Agent 会什么」。**语义层（Semantic Layer）** 定义角色、领域、交互与关系图谱，回答「它和别的 Agent 是什么关系」。**执行层（Execution Layer）** 定义 Agent 集合、可部署单元与运行时，回答「它怎么被真正调用」。',
            en: 'The **Abstraction Layer** defines agent types and capability tags: what an agent can do. The **Semantic Layer** defines roles, domains, interactions, and the relation graph: how it relates to others. The **Execution Layer** defines agent sets, deployable units, and runtime: how it is actually invoked.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '层', en: 'Layer' },
            { zh: '回答的问题', en: 'Question it answers' },
            { zh: '核心产物', en: 'Core artifacts' },
            { zh: '典型变化频率', en: 'Typical change rate' },
          ],
          rows: [
            [
              { zh: '抽象层', en: 'Abstraction' },
              { zh: '有哪些 Agent？会什么？', en: 'Which agents exist? What can they do?' },
              { zh: '类型、能力标签、I/O 契约', en: 'Types, capability tags, I/O contracts' },
              { zh: '低（随产品能力演进）', en: 'Low (as capabilities evolve)' },
            ],
            [
              { zh: '语义层', en: 'Semantic' },
              { zh: '它们如何理解彼此？', en: 'How do they understand each other?' },
              { zh: '角色、领域词表、关系、交互协议', en: 'Roles, vocabularies, relations, protocols' },
              { zh: '中（随业务与组织变化）', en: 'Medium (as business and org change)' },
            ],
            [
              { zh: '执行层', en: 'Execution' },
              { zh: '如何部署、调用、观测？', en: 'How are they deployed, called, observed?' },
              { zh: 'Agent 集合、可部署单元、工具、注册表', en: 'Agent sets, deployables, tools, registry' },
              { zh: '高（随发布与扩缩容变化）', en: 'High (with releases and scaling)' },
            ],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '从哪层开始？', en: 'Where to start' },
          text: {
            zh: '多数团队应该从语义层开始：先把业务对象、角色和关键规则理清，再抽象 Agent 类型，最后补执行层的部署细节。反过来做，很容易得到一堆「能跑但说不清为什么」的 Agent。',
            en: 'Most teams should start with the semantic layer: clarify business objects, roles, and key rules; then abstract agent types; finally add execution details. Doing it backwards tends to produce agents that run but cannot explain why.',
          },
        },
      ],
    },
    {
      id: 'minimal-ontology',
      title: { zh: '一个最小可运行的本体', en: 'A minimal runnable ontology' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '不用急着上 OWL、Neo4j 或某个框架。先用 60 行 Python 把「实体、关系、动作、前置条件」表达出来，你就能感受到本体的价值。下面的代码可以直接运行，最后还会把动作导出成 LLM 工具定义。',
            en: 'You do not need OWL, Neo4j, or a framework to start. About 60 lines of Python can express entities, relations, actions, and preconditions — enough to feel the value. The code below runs as-is and exports an action as an LLM tool definition.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'minimal_ontology.py',
          code: `from dataclasses import dataclass, field
from typing import Literal

@dataclass(frozen=True)
class Entity:
    name: str
    description: str
    fields: dict[str, str]

@dataclass(frozen=True)
class Relation:
    name: str
    source: str
    target: str
    cardinality: Literal["1:1", "1:N", "N:M"] = "1:N"

@dataclass(frozen=True)
class Action:
    name: str
    entity: str
    parameters: dict[str, str] = field(default_factory=dict)
    requires: tuple[str, ...] = ()          # 前置条件 / preconditions
    effects: tuple[str, ...] = ()           # 副作用 / side effects

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

    def validate_action(self, name: str, facts: dict) -> tuple[bool, str]:
        action = self.actions[name]
        missing = [p for p in action.requires if not facts.get(p)]
        if missing:
            return False, f"拒绝执行 {name}: 缺少前置条件 {missing}"  # refused: missing preconditions
        return True, f"允许执行 {name}, 将改变 {action.effects}"  # allowed: these effects will change

    def tool_schema(self, name: str) -> dict:
        """把手写本体导出为 LLM 工具定义 / export as an LLM tool schema"""
        action = self.actions[name]
        return {
            "type": "function",
            "function": {
                "name": action.name,
                "description": f"对 {action.entity} 执行 {action.name}",  # run action on entity
                "parameters": {
                    "type": "object",
                    "properties": {k: {"type": v} for k, v in action.parameters.items()},
                    "required": list(action.parameters),
                },
            },
        }

support = Ontology()
support.add(Entity("Order", "客户订单 / customer order", {"order_id": "string", "status": "string"}))
support.add(Entity("Customer", "客户 / customer", {"customer_id": "string", "tier": "string"}))
support.add(Relation("placed_by", "Order", "Customer", "1:N"))
support.add(Action(
    "refund_order",
    "Order",
    parameters={"order_id": "string", "amount": "number"},
    requires=("order_paid", "within_refund_window", "below_approval_limit"),
    effects=("order.status=refunded",),
))

facts = {"order_paid": True, "within_refund_window": True, "below_approval_limit": False}
print(support.validate_action("refund_order", facts))
# (False, "拒绝执行 refund_order: 缺少前置条件 ['below_approval_limit']")
# refused: missing preconditions -> below_approval_limit
print(support.tool_schema("refund_order")["function"]["name"])  # refund_order`,
          caption: {
            zh: '运行它会得到一条明确的拒绝理由。真实项目可换成 Pydantic、SHACL 或 OWL，但结构是一样的。',
            en: 'Running it produces an explicit rejection. Production code can use Pydantic, SHACL, or OWL, but the structure is the same.',
          },
        },
        {
          type: 'p',
          text: {
            zh: '这段代码有三个值得注意的点：**本体是数据，不是散落在 Prompt 里的说明**；**约束可以被程序执行，而不是靠模型自觉**；**同一份定义可以生成工具 schema、校验逻辑和文档**。从这三点出发，你就能理解后面所有复杂系统。',
            en: 'Three things matter here: **ontology is data, not prose scattered across prompts**; **constraints are executable, not left to model goodwill**; **one definition can generate tool schemas, validation logic, and documentation**. Everything more complex builds on these three ideas.',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '开始时的规模', en: 'Start small' },
          text: {
            zh: '第一版别超过 10 个实体、3 个动作、5 条硬约束。先让它跑起来、被真实请求打脸，再扩。本体和代码一样，最怕一开始就追求「大而全」。',
            en: 'Keep v1 under ten entities, three actions, and five hard constraints. Get it running, let real requests break it, then expand. Like code, ontology dies when it starts “big and complete”.',
          },
        },
      ],
    },
    {
      id: 'when-not',
      title: { zh: '什么时候不该用本体？', en: 'When should you not use ontology?' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '本体有建设与维护成本。如果业务本身还没稳定、没有明确的动作要执行、也没有多个 Agent 需要协作，硬上本体只会增加一层「没人维护的 JSON」。',
            en: 'Ontology has build and maintenance cost. If the business is still unstable, no concrete actions are executed, and no multiple agents need to collaborate, forcing an ontology just adds another unmaintained JSON layer.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '适合', en: 'Good fit' },
            { zh: '不适合', en: 'Poor fit' },
          ],
          rows: [
            [
              { zh: '需要跨系统查数、做决策、执行动作', en: 'Cross-system queries, decisions, and actions' },
              { zh: '纯文案生成、创意发散，无客观对错', en: 'Pure copywriting or ideation with no ground truth' },
            ],
            [
              { zh: '多个 Agent 或人机之间需要共享语义', en: 'Multiple agents or humans must share semantics' },
              { zh: '一次性脚本，用两次就扔', en: 'One-off scripts used twice and discarded' },
            ],
            [
              { zh: '错误代价高，需要审计与权限控制', en: 'High cost of error, audit and permissions required' },
              { zh: '领域知识极不稳定，每周推翻重来', en: 'Domain knowledge changes radically every week' },
            ],
            [
              { zh: '已有数据模型，但缺少统一业务语义', en: 'Data models exist but business semantics are fragmented' },
              { zh: '团队没人愿意维护，也没有负责人', en: 'No owner and no willingness to maintain it' },
            ],
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: { zh: '一个实用判断', en: 'A practical heuristic' },
          text: {
            zh: '先问自己：如果 Agent 答错，我能不能用一张表、几条规则把它拦住？能，就先做规则和结构；不能，先回去把业务流程理清，而不是继续加 Prompt。',
            en: 'Ask: if the agent is wrong, can I stop it with a table and a few rules? If yes, build structure first. If not, clarify the business process before adding more prompt.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '本体是给 Agent 的业务地图：对象、关系、约束、动作，四件套缺一不可。', en: 'Ontology is a business map for agents: entities, relations, constraints, and actions.' },
    { zh: 'RAG 补「资料」，本体补「结构与规则」；生产系统通常是两者组合。', en: 'RAG adds material; ontology adds structure and rules. Production systems usually combine both.' },
    { zh: '三层架构：抽象层定义能力，语义层定义理解，执行层定义运行。', en: 'Three layers: abstraction defines capability, semantics defines understanding, execution defines runtime.' },
    { zh: '本体不是学术摆设：它可以生成工具 schema、执行校验、约束 Agent 行为。', en: 'Ontology is not academic decoration: it can generate tool schemas, enforce validation, and constrain agent behavior.' },
    { zh: '从 10 个实体开始，先让真实请求打脸，再扩展。', en: 'Start with ten entities. Let real requests break it, then expand.' },
  ],
  sources: [
    {
      label: { zh: 'Gruber · A translation approach to portable ontology specifications (1993)', en: 'Gruber · A translation approach to portable ontology specifications (1993)' },
      url: 'https://doi.org/10.1006/knac.1993.1008',
    },
    {
      label: { zh: 'W3C · OWL 2 Web Ontology Language 概览', en: 'W3C · OWL 2 Web Ontology Language overview' },
      url: 'https://www.w3.org/TR/owl2-overview/',
    },
    {
      label: { zh: 'Palantir · Foundry Ontology 官方文档', en: 'Palantir · Foundry Ontology documentation' },
      url: 'https://www.palantir.com/docs/foundry/ontology/overview/',
    },
    {
      label: { zh: 'Microsoft Research · From Local to Global: A Graph RAG Approach', en: 'Microsoft Research · From Local to Global: A Graph RAG Approach' },
      url: 'https://arxiv.org/abs/2404.16130',
    },
    {
      label: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' },
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      label: { zh: 'W3C · Shapes Constraint Language (SHACL)', en: 'W3C · Shapes Constraint Language (SHACL)' },
      url: 'https://www.w3.org/TR/shacl/',
    },
  ],
}

export default chapter
