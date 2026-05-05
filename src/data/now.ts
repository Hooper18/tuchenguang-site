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
    title: '吉他调音器',
    description: '',
  },
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
      'BTC/ETH/SOL 量化回测系统，使用符号主义人工智能。想要实现 24 小时交易需要接入服务器，服务器成本相比本金过高；当前未接入联结主义人工智能，算力也不足，无法完成市场风向转变的预测与理解。',
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
  {
    status: 'active',
    label: '● 进行中',
    title: 'PCB 艺术画生成器',
    description:
      '不依靠 AI，只依靠 Python。用户上传一张图片，通过拆色、简化等步骤新建一个 PCB 的 .zip 文件，能直接发往嘉立创进行打板。',
  },
];
