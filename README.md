# 涂晨光的个人主站

涂晨光的个人作品集 + 博客，记录项目开发、留学生活和学到的新东西。

[![在线访问](https://img.shields.io/badge/%E5%9C%A8%E7%BA%BF%E8%AE%BF%E9%97%AE-tuchenguang.com-64ffda?style=flat-square)](https://tuchenguang.com)
[![Astro](https://img.shields.io/badge/Astro-v6-FF5D01?style=flat-square&logo=astro)](https://astro.build)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

## 在线访问

**https://tuchenguang.com**

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Astro v6，TypeScript strict |
| 样式 | 原生 CSS + CSS 变量（无 Tailwind） |
| 字体 | Inter · JetBrains Mono · Noto Serif SC |
| 博客 | Astro Content Collections + Markdown |
| 部署 | Vercel（静态输出 `output: 'static'`） |

## 本地开发

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器 → http://localhost:4321
npm run build     # 构建生产版本 → ./dist/
npm run preview   # 本地预览构建产物
```

## 目录结构

```
tuchenguang-site/
├── public/
│   ├── images/projects/    # 项目截图（8 张手机截图）
│   └── favicon.svg
├── src/
│   ├── components/         # 页面各 section 组件
│   ├── content/blog/       # 博客文章（Markdown）
│   ├── data/               # 项目数据、"正在做"数据
│   ├── layouts/            # BaseLayout + BlogPostLayout
│   ├── pages/              # 路由页面（index / blog / rss）
│   └── styles/global.css   # 全局 CSS 变量与样式
├── src/content.config.ts   # Content Collections 配置
└── astro.config.mjs
```

## 作者

涂晨光 · [tuchenguang.com](https://tuchenguang.com) · [@Hooper18](https://github.com/Hooper18)
