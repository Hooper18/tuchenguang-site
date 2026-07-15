# “正在做”已完成项目链接设计

## 目标

只在主页“正在做”的已完成时间线中新增两个项目，并为三个已有项目补充网站链接，使它们与“量化交易软件（半成品）”的现有域名链接保持一致。

## 内容与顺序

已完成项目从上到下排列为：

1. 穷游机票查价 / Budget Flight Fare Finder — `https://flightticket.tuchenguang.com`
2. 博彩套利探索 / Betting Arbitrage Exploration — `https://ezbet.tuchenguang.com`
3. 世界杯比分预测 / World Cup score predictor — `https://worldcup.tuchenguang.com`
4. 吉他调音器 / Guitar tuner — `https://tuner.tuchenguang.com`
5. 台球计分 / Billiards scorer — `https://billiards.tuchenguang.com`

五项都使用 `done` 状态和空描述。新增两项只出现在“正在做”时间线，不进入“作品”或“下载”栏目。`nowLastUpdated` 更新为 `2026-07-15`。

## 实现方式

只修改 `src/data/now.ts` 中的 `nowItems` 数据，复用 `src/components/Now.astro` 已有的可选 `url` 渲染逻辑和 `src/styles/global.css` 的 `.now-link` 样式。不修改组件结构或 CSS，因此所有域名链接会与量化交易条目的链接保持相同的左对齐、字体、间距、悬停状态和新窗口打开行为。

## 验证

- 新增数据测试，验证五个已完成项目的顺序、状态和 URL，并验证更新时间。
- 先运行测试确认缺失数据会导致失败，再修改数据使测试通过。
- 运行完整测试和生产构建。
- 启动本地站点，在中文与英文页面检查桌面端及窄屏布局，确认链接可辨识、可点击、对齐一致且没有视觉层级回退。

## 非目标

- 不修改量化交易条目的状态、文案或链接。
- 不新增项目卡片、下载入口或导航入口。
- 不调整站点整体配色、排版或时间线样式。
