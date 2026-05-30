// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tuchenguang.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      // i18n 配置让 sitemap 在每个 <url> 下自动补 xhtml:link rel="alternate"，
      // 把 / 与 /en/、/blog/foo 与 /en/blog/foo 等镜像页两两关联给搜索引擎。
      // zh 是默认 locale（无前缀），en 用 /en/ 前缀。
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en',
        },
      },
      // /admin 不应被收录
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
