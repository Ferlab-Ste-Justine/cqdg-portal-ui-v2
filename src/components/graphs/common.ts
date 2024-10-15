import { LegendProps } from '@nivo/legends';

export const legends: LegendProps[] = [
  {
    anchor: 'bottom',
    translateX: -320,
    translateY: 100,
    direction: 'column',
    itemWidth: 100,
    itemHeight: 18,
  },
];

export const graphModalSettings = {
  margin: {
    top: 0,
    bottom: 150,
    left: 12,
    right: 12,
  },
  legends,
};

export const graphSetting = {
  margin: {
    top: 0,
    bottom: 8,
    left: 12,
    right: 12,
  },
};
