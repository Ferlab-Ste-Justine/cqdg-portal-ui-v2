import Empty from '@ferlab/ui/core/components/Empty';
import { BarDatum, BarSvgProps, ResponsiveBar } from '@nivo/bar';
import { Typography } from 'antd';

import { getCommonColors } from 'common/charts';

import styles from './index.module.scss';

type OwnProps = Omit<BarSvgProps<BarDatum>, 'width' | 'height'> & {
  title?: string;
  height: number;
};

const { Title } = Typography;

const BarChart = ({ title, height, data, ...rest }: OwnProps) => (
  <div className={styles.barChartWrapper}>
    {title && <Title level={5}>{title}</Title>}
    {data?.length ? (
      <div className={styles.chartWrapper} style={{ height: height }}>
        <ResponsiveBar
          {...rest}
          data={data}
          colors={rest.colors || getCommonColors()}
          colorBy="indexValue"
          onMouseEnter={(_, e: any) => {
            if (rest.onMouseEnter) {
              rest.onMouseEnter(_, e);
            }
            e.target.style.cursor = 'pointer';
          }}
        />
      </div>
    ) : (
      <Empty imageType="grid" size="large" />
    )}
  </div>
);

export default BarChart;
