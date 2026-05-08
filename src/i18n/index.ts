import { zh } from './zh';
import { en } from './en';

export type Lang = 'zh' | 'en';

export type { Dict } from './zh';

export function getDict(lang: Lang) {
  return lang === 'zh' ? zh : en;
}

/**
 * Build the mirror path for the language switcher.
 *   /            ↔ /en/
 *   /apps        ↔ /en/apps
 *   /blog/foo    ↔ /en/blog/foo
 * Trailing slash is preserved.
 */
export function switchLangHref(currentPath: string, currentLang: Lang): string {
  if (currentLang === 'zh') {
    // /xxx → /en/xxx,  / → /en/
    if (currentPath === '/' || currentPath === '') return '/en/';
    return '/en' + (currentPath.startsWith('/') ? currentPath : '/' + currentPath);
  }
  // currentLang === 'en' — strip the /en prefix
  if (currentPath === '/en' || currentPath === '/en/') return '/';
  if (currentPath.startsWith('/en/')) return currentPath.slice(3); // '/en/xxx' → '/xxx'
  return '/';
}

export function htmlLangAttr(lang: Lang): string {
  return lang === 'zh' ? 'zh-CN' : 'en';
}
