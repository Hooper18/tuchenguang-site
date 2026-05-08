import { describe, it, expect } from 'vitest';
import { splitBlogId, blogIndexHref, blogPostHref } from './blog';

describe('splitBlogId', () => {
  it('parses valid slug/zh', () => {
    expect(splitBlogId('quant-failed/zh')).toEqual({ slug: 'quant-failed', lang: 'zh' });
  });

  it('parses valid slug/en', () => {
    expect(splitBlogId('vibecoding-first-month/en')).toEqual({ slug: 'vibecoding-first-month', lang: 'en' });
  });

  it('throws on flat id with no slash', () => {
    expect(() => splitBlogId('quant-failed')).toThrow(/Invalid blog id/);
  });

  it('throws on too many slashes', () => {
    expect(() => splitBlogId('a/b/zh')).toThrow(/Invalid blog id/);
  });

  it('throws on unknown lang', () => {
    expect(() => splitBlogId('foo/de')).toThrow(/Invalid lang/);
    expect(() => splitBlogId('foo/jp')).toThrow(/Invalid lang/);
  });
});

describe('blogIndexHref', () => {
  it('zh → /blog', () => expect(blogIndexHref('zh')).toBe('/blog'));
  it('en → /en/blog', () => expect(blogIndexHref('en')).toBe('/en/blog'));
});

describe('blogPostHref', () => {
  it('zh → /blog/<slug>', () => expect(blogPostHref('foo', 'zh')).toBe('/blog/foo'));
  it('en → /en/blog/<slug>', () => expect(blogPostHref('foo', 'en')).toBe('/en/blog/foo'));
});
