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
  {
    slug: 'sb6657',
    overline: '2026.6',
    title: { zh: '玩机器弹幕统计', en: 'Danmaku Analytics' },
    titleHref: 'https://sb6657.tuchenguang.com',
    domain: 'sb6657.tuchenguang.com',
    url: 'https://sb6657.tuchenguang.com',
    github: 'https://github.com/Hooper18/sb6657-danmaku',
    description: {
      zh: '给斗鱼主播「玩机器Machine」做的自动弹幕统计站。把六年录播里的 1900 多万条弹幕抓进 SQLite，聚合成热梗榜、趋势、选手榜、年度榜、梗百科等十一个页面；全文检索用静态短语索引让浏览器直接做 range 查询——零后端、零凭据、$0 托管，每天自动增量更新。',
      en: 'An automatic danmaku-stats site for the Douyu streamer "Machine". It pulls 19M+ comments from six years of VODs into SQLite and aggregates them into eleven pages — trending memes, time trends, player boards, yearly charts, a meme encyclopedia — with full-text search served as a static phrase index queried right in the browser. Zero backend, zero credentials, $0 hosting, auto-updated daily.',
    },
    tech: ['Python', 'SQLite', 'React', 'TypeScript', 'Vite', 'Tailwind', 'GitHub Actions'],
    images: [
      '/images/projects/sb6657-1.jpg',
      '/images/projects/sb6657-2.jpg',
      '/images/projects/sb6657-3.jpg',
      '/images/projects/sb6657-4.jpg',
      '/images/projects/sb6657-5.jpg',
    ],
    reverse: true,
    displayMode: 'hardware',
  },
  {
    slug: 'worldcup',
    overline: '2026.6',
    title: { zh: '世界杯比分预测', en: 'World Cup Predictor' },
    titleHref: 'https://worldcup.tuchenguang.com',
    domain: 'worldcup.tuchenguang.com',
    url: 'https://worldcup.tuchenguang.com',
    github: 'https://github.com/Hooper18/worldcup-sim',
    description: {
      zh: '2026 美加墨世界杯的比分预测器。Python 引擎重放 1872 年以来的全部国家队比赛自算 Elo，融合 Dixon-Coles 攻防强度与点球模型，对整届赛事跑十万次蒙特卡洛，给出每场比分分布与每队夺冠概率；赛中用定时任务自动回填真实赛果并按需重模拟，追踪夺冠概率演变。前端八个页面的图表全部手绘 SVG，并用跨赛事样本外验证（RPS/Brier）给出诚实的基准对照。',
      en: "A score predictor for the 2026 World Cup. A Python engine replays every international match since 1872 to compute its own Elo, fuses it with Dixon-Coles attack/defense strength and a penalty model, then runs 100k Monte-Carlo simulations of the whole tournament — a scoreline distribution for every match and each team's title odds. A scheduled job backfills real results mid-tournament and re-simulates on demand, tracking how the odds shift. The front-end renders all eight chart pages as hand-drawn SVG, with honest out-of-sample baselines (RPS/Brier) validated across past tournaments.",
    },
    tech: ['Python', 'NumPy', 'SciPy', 'Monte Carlo', 'React', 'TypeScript', 'Vite', 'Tailwind'],
    images: [
      '/images/projects/worldcup-1.jpg',
      '/images/projects/worldcup-2.jpg',
      '/images/projects/worldcup-3.jpg',
      '/images/projects/worldcup-4.jpg',
      '/images/projects/worldcup-5.jpg',
    ],
    reverse: false,
    displayMode: 'hardware',
  },
];
