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
    overline: '特色项目 · 2026',
    title: '课程日历',
    titleHref: 'https://calendar.tuchenguang.com',
    domain: 'calendar.tuchenguang.com',
    url: 'https://calendar.tuchenguang.com',
    github: '',
    description:
      '大学课表不应该锁在 Excel 里。这个工具可以导入课表文件，按周/月/日视图查看课程安排，支持考试和作业提醒。给自己做的，解决"下节课是什么"这个每天都要问的问题。',
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
    overline: '特色项目 · 2026',
    title: '口袋记账',
    titleHref: 'https://ledger.tuchenguang.com',
    domain: 'ledger.tuchenguang.com',
    url: 'https://ledger.tuchenguang.com',
    github: 'https://github.com/Hooper18/ledger',
    description:
      '出国留学后，我常常不知不觉就花了很多钱——记账本来是解决方案，但市面上的 App 很少有多币种切换、汇率记录这些留学生刚需功能，而且一般还要会员。于是我自己做了一个自用的，功能包括：多币种、汇率快照、日历视图、预算管理，全部免费。先自用，也希望能帮到少数同路人。',
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
    overline: '特色项目 · 2026',
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
    reverse: true,
  },
];
