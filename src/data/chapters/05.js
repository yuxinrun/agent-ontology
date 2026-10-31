const chapter = {
  id: '05',
  number: 5,
  slug: 'agent-taxonomy',
  kind: 'chapter',
  title: { zh: 'Agent 分类学：从 LangChain 到工业界', en: 'Agent taxonomy: from LangChain to industry' },
  subtitle: { zh: 'ReAct、MRKL、Self-Ask 与对话型 Agent 的适用边界', en: 'Where ReAct, MRKL, Self-Ask, and conversational agents fit' },
  summary: {
    zh: '拆解主流 Agent 类型的推理模式、实现方式与失败模式，用雷达图和对比表帮你选出合适的架构。',
    en: 'Deconstruct major agent types by reasoning pattern, implementation, and failure mode, with a radar chart and comparison table to choose the right architecture.',
  },
  level: 'builder',
  minutes: 18,
  icon: 'GitBranch',
  accent: 'brand',
  tags: [
    { zh: 'ReAct', en: 'ReAct' },
    { zh: 'MRKL', en: 'MRKL' },
    { zh: '分类学', en: 'Taxonomy' },
  ],
  sections: [
    {
      id: 'dimensions',
      title: { zh: '分类的两个维度', en: 'Two dimensions of classification' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '「Agent 类型」经常被当成框架里的一个枚举值，这是误解。分类维度至少有两个：**规划方式**（一步一观察，还是先计划再执行）和**交互方式**（单轮任务，还是多轮对话）。同一个产品里，不同环节可能需要不同组合。',
            en: '“Agent type” is often treated as an enum in a framework. That is a misunderstanding. At least two dimensions matter: **planning** (step-by-step observation vs. plan-then-execute) and **interaction** (single-task vs. multi-turn conversation). One product may need different combinations at different stages.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '类型', en: 'Type' },
            { zh: '规划方式', en: 'Planning' },
            { zh: '典型场景', en: 'Typical use' },
            { zh: '主要风险', en: 'Main risk' },
          ],
          rows: [
            [{ zh: 'ReAct', en: 'ReAct' }, { zh: '边想边做，逐步观察', en: 'Think and act step by step' }, { zh: '工具调用、检索问答', en: 'Tool use, retrieval QA' }, { zh: '循环、工具选错', en: 'Loops, wrong tools' }],
            [{ zh: 'MRKL', en: 'MRKL' }, { zh: '路由到模块化专家', en: 'Route to modular experts' }, { zh: '多工具、多领域问答', en: 'Multi-tool, multi-domain QA' }, { zh: '路由错误、专家不可用', en: 'Misrouting, expert unavailable' }],
            [{ zh: 'Self-Ask', en: 'Self-Ask' }, { zh: '先拆子问题再作答', en: 'Decompose into sub-questions' }, { zh: '多跳事实推理', en: 'Multi-hop factual reasoning' }, { zh: '子问题质量不稳定', en: 'Unstable sub-questions' }],
            [{ zh: '对话型', en: 'Conversational' }, { zh: '槽位填充 + 多轮记忆', en: 'Slot filling + memory' }, { zh: '客服、助手、陪伴', en: 'Support, assistants, companions' }, { zh: '记忆污染、越聊越偏', en: 'Memory pollution, drift' }],
            [{ zh: '计划-执行', en: 'Plan-and-execute' }, { zh: '先出计划，再逐步执行', en: 'Plan first, then execute' }, { zh: '研究、复杂流程', en: 'Research, complex workflows' }, { zh: '计划过期、错误级联', en: 'Stale plans, cascading errors' }],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '分类不是站队', en: 'Taxonomy is not a team sport' },
          text: {
            zh: '生产系统经常混合多种模式：入口用对话型 Agent，复杂任务切换到计划-执行，具体工具调用用 ReAct。别为了「架构纯洁」牺牲可靠性。',
            en: 'Production systems mix patterns: a conversational front door, plan-and-execute for complex tasks, ReAct for tool calls. Do not sacrifice reliability for architectural purity.',
          },
        },
      ],
    },
    {
      id: 'react',
      title: { zh: 'ReAct 家族：思考、行动、观察', en: 'The ReAct family: think, act, observe' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'ReAct 的核心不是某个框架 API，而是一个循环：**Thought → Action → Observation → Thought…**。模型先写出推理，再选择工具和参数；程序执行工具，把结果作为观察塞回上下文。它的优势是灵活，劣势也是灵活：模型可能选错工具、重复调用，或者陷入「再查一次」的循环。',
            en: 'ReAct is not a framework API. It is a loop: **Thought → Action → Observation → Thought…**. The model reasons, selects a tool and arguments; the program executes it and feeds the observation back. Its strength is flexibility; its weakness is the same: wrong tools, duplicate calls, or loops of “let me check once more”.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'react_loop.py',
          code: `def react_loop(question, llm, tools, max_steps=6):
    """最小 ReAct 循环 / minimal ReAct loop"""
    scratchpad = []
    for step in range(max_steps):
        prompt = build_prompt(question, tools, scratchpad)
        decision = llm(prompt)
        # decision = {"thought": ..., "action": ..., "action_input": {...}}

        if decision["action"] == "final_answer":
            return decision["action_input"]

        tool = tools.get(decision["action"])
        if tool is None:
            scratchpad.append({"observation": f"未知工具 / unknown tool: {decision['action']}"})
            continue

        try:
            observation = tool(**decision["action_input"])
        except Exception as exc:               # 工具失败也要回填 / feed failures back
            observation = f"工具执行失败 / tool failed: {exc}"

        scratchpad.append({
            "thought": decision["thought"],
            "action": decision["action"],
            "observation": observation,
        })
    return "达到最大步数，停止 / max steps reached"`,
          caption: {
            zh: '生产版还需要：工具参数校验、超时、幂等、最大成本预算，以及把完整轨迹写入 trace。',
            en: 'Production needs argument validation, timeouts, idempotency, a cost budget, and full traces.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '变体', en: 'Variant' },
            { zh: '特点', en: 'Characteristic' },
            { zh: '适合', en: 'Best for' },
          ],
          rows: [
            [{ zh: 'Zero-shot ReAct', en: 'Zero-shot ReAct' }, { zh: '只靠工具描述做决策', en: 'Decides from tool descriptions alone' }, { zh: '工具少、任务开放', en: 'Few tools, open tasks' }],
            [{ zh: 'Structured ReAct', en: 'Structured ReAct' }, { zh: '要求按固定格式输出动作', en: 'Requires a fixed action format' }, { zh: '需要稳定解析、可评测', en: 'Stable parsing and evaluation' }],
            [{ zh: 'Docstore ReAct', en: 'Docstore ReAct' }, { zh: '在文档库中检索后行动', en: 'Retrieves from a document store before acting' }, { zh: '知识密集型问答', en: 'Knowledge-intensive QA' }],
            [{ zh: 'Constrained ReAct', en: 'Constrained ReAct' }, { zh: '工具集按角色收敛', en: 'Toolset narrowed by role' }, { zh: '高权限、高风险场景', en: 'High-privilege, high-risk settings' }],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: 'ReAct 的三种经典翻车', en: 'Three classic ReAct failures' },
          text: {
            zh: '① 工具太多，模型在相似名称间随机选；② 失败后无限重试同一个工具；③ 观察太长，把关键约束挤出上下文。分别用工具裁剪、失败预算、观察摘要解决。',
            en: '1) Too many similarly named tools; 2) infinite retries of the same failing tool; 3) observations so long they push key constraints out of context. Fix with tool pruning, failure budgets, and observation summaries.',
          },
        },
      ],
    },
    {
      id: 'mrkl',
      title: { zh: 'MRKL：模块化知识与推理', en: 'MRKL: modular knowledge and reasoning' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'MRKL（Modular Reasoning, Knowledge and Language）的思路很像微服务：不要让一个模型包打天下，而是准备一组「专家模块」——计算器、数据库、搜索、领域 API——再由一个路由器把问题分发给合适的专家。模型负责理解与编排，专家负责确定性执行。',
            en: 'MRKL (Modular Reasoning, Knowledge and Language) is like microservices: instead of one model doing everything, prepare expert modules — calculator, database, search, domain APIs — and route each question to the right expert. The model understands and orchestrates; experts execute deterministically.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'mrkl_router.py',
          code: `def calculator(expression: str) -> str:
    """安全的表达式求值器（示例占位）/ safe evaluator placeholder"""
    return str(safe_eval(expression))

EXPERTS = {
    "math": calculator,
    "weather": weather_api,
    "database": db_query,
}

def route(question: str) -> str:
    lowered = question.lower()
    if any(word in lowered for word in ("气温", "weather", "下雨")):
        return "weather"
    if any(word in lowered for word in ("订单", "gmv", "select", "退款")):
        return "database"
    return "math"

def mrkl(question: str) -> str:
    expert_name = route(question)
    expert = EXPERTS[expert_name]
    print(f"routing to {expert_name}")   # 便于观测 / observable routing
    return expert(question)

print(mrkl("帮我算一下 128 * 32"))
# routing to math
# 4096`,
          caption: {
            zh: '真实系统里，路由可以由小模型、分类器或规则完成；关键是路由器可评测、可回退。',
            en: 'In real systems, routing can be a small model, classifier, or rules. The key is that routing is evaluable and fallback-safe.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**优点**：每个专家可以独立测试、独立升级，失败影响面小。', en: '**Strength**: each expert can be tested and upgraded independently, limiting blast radius.' },
            { zh: '**优点**：确定性计算交给代码，减少数值幻觉。', en: '**Strength**: deterministic computation stays in code, reducing numeric hallucination.' },
            { zh: '**难点**：路由错了，后面全错。需要混淆矩阵和回退策略。', en: '**Challenge**: a routing error poisons everything. You need a confusion matrix and fallbacks.' },
            { zh: '**难点**：专家数量增长后，描述重叠会让路由变得不稳定。', en: '**Challenge**: as experts grow, overlapping descriptions destabilize routing.' },
          ],
        },
      ],
    },
    {
      id: 'self-ask',
      title: { zh: 'Self-Ask：把大问题拆成小问题', en: 'Self-Ask: split the big question' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'Self-Ask 让模型在回答前先问自己：「要回答这个问题，我需要先知道什么？」然后逐个解决子问题，再综合出答案。它特别适合多跳事实推理，例如「某公司 CEO 的母校所在城市的人口是多少」。',
            en: 'Self-Ask has the model ask itself: “What do I need to know first?” It solves sub-questions one by one, then synthesizes. It shines on multi-hop factual questions such as “What is the population of the city where the CEO of company X went to university?”',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'self_ask.py',
          code: `def self_ask(question, llm, search, max_subquestions=4):
    plan = llm(
        "把问题拆成最多 %d 个可独立检索的子问题。"
        "Split into at most %d independently searchable sub-questions."
        % (max_subquestions, max_subquestions)
        + f"\\nQuestion: {question}"
    )
    subquestions = plan.splitlines()[:max_subquestions]
    evidence = []
    for sub in subquestions:
        docs = search(sub)
        answer = llm(
            f"仅根据证据回答 / answer only from evidence:\\n{sub}\\n{docs}"
        )
        evidence.append({"question": sub, "answer": answer, "docs": docs})

    return llm(
        "基于子问题答案综合最终答案，并引用证据。"
        "Synthesize a final answer with citations."
        + f"\\nQuestion: {question}\\nEvidence: {evidence}"
    )`,
          caption: {
            zh: 'Self-Ask 的质量取决于子问题拆分与证据约束。务必把「仅根据证据回答」写进每一跳。',
            en: 'Self-Ask quality depends on decomposition and evidence grounding. Require “answer only from evidence” at every hop.',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: 'Self-Ask + 本体 = 更强的多跳', en: 'Self-Ask + ontology = stronger multi-hop' },
          text: {
            zh: '让子问题必须落在本体定义的实体与关系上，可以显著减少「问题跑偏」。例如禁止生成「行业平均值」这种本体里不存在的实体。',
            en: 'Require sub-questions to land on ontology-defined entities and relations. This reduces drift, e.g. forbidding entities like “industry average” that do not exist in the ontology.',
          },
        },
      ],
    },
    {
      id: 'conversational',
      title: { zh: 'Conversational Agent：多轮对话的工程问题', en: 'Conversational agents: multi-turn engineering' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '对话型 Agent 看起来最简单，实际上最难：它要维护状态、处理指代、管理槽位、记住用户偏好，还要在长对话中不被无关信息带偏。多轮对话的核心不是「聊得像人」，而是「状态管得清」。',
            en: 'Conversational agents look easiest but are hardest: state, references, slots, preferences, and staying on track in long dialogues. The core is not sounding human; it is managing state.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '能力', en: 'Capability' },
            { zh: '实现方式', en: 'Implementation' },
            { zh: '常见坑', en: 'Pitfall' },
          ],
          rows: [
            [{ zh: '短期记忆', en: 'Short-term memory' }, { zh: '滚动窗口 + 摘要', en: 'Rolling window + summary' }, { zh: '摘要丢掉关键约束', en: 'Summary drops constraints' }],
            [{ zh: '长期记忆', en: 'Long-term memory' }, { zh: '向量库 + 结构化用户画像', en: 'Vector store + structured profile' }, { zh: '把一次性偏好当永久事实', en: 'Treating one-off preferences as permanent' }],
            [{ zh: '槽位', en: 'Slots' }, { zh: '显式 schema + 校验', en: 'Explicit schema + validation' }, { zh: '模型自行填默认值', en: 'Model fills defaults on its own' }],
            [{ zh: '指代消解', en: 'Reference resolution' }, { zh: '实体链接到本体 ID', en: 'Link mentions to ontology IDs' }, { zh: '「那个订单」指错对象', en: '“That order” points to the wrong entity' }],
            [{ zh: '人工接管', en: 'Human takeover' }, { zh: '置信度 + 触发规则', en: 'Confidence + trigger rules' }, { zh: '该转人工时死撑', en: 'Refusing to hand off when it should' }],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '记忆不是越多越好', en: 'More memory is not better' },
          text: {
            zh: '把所有历史都塞进上下文，既贵又会稀释关键信息。记忆应该分层：当前任务、会话摘要、长期偏好、领域事实，各有各的检索与过期策略。',
            en: 'Dumping all history into context is expensive and dilutes key information. Layer memory: current task, conversation summary, long-term preference, domain facts — each with its own retrieval and expiry policy.',
          },
        },
      ],
    },
    {
      id: 'comparison',
      title: { zh: '横向对比：一张雷达图看清取舍', en: 'Side by side: trade-offs in one radar chart' },
      blocks: [
        {
          type: 'chart',
          kind: 'radar',
          title: { zh: 'Agent 类型能力雷达图', en: 'Agent type capability radar' },
          desc: {
            zh: '按工具使用、自主性、推理深度、记忆、协作、可预测性六个维度打分（1–5，示意）。',
            en: 'Scores from 1–5 across tool use, autonomy, reasoning depth, memory, collaboration, and predictability (illustrative).',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '类型', en: 'Type' },
            { zh: '适用场景', en: 'Best for' },
            { zh: '优点', en: 'Pros' },
            { zh: '缺点', en: 'Cons' },
            { zh: '模型要求', en: 'Model requirement' },
          ],
          rows: [
            [
              { zh: 'ReAct', en: 'ReAct' },
              { zh: '工具调用、开放检索', en: 'Tool use, open retrieval' },
              { zh: '灵活、实现简单', en: 'Flexible, simple' },
              { zh: '易循环、难预测', en: 'Loops, hard to predict' },
              { zh: '强函数调用能力', en: 'Strong function calling' },
            ],
            [
              { zh: 'MRKL', en: 'MRKL' },
              { zh: '多专家、多工具', en: 'Multiple experts and tools' },
              { zh: '模块化、可测试', en: 'Modular, testable' },
              { zh: '路由依赖强', en: 'Routing-dependent' },
              { zh: '中高，路由器可小模型', en: 'Medium-high; router can be small' },
            ],
            [
              { zh: 'Self-Ask', en: 'Self-Ask' },
              { zh: '多跳事实问答', en: 'Multi-hop factual QA' },
              { zh: '推理链条清晰', en: 'Clear reasoning chain' },
              { zh: '子问题易跑偏', en: 'Sub-questions drift' },
              { zh: '强推理 + 好检索', en: 'Strong reasoning + retrieval' },
            ],
            [
              { zh: '对话型', en: 'Conversational' },
              { zh: '客服、助手', en: 'Support, assistants' },
              { zh: '体验自然、可追问', en: 'Natural, follow-up friendly' },
              { zh: '状态管理复杂', en: 'Complex state management' },
              { zh: '中高，需长上下文', en: 'Medium-high, long context' },
            ],
            [
              { zh: '计划-执行', en: 'Plan-and-execute' },
              { zh: '研究、复杂流程', en: 'Research, complex workflows' },
              { zh: '全局视角、可并行', en: 'Global view, parallelizable' },
              { zh: '计划易过期', en: 'Plans go stale' },
              { zh: '强规划 + 强执行', en: 'Strong planning and execution' },
            ],
          ],
        },
      ],
    },
    {
      id: 'choosing',
      title: { zh: '怎么选？一张决策清单', en: 'How to choose: a decision checklist' },
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            { zh: '任务步骤能否提前确定？能 → 工作流 / 计划-执行；不能 → ReAct。', en: 'Can the steps be fixed in advance? Yes → workflow or plan-and-execute; no → ReAct.' },
            { zh: '是否需要多个确定性专家（计算、数据库、搜索）？是 → MRKL 路由。', en: 'Do you need deterministic experts (math, database, search)? Yes → MRKL routing.' },
            { zh: '是否需要多跳事实推理？是 → Self-Ask + 证据约束。', en: 'Do you need multi-hop factual reasoning? Yes → Self-Ask with evidence constraints.' },
            { zh: '是否需要多轮澄清与记忆？是 → 对话型 + 槽位 + 分层记忆。', en: 'Do you need multi-turn clarification and memory? Yes → conversational + slots + layered memory.' },
            { zh: '是否错误代价高、需要审批？是 → 收敛工具集 + 本体约束 + 人工确认。', en: 'Is the cost of error high and approval required? Yes → narrow tools + ontology constraints + human confirmation.' },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: { zh: '默认建议', en: 'Default recommendation' },
          text: {
            zh: '先用最小的工作流 + 工具调用跑通；只有当任务顺序确实无法预定义时，再引入 ReAct。分类学是用来选边的，不是用来炫技的。',
            en: 'Start with the smallest workflow plus tool calls. Introduce ReAct only when the order truly cannot be predefined. Taxonomy is for choosing, not for showing off.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: 'Agent 类型至少有两个维度：规划方式与交互方式。', en: 'Agent types vary along at least two dimensions: planning and interaction.' },
    { zh: 'ReAct 灵活但易循环，需要工具裁剪、失败预算和观察摘要。', en: 'ReAct is flexible but loop-prone; prune tools, budget failures, summarize observations.' },
    { zh: 'MRKL 用路由 + 专家模块把确定性计算留给代码。', en: 'MRKL routes to expert modules, keeping deterministic computation in code.' },
    { zh: 'Self-Ask 适合多跳推理，但子问题必须被证据与本体约束。', en: 'Self-Ask suits multi-hop reasoning, but sub-questions must be constrained by evidence and ontology.' },
    { zh: '对话型 Agent 的核心是状态管理，不是聊天语气。', en: 'Conversational agents are about state management, not tone.' },
  ],
  sources: [
    {
      label: { zh: 'Yao et al. · ReAct: Synergizing Reasoning and Acting in Language Models', en: 'Yao et al. · ReAct: Synergizing Reasoning and Acting in Language Models' },
      url: 'https://arxiv.org/abs/2210.03629',
    },
    {
      label: { zh: 'Karpas et al. · MRKL Systems: A modular, neuro-symbolic architecture', en: 'Karpas et al. · MRKL Systems: A modular, neuro-symbolic architecture' },
      url: 'https://arxiv.org/abs/2205.00445',
    },
    {
      label: { zh: 'Press et al. · Measuring and Narrowing the Compositionality Gap in Language Models (Self-Ask)', en: 'Press et al. · Measuring and Narrowing the Compositionality Gap in Language Models (Self-Ask)' },
      url: 'https://arxiv.org/abs/2210.03350',
    },
    {
      label: { zh: 'LangChain · Agents documentation', en: 'LangChain · Agents documentation' },
      url: 'https://docs.langchain.com/oss/python/langchain/agents',
    },
    {
      label: { zh: 'OpenAI · A practical guide to building agents', en: 'OpenAI · A practical guide to building agents' },
      url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    },
  ],
}

export default chapter
