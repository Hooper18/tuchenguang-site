// 博客辅助：从 content collection 的 id（形如 "slug/lang"）拆出 slug + lang，
// 计算路由 href。日期格式化复用 i18n/formatDate。

import type { Lang } from '../i18n';

export { formatDate } from '../i18n';

export function splitBlogId(id: string): { slug: string; lang: Lang } {
  const parts = id.split('/');
  if (parts.length !== 2) {
    throw new Error(`Invalid blog id: "${id}". Expected "slug/lang".`);
  }
  const [slug, langPart] = parts;
  if (langPart !== 'zh' && langPart !== 'en') {
    throw new Error(`Invalid lang in blog id: "${id}". Expected "zh" or "en".`);
  }
  return { slug, lang: langPart };
}

export function blogIndexHref(lang: Lang): string {
  return lang === 'zh' ? '/blog' : '/en/blog';
}

export function blogPostHref(slug: string, lang: Lang): string {
  return lang === 'zh' ? `/blog/${slug}` : `/en/blog/${slug}`;
}
