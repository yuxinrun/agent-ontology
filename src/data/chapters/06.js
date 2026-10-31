const chapter = {
  id: '06',
  number: 6,
  slug: 'multi-agent',
  kind: 'chapter',
  title: { zh: '多智能体编排模式', en: 'Multi-agent orchestration patterns' },
  subtitle: { zh: 'Manager、Handoff、Peer 与 Coordinator 的工程边界', en: 'Manager, handoff, peer, and coordinator patterns' },
  summary: {
    zh: '四种主流多智能体编排模式、OpenAI Agents SDK 代码示例，以及 Anthropic coordinator + worker 的实战经验。',
    en: 'Four mainstream orchestration patterns, OpenAI Agents SDK examples, and lessons from Anthropic’s coordinator-worker research system.',
  },
  level: 'builder',
  minutes: 20,
  icon: 'Workflow',
  accent: 'cyan',
  tags: [
    { zh: '多智能体', en: 'Multi-agent' },
    { zh: 'Handoff', en: 'Handoff' },
    { zh: '编排', en: 'Orchestration' },
  ],
  sections: [
    {
      id: 'do-you-need',
      title: { zh: '先问：真的需要多 Agent 吗？', en: 'First: do you really need multiple agents?' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '多智能体不是免费的能力放大器。每增加一个 Agent，就多一份上下文同步、路由、重试、权限与可观测成本。Anthropic 在多智能体研究系统的复盘中提到，多 Agent 消耗的 token 大约是普通对话的 15 倍——这不是说不能做，而是说必须有明确的理由。',
            en: 'Multi-agent is not a free capability multiplier. Every extra agent adds context synchronization, routing, retries, permissions, and observability. Anthropic’s multi-agent research system reports roughly 15× the token usage of chat. That does not forbid multi-agent; it demands a reason.',
          },
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              icon: 'Split',
              title: { zh: '隔离', en: 'Isolation' },
              text: { zh: '不同任务需要不同工具、上下文和权限。把它们隔离开，能显著降低污染与误操作。', en: 'Different tasks need different tools, context, and permissions. Isolation reduces contamination and misoperation.' },
            },
            {
              icon: 'Gauge',
              title: { zh: '并行', en: 'Parallelism' },
              text: { zh: '研究、检索、校验可以并行完成，墙钟时间大幅下降；代价是 token 与协调复杂度。', en: 'Research, retrieval, and verification can run in parallel, cutting wall-clock time at the cost of tokens and coordination.' },
            },
            {
              icon: 'ShieldCheck',
              title: { zh: '权限', en: 'Permissions' },
              text: { zh: '写操作只交给一个受控 Agent，其余 Agent 只读。用架构隔离风险，比用 Prompt 约束可靠。', en: 'Only one governed agent may write; others stay read-only. Architectural isolation beats prompt-level constraints.' },
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '不要为了「看起来智能」而上多 Agent', en: 'Do not add agents to look smart' },
          text: {
            zh: '如果单个 Agent + 工作流能稳定完成，多 Agent 只会让你在 3 a.m. 面对三份日志、两个循环和一个说不清是谁做的写操作。',
            en: 'If one agent plus a workflow works reliably, multiple agents just give you three logs, two loops, and an unexplained write at 3 a.m.',
          },
        },
      ],
    },
    {
      id: 'patterns',
      title: { zh: '四种编排模式', en: 'Four orchestration patterns' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '编排模式回答的是「谁来决定下一步」。下面的交互图可以切换四种模式，观察控制流、责任边界与瓶颈位置。',
            en: 'Orchestration patterns answer “who decides the next step”. Switch between the four modes below and watch control flow, ownership, and bottlenecks.',
          },
        },
        {
          type: 'chart',
          kind: 'multiagent',
          title: { zh: '多智能体协作流程图', en: 'Multi-agent collaboration flows' },
          desc: {
            zh: '点击上方标签切换 Manager / Handoff / Peer / Coordinator。节点可拖拽。',
            en: 'Use the tabs to switch Manager / Handoff / Peer / Coordinator. Nodes are draggable.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '模式', en: 'Pattern' },
            { zh: '控制流', en: 'Control flow' },
            { zh: '适合', en: 'Best for' },
            { zh: '主要风险', en: 'Main risk' },
          ],
          rows: [
            [{ zh: '中央管理器', en: 'Manager / agents as tools' }, { zh: '中心 Agent 调用专家并汇总', en: 'Central agent calls specialists and aggregates' }, { zh: '任务可分解、需要统一出口', en: 'Decomposable tasks with one interface' }, { zh: '中心上下文膨胀', en: 'Manager context bloat' }],
            [{ zh: '任务移交', en: 'Handoff' }, { zh: '控制权转交，原 Agent 退出', en: 'Control transfers and the original agent exits' }, { zh: '专业分工、客服分流', en: 'Specialists, support triage' }, { zh: '上下文与责任丢失', en: 'Lost context and ownership' }],
            [{ zh: '对等协作', en: 'Peer-to-peer' }, { zh: 'Agent 之间直接协商', en: 'Agents negotiate directly' }, { zh: '开放环境、跨组织', en: 'Open environments, cross-org' }, { zh: '死循环、信任与结算', en: 'Loops, trust, settlement' }],
            [{ zh: '协调者 + 工作者', en: 'Coordinator + workers' }, { zh: '协调者规划，工作者并行执行', en: 'Coordinator plans; workers execute in parallel' }, { zh: '研究、深度检索', en: 'Research, deep retrieval' }, { zh: '成本高、汇总失真', en: 'High cost, lossy synthesis' }],
          ],
        },
      ],
    },
    {
      id: 'manager',
      title: { zh: '中央管理器：Agents as Tools', en: 'Manager: agents as tools' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '管理器模式把所有专家包装成工具，只暴露一个统一入口。用户只和管理器对话，管理器负责规划、调用专家、汇总结果。它的好处是**责任边界清晰、对外接口稳定**；坏处是管理器容易变成瓶颈，且上下文会随着专家返回内容不断膨胀。',
            en: 'In manager mode, specialists are wrapped as tools behind one interface. Users talk only to the manager, which plans, calls specialists, and aggregates results. The benefit is **clear ownership and a stable external interface**; the downside is that the manager becomes a bottleneck and its context grows with every specialist result.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'manager_agents.py',
          code: `# pip install openai-agents
import asyncio
from agents import Agent, Runner

researcher = Agent(
    name="Researcher",
    instructions="Search sources and return a concise, cited summary.",
)

writer = Agent(
    name="Writer",
    instructions="Turn research notes into a 200-word brief. Keep citations.",
)

manager = Agent(
    name="Manager",
    instructions="Plan the work, call the right tools, then synthesize one answer.",
    tools=[
        researcher.as_tool(
            tool_name="research",
            tool_description="Research a topic and return notes with citations.",
        ),
        writer.as_tool(
            tool_name="write_brief",
            tool_description="Write a short brief from research notes.",
        ),
    ],
)

async def main():
    result = await Runner.run(
        manager,
        "Compare ontology-first and RAG-first agent architectures.",
    )
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())`,
          caption: {
            zh: '`as_tool()` 把专家 Agent 变成可调用工具，管理器保留控制权。注意限制返回长度，避免上下文爆炸。',
            en: '`as_tool()` exposes a specialist as a callable tool while the manager keeps control. Cap return length to avoid context blow-up.',
          },
        },
        {
          type: 'callout',
          variant: 'tip',
          title: { zh: '给专家输出加「预算」', en: 'Budget specialist output' },
          text: {
            zh: '要求专家返回结构化摘要（结论、证据、置信度、未解决问题），而不是原始长文。管理器只读摘要，必要时再回查。',
            en: 'Have specialists return a structured summary (conclusion, evidence, confidence, open questions), not raw text. The manager reads summaries and fetches details only when needed.',
          },
        },
      ],
    },
    {
      id: 'handoff',
      title: { zh: '任务移交：把接力棒交出去', en: 'Handoff: pass the baton' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'Handoff 与 Manager 的关键区别：控制权真的转移了。分诊 Agent 判断问题属于账务，就把会话交给账务 Agent，自己退出。它适合专业分工和客服分流，但必须显式传递上下文、用户意图与责任归属，否则接手方会从零开始猜。',
            en: 'The key difference from Manager: control actually transfers. A triage agent decides the issue is billing and hands the conversation to the billing agent, then exits. It suits specialization and support triage, but must explicitly pass context, intent, and ownership, or the receiver starts guessing.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'handoff_agents.py',
          code: `# pip install openai-agents
from agents import Agent, Runner

billing = Agent(
    name="Billing",
    instructions="Handle refunds, invoices, and duplicate charges.",
)

technical = Agent(
    name="Technical",
    instructions="Handle bugs, integrations, and API errors.",
)

triage = Agent(
    name="Triage",
    instructions=(
        "Route the user to the right specialist. "
        "Do not answer billing or technical questions yourself."
    ),
    handoffs=[billing, technical],
)

result = Runner.run_sync(
    triage,
    "I was charged twice for the same order, please refund the duplicate.",
)
print(result.last_agent.name)   # Billing
print(result.final_output)`,
          caption: {
            zh: 'Handoff 的 trace 要记录「谁在什么时候把控制权交给了谁」，否则出问题无法追责。',
            en: 'The trace must record who handed control to whom and when; otherwise accountability disappears.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**显式交接包**：用户目标、已确认事实、未解决问题、权限与租户信息。', en: '**Explicit handoff packet**: goal, confirmed facts, open questions, permissions, tenant.' },
            { zh: '**避免乒乓**：设置最大移交次数与回退到人工的规则。', en: '**Avoid ping-pong**: cap handoffs and define a fallback to a human.' },
            { zh: '**保留责任链**：交接不是甩锅，原 Agent 仍对上下文完整性负责。', en: '**Keep the chain of responsibility**: handoff is not blame-shifting; the sender owns context completeness.' },
          ],
        },
      ],
    },
    {
      id: 'peer',
      title: { zh: '对等协作：开放但有代价', en: 'Peer-to-peer: open, with a price' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '对等协作里没有固定中心，Agent 之间直接请求、协商、回复。它适合跨组织、开放市场或动态组队，但也最容易失控：没有中心就没有天然的超时、预算与终止条件。工程上必须补上相关性 ID、跳数上限、信任等级与结算机制。',
            en: 'In peer-to-peer mode there is no fixed center; agents request, negotiate, and reply directly. It suits cross-organization, open markets, or dynamic teams, but is the easiest to lose control of: no center means no natural timeout, budget, or termination. Add correlation IDs, hop limits, trust levels, and settlement.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'peer_message.py',
          code: `from dataclasses import dataclass, replace
from uuid import uuid4

MAX_HOPS = 3

@dataclass(frozen=True)
class PeerMessage:
    sender: str
    receiver: str
    intent: str
    payload: dict
    correlation_id: str
    hops: int = 0

def forward(msg: PeerMessage, receiver: str) -> PeerMessage | None:
    if msg.hops >= MAX_HOPS:
        return None  # 防止无限接力 / stop infinite relay
    return replace(
        msg,
        receiver=receiver,
        hops=msg.hops + 1,
        correlation_id=msg.correlation_id or str(uuid4()),
    )

msg = PeerMessage(
    sender="agent_a", receiver="agent_b",
    intent="quote.request", payload={"sku": "X1", "qty": 10},
    correlation_id=str(uuid4()),
)
relayed = forward(msg, "agent_c")
print(relayed.hops if relayed else "dropped")  # 1`,
          caption: {
            zh: '对等协议至少要解决：身份、意图、关联、去重、超时、跳数、信任与结算。',
            en: 'A peer protocol must solve identity, intent, correlation, deduplication, timeouts, hops, trust, and settlement.',
          },
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: 'P2P 不是默认选项', en: 'P2P is not the default' },
          text: {
            zh: '除非你确实在做跨组织协作或开放 Agent 市场，否则中心化编排更容易观测、计费与止损。',
            en: 'Unless you are doing cross-organization collaboration or an open agent market, centralized orchestration is easier to observe, bill, and stop.',
          },
        },
      ],
    },
    {
      id: 'coordinator',
      title: { zh: 'Coordinator + Worker：Anthropic 的实践', en: 'Coordinator + worker: Anthropic’s approach' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'Anthropic 的多智能体研究系统采用「主 Agent + 子 Agent」结构：主 Agent 负责规划与拆解，子 Agent 并行搜索与阅读，最后主 Agent 汇总并保留引用。关键经验不是「用了多 Agent」，而是**给子 Agent 明确的任务、输出格式与预算**，并在主 Agent 处做质量把关。',
            en: 'Anthropic’s multi-agent research system uses a lead agent plus subagents: the lead plans and decomposes, subagents search and read in parallel, and the lead synthesizes with citations. The lesson is not “use multi-agent”, but **give subagents explicit tasks, output formats, and budgets**, then enforce quality at the lead.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'coordinator.py',
          code: `import asyncio

async def coordinator(task: str):
    # 1. 规划：拆成可并行的子任务 / plan: split into parallel subtasks
    plan = await lead.plan(task, max_subtasks=4)

    # 2. 并行执行：每个子 Agent 有独立上下文与预算
    # parallel execution: isolated context and budget per subagent
    results = await asyncio.gather(
        *(run_subagent(sub, budget_tokens=20_000) for sub in plan.subtasks),
        return_exceptions=True,
    )

    # 3. 校验：丢弃失败或没有引用的结果
    # validate: drop failures and uncited results
    valid = [r for r in results if not isinstance(r, Exception) and r.citations]

    # 4. 汇总：主 Agent 保留最终责任
    # synthesize: the lead keeps final responsibility
    return await lead.synthesize(task, valid)

# 关键：子 Agent 输出结构化结果，而不是自由长文
# Subagents return structured results, not free-form essays:
# {"subtask": ..., "findings": [...], "citations": [...], "confidence": 0.8}`,
          caption: {
            zh: '并行不是免费的：它用 token 换墙钟时间。先确认任务价值，再决定是否开并行。',
            en: 'Parallelism is not free: it trades tokens for wall-clock time. Confirm task value before turning it on.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '决策', en: 'Decision' },
            { zh: '建议', en: 'Recommendation' },
          ],
          rows: [
            [{ zh: '子 Agent 数量', en: 'Number of subagents' }, { zh: '2–4 个起步，按明确子问题拆分', en: 'Start with 2–4, split by explicit sub-questions' }],
            [{ zh: '上下文', en: 'Context' }, { zh: '子 Agent 不共享完整历史，只拿任务与必要背景', en: 'Subagents get the task and necessary context, not full history' }],
            [{ zh: '输出', en: 'Output' }, { zh: '结构化 + 引用 + 置信度', en: 'Structured + citations + confidence' }],
            [{ zh: '预算', en: 'Budget' }, { zh: '每个子 Agent 有 token 与时间上限', en: 'Token and time caps per subagent' }],
            [{ zh: '汇总', en: 'Synthesis' }, { zh: '主 Agent 校验引用与冲突，缺证据就重跑', en: 'Lead validates citations and conflicts; rerun when evidence is missing' }],
          ],
        },
      ],
    },
    {
      id: 'production',
      title: { zh: '多智能体工程化要点', en: 'Engineering a multi-agent system' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '问题', en: 'Problem' },
            { zh: '工程实践', en: 'Practice' },
          ],
          rows: [
            [{ zh: '上下文污染', en: 'Context contamination' }, { zh: '每个 Agent 独立 session，只传结构化摘要', en: 'Isolated sessions per agent; pass structured summaries only' }],
            [{ zh: '无限循环', en: 'Infinite loops' }, { zh: '最大轮次、最大移交、预算与超时', en: 'Max turns, max handoffs, budget, timeout' }],
            [{ zh: '责任不清', en: 'Unclear ownership' }, { zh: 'trace 记录 Agent、输入、决策、工具与最终责任人', en: 'Trace agent, inputs, decisions, tools, and final owner' }],
            [{ zh: '重复写操作', en: 'Duplicate writes' }, { zh: '幂等键 + 去重 + 单一写 Agent', en: 'Idempotency keys + deduplication + one writer' }],
            [{ zh: '成本失控', en: 'Cost blow-up' }, { zh: '每个 Agent 的 token 预算与降级模型', en: 'Per-agent token budgets and fallback models' }],
            [{ zh: '评测困难', en: 'Evaluation' }, { zh: '端到端指标 + 单 Agent 指标 + 交接质量', en: 'End-to-end metrics + per-agent metrics + handoff quality' }],
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: { zh: '一句话原则', en: 'One-line principle' },
          text: {
            zh: '能用工作流解决就别上多 Agent；必须上多 Agent 时，先设计交接契约，再写 Agent。',
            en: 'If a workflow can solve it, skip multi-agent. If you must, design the handoff contract before writing agents.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: '多 Agent 只在隔离、并行、权限三种理由下值得使用。', en: 'Use multi-agent only for isolation, parallelism, or permissions.' },
    { zh: 'Manager 保留控制权，Handoff 转移控制权，二者责任模型不同。', en: 'Manager keeps control; handoff transfers it. Their ownership models differ.' },
    { zh: 'P2P 适合开放环境，但必须补上跳数、超时、信任与结算。', en: 'P2P suits open environments, with hop limits, timeouts, trust, and settlement.' },
    { zh: 'Coordinator + Worker 的关键是子任务契约、结构化输出与预算。', en: 'Coordinator-worker hinges on subtask contracts, structured output, and budgets.' },
    { zh: '多 Agent 的成本、循环与责任问题，必须用工程手段而非 Prompt 解决。', en: 'Multi-agent cost, loops, and ownership need engineering, not prompts.' },
  ],
  sources: [
    {
      label: { zh: 'Anthropic · How we built our multi-agent research system', en: 'Anthropic · How we built our multi-agent research system' },
      url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
    },
    {
      label: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' },
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      label: { zh: 'OpenAI Agents SDK · Handoffs and agents as tools', en: 'OpenAI Agents SDK · Handoffs and agents as tools' },
      url: 'https://openai.github.io/openai-agents-python/',
    },
    {
      label: { zh: 'Microsoft · AutoGen: Enabling Next-Gen LLM Applications', en: 'Microsoft · AutoGen: Enabling Next-Gen LLM Applications' },
      url: 'https://arxiv.org/abs/2308.08155',
    },
    {
      label: { zh: 'Google · Agent2Agent protocol', en: 'Google · Agent2Agent protocol' },
      url: 'https://a2a-protocol.org/',
    },
    {
      label: { zh: 'LangGraph · Multi-agent orchestration', en: 'LangGraph · Multi-agent orchestration' },
      url: 'https://langchain-ai.github.io/langgraph/concepts/multi_agent/',
    },
  ],
}

export default chapter
