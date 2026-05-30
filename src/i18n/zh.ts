// 中文文案 —— 全站 source of truth。
// 添加新文案先加在这里，再到 en.ts 补对应英文（TS 会强制 shape 对齐）。

export const zh = {
  nav: {
    about: '关于',
    work: '作品',
    apps: '下载',
    now: '正在做',
    travel: '足迹',
    contact: '联系',
    blog: '博客',
    langSwitch: 'EN',
    langSwitchAria: '切换到英文版',
  },

  hero: {
    intro: '你好, 我叫',
    name: '涂晨光。',
    taglineLine1: '欢迎来到',
    taglineLine2: '我的世界。',
    descBefore: '我是一名在马来西亚就读的电子与电气工程大一学生，来自浙江杭州。这里记录我的成长，以及一些',
    descLink: '独立做出来的小东西',
    descAfter: '。',
    cta: '看看我在做什么',
  },

  about: {
    sectionLabel: '关于我',
    p1Before: '你好！我是涂晨光，2025 年 9 月入学',
    p1Strong: '厦门大学马来西亚分校',
    p1After: '（XMUM），电子与电气工程（EEE）大一学生。',
    p2Strong: '浙江杭州',
    p2After: '人，杭州高级中学毕业。',
    p3: '未来方向还在探索中，保研或者申研都在考虑，做这个网站是想记录我的成长，和一些好玩的项目。',
    p4Before: '生活之外，',
    p4Strong: '爱打篮球，游泳，旅游，摩托车',
    p4After: '。人生目标：先实现经济自由，然后走遍世界。',
    skillsLabel: '最近在用的技术和工具:',
    avatarAlt: '涂晨光',
  },

  projects: {
    sectionLabel: '我做的东西',
    githubAria: 'GitHub',
    liveAria: '线上',
    apkAria: '下载 APK',
    apkLabel: 'APK',
    caseStudyLabel: '完整开发记录 →',
    caseStudyAria: '阅读完整开发记录',
  },

  apps: {
    sectionLabel: '下载',
    introSyncStrong: '在线同步',
    introSyncAfter: '的 web 改完自动升级；',
    introOfflineStrong: '完全离线',
    introOfflineAfter: '的没网也能开。',
    badgeSync: '在线同步',
    badgeOffline: '完全离线',
    webLink: '网页版 ↗',
    download: '下载 APK',
  },

  now: {
    sectionLabel: '正在做',
    lastUpdatedPrefix: '最后一次更新时间：',
    statusActive: '● 进行中',
    statusDone: '✓ 已完成',
    statusInactive: '○ 暂停',
  },

  travel: {
    sectionLabel: '足迹',
    desc: '走过的地方',
    mapAriaHome: '首页世界足迹地图缩略',
    mapAriaFull: '世界足迹地图',
    fullLinkAria: '查看完整足迹',
  },

  contact: {
    overline: '06. 下一步',
    title: '聊聊吧',
    btn: '发封邮件',
  },

  footer: {
    by: '设计与制造 by Tu Chenguang',
    inspiredBy: '灵感致敬 brittanychiang.com',
  },

  carousel: {
    prevAria: '上一张',
    nextAria: '下一张',
  },

  pageApps: {
    metaTitle: '应用下载 — 涂晨光',
    metaDesc: '4 个我自己做的 Android 应用：课程日历、口袋记账、追分记、Tuner。安装包直接装手机用。',
    pageHeading: '应用下载',
    introSyncStrong: '在线同步',
    introSyncAfter: '的 web 改完自动升级；',
    introOfflineStrong: '完全离线',
    introOfflineAfter: '的没网也能开。',
    installHint: '手机浏览器打开本页点「下载 APK」。Android 拦未知来源时去「设置 → 应用与权限」放行。',
  },

  pageTravel: {
    metaTitle: '足迹 — 涂晨光',
    metaDesc: '走过的地方，记一记。',
    pageHeading: '足迹',
    pageDesc: '走过的地方',
    homeBase: '根据地',
    mapLoading: '地图加载中…',
    mapFailed: '地图加载失败',
    // base 列表项格式：region(or country) · city · note [date 至今]
    untilNow: '至今',
    // tooltip 时间格式："2026 年 4 月" 等
    tooltipMonth: (year: string, month: string) => `${year} 年 ${Number(month)} 月`,
  },

  baseMeta: {
    title: '涂晨光 Tu Chenguang',
    description: '我是一名在马来西亚就读的电子与电气工程大一学生，来自浙江杭州。这里记录我的成长，以及一些顺手做出来的小东西。',
  },

  blog: {
    listTitle: '博客',
    metaTitle: '博客 — 涂晨光',
    metaDesc: '涂晨光的博客，记录项目开发、留学生活和学到的新东西。',
    backToBlog: '← 返回博客',
    updatedOn: '更新于',
    rssTitle: '涂晨光的博客',
    rssDesc: '记录项目开发、留学生活和学到的新东西。',
  },
} as const;

export type Dict = typeof zh;
