// 共享：双语字段类型与按 lang 取值。projects.ts、now.ts 等数据文件复用。

import type { Lang } from '../i18n';

export interface Bilingual {
  zh: string;
  en: string;
}

export function pickText(field: Bilingual, lang: Lang): string {
  return field[lang];
}
