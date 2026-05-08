import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// 博客 markdown 必须放在 `src/content/blog/<slug>/<lang>.md`，其中 lang ∈ {zh, en}。
// glob 会把文件路径转成 collection id（去 .md 后缀），形如 "quant-failed/zh"。
// data/blog.ts 的 splitBlogId 在 build 时强制校验该格式 —— 平铺 .md 会抛错并使
// build 失败，避免问题悄悄进入仓库。
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
