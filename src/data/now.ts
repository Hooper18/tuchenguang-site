export interface NowItem {
  status: 'active' | 'inactive' | 'done';
  label: string;
  title: string;
  description: string;
  url?: string;
}

export const nowItems: NowItem[] = [
  {
    status: 'done',
    label: '✓ 已完成',
    title: '台球计分',
    description: '',
  },
  {
    status: 'done',
    label: '✓ 已完成',
    title: '量化交易软件（半成品）',
    description:
      'BTC/ETH/SOL 量化回测系统，符号主义规则引擎。因 100U 本金不值得接实盘，项目归档。',
    url: 'https://quant.tuchenguang.com',
  },
  {
    status: 'active',
    label: '● 进行中',
    title: '完善口袋记账',
    description:
      '在现有基础上持续打磨——双语、数据导出、预算可视化、更符合直觉的交互。',
  },
  {
    status: 'active',
    label: '● 进行中',
    title: '完善 DDL 管理工具',
    description: '目前处于内测阶段，在不远的将来会完全公开。',
  },
];
