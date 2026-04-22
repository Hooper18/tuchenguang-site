export interface NowItem {
  status: 'active' | 'inactive';
  label: string;
  title: string;
  description: string;
}

export const nowItems: NowItem[] = [
  {
    status: 'active',
    label: '● 进行中',
    title: '完善口袋记账',
    description:
      '在现有 MVP 基础上持续打磨——<strong>国际化 (i18n)</strong>、数据导出、预算可视化、更丝滑的交互。让它从"自用工具"变成"留学生都能用的工具"。',
  },
  {
    status: 'active',
    label: '● 进行中',
    title: '完善 DDL 管理工具',
    description:
      '把课程日历做得更好用——支持文件导入自动识别 DDL、桌面端宽屏适配、校历联动，目标是一个入口管住所有作业和考试。',
  },
  {
    status: 'inactive',
    label: '○ 构思中',
    title: '量化交易软件',
    description:
      '自己在做加密货币和美股的小额交易，接触过<strong>网格交易</strong>之类的现成工具后，想自己搭一个——策略还没成熟，但想先把<strong>策略研究、回测、模拟盘</strong>的框架搭起来。从能用开始，再慢慢迭代思路。',
  },
];
