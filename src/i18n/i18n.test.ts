import { describe, it, expect } from 'vitest';
import { switchLangHref, htmlLangAttr, formatDate } from './index';

describe('switchLangHref', () => {
  it('zh root → /en/', () => {
    expect(switchLangHref('/', 'zh')).toBe('/en/');
    expect(switchLangHref('', 'zh')).toBe('/en/');
  });

  it('zh deep paths → /en prefixed', () => {
    expect(switchLangHref('/blog', 'zh')).toBe('/en/blog');
    expect(switchLangHref('/blog/quant-failed', 'zh')).toBe('/en/blog/quant-failed');
    expect(switchLangHref('/apps', 'zh')).toBe('/en/apps');
    expect(switchLangHref('/travel', 'zh')).toBe('/en/travel');
  });

  it('en /en[/] → / (zh root)', () => {
    expect(switchLangHref('/en', 'en')).toBe('/');
    expect(switchLangHref('/en/', 'en')).toBe('/');
  });

  it('en deep paths → strip /en prefix', () => {
    expect(switchLangHref('/en/blog', 'en')).toBe('/blog');
    expect(switchLangHref('/en/blog/quant-failed', 'en')).toBe('/blog/quant-failed');
    expect(switchLangHref('/en/apps', 'en')).toBe('/apps');
  });

  it('en path missing prefix falls back to /', () => {
    // Defensive: shouldn't happen in practice, but guards against bad input.
    expect(switchLangHref('/orphan', 'en')).toBe('/');
  });
});

describe('htmlLangAttr', () => {
  it('zh → zh-CN', () => expect(htmlLangAttr('zh')).toBe('zh-CN'));
  it('en → en', () => expect(htmlLangAttr('en')).toBe('en'));
});

describe('formatDate', () => {
  const d = new Date('2026-04-17T00:00:00Z');

  it('zh produces 中文日期', () => {
    // Some Node versions render ICU 'long' month differently — we just assert
    // the year/month/day pieces are all present and there is no Western text.
    const out = formatDate(d, 'zh');
    expect(out).toMatch(/2026/);
    expect(out).toMatch(/4/);
    expect(out).toMatch(/17/);
    expect(out).not.toMatch(/[A-Za-z]/);
  });

  it('en produces English long-month date', () => {
    expect(formatDate(d, 'en')).toBe('April 17, 2026');
  });
});
