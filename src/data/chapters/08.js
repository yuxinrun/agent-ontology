const chapter = {
  id: '08',
  number: 8,
  slug: 'mcp-tool-ontology',
  kind: 'chapter',
  title: { zh: 'MCP 协议与工具本体', en: 'MCP and the ontology of tools' },
  subtitle: { zh: '让 Agent 自动发现、理解并安全调用工具', en: 'Let agents discover, understand, and safely call tools' },
  summary: {
    zh: '从 MCP 的 Host / Client / Server 架构讲起，把工具描述本体化，并给出可运行的服务端与客户端示例与安全清单。',
    en: 'From the MCP host/client/server architecture to ontological tool descriptions, with runnable server and client examples plus a security checklist.',
  },
  level: 'production',
  minutes: 20,
  icon: 'Plug',
  accent: 'emerald',
  tags: [
    { zh: 'MCP', en: 'MCP' },
    { zh: '工具设计', en: 'Tool design' },
    { zh: '安全', en: 'Security' },
  ],
  sections: [
    {
      id: 'what-is-mcp',
      title: { zh: 'MCP 是什么？', en: 'What is MCP?' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'Model Context Protocol（MCP）是一个开放协议，用来把模型与外部工具、数据和提示词连接起来。它采用 Host / Client / Server 架构：Host 是用户使用的应用（如 IDE、桌面助手），Client 负责与某个 Server 保持连接，Server 暴露工具（tools）、资源（resources）和提示词（prompts）。底层是 JSON-RPC，支持 stdio 与 Streamable HTTP 传输。',
            en: 'Model Context Protocol (MCP) is an open protocol connecting models to external tools, data, and prompts. It uses a host/client/server architecture: the host is the user-facing app (IDE, desktop assistant), the client maintains a connection to a server, and the server exposes tools, resources, and prompts. It runs over JSON-RPC with stdio and Streamable HTTP transports.',
          },
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              icon: 'Wrench',
              title: { zh: 'Tools 工具', en: 'Tools' },
              text: { zh: '模型可调用的动作，如查询订单、创建工单。由模型决定何时调用。', en: 'Actions the model can call, such as querying orders or creating tickets. The model decides when.' },
            },
            {
              icon: 'FolderOpen',
              title: { zh: 'Resources 资源', en: 'Resources' },
              text: { zh: '可读取的上下文数据，如文件、数据库记录、日志。通常由应用选择。', en: 'Readable context such as files, records, and logs. Usually selected by the application.' },
            },
            {
              icon: 'MessageSquareCode',
              title: { zh: 'Prompts 提示词', en: 'Prompts' },
              text: { zh: '可复用的提示词模板，由用户或宿主应用选择后注入。', en: 'Reusable prompt templates selected by the user or host application.' },
            },
          ],
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'mcp-config.json',
          code: `{
  "mcpServers": {
    "order-tools": {
      "command": "python",
      "args": ["server.py"],
      "env": { "ORDER_API_BASE": "https://api.example.com" }
    },
    "docs": {
      "url": "https://docs.example.com/mcp",
      "headers": { "Authorization": "Bearer \${DOCS_TOKEN}" }
    }
  }
}`,
          caption: {
            zh: '同一个 Host 可以连接多个 MCP Server。工具越多，选择与权限问题越突出。',
            en: 'One host can connect many MCP servers. More tools means more selection and permission problems.',
          },
        },
        {
          type: 'callout',
          variant: 'info',
          title: { zh: 'MCP 不是 Agent 框架', en: 'MCP is not an agent framework' },
          text: {
            zh: 'MCP 解决「工具怎么接」，不解决「Agent 怎么规划」。你仍然需要自己的循环、编排、评测与权限系统。',
            en: 'MCP solves how tools connect, not how agents plan. You still need your own loop, orchestration, evaluation, and permissions.',
          },
        },
      ],
    },
    {
      id: 'tool-ontology',
      title: { zh: '工具能力的本体化描述', en: 'An ontological description of tools' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: '工具描述不是写给人看的 API 文档，而是写给模型看的「使用说明书」。一个合格的工具条目，至少要回答：做什么、什么时候不该用、参数含义、副作用、失败形状、权限与成本。把这些字段结构化，就是工具本体。',
            en: 'A tool description is not API documentation for humans; it is a manual for the model. A good tool entry answers: what it does, when not to use it, what parameters mean, side effects, failure shape, permissions, and cost. Structuring these fields is tool ontology.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '字段', en: 'Field' },
            { zh: '为什么重要', en: 'Why it matters' },
            { zh: '示例', en: 'Example' },
          ],
          rows: [
            [{ zh: 'name', en: 'name' }, { zh: '稳定、动词+宾语，便于选择', en: 'Stable verb+object naming for selection' }, { zh: '`refund_order`', en: '`refund_order`' }],
            [{ zh: 'description', en: 'description' }, { zh: '包含「何时用 / 何时不用」', en: 'Include when to use and when not to' }, { zh: '「仅用于已支付订单；撤销请用 cancel_order」', en: '“Paid orders only; use cancel_order for cancellations”' }],
            [{ zh: 'inputSchema', en: 'inputSchema' }, { zh: '类型、枚举、必填、范围', en: 'Types, enums, required fields, ranges' }, { zh: '`amount: number, minimum 0.01`', en: '`amount: number, minimum 0.01`' }],
            [{ zh: 'sideEffects', en: 'sideEffects' }, { zh: '决定是否需要审批与幂等', en: 'Determines approval and idempotency' }, { zh: '`billing.refund_created`', en: '`billing.refund_created`' }],
            [{ zh: 'failureModes', en: 'failureModes' }, { zh: '让模型知道如何修复', en: 'Helps the model recover' }, { zh: '`ORDER_NOT_PAID`, `LIMIT_EXCEEDED`', en: '`ORDER_NOT_PAID`, `LIMIT_EXCEEDED`' }],
            [{ zh: 'permissions', en: 'permissions' }, { zh: '最小权限与审计', en: 'Least privilege and audit' }, { zh: '`billing:write`', en: '`billing:write`' }],
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'server.py',
          code: `# pip install "mcp[cli]"
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("order-tools")

@mcp.tool()
def get_order(order_id: str) -> dict:
    """读取订单状态与金额。只读，无副作用。
    Read order status and amount. Read-only, no side effects.
    Use when: you need order facts. Do not use for customer profiles."""
    return {"order_id": order_id, "status": "paid", "amount": 128.0, "tier": "vip"}

@mcp.tool()
def refund_order(order_id: str, amount: float, approval_id: str | None = None) -> dict:
    """对已支付订单发起退款。不可逆，需要幂等键。
    Refund a paid order. Irreversible; idempotency required.
    Above 200 CNY, approval_id is mandatory."""
    if amount <= 0:
        raise ValueError("amount must be positive / 金额必须为正")
    if amount > 200 and not approval_id:
        raise ValueError("approval required above 200 / 超过 200 需审批")
    return {"refund_id": "R-9001", "order_id": order_id, "status": "submitted"}

if __name__ == "__main__":
    mcp.run()  # 默认 stdio 传输 / stdio transport by default`,
          caption: {
            zh: '描述里明确「何时不用」和失败原因，能显著降低模型选错工具的概率。',
            en: 'Explicit “when not to use” and failure reasons significantly reduce wrong tool selection.',
          },
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '工具描述也是攻击面', en: 'Tool descriptions are an attack surface' },
          text: {
            zh: '恶意 Server 可以在描述里注入指令，诱导模型读取敏感数据或调用其他工具（tool poisoning）。只连接可信 Server，并在 Host 侧保留审批与审计。',
            en: 'A malicious server can inject instructions into descriptions to induce data exfiltration or calls to other tools (tool poisoning). Connect only trusted servers and keep approvals and audit in the host.',
          },
        },
      ],
    },
    {
      id: 'discovery',
      title: { zh: '自动发现与调用', en: 'Discovery and invocation' },
      blocks: [
        {
          type: 'p',
          text: {
            zh: 'MCP 的 `tools/list` 让客户端动态发现工具，`tools/call` 执行调用。但「能发现」不等于「会选」。工具数量上来后，需要能力注册表、语义检索和权限过滤，把候选集收敛到 5±2 个，再交给模型选择。',
            en: 'MCP’s `tools/list` lets clients discover tools dynamically, and `tools/call` invokes them. Discovery is not selection. As tool counts grow, use a capability registry, semantic retrieval, and permission filtering to narrow candidates to 5±2 before asking the model.',
          },
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'client.py',
          code: `# pip install "mcp[cli]"
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    params = StdioServerParameters(command="python", args=["server.py"])
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            tools = await session.list_tools()
            for tool in tools.tools:
                print(f"{tool.name}: {tool.description.splitlines()[0]}")

            result = await session.call_tool(
                "get_order", {"order_id": "O-7781"}
            )
            print(result.content)

if __name__ == "__main__":
    asyncio.run(main())`,
          caption: {
            zh: '生产客户端还要做：工具名冲突处理、超时、重试、结果截断、调用审计与人工确认。',
            en: 'A production client also handles name conflicts, timeouts, retries, result truncation, audit, and human confirmation.',
          },
        },
        {
          type: 'list',
          items: [
            { zh: '**按角色过滤**：客服 Agent 不需要数据库管理工具，就不要把候选集暴露给它。', en: '**Filter by role**: a support agent does not need database admin tools; do not expose them.' },
            { zh: '**按任务检索**：用工具描述 embedding + 关键词混合检索，减少上下文占用。', en: '**Retrieve by task**: hybrid retrieval over tool descriptions reduces context usage.' },
            { zh: '**限制返回体积**：工具结果过长会挤占关键约束，必要时分页或摘要。', en: '**Cap result size**: long tool outputs crowd out constraints; paginate or summarize.' },
            { zh: '**冲突检测**：不同 Server 提供同名工具时，加命名空间前缀。', en: '**Detect collisions**: namespace tools when servers provide duplicate names.' },
          ],
        },
      ],
    },
    {
      id: 'security',
      title: { zh: '工具生态的安全与治理', en: 'Security and governance for tool ecosystems' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '风险', en: 'Risk' },
            { zh: '表现', en: 'Symptom' },
            { zh: '对策', en: 'Mitigation' },
          ],
          rows: [
            [
              { zh: '工具投毒', en: 'Tool poisoning' },
              { zh: '工具描述里藏着「忽略之前的指令」', en: 'Descriptions hide “ignore previous instructions”' },
              { zh: '可信来源、描述审查、Host 侧策略', en: 'Trusted sources, description review, host policy' },
            ],
            [
              { zh: '混淆代理', en: 'Confused deputy' },
              { zh: '低权限 Agent 借高权限工具越权', en: 'A low-privilege agent uses a high-privilege tool' },
              { zh: '用户上下文绑定 token、最小权限', en: 'Bind tokens to user context, least privilege' },
            ],
            [
              { zh: 'Token 透传', en: 'Token passthrough' },
              { zh: '把用户 token 直接转给下游服务', en: 'Passing user tokens straight downstream' },
              { zh: '禁止透传，使用受控交换', en: 'No passthrough; use controlled exchange' },
            ],
            [
              { zh: '重复副作用', en: 'Duplicate side effects' },
              { zh: '重试导致重复退款', en: 'Retries cause duplicate refunds' },
              { zh: '幂等键 + 去重表 + 状态机', en: 'Idempotency keys + dedupe + state machine' },
            ],
            [
              { zh: '数据外泄', en: 'Data exfiltration' },
              { zh: '工具把敏感数据发往外部', en: 'Tools send sensitive data outside' },
              { zh: '出口白名单、DLP、字段脱敏', en: 'Egress allowlist, DLP, field redaction' },
            ],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: { zh: '把审批放在 Host，不要放在 Prompt', en: 'Put approvals in the host, not the prompt' },
          text: {
            zh: '「请模型在退款前询问用户」不是安全机制。真正的高风险动作，必须在 Host 或网关层拦截并要求人工确认。',
            en: '“Ask the model to confirm refunds with the user” is not a security control. High-risk actions must be intercepted at the host or gateway with human confirmation.',
          },
        },
      ],
    },
    {
      id: 'hands-on',
      title: { zh: '实战：搭一个可扩展的工具生态', en: 'Hands-on: a extensible tool ecosystem' },
      blocks: [
        {
          type: 'steps',
          items: [
            { title: { zh: '1. 定义能力，而不是接口', en: '1. Define capabilities, not endpoints' }, text: { zh: '先写 `refund_order`、`lookup_order`、`create_ticket`，再决定用哪个 API 实现。', en: 'Write `refund_order`, `lookup_order`, and `create_ticket` first; then choose APIs.' } },
            { title: { zh: '2. 一个 Server 一个领域', en: '2. One domain per server' }, text: { zh: '订单、工单、知识库拆成独立 Server，便于权限与故障隔离。', en: 'Split orders, tickets, and knowledge into separate servers for permission and failure isolation.' } },
            { title: { zh: '3. 提供只读探测工具', en: '3. Provide read-only probes' }, text: { zh: '让 Agent 先查再写，减少盲目调用。例如 `get_refund_policy`。', en: 'Let agents check before writing, e.g. `get_refund_policy`, to reduce blind calls.' } },
            { title: { zh: '4. 在 Host 侧做注册与过滤', en: '4. Register and filter at the host' }, text: { zh: '按角色、租户、任务暴露子集，并记录每次发现的工具清单版本。', en: 'Expose subsets by role, tenant, and task; log the tool catalog version.' } },
            { title: { zh: '5. 端到端演练', en: '5. Rehearse end to end' }, text: { zh: '模拟超时、重复调用、权限不足、恶意描述，验证 Agent 是否能正确降级。', en: 'Simulate timeouts, duplicates, permission errors, and malicious descriptions; verify graceful degradation.' } },
          ],
        },
        {
          type: 'code',
          lang: 'python',
          filename: 'capability_registry.py',
          code: `TOOL_CATALOG = {
    "support": {"lookup_order", "refund_order", "create_ticket"},
    "analyst": {"lookup_order", "query_metrics"},
    "admin": {"lookup_order", "refund_order", "delete_account"},
}

def tools_for(role: str) -> set[str]:
    return TOOL_CATALOG.get(role, set())

def assert_tool_allowed(role: str, tool: str) -> None:
    if tool not in tools_for(role):
        raise PermissionError(f"{role} cannot call {tool}")

assert_tool_allowed("support", "refund_order")   # ok
try:
    assert_tool_allowed("support", "delete_account")
except PermissionError as exc:
    print(exc)  # support cannot call delete_account`,
          caption: {
            zh: '角色到工具的映射本身就是本体的一部分，不要把它藏进 UI 或 Prompt。',
            en: 'The role-to-tool mapping is part of the ontology. Do not hide it in UI or prompts.',
          },
        },
        {
          type: 'callout',
          variant: 'success',
          title: { zh: '工具生态的北极星指标', en: 'A north-star metric for tool ecosystems' },
          text: {
            zh: '不是「接入了多少工具」，而是「任务成功率 / 工具调用次数 / 人工干预率」。工具越多但选择越差，说明本体和检索没跟上。',
            en: 'Not “how many tools”, but task success per tool call and human intervention rate. More tools with worse selection means ontology and retrieval are lagging.',
          },
        },
      ],
    },
  ],
  takeaways: [
    { zh: 'MCP 用 Host / Client / Server 标准化工具、资源与提示词接入。', en: 'MCP standardizes tool, resource, and prompt access through host/client/server.' },
    { zh: '工具描述是给模型的使用说明书，必须包含何时不用、副作用与失败形状。', en: 'Tool descriptions are manuals for models: include when not to use, side effects, and failure shapes.' },
    { zh: '发现不等于选择：用注册表、语义检索与角色过滤收敛候选集。', en: 'Discovery is not selection: narrow candidates with registries, retrieval, and role filters.' },
    { zh: '工具投毒、混淆代理与 token 透传必须在 Host/网关层防护。', en: 'Guard against tool poisoning, confused deputies, and token passthrough at the host/gateway.' },
    { zh: '衡量工具生态看任务成功率与人工干预率，而不是工具数量。', en: 'Measure success per call and human intervention, not tool count.' },
  ],
  sources: [
    {
      label: { zh: 'Model Context Protocol · Specification (2025-06-18)', en: 'Model Context Protocol · Specification (2025-06-18)' },
      url: 'https://modelcontextprotocol.io/specification/2025-06-18',
    },
    {
      label: { zh: 'MCP · Security best practices', en: 'MCP · Security best practices' },
      url: 'https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices',
    },
    {
      label: { zh: 'Anthropic · Introducing the Model Context Protocol', en: 'Anthropic · Introducing the Model Context Protocol' },
      url: 'https://www.anthropic.com/news/model-context-protocol',
    },
    {
      label: { zh: 'MCP · Python SDK', en: 'MCP · Python SDK' },
      url: 'https://github.com/modelcontextprotocol/python-sdk',
    },
    {
      label: { zh: 'Anthropic · Writing effective tools for agents', en: 'Anthropic · Writing effective tools for agents' },
      url: 'https://www.anthropic.com/engineering/writing-tools-for-agents',
    },
  ],
}

export default chapter
