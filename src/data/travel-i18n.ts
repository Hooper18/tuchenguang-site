// 足迹 zh → en 单向翻译映射。新增地点时同时更新 travel.json + 此处。
// 任何 lookup 落空都会回退到中文原值（避免渲染空字符串）。

import type { Lang } from '../i18n';

const countries: Record<string, string> = {
  '中国': 'China',
  '中国香港': 'Hong Kong',
  '中国澳门': 'Macau',
  '中国台湾': 'Taiwan',
  '马来西亚': 'Malaysia',
  '新加坡': 'Singapore',
  '印度尼西亚': 'Indonesia',
  '柬埔寨': 'Cambodia',
  '日本': 'Japan',
  '韩国': 'South Korea',
};

const regions: Record<string, string> = {
  '浙江': 'Zhejiang',
  '江西': 'Jiangxi',
  '河南': 'Henan',
  '江苏': 'Jiangsu',
  '上海': 'Shanghai',
  '云南': 'Yunnan',
  '湖北': 'Hubei',
  '辽宁': 'Liaoning',
  '黑龙江': 'Heilongjiang',
  '海南': 'Hainan',
  '四川': 'Sichuan',
  '重庆': 'Chongqing',
};

const cities: Record<string, string> = {
  '杭州': 'Hangzhou',
  '萍乡': 'Pingxiang',
  '周口': 'Zhoukou',
  '南京': 'Nanjing',
  '宁波': 'Ningbo',
  '上海': 'Shanghai',
  '昆明': 'Kunming',
  '丽江': 'Lijiang',
  '香格里拉': 'Shangri-La',
  '孝感': 'Xiaogan',
  '平顶山': 'Pingdingshan',
  '沈阳': 'Shenyang',
  '哈尔滨': 'Harbin',
  '海口': 'Haikou',
  '成都': 'Chengdu',
  '重庆': 'Chongqing',
  '香港': 'Hong Kong',
  '澳门': 'Macau',
  '台北': 'Taipei',
  '吉隆坡': 'Kuala Lumpur',
  '马六甲': 'Malacca',
  '新加坡': 'Singapore',
  '槟城': 'Penang',
  '兰卡威': 'Langkawi',
  '巴厘岛': 'Bali',
  '暹粒': 'Siem Reap',
  '大阪': 'Osaka',
  '京都': 'Kyoto',
  '东京': 'Tokyo',
  '镰仓': 'Kamakura',
  '首尔': 'Seoul',
};

const notes: Record<string, string> = {
  '老家': 'Hometown',
  '在读': 'Studying',
  '武功山': 'Mt. Wugong',
  '登巴萨': 'Denpasar',
};

function lookup(table: Record<string, string>, key: string | null | undefined): string {
  if (key == null) return '';
  return table[key] ?? key;
}

export function tCountry(zh: string, lang: Lang): string {
  return lang === 'zh' ? zh : lookup(countries, zh);
}

export function tRegion(zh: string | null, lang: Lang): string {
  if (zh == null) return '';
  return lang === 'zh' ? zh : lookup(regions, zh);
}

export function tCity(zh: string, lang: Lang): string {
  return lang === 'zh' ? zh : lookup(cities, zh);
}

export function tNote(zh: string | null, lang: Lang): string {
  if (zh == null) return '';
  return lang === 'zh' ? zh : lookup(notes, zh);
}
