# CLAUDE.md — 给 Claude Code 的项目说明

读完这份文件，你应该能立刻掌握这个项目的来龙去脉，以及哪些东西不能乱动。

---

## 项目身份

**这是涂晨光的个人作品集 + 博客主站。**

- 受众：本人回顾、导师/HR 评审、技术社区
- 定位：深色系个人作品集，灵感致敬 [brittanychiang.com](https://brittanychiang.com)
- 在线地址：https://tuchenguang.com
- 代码仓库：https://github.com/Hooper18/tuchenguang-site
- 部署：Vercel（Hooper18's projects / Hobby 计划）

---

## 架构决策（重要）

### 为什么用 Astro，不用 Next.js？
作品集 + 博客是纯内容站，没有客户端状态需求。Astro 的零 JS 默认 + 静态输出天然契合，不需要 SSR 的复杂度。

### 为什么不用 Tailwind？
设计来自一份定稿的 `reference.html`，已有完整的 CSS 变量体系和动画。迁移到 Tailwind 没有收益，只会破坏原有的精确样式。

### 为什么 `output: 'static'`？
站点无需服务端逻辑（无登录、无动态路由依赖 DB），纯静态部署更快、更省、更简单。

### 为什么 apex 域名为主、www 重定向？
`tuchenguang.com` 比 `www.tuchenguang.com` 更简洁，在简历和社交媒体上展示更好看。

---

## 视觉风格约束（不要破坏）

| 属性 | 值 | 注意 |
|------|----|------|
| 背景主色 | `#0a192f` 深蓝绿 | 不要改 |
| 点缀色 | `#64ffda` 青绿 | **用量克制**——只用于文字、边框、小装饰线，绝不做实心色块或大片背景 |
| 鼠标柔光 | `rgba(120, 150, 220, 0.08)` 冷白蓝 | **不要改成绿色** |
| 中文字体 | Noto Serif SC | 仅限特殊场合（如 Hero 的"正在制造"） |
| 英文 / UI 字体 | Inter | 正文、导航、说明 |
| 等宽字体 | JetBrains Mono | 日期、标签、代码、数字 |
| Dynamic Island | 已删除 | **不要加回来**（会遮挡项目截图顶部） |

---

## 目录结构

```
src/
├── components/
│   ├── Nav.astro           # 固定顶部导航（滚动后加 .scrolled）
│   ├── SideLeft.astro      # 左侧社交图标栏（≥1100px 显示）
│   ├── SideRight.astro     # 右侧竖排邮箱（≥1100px 显示）
│   ├── Hero.astro          # 第一屏：姓名 + tagline + CTA
│   ├── About.astro         # 关于我：文字 + 技能 + 头像
│   ├── Projects.astro      # 作品展示（循环 src/data/projects.ts）
│   ├── PhoneCarousel.astro # 手机框 + 截图轮播（自适应：单图不显示箭头/dots）
│   ├── Now.astro           # "正在做"时间线
│   ├── Travel.astro        # 足迹：d3-geo + topojson 渲染世界地图，标记访问过的国家
│   ├── Contact.astro       # 联系方式
│   └── Footer.astro        # 页脚
├── content/blog/           # 博客 Markdown 文章
├── data/
│   ├── projects.ts         # 项目数据（加新项目改这里）
│   └── now.ts              # "正在做"条目
├── layouts/
│   ├── BaseLayout.astro    # HTML shell + 全局脚本（鼠标柔光 + 滚动 reveal）
│   └── BlogPostLayout.astro# 博客文章布局
├── pages/
│   ├── index.astro         # 首页（组合所有 section 组件）
│   ├── blog/index.astro    # 博客列表
│   ├── blog/[...slug].astro# 博客详情
│   └── rss.xml.js          # RSS feed
├── styles/global.css       # 全局 CSS 变量、动画、公共样式
└── content.config.ts       # Astro Content Collections 配置（Astro 5/6 格式）
```

---

## 组件约定

- **组件级样式**：用 Astro 的 `<style>` 作用域，不要写全局选择器
- **全局样式 / CSS 变量**：统一在 `src/styles/global.css`，在 `BaseLayout.astro` 里 import
- **鼠标柔光逻辑**：在 `BaseLayout.astro` 的 `<script>` 里，监听 `mousemove` 更新 `--mouse-x` / `--mouse-y`
- **滚动淡入（`.reveal`）**：`IntersectionObserver` 也在 `BaseLayout.astro`，给所有 `.reveal` 元素加 `.visible`
- **PhoneCarousel**：接受 `images: string[]` 和 `id: string` prop，脚本通过 `data-carousel-id` 选取自己的 DOM，支持多个实例共存

---

## 内容编辑指南

| 想改什么 | 改哪里 |
|----------|--------|
| 首页自我介绍 | `src/components/Hero.astro`、`About.astro` |
| 加 / 改项目 | `src/data/projects.ts` |
| 更新"正在做" | `src/data/now.ts` |
| 写博客文章 | 在 `src/content/blog/` 新建 `.md` 文件，遵循 frontmatter 格式 |
| 修改导航链接 | `src/components/Nav.astro` |

博客 frontmatter 格式：
```yaml
---
title: 文章标题
description: 一句话摘要
pubDate: 2026-04-17
tags: [标签1, 标签2]
draft: false
---
```

---

## 部署流程

- `git push origin main` 即触发 Vercel 自动部署
- **`main` 分支永远等于生产环境**，不要在上面写实验性代码
- 实验性功能请开 feature branch，经过本地验证后再合并

---

## 待办事项（Backlog）

### 短期
- [ ] 配置 `hi@tuchenguang.com` 邮件接收/转发（Resend 或 Cloudflare Email Routing）
- [ ] 验证 `public/images/projects/ledger-4.jpg` 隐私覆盖效果（QQ 账号已覆盖，肉眼复核）

### 中期
- [ ] 博客标签分类筛选
- [ ] RSS feed 完善（现有基本骨架）
- [ ] Vercel Analytics / Speed Insights 开启

### 长期
- [ ] 英文版（独立 `/en/` 路径，不是实时切换）
- [ ] OG 图动态生成（目前是静态占位）
- [ ] 暗色 / 浅色主题切换（但可能不做——坚持暗色作品集风格）

### 已完成（保留以便回溯）
- [x] 真人头像已换上（`public/images/avatar.jpg`）
- [x] 替换 `welcome.md` 占位（现有 `quant-failed.md` / `vibecoding-first-month.md`）
- [x] 世界地图组件实装：`Travel.astro` 用 d3-geo + topojson 渲染，数据 `src/data/visited-countries.json` + `public/data/world-110m.json`

---

## 已知依赖告警（不紧迫）

- `path-to-regexp` 链 ReDoS（GHSA-9wv6-86v2-598j，3 high）来自
  `@astrojs/vercel → @vercel/routing-utils → path-to-regexp@6.x`。
  上游 `@vercel/routing-utils` 还未升级。
- **本站影响接近零**：`output: 'static'`，所有路由在 build 时静态
  生成，部署后不走运行时路径匹配，ReDoS 不可触发。
- 修复路径：等上游升级，或在 package.json 加 `overrides` 锁
  `path-to-regexp@^8.0.0`（需先验证 `@vercel/routing-utils` API 兼容）。
- `fast-xml-parser` XML 注入（GHSA-gh4j-gqv2-49f6）已通过升级
  `@astrojs/vercel` 到 10.0.6 间接修复。

## 禁区（绝不要做）

- 不要用 Tailwind / SCSS / styled-components 替换原生 CSS
- 不要改视觉主色（`#0a192f` 背景、`#64ffda` 点缀）
- 不要加 Dynamic Island 回去
- 不要加生硬的彩色或过饱和效果
- 不要"荧光绿大面积铺开"的设计
- **不要未经用户同意大改整体视觉风格**

---

## Git 命令规范

所有 git 命令必须分行执行，禁止用 `&&` 或 `;` 链接多条命令。

错误示例：
  git add -A && git status
  git commit -m "xxx" && git push origin main

正确示例：
  git add -A
  git status

  git commit -m "xxx"
  git push origin main

理由：分行执行便于中间停下检查输出、也便于用户手动 review 每一步的结果。
