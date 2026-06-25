import type { Bilingual } from './_shared';
export { pickText } from './_shared';

/** 整个 Now 区块最后一次手动整理的时间。组件按 lang 调 formatDate 渲染。 */
export const nowLastUpdated = new Date('2026-06-12');

export interface NowItem {
  status: 'active' | 'inactive' | 'done';
  label: Bilingual;
  title: Bilingual;
  description: Bilingual;
  url?: string;
}

const STATUS = {
  done: { zh: '✓ 已完成', en: '✓ Done' },
  active: { zh: '● 进行中', en: '● In progress' },
  inactive: { zh: '○ 已搁置', en: '○ Shelved' },
} as const;

export const nowItems: NowItem[] = [
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '世界杯比分预测', en: 'World Cup score predictor' },
    description: { zh: '', en: '' },
  },
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '吉他调音器', en: 'Guitar tuner' },
    description: { zh: '', en: '' },
  },
  {
    status: 'done',
    label: STATUS.done,
    title: { zh: '台球计分', en: 'Billiards scorer' },
    description: { zh: '', en: '' },
  },
  {
    status: 'inactive',
    label: STATUS.inactive,
    title: { zh: '量化交易软件（半成品）', en: 'Algorithmic trading system (shelved)' },
    description: {
      zh: 'BTC/ETH/SOL 量化回测系统，使用符号主义人工智能。想要实现 24 小时交易需要接入服务器，服务器成本相比本金过高；当前未接入联结主义人工智能，算力也不足，无法完成市场风向转变的预测与理解。',
      en: "A backtesting system for BTC/ETH/SOL built around a symbolic-AI rule engine. Running it 24/7 needs a hosted server, and that cost dwarfs my actual capital; without a connectionist model and the compute to back it, the system can't read regime shifts in the market well enough to trust.",
    },
    url: 'https://quant.tuchenguang.com',
  },
  {
    status: 'inactive',
    label: STATUS.inactive,
    title: { zh: '植物大战僵尸（学习版）', en: 'Plants vs Zombies (learning build)' },
    description: {
      zh: '用 Phaser 复刻植物大战僵尸来练手——网格种植、波次刷怪、阳光经济等核心循环都跑通了。但越往后越依赖原版美术与音效、自己重做成本过高，也偏离了练 Phaser 的初衷，于是停在半成品。做出来的部分仍可在线试玩。',
      en: "A Phaser remake of Plants vs Zombies to sharpen my game-loop skills — grid planting, wave spawning and the sun economy all work. But it leaned ever harder on the original's art and audio (too costly to redo cleanly) and kept drifting from the learning goal, so I shelved it — what I finished is still playable online.",
    },
    url: 'https://pvz.tuchenguang.com',
  },
  {
    status: 'inactive',
    label: STATUS.inactive,
    title: { zh: 'Moodle 课程下载器', en: 'Moodle course dumper' },
    description: {
      zh: '一个浏览器扩展，一键把学校 Moodle 的课程页、公告、附件全量抓到本地，再交给 AI 通读、交叉核对，整理成带置信度标注的 DDL 截止清单——把抓取和理解分开。纯自用工具，没有公开部署。',
      en: "A browser extension that bulk-grabs my university's Moodle — course pages, announcements, attachments — to disk in one click, then hands it to an LLM to read across and cross-check into a confidence-tagged deadline list, keeping scraping and comprehension separate. A personal tool, never publicly deployed.",
    },
  },
  {
    status: 'active',
    label: STATUS.active,
    title: { zh: '完善口袋记账', en: 'Polishing Pocket Ledger' },
    description: {
      zh: '在现有基础上持续打磨——双语、数据导出、预算可视化、更符合直觉的交互。',
      en: 'Steady polish on the existing build — bilingual UI, data export, budget visualizations, and interactions that just feel more obvious.',
    },
  },
  {
    status: 'active',
    label: STATUS.active,
    title: { zh: '完善 DDL 管理工具', en: 'Polishing the deadline tracker' },
    description: {
      zh: '目前处于内测阶段，在不远的将来会完全公开。',
      en: "Currently in closed beta — it'll open up to everyone before long.",
    },
  },
  {
    status: 'active',
    label: STATUS.active,
    title: { zh: 'PCB 艺术画生成器', en: 'PCB-art generator' },
    description: {
      zh: '不依靠 AI，只依靠 Python。用户上传一张图片，通过拆色、简化等步骤新建一个 PCB 的 .zip 文件，能直接发往嘉立创进行打板。',
      en: "No AI — just Python. The user uploads an image; the script separates colors, simplifies the shapes, and outputs a PCB .zip ready to send straight to JLCPCB.",
    },
  },
];
