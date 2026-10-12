import { describe, expect, it } from 'vitest';
import { nowItems } from './now';

describe('now completed project links', () => {
  const expectedCompletedProjects = [
    {
      title: { zh: '穷游机票查价', en: 'Budget Flight Fare Finder' },
      url: 'https://flightticket.tuchenguang.com',
    },
    {
      title: { zh: '博彩套利探索', en: 'Betting Arbitrage Exploration' },
      url: 'https://ezbet.tuchenguang.com',
    },
    {
      title: { zh: '世界杯比分预测', en: 'World Cup score predictor' },
      url: 'https://worldcup.tuchenguang.com',
    },
    {
      title: { zh: '吉他调音器', en: 'Guitar tuner' },
      url: 'https://tuner.tuchenguang.com',
    },
    {
      title: { zh: '台球计分', en: 'Billiards scorer' },
      url: 'https://billiards.tuchenguang.com',
    },
  ];

  it('keeps the five linked completed projects at the top in display order', () => {
    expect(
      nowItems.slice(0, expectedCompletedProjects.length).map((item) => ({
        status: item.status,
        title: item.title,
        description: item.description,
        url: item.url,
      })),
    ).toEqual(
      expectedCompletedProjects.map((project) => ({
        status: 'done',
        title: project.title,
        description: { zh: '', en: '' },
        url: project.url,
      })),
    );
  });

  it('keeps the quant project shelved with its link', () => {
    const quantProject = nowItems.find((item) => item.title.zh === '量化交易软件（半成品）');
    expect(quantProject).toMatchObject({
      status: 'inactive',
      url: 'https://quant.tuchenguang.com',
    });
  });
});
