import Empty from '@ferlab/ui/core/components/Empty';
import { DefaultRawDatum, PieSvgProps, ResponsivePie } from '@nivo/pie';
import { Typography } from 'antd';

import { getCommonColors } from 'common/charts';

import styles from './index.module.scss';

type OwnProps = Omit<PieSvgProps<DefaultRawDatum>, 'width' | 'height'> & {
  title?: string;
  height: number;
  width?: number | string;
};

const { Title } = Typography;

const PieChart = ({
  title,
  height,
  width = 'unset',
  enableArcLabels = false,
  enableArcLinkLabels = false,
  data,
  ...rest
}: OwnProps) => (
  <div className={styles.pieChartWrapper}>
    {title && <Title level={5}>{title}</Title>}
    {data?.length ? (
      <div className={styles.chartWrapper} style={{ height: height, width: width }}>
        <ResponsivePie
          {...rest}
          data={data}
          colors={rest.colors || getCommonColors()}
          enableArcLabels={enableArcLabels}
          enableArcLinkLabels={enableArcLinkLabels}
          onMouseEnter={(_, e: any) => {
            if (rest.onMouseEnter) {
              rest.onMouseEnter(_, e);
            }
            e.target.style.cursor = 'pointer';
          }}
        />
      </div>
    ) : (
      <Empty imageType="grid" />
    )}
  </div>
);

export default PieChart;
