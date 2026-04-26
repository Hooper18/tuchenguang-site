export interface Project {
  slug: string;
  overline: string;
  title: string;
  titleHref: string;
  domain: string;
  url: string;
  github: string;
  description: string;
  tech: string[];
  images: string[];
  reverse: boolean;
}

export const projects: Project[] = [
  {
    slug: 'schedule',
    overline: '2026.4',
    title: '课程日历',
    titleHref: 'https://calendar.tuchenguang.com',
    domain: 'calendar.tuchenguang.com',
    url: 'https://calendar.tuchenguang.com',
    github: '',
    description:
      '我们大学的 DDL 太多了，学校还没有一个统一的记录 DDL 的软件，我就自己做了一个自动的。',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'Tailwind', 'Claude API', 'PWA'],
    images: [
      '/images/projects/schedule-1.jpg',
      '/images/projects/schedule-2.jpg',
      '/images/projects/schedule-3.jpg',
      '/images/projects/schedule-4.jpg',
    ],
    reverse: false,
  },
  {
    slug: 'ledger',
    overline: '2026.4',
    title: '口袋记账',
    titleHref: 'https://ledger.tuchenguang.com',
    domain: 'ledger.tuchenguang.com',
    url: 'https://ledger.tuchenguang.com',
    github: 'https://github.com/Hooper18/ledger',
    description:
      '出国留学后，我常不知不觉花了很多钱，同时因为多平台用不同软件支付，每个月都不知道自己到底花出去了多少钱。下了几个记账 App 发现好功能都要会员，于是我自己做了一个自用的，功能包括：多币种记账、各种统计、预算管理，全部免费。小范围的运营成本我应该还负担得起。',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'Tailwind', 'Chart.js', 'PWA'],
    images: [
      '/images/projects/ledger-1.jpg',
      '/images/projects/ledger-2.jpg',
      '/images/projects/ledger-3.jpg',
      '/images/projects/ledger-4.jpg',
    ],
    reverse: true,
  },
  {
    slug: 'billiards',
    overline: '2026.4',
    title: '台球计分',
    titleHref: 'https://billiards.tuchenguang.com',
    domain: 'billiards.tuchenguang.com',
    url: 'https://billiards.tuchenguang.com',
    github: '',
    description:
      '和同学打追分局时发现：现有的台球计分 App 要么逻辑反人类，要么塞满广告。于是写了一个只做一件事的工具——干净、清楚、不打扰比赛节奏。',
    tech: ['React', 'TypeScript', 'Tailwind', 'Vercel'],
    images: [
      '/images/projects/billiards-1.jpg',
      '/images/projects/billiards-2.jpg',
      '/images/projects/billiards-3.jpg',
      '/images/projects/billiards-4.jpg',
    ],
    reverse: false,
  },
];
