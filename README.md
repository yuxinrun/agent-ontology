# 智能体本体论实战指南 · Agent Ontology Field Guide

写给程序员的 Agent Ontology 实战指南：从本体论、语义层到多智能体编排与 MCP，12 章图解、代码与落地案例，中英双语。

作者：鱼心 · 品牌：鱼心快跑（[www.yuxin.run](https://www.yuxin.run)）  
鱼心快跑，Bug 追不到。

## 特性

- 12 章正文 + 3 个附录：概念、架构、协议、实战、避坑与趋势
- 7 类可交互 ECharts 可视化：演进时间轴、三层架构、能力雷达、多智能体流程、实体关系图、知识图谱、效果对比
- 中 / English 一键切换，语言与主题偏好本地持久化
- 日间 / 夜间 / 跟随系统主题，带平滑过渡
- 响应式布局：桌面侧栏 + 正文 + 右侧目录，平板折叠菜单，移动端底部导航与目录抽屉
- 代码高亮与一键复制、全文搜索（⌘K / Ctrl+K）、滚动进度、滚动揭示与返回顶部
- 语义化 HTML、ARIA 标注、键盘可操作、`prefers-reduced-motion` 支持

## 技术栈

React 18 · Vite 5 · React Router 6（HashRouter）· Tailwind CSS 3 · ECharts 5 · Prism.js · Lucide

## 本地运行

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

生产构建与预览：

```bash
npm run build
npm run preview  # http://127.0.0.1:4173
```

## 内容与路由

| 路由 | 内容 |
| --- | --- |
| `/#/` | 首页：问题、RAG vs Ontology、三层架构、学习路线、业务场景 |
| `/#/chapters` | 12 章目录与 3 个附录 |
| `/#/chapters/:slug` | 章节详情（正文、图表、代码、要点、来源、上下章） |
| `/#/about` | 关于作者与品牌 |
| `/#/*` | 404：这个节点不在本体里 |

正文以数据驱动，位于 `src/data/chapters/01.js` – `12.js` 与 `src/data/appendices.js`，由 `src/components/BlockRenderer.jsx` 渲染。

## 目录结构

```text
src/
  components/       布局、导航、搜索、代码块、图表与内容渲染
    charts/         ECharts 配置构造器（7 类图表）
  context/          i18n 与主题上下文
  data/             章节、附录、站点与品牌数据
  hooks/            滚动揭示、滚动定位、尺寸、文档元信息
  i18n/             中英文字典
  pages/            首页、章节列表、章节详情、关于、404
  App.jsx           路由入口
  index.css         Tailwind 基础层、组件层与动画
index.html           SEO / Open Graph / 主题与语言预初始化
public/             logo.svg、og-cover.png、robots.txt
```

## 部署

站点使用 HashRouter 与相对资源路径（`base: './'`），可直接部署到 GitHub Pages、Netlify、Vercel 或任意静态服务器，无需额外的 SPA 重写规则。`dist/` 为构建产物。

## 图片来源

封面图 `public/og-cover.png` 为项目自制品牌图；Logo 为站点独立标识，与品牌 Logo 区分。

## 许可

内容与代码仅用于学习与交流。引用外部资料时请遵循原站点许可。
