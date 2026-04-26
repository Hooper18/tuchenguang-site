export interface NowItem {
  status: 'active' | 'inactive' | 'done';
  label: string;
  title: string;
  description: string;
}

export const nowItems: NowItem[] = [
  {
    status: 'done',
    label: '✓ 已完成',
    title: '台球计分',
    description: '',
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
  {
    status: 'inactive',
    label: '○ 构思中',
    title: '量化交易软件',
    description:
      '加密货币目前币安现成的工具只有网格交易，第三方的量化本质黑箱。目前还没想好怎么做一个灵活的、用户可自定义策略的、接入币安的量化软件。',
  },
];
