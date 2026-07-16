# “正在做”已完成项目链接 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在主页“正在做”的已完成时间线中加入“穷游机票查价”和“博彩套利探索”，并为五个已完成项目提供与量化交易条目对齐的网站链接。

**Architecture:** 保持现有 Astro 组件和 CSS 不变，只扩展 `src/data/now.ts` 的静态数据。用 Vitest 对数据顺序、状态、双语标题、URL 和更新时间做回归约束，再通过 Astro 生产构建与浏览器检查验证最终渲染。

**Tech Stack:** Astro 6、TypeScript、Vitest 4、原生 CSS

## Global Constraints

- 新增项目只进入主页“正在做”时间线，不进入“作品”“下载”或导航。
- 五个目标项目都使用 `done` 状态、空描述和现有 `.now-link` 样式。
- 项目顺序固定为：穷游机票查价、博彩套利探索、世界杯比分预测、吉他调音器、台球计分。
- `nowLastUpdated` 固定更新为 `2026-07-15`。
- 不修改量化交易条目的状态、文案和 `https://quant.tuchenguang.com` 链接。
- 不修改 `src/components/Now.astro` 或 `src/styles/global.css`。

---

### Task 1: 已完成项目数据与链接

**Files:**
- Create: `src/data/now.test.ts`
- Modify: `src/data/now.ts`

**Interfaces:**
- Consumes: `NowItem`、`nowItems: NowItem[]`、`nowLastUpdated: Date`
- Produces: 时间线前五项的稳定双语标题、`done` 状态、空描述和公开 URL；`nowLastUpdated = new Date('2026-07-15')`

- [ ] **Step 1: Write the failing test**

创建 `src/data/now.test.ts`：

```ts
import { describe, expect, it } from 'vitest';
import { nowItems, nowLastUpdated } from './now';

describe('now completed project links', () => {
  const expectedCompletedProjects = [
    {
      title: { zh: '穷游机票查价', en: 'Budget Flight Fare Finder' },
      url: 'https://flightticket.tuchenguang.com',
    },
    {
      title: { zh: '博彩套利探索', en: 'Betting Arbitrage Exploration' },
      url: 'https://ezbet.tuchenguang.com',
    },
    {
      title: { zh: '世界杯比分预测', en: 'World Cup score predictor' },
      url: 'https://worldcup.tuchenguang.com',
    },
    {
      title: { zh: '吉他调音器', en: 'Guitar tuner' },
      url: 'https://tuner.tuchenguang.com',
    },
    {
      title: { zh: '台球计分', en: 'Billiards scorer' },
      url: 'https://billiards.tuchenguang.com',
    },
  ];

  it('keeps the five linked completed projects at the top in display order', () => {
    expect(
      nowItems.slice(0, expectedCompletedProjects.length).map((item) => ({
        status: item.status,
        title: item.title,
        description: item.description,
        url: item.url,
      })),
    ).toEqual(
      expectedCompletedProjects.map((project) => ({
        status: 'done',
        title: project.title,
        description: { zh: '', en: '' },
        url: project.url,
      })),
    );
  });

  it('updates the section date without changing the quant project', () => {
    expect(nowLastUpdated.toISOString().slice(0, 10)).toBe('2026-07-15');

    const quantProject = nowItems.find((item) => item.title.zh === '量化交易软件（半成品）');
    expect(quantProject).toMatchObject({
      status: 'inactive',
      url: 'https://quant.tuchenguang.com',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/data/now.test.ts`

Expected: FAIL because the first two projects are missing, the three existing completed projects have no URLs, and `nowLastUpdated` is still `2026-06-12`.

- [ ] **Step 3: Write minimal implementation**

在 `src/data/now.ts` 中把更新时间改为：

```ts
export const nowLastUpdated = new Date('2026-07-15');
```

把 `nowItems` 开头的已完成条目完整替换为：

```ts
export const nowItems: NowItem[] = [
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '穷游机票查价', en: 'Budget Flight Fare Finder' },
    description: { zh: '', en: '' },
    url: 'https://flightticket.tuchenguang.com',
  },
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '博彩套利探索', en: 'Betting Arbitrage Exploration' },
    description: { zh: '', en: '' },
    url: 'https://ezbet.tuchenguang.com',
  },
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '世界杯比分预测', en: 'World Cup score predictor' },
    description: { zh: '', en: '' },
    url: 'https://worldcup.tuchenguang.com',
  },
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '吉他调音器', en: 'Guitar tuner' },
    description: { zh: '', en: '' },
    url: 'https://tuner.tuchenguang.com',
  },
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '台球计分', en: 'Billiards scorer' },
    description: { zh: '', en: '' },
    url: 'https://billiards.tuchenguang.com',
  },
```

保留后续量化交易、植物大战僵尸、Moodle、口袋记账、DDL 和 PCB 条目原样。

- [ ] **Step 4: Run focused test to verify it passes**

Run: `npm test -- src/data/now.test.ts`

Expected: PASS, 2 tests passed.

- [ ] **Step 5: Run full automated verification**

Run: `npm test`

Expected: PASS, all test files and tests passed with zero failures.

Run: `npm run build`

Expected: exit code 0; Astro generates the static Chinese and English pages without errors.

- [ ] **Step 6: Perform browser visual and interaction QA**

Run: `npm run dev -- --host 127.0.0.1`

在 `/` 和 `/en/` 分别检查桌面端与窄屏：前五项顺序正确；链接域名与量化交易链接左对齐；链接颜色与正文对比清楚；悬停和键盘焦点可见；点击区域明确；时间线没有溢出、拥挤或过度强调。

- [ ] **Step 7: Review the final diff**

Run: `git diff --check`

Expected: no output and exit code 0.

Run: `git diff -- src/data/now.ts src/data/now.test.ts`

Expected: only the approved Now data, regression test, and update date are changed; no unrelated files appear.

- [ ] **Step 8: Commit**

```bash
git add src/data/now.ts src/data/now.test.ts
git commit -m "内容：补全正在做项目链接"
```
