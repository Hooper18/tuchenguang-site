# Changelog

本项目所有重要变更记录在此。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [0.1.0] - 2026-04-17

### 初始发布

- 从设计稿搭建 Astro 主站（Astro v6，TypeScript strict，原生 CSS）
- 部署到 Vercel，绑定自定义域名 tuchenguang.com
- 5 大 section：关于 / 作品 / 正在做 / 足迹 / 联系
- 博客系统：`/blog` 列表 + `/blog/[slug]` 详情 + `/rss.xml`
- 2 个项目展示：口袋记账 + 台球计分（手机框 + 4 张截图轮播）
- "正在做"时间线：2 条目（完善口袋记账 / 构思量化交易软件）
- 响应式三段断点：≥1100px / 700–1099px / <700px
- Brittany Chiang 风格的鼠标柔光（radial-gradient 冷白蓝）
- 滚动淡入动画（IntersectionObserver + `.reveal` / `.visible`）
- 左侧社交图标栏 + 右侧竖排邮箱（宽屏显示）
