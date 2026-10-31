const chapter = {
  id: '02',
  number: 2,
  slug: 'evolution',
  kind: 'chapter',
  title: { zh: '前世今生：Agent 技术演进史', en: 'How we got here: a short history of agents' },
  subtitle: { zh: '从 Prompt 到 Ontology 的四级火箭', en: 'From prompts to ontology, in four stages' },
  summary: {
    zh: '复盘 Prompt、RAG、Agent、Ontology 四个阶段，理解为什么大厂同时押注「本体 + 协议 + 运行时」。',
    en: 'A tour through prompting, RAG, agents, and ontology, and why major vendors now bet on ontology, protocols, and runtime together.',
  },
  level: 'starter',
  minutes: 14,
  icon: 'History',
  accent: 'violet',
  tags: [
    { zh: '技术史', en: 'History' },
    { zh: 'RAG', en: 'RAG' },
    { zh: '协议', en: 'Protocols' },
  ],
  sections: [
    {
      id: 'four-stages',
      title: { zh: '四个阶段：不是替代，而是叠加', en: 'Four stages: stacked, not replaced' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'Agent 技术史很容易被讲成「新范式淘汰旧范式」：Prompt 过时了、RAG 过时了、Agent 才是未来。真实情况更像搭积木：每一层都还在，只是被放到了更合适的位置。Prompt 仍是控制模型的基础，RAG 仍是获取长尾知识的主力，Agent 把「调用」变成「行动」，本体则给这一切加上结构。',
            en: 'Agent history is often told as a sequence of replacements: prompting is dead, RAG is dead, agents are the future. Reality is more like stacking blocks: every layer remains, just in a better place. Prompting still controls the model, RAG still supplies long-tail knowledge, agents turn calls into action, and ontology adds structure to all of it.',
          },
        },
        {
          type: 'chart',
          kind: 'evolution',
          title: { zh: 'Agent 技术演进时间轴（2017–2026）', en: 'Agent technology timeline (2017–2026)' },
          desc: {
            zh: '按「提示词 / 检索 / 智能体 / 本体与标准」四条泳道排列关键节点。滚轮缩放，拖动平移。',
            en: 'Key milestones arranged across prompting, retrieval, agents, and ontology/standards. Scroll to zoom, drag to pan.',
          },
        },
        {
          type: 'cards',
          columns: 4,
          items: [
            {
              icon: 'MessageSquareText',
              tag: { zh: '2017–2021', en: '2017–2021' },
              title: { zh: 'Prompt 时代', en: 'Prompting' },
              text: { zh: '从「调 API」到「写 Prompt」。Few-shot、CoT 让模型看起来会推理，但知识仍封闭。', en: 'From calling APIs to writing prompts. Few-shot and CoT made models look like reasoners, but knowledge stayed closed.' },
            },
            {
              icon: 'Database',
              tag: { zh: '2020–2023', en: '2020–2023' },
              title: { zh: 'RAG 时代', en: 'Retrieval' },
              text: { zh: '向量数据库 + 检索增强，把外部文档接进上下文。回答有据可依，但结构仍是散的。', en: 'Vector databases and retrieval put external documents into context. Answers gained evidence, but structure stayed flat.' },
            },
            {
              icon: 'Bot',
              tag: { zh: '2022–2024', en: '2022–2024' },
              title: { zh: 'Agent 时代', en: 'Agents' },
              text: { zh: 'ReAct、工具调用、多智能体框架。模型开始「做事」，但权限、边界与协作语义缺位。', en: 'ReAct, tool calling, and multi-agent frameworks. Models began to act, but permissions, boundaries, and shared semantics lagged.' },
            },
            {
              icon: 'Network',
              tag: { zh: '2024–2026', en: '2024–2026' },
              title: { zh: '本体与标准', en: 'Ontology & standards' },
              text: { zh: 'MCP、A2A、AGENTS.md、企业 Ontology。竞争从「模型多强」转向「系统多可控」。', en: 'MCP, A2A, AGENTS.md, enterprise ontology. Competition shifted from model strength to system controllability.' },
            },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: '读史的正确姿势', en: 'How to read this history' },
          text: {
            zh: '每一代技术都在解决上一代暴露的问题，同时制造新的复杂度。判断一项新技术值不值得用，不看它多热，而看它把你的复杂度放在了哪一层。',
            en: 'Each generation solves problems exposed by the previous one while creating new complexity. Judge a new technology not by hype, but by where it puts your complexity.',
          },
        },
      ],
    },
    {
      id: 'prompt-to-tools',
      title: { zh: '从提示词到工具调用：语言第一次「长出四肢」', en: 'From prompts to tools: language grows limbs' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'Chain-of-Thought 让模型把推理写出来，ReAct 则把「推理」和「行动」交替起来：想一步、做一步、看结果、再想。真正让 Agent 工程化的，是模型厂商把工具调用做成了原生能力——模型不再输出一段「请帮我查天气」的文本，而是输出结构化的 `tool_calls`，由程序执行。',
            en: 'Chain-of-Thought made reasoning visible. ReAct interleaved reasoning and acting: think, act, observe, repeat. What made agents engineering-grade was native tool calling: the model no longer emits “please check the weather”, but structured `tool_calls` that code executes.',
          },
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'tool_call.json',
          code: `{
  "role": "assistant",
  "content": null,
  "tool_calls": [
    {
      "id": "call_9f2c",
      "type": "function",
      "function": {
        "name": "get_order_status",
        "arguments": "{\\"order_id\\": \\"ORD-2026-1042\\"}"
      }
    }
  ]
}
// 程序执行工具后，把结果作为 tool 消息回填
// the program runs the tool and appends the result as a tool message`,
          caption: {
            zh: '工具调用把「自然语言」变成了「可执行契约」。但契约的另一半——参数含义、权限、失败语义——还需要本体验证。',
            en: 'Tool calling turns natural language into an executable contract. The other half — parameter meaning, permissions, failure semantics — still needs ontology.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**工具让模型接触真实世界**：查库、发邮件、改配置、下单。能力边界瞬间扩大。', en: '**Tools connect models to reality**: query databases, send email, edit config, place orders. Capability expands instantly.' },
            { zh: '**工具也放大了错误**：参数幻觉、越权调用、重复执行、不可逆副作用。', en: '**Tools amplify errors**: hallucinated arguments, privilege escalation, duplicate execution, irreversible side effects.' },
            { zh: '**所以 2023 年之后的关键词是「约束」而不是「更强」**：JSON Schema、权限、审批、可观测性。', en: '**Hence the post-2023 keyword is constraint, not just capability**: JSON Schema, permissions, approvals, observability.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '工具不是 API 的薄包装', en: 'A tool is not a thin API wrapper' },
          text: {
            zh: '一个合格的工具有明确的「何时不该用」、参数语义、副作用说明和失败形状。否则模型只会在相似工具之间随机抽奖。第 8 章会把工具本体化讲透。',
            en: 'A good tool states when not to use it, what parameters mean, what side effects occur, and how it fails. Otherwise the model picks randomly among similar tools. Chapter 8 covers tool ontology in depth.',
          },
        },
      ],
    },
    {
      id: 'rag-ceiling',
      title: { zh: 'RAG 的繁荣与天花板', en: 'The rise and ceiling of RAG' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '2020 年的 RAG 论文给出了一个优雅的思路：把检索到的文档塞进生成上下文，让模型「开卷考试」。随后向量数据库、Embedding、混合检索一路繁荣。但工程团队很快发现，RAG 的天花板不在检索质量，而在**知识没有被结构化**。',
            en: 'The 2020 RAG paper offered an elegant idea: put retrieved documents into the generation context and let the model take an open-book exam. Vector databases, embeddings, and hybrid retrieval flourished. But teams soon found the ceiling was not retrieval quality; it was that knowledge remained unstructured.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: 'RAG 擅长', en: 'RAG is good at' },
            { zh: 'RAG 吃力', en: 'RAG struggles with' },
          ],
          rows: [
            [
              { zh: '在大量文档中找到相关段落', en: 'Finding relevant passages across many documents' },
              { zh: '跨表 Join、聚合与数值计算', en: 'Cross-table joins, aggregation, and arithmetic' },
            ],
            [
              { zh: '回答「制度怎么规定」这类问题', en: 'Answering “what does the policy say”' },
              { zh: '判断「这个客户现在能不能退款」', en: 'Deciding “can this customer be refunded now”' },
            ],
            [
              { zh: '快速接入最新文档', en: 'Adding fresh documents quickly' },
              { zh: '多跳推理：A 的订单属于 B，B 受 C 政策约束', en: 'Multi-hop reasoning: A’s order belongs to B, B falls under policy C' },
            ],
            [
              { zh: '低门槛、易迭代', en: 'Low barrier, easy iteration' },
              { zh: '权限、口径、冲突处理', en: 'Permissions, metric definitions, conflict resolution' },
            ],
          ],
        },
        {
          type: 'p',
          text: {
            zh: 'GraphRAG 是一个重要的中间态：先抽取实体与关系，构建图，再基于社区摘要做检索。它证明了「结构化 + 检索」的威力，但没有解决所有问题——图怎么定义、和业务词表怎么对齐、动作怎么受约束，仍然要回到本体。',
            en: 'GraphRAG is an important middle ground: extract entities and relations, build a graph, then retrieve over community summaries. It proves the power of structure plus retrieval, but does not solve everything. How to define the graph, align it with business vocabulary, and constrain actions still leads back to ontology.',
          },
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: 'GraphRAG 的定位', en: 'Where GraphRAG fits' },
          text: {
            zh: 'GraphRAG 更接近「自动构建的领域图」，而本体是「被治理的语义契约」。前者适合探索与摘要，后者适合执行与权限控制。二者可以共用同一套实体 ID。',
            en: 'GraphRAG is closer to an automatically built domain graph; ontology is a governed semantic contract. The former suits exploration and summarization; the latter suits execution and access control. They can share entity IDs.',
          },
        },
      ],
    },
    {
      id: 'big-bets',
      title: { zh: '为什么大厂都在押注 Ontology？', en: 'Why the big vendors are betting on ontology' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '表面看，Anthropic 讲上下文，OpenAI 讲 Agents SDK，Palantir 讲 Ontology，Databricks 讲语义层，LangChain 讲图编排。路线不同，但都在回答同一个问题：**如何让 Agent 的行为可预测、可治理、可复用**。',
            en: 'On the surface, Anthropic talks about context, OpenAI about the Agents SDK, Palantir about ontology, Databricks about semantic layers, and LangChain about graph orchestration. Different routes, same question: **how do we make agent behavior predictable, governable, and reusable?**',
          },
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              icon: 'Blocks',
              tag: 'PALANTIR',
              title: { zh: '把本体当运营层', en: 'Ontology as an operating layer' },
              text: {
                zh: 'Palantir 的 Ontology 包含 Objects、Properties、Links，以及 Actions、Functions 等动力元素。它不是数据目录，而是企业运行层：对象可被操作，动作可被编排。',
                en: 'Palantir’s Ontology includes objects, properties, and links, plus kinetic elements such as actions and functions. It is not a data catalog but an operating layer where objects are actionable.',
              },
            },
            {
              icon: 'Sparkles',
              tag: 'ANTHROPIC',
              title: { zh: '上下文 + 工具 + 编排', en: 'Context, tools, orchestration' },
              text: {
                zh: 'Anthropic 强调 Agent = 模型 + 工具 + 循环，并通过 MCP 标准化工具接入；多智能体研究系统展示了 coordinator + worker 的工程边界。',
                en: 'Anthropic frames an agent as model plus tools plus loop, standardizes tool access with MCP, and demonstrates coordinator-worker boundaries in its multi-agent research system.',
              },
            },
            {
              icon: 'Workflow',
              tag: 'OPENAI',
              title: { zh: 'SDK + 规范 + 可观测', en: 'SDK, conventions, observability' },
              text: {
                zh: 'OpenAI Agents SDK 提供 agents、handoffs、guardrails、tracing 四个原语；AGENTS.md 则把项目级 Agent 指令变成开放约定。',
                en: 'The OpenAI Agents SDK offers four primitives — agents, handoffs, guardrails, tracing — while AGENTS.md turns project-level agent instructions into an open convention.',
              },
            },
            {
              icon: 'Database',
              tag: 'DATABRICKS',
              title: { zh: '语义层 + 治理', en: 'Semantic layer + governance' },
              text: {
                zh: 'Databricks 把指标、维度、血缘与 Unity Catalog 治理结合起来，让 Agent 查数时有统一口径，而不是让模型猜表名。',
                en: 'Databricks combines metrics, dimensions, lineage, and Unity Catalog governance so agents query with consistent definitions instead of guessing table names.',
              },
            },
            {
              icon: 'GitBranch',
              tag: 'LANGCHAIN',
              title: { zh: '状态图 + 契约', en: 'State graphs + contracts' },
              text: {
                zh: 'LangGraph 用有状态图描述流程，工具调用、检查点、人工介入都有明确位置。图结构本质上就是一种轻量本体。',
                en: 'LangGraph models workflows as stateful graphs with explicit positions for tool calls, checkpoints, and human intervention. A graph is a lightweight ontology.',
              },
            },
            {
              icon: 'PlugZap',
              tag: 'ECOSYSTEM',
              title: { zh: '协议收敛', en: 'Protocol convergence' },
              text: {
                zh: 'MCP 管 Agent 与工具，A2A 管 Agent 与 Agent，AGENTS.md 管 Agent 与代码库。协议越统一，本体越值得投资。',
                en: 'MCP connects agents to tools, A2A connects agents to agents, and AGENTS.md connects agents to repositories. The more protocols converge, the more ontology pays off.',
              },
            },
          ],
        },
        {
          type: 'p',
          text: {
            zh: '共性很清楚：**大家都从「模型能力」转向「系统契约」**。模型会继续变强，但企业真正能沉淀的，是业务对象、规则、权限和协作方式。这些恰好就是本体的内容。',
            en: 'The pattern is clear: **the industry is moving from model capability to system contracts**. Models will keep improving, but what enterprises can actually accumulate are business objects, rules, permissions, and collaboration patterns. That is exactly ontology.',
          },
        },
      ],
    },
    {
      id: 'timeline-deep',
      title: { zh: '关键节点精读', en: 'Milestones that mattered' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '时间', en: 'When' },
            { zh: '节点', en: 'Milestone' },
            { zh: '为什么重要', en: 'Why it matters' },
          ],
          rows: [
            [
              { zh: '2017', en: '2017' },
              { zh: 'Transformer 论文《Attention Is All You Need》', en: '“Attention Is All You Need”' },
              { zh: '为后续大模型与长上下文能力奠基。', en: 'Laid the foundation for LLMs and long-context capabilities.' },
            ],
            [
              { zh: '2020', en: '2020' },
              { zh: 'RAG 论文提出检索增强生成', en: 'RAG introduces retrieval-augmented generation' },
              { zh: '让模型可以「开卷考试」，外部知识进入上下文。', en: 'Let models take open-book exams with external knowledge.' },
            ],
            [
              { zh: '2022', en: '2022' },
              { zh: 'CoT、ReAct、MRKL、Self-Ask 集中出现', en: 'CoT, ReAct, MRKL, and Self-Ask appear' },
              { zh: '把推理、行动、模块化知识组合成 Agent 的基本范式。', en: 'Combined reasoning, action, and modular knowledge into agent patterns.' },
            ],
            [
              { zh: '2023', en: '2023' },
              { zh: '函数调用、AutoGen、工具生态爆发', en: 'Function calling, AutoGen, and the tool ecosystem' },
              { zh: '模型开始可靠地调用外部工具，多智能体进入工程视野。', en: 'Models could reliably call tools; multi-agent systems entered engineering practice.' },
            ],
            [
              { zh: '2024', en: '2024' },
              { zh: 'GraphRAG、OpenAI Swarm、Anthropic MCP', en: 'GraphRAG, OpenAI Swarm, and Anthropic MCP' },
              { zh: '结构化检索、轻量多智能体、标准化工具接入同时推进。', en: 'Structured retrieval, lightweight multi-agent patterns, and standardized tools advanced together.' },
            ],
            [
              { zh: '2025', en: '2025' },
              { zh: 'OpenAI Agents SDK、A2A、AGENTS.md、多智能体研究系统', en: 'Agents SDK, A2A, AGENTS.md, multi-agent research system' },
              { zh: '编排、互操作、项目级指令规范逐渐成型。', en: 'Orchestration, interoperability, and repository-level instructions took shape.' },
            ],
            [
              { zh: '2026', en: '2026' },
              { zh: '企业本体与语义层成为 Agent 基础设施', en: 'Enterprise ontology and semantic layers become agent infrastructure' },
              { zh: '竞争焦点从「模型多强」转向「系统多可控、多可复用」。', en: 'The focus shifts from model strength to system controllability and reuse.' },
            ],
          ],
        },
        {
          type: 'p',
          text: {
            zh: '如果你只记一件事：**2025 年之后，Agent 的竞争不再是单点模型能力，而是协议、运行时与领域语义的组合**。这也解释了为什么「会调 API」不够，为什么「懂业务建模」的工程师越来越值钱。',
            en: 'If you remember one thing: **after 2025, agents compete on protocols, runtime, and domain semantics, not just model capability**. That is why calling APIs is not enough, and why engineers who can model a business are increasingly valuable.',
          },
        },
      ],
    },
    {
      id: 'lessons',
      title: { zh: '给程序员的四条启示', en: 'Four lessons for engineers' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { zh: '别追框架，先看契约', en: 'Look at contracts, not frameworks' },
              text: {
                zh: 'LangChain、Agents SDK、AutoGen 的 API 会变，但「输入输出、权限、失败语义」这些契约不会。学会用本体描述契约，框架换来换去都不慌。',
                en: 'APIs of LangChain, Agents SDK, and AutoGen will change. Contracts — inputs, outputs, permissions, failure semantics — will not. Learn to describe contracts with ontology and framework churn stops mattering.',
              },
            },
            {
              title: { zh: 'RAG 是检索层，不是语义层', en: 'RAG is retrieval, not semantics' },
              text: {
                zh: '不要把「能召回」误认为「能推理」。需要跨实体、跨表、跨规则的问题，先建结构，再做检索。',
                en: 'Do not confuse retrieval with reasoning. For cross-entity, cross-table, cross-rule questions, build structure before retrieval.',
              },
            },
            {
              title: { zh: '把权限写进本体', en: 'Put permissions into the ontology' },
              text: {
                zh: '权限不是部署时补的补丁。动作的前置条件、审批人、数据范围，都应该和动作定义放在一起。',
                en: 'Permissions are not a deployment patch. Preconditions, approvers, and data scope belong with the action definition.',
              },
            },
            {
              title: { zh: '先小后大，先手动后自动', en: 'Small before big, manual before automatic' },
              text: {
                zh: '第一版本体手工维护完全没问题。先让 10 个实体跑通，再考虑自动抽取、图数据库和推理引擎。',
                en: 'A hand-maintained v1 is fine. Get ten entities working before adding extraction, graph databases, and reasoning engines.',
              },
            },
          ],
        },
        {
          type: 'quote',
          text: {
            zh: '框架教你如何调用模型，本体教你如何描述世界。后者活得更久。',
            en: 'Frameworks teach you how to call a model. Ontology teaches you how to describe a world. The latter outlives the former.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: 'Prompt → RAG → Agent → Ontology 是叠加关系，不是替代关系。', en: 'Prompting, RAG, agents, and ontology stack rather than replace each other.' },
    { zh: 'RAG 的天花板在结构化，GraphRAG 是中间态，本体是治理层。', en: 'RAG’s ceiling is structure; GraphRAG is a middle ground; ontology is the governance layer.' },
    { zh: '2025 年后的竞争焦点：协议、运行时、领域语义。', en: 'After 2025, the competition is about protocols, runtime, and domain semantics.' },
    { zh: '大厂路线不同，但都在把「模型能力」转化为「系统契约」。', en: 'Vendors take different routes, but all turn model capability into system contracts.' },
  ],
  sources: [
    {
      label: { zh: 'Vaswani et al. · Attention Is All You Need', en: 'Vaswani et al. · Attention Is All You Need' },
      url: 'https://arxiv.org/abs/1706.03762',
    },
    {
      label: { zh: 'Lewis et al. · Retrieval-Augmented Generation for Knowledge-Intensive NLP', en: 'Lewis et al. · Retrieval-Augmented Generation for Knowledge-Intensive NLP' },
      url: 'https://arxiv.org/abs/2005.11401',
    },
    {
      label: { zh: 'Yao et al. · ReAct: Synergizing Reasoning and Acting in Language Models', en: 'Yao et al. · ReAct: Synergizing Reasoning and Acting in Language Models' },
      url: 'https://arxiv.org/abs/2210.03629',
    },
    {
      label: { zh: 'Anthropic · Model Context Protocol announcement', en: 'Anthropic · Model Context Protocol announcement' },
      url: 'https://www.anthropic.com/news/model-context-protocol',
    },
    {
      label: { zh: 'OpenAI · New tools for building agents (Agents SDK)', en: 'OpenAI · New tools for building agents (Agents SDK)' },
      url: 'https://openai.com/index/new-tools-for-building-agents/',
    },
    {
      label: { zh: 'Google · Agent2Agent (A2A) protocol', en: 'Google · Agent2Agent (A2A) protocol' },
      url: 'https://a2a-protocol.org/',
    },
    {
      label: { zh: 'AGENTS.md 官方站点', en: 'AGENTS.md official site' },
      url: 'https://agents.md/',
    },
  ],
}

export default chapter
