import type { Bilingual } from './_shared';
export { pickText } from './_shared';

export interface Project {
  slug: string;
  /** 月份标签，如 '2026.4'，不翻译 */
  overline: string;
  title: Bilingual;
  /** 没有公开访问地址的项目（如硬件/嵌入式）留空 */
  titleHref?: string;
  domain?: string;
  url?: string;
  github?: string;
  description: Bilingual;
  /** 技术栈名称为专有名词，不翻译 */
  tech: string[];
  images: string[];
  reverse: boolean;
  /** /apps 页对应 slug；有值代表这个项目已经打成 APK，可在主页加'下载'入口。 */
  apkSlug?: string;
  /** 博客长文 slug；有值代表卡片底部加'完整开发记录 →'链接到 /blog/<slug>。 */
  caseStudySlug?: string;
  /** 图片渲染方式：phone（手机相框，移动 App 默认）/ hardware（圆角矩形，硬件项目）。 */
  displayMode?: 'phone' | 'hardware';
}

export const projects: Project[] = [
  {
    slug: 'ledger',
    overline: '2026.4',
    title: { zh: '口袋记账', en: 'Pocket Ledger' },
    titleHref: 'https://ledger.tuchenguang.com',
    domain: 'ledger.tuchenguang.com',
    url: 'https://ledger.tuchenguang.com',
    github: 'https://github.com/Hooper18/ledger',
    description: {
      zh: '出国留学后，我常不知不觉花了很多钱，同时因为多平台用不同软件支付，每个月都不知道自己到底花出去了多少钱。下了几个记账 App 发现好功能都要会员，于是我自己做了一个自用的，功能包括：多币种记账、各种统计、预算管理，全部免费。小范围的运营成本我应该还负担得起。',
      en: "After moving abroad, money kept slipping through my fingers — different apps on different platforms, no clear picture of where it all went each month. Every ledger app I tried locked the useful features behind a paywall, so I built one for myself: multi-currency entries, stats, budgets — all free. The hosting bill is small enough that I can carry it for now.",
    },
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'Tailwind', 'Chart.js', 'PWA'],
    images: [
      '/images/projects/ledger-1.jpg',
      '/images/projects/ledger-2.jpg',
      '/images/projects/ledger-3.jpg',
      '/images/projects/ledger-4.jpg',
    ],
    reverse: false,
    apkSlug: 'ledger',
  },
  {
    slug: 'billiards',
    overline: '2026.4',
    title: { zh: '台球计分', en: 'Billiards Scorer' },
    titleHref: 'https://billiards.tuchenguang.com',
    domain: 'billiards.tuchenguang.com',
    url: 'https://billiards.tuchenguang.com',
    github: '',
    description: {
      zh: '和同学打台球追分，发现现有的台球计分 App 要么逻辑反人类，要么塞满广告。于是写了一个。',
      en: "Playing chase-the-score with classmates, every billiards-scoring app I tried was either backwards or stuffed with ads. So I wrote one.",
    },
    tech: ['React', 'TypeScript', 'Tailwind', 'Vercel'],
    images: [
      '/images/projects/billiards-1.jpg',
      '/images/projects/billiards-2.jpg',
      '/images/projects/billiards-3.jpg',
      '/images/projects/billiards-4.jpg',
    ],
    reverse: true,
    apkSlug: 'billiards',
  },
  {
    slug: 'schedule',
    overline: '2026.4',
    title: { zh: '课程日历', en: 'Class Calendar' },
    titleHref: 'https://calendar.tuchenguang.com',
    domain: 'calendar.tuchenguang.com',
    url: 'https://calendar.tuchenguang.com',
    github: '',
    description: {
      zh: '我们大学的 DDL 太多了，学校还没有一个统一的记录 DDL 的软件，我就自己做了一个自动的。',
      en: "My university hands out far too many deadlines and has no unified place to track them, so I built one that catches them automatically.",
    },
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'Tailwind', 'Claude API', 'PWA'],
    images: [
      '/images/projects/schedule-1.jpg',
      '/images/projects/schedule-2.jpg',
      '/images/projects/schedule-3.jpg',
      '/images/projects/schedule-4.jpg',
    ],
    reverse: false,
    apkSlug: 'schedule',
  },
  {
    slug: 'tuner',
    overline: '2026.5',
    title: { zh: '吉他调音器', en: 'Guitar Tuner' },
    titleHref: 'https://tuner.tuchenguang.com',
    domain: 'tuner.tuchenguang.com',
    url: 'https://tuner.tuchenguang.com',
    github: '',
    description: {
      zh: '一个本地运行纯净无广的吉他调音 App。',
      en: 'A clean, ad-free guitar tuner that runs entirely on-device.',
    },
    tech: ['React', 'TypeScript', 'Vite', 'Web Audio API', 'YIN', 'PWA', 'i18n'],
    images: [
      '/images/projects/tuner-1.jpg',
    ],
    reverse: true,
    apkSlug: 'tuner',
  },
  {
    slug: 'esp32p4',
    overline: '2026.5',
    title: { zh: 'ESP32-P4 智能视觉终端', en: 'ESP32-P4 Smart Vision Terminal' },
    github: 'https://github.com/Hooper18/esp32p4_competition',
    description: {
      zh: 'DNESP32P4 + ESP32-C3 双 MCU 智能交互终端，准备学校嵌入式系统比赛。P4 跑本地视觉、音频和 HUD，C3 隔离网络栈。语音对话走 Whisper → GPT-4o → 流式 TTS；GPT 还能 function calling 调用拍照、查天气、设定时器等 7 个工具。完整开发记录见博客。',
      en: 'DNESP32P4 + ESP32-C3 dual-MCU smart terminal for a school embedded-systems competition. The P4 runs local vision, audio and HUD; the C3 isolates the network stack. Voice loop = Whisper → GPT-4o → streaming TTS; GPT can also function-call into 7 tools (take_photo, get_weather, set_timer, …). Full dev log in the blog.',
    },
    tech: ['ESP32-P4', 'ESP32-C3', 'ESP-IDF', 'C/C++', 'FreeRTOS', 'LVGL', 'MIPI CSI/DSI', 'I2S', 'UART', 'OpenAI API', 'Function Calling'],
    images: [
      '/images/projects/esp32p4-3.jpg',
    ],
    reverse: false,
    caseStudySlug: 'esp32p4-competition',
    displayMode: 'hardware',
  },
];
