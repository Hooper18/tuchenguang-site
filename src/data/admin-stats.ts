// 管理后台流量统计 —— 当前阶段手动维护。
// Vercel Analytics 接入后这里应改成 build 时从 Vercel API 拉数据，或者改成 server endpoint。
// 5 个 web 项目 + 主站；esp32p4 是硬件项目，没有 web 流量。

export interface WebMetrics {
  /** 最近 7 天独立访问 */
  visits7d: number;
  /** 最近 30 天独立访问 */
  visits30d: number;
  /** 累计独立访问 */
  visitsTotal: number;
  /** 最近一次访问，YYYY-MM-DD；'—' 表示未知 */
  lastSeen: string;
}

export interface TrackedProject {
  slug: string;
  name: string;
  url: string;
  /** null 代表非 web 项目（如硬件），表格里给出 note */
  web: WebMetrics | null;
  note?: string;
}

/** 数据最后一次手动更新时间，YYYY-MM-DD。 */
export const statsUpdatedAt = '2026-05-30';

/** 当前流量来源说明。等接 Vercel Analytics 之后改这条文案即可。 */
export const statsSourceNote = '数据手动维护。Vercel Analytics 接入是 TODO。';

export const trackedProjects: TrackedProject[] = [
  {
    slug: 'main',
    name: '主站 tuchenguang.com',
    url: 'https://tuchenguang.com',
    web: { visits7d: 0, visits30d: 0, visitsTotal: 0, lastSeen: '—' },
  },
  {
    slug: 'ledger',
    name: '口袋记账',
    url: 'https://ledger.tuchenguang.com',
    web: { visits7d: 0, visits30d: 0, visitsTotal: 0, lastSeen: '—' },
  },
  {
    slug: 'billiards',
    name: '台球计分',
    url: 'https://billiards.tuchenguang.com',
    web: { visits7d: 0, visits30d: 0, visitsTotal: 0, lastSeen: '—' },
  },
  {
    slug: 'schedule',
    name: '课程日历',
    url: 'https://calendar.tuchenguang.com',
    web: { visits7d: 0, visits30d: 0, visitsTotal: 0, lastSeen: '—' },
  },
  {
    slug: 'tuner',
    name: '吉他调音器',
    url: 'https://tuner.tuchenguang.com',
    web: { visits7d: 0, visits30d: 0, visitsTotal: 0, lastSeen: '—' },
  },
];
