import type { Lang } from '../i18n';

interface Bilingual {
  zh: string;
  en: string;
}

export interface NowItem {
  status: 'active' | 'inactive' | 'done';
  label: Bilingual;
  title: Bilingual;
  description: Bilingual;
  url?: string;
}

export function pickText(field: Bilingual, lang: Lang): string {
  return field[lang];
}

const STATUS = {
  done: { zh: '✓ 已完成', en: '✓ Done' },
  active: { zh: '● 进行中', en: '● In progress' },
  inactive: { zh: '○ 暂停', en: '○ On hold' },
} as const;

export const nowItems: NowItem[] = [
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
    status: 'done',
    label: STATUS.done,
    title: { zh: '量化交易软件（半成品）', en: 'Algorithmic trading system (shelved)' },
    description: {
      zh: 'BTC/ETH/SOL 量化回测系统，使用符号主义人工智能。想要实现 24 小时交易需要接入服务器，服务器成本相比本金过高；当前未接入联结主义人工智能，算力也不足，无法完成市场风向转变的预测与理解。',
      en: "A backtesting system for BTC/ETH/SOL built around a symbolic-AI rule engine. Running it 24/7 needs a hosted server, and that cost dwarfs my actual capital; without a connectionist model and the compute to back it, the system can't read regime shifts in the market well enough to trust.",
    },
    url: 'https://quant.tuchenguang.com',
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
