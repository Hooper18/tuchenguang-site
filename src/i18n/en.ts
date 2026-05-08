// English copy. Shape mirrors zh.ts via DeepStringify (TS will catch missing keys).

import type { Dict } from './zh';

type DeepStringify<T> =
  T extends string ? string :
  T extends (...args: infer A) => infer R ? (...args: A) => R :
  T extends readonly (infer U)[] ? readonly DeepStringify<U>[] :
  T extends object ? { [K in keyof T]: DeepStringify<T[K]> } :
  T;

export const en: DeepStringify<Dict> = {
  nav: {
    about: 'About',
    work: 'Work',
    apps: 'Apps',
    now: 'Now',
    travel: 'Travel',
    contact: 'Contact',
    blog: 'Blog',
    langSwitch: '中',
    langSwitchAria: 'Switch to Chinese',
  },

  hero: {
    intro: "Hi, my name is",
    name: 'Tu Chenguang.',
    taglineLine1: 'Welcome to',
    taglineLine2: 'my world.',
    descBefore: "I'm a first-year Electrical & Electronic Engineering student in Malaysia, originally from Hangzhou. This site is where I track how I grow, plus a few ",
    descLink: "things I built on my own",
    descAfter: '.',
    cta: "See what I'm building",
  },

  about: {
    sectionLabel: 'About',
    p1Before: "Hi! I'm Tu Chenguang. Since September 2025 I've been studying at ",
    p1Strong: 'Xiamen University Malaysia',
    p1After: ' (XMUM), majoring in Electrical & Electronic Engineering (EEE).',
    p2Strong: 'Hangzhou, Zhejiang',
    p2After: ' is home. Graduated from Hangzhou High School.',
    p3: "Still figuring out what's next — grad school in China or abroad, both on the table. This site is where I keep notes on how I grow, and the projects I have fun with along the way.",
    p4Before: 'Outside of all that — ',
    p4Strong: 'basketball, swimming, travel, motorcycles',
    p4After: '. Long game: financial freedom first, then the rest of the world.',
    skillsLabel: 'Currently working with:',
    avatarAlt: 'Tu Chenguang',
  },

  projects: {
    sectionLabel: "Things I've made",
    githubAria: 'GitHub',
    liveAria: 'Live',
    apkAria: 'Download APK',
    apkLabel: 'APK',
  },

  apps: {
    sectionLabel: 'Apps',
    introSyncStrong: 'Cloud-sync',
    introSyncAfter: ' apps stay current with the web automatically; ',
    introOfflineStrong: 'fully offline',
    introOfflineAfter: ' apps run with or without a connection.',
    badgeSync: 'Cloud sync',
    badgeOffline: 'Offline',
    webLink: 'Web ↗',
    download: 'Download APK',
  },

  now: {
    sectionLabel: 'Now',
    lastUpdated: 'Last updated: May 5, 2026',
    statusActive: '● In progress',
    statusDone: '✓ Done',
    statusInactive: '○ On hold',
  },

  travel: {
    sectionLabel: 'Travel',
    desc: "Places I've been",
    mapAriaHome: "World map thumbnail of places I've been",
    mapAriaFull: "World map of places I've been",
    fullLinkAria: 'See the full map',
  },

  contact: {
    overline: "06. What's next",
    title: 'Get in touch',
    btn: 'Say hello',
  },

  footer: {
    by: 'Designed & built by Tu Chenguang',
    inspiredBy: 'Inspired by brittanychiang.com',
  },

  carousel: {
    prevAria: 'Previous slide',
    nextAria: 'Next slide',
  },

  pageApps: {
    metaTitle: 'Apps — Tu Chenguang',
    metaDesc: "Four Android apps I built for myself: a class scheduler, a personal ledger, a billiards scorer, and a guitar tuner. Install the APKs straight to your phone.",
    pageHeading: 'Apps',
    introSyncStrong: 'Cloud-sync',
    introSyncAfter: ' apps stay current with the web automatically; ',
    introOfflineStrong: 'fully offline',
    introOfflineAfter: ' apps run with or without a connection.',
    installHint: "Open this page in your phone's browser and tap \"Download APK\". If Android blocks an unknown source, allow it under Settings → Apps & Permissions.",
  },

  pageTravel: {
    metaTitle: 'Travel — Tu Chenguang',
    metaDesc: "A small log of places I've been.",
    pageHeading: 'Travel',
    pageDesc: "Places I've been",
    homeBase: 'Home base',
    mapLoading: 'Loading map…',
    mapFailed: 'Failed to load map',
    untilNow: 'present',
    tooltipMonth: (year: string, month: string) => {
      const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${names[Number(month) - 1]} ${year}`;
    },
  },

  baseMeta: {
    title: 'Tu Chenguang',
    description: "I'm a first-year EEE student in Malaysia, originally from Hangzhou. This site tracks how I grow, plus a few small things I built on my own.",
  },

  blog: {
    listTitle: 'Blog',
    metaTitle: 'Blog — Tu Chenguang',
    metaDesc: "Notes on the projects I'm building, life as an international student, and whatever I'm learning along the way.",
    backToBlog: '← Back to blog',
    updatedOn: 'Updated',
    rssTitle: "Tu Chenguang's blog",
    rssDesc: "Notes on the projects I'm building, life as an international student, and whatever I'm learning along the way.",
  },
};
