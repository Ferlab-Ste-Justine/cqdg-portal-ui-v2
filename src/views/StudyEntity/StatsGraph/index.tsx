import React from 'react';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse/index';
import { Card, Space, Typography } from 'antd';

import WrapperGraph from './WrapperGraph';

import styles from '@ferlab/ui/core/pages/EntityPage/EntityDescriptions/index.module.scss';

interface IStatsGraphProps {
  id: string;
  loading: boolean;
  title?: string;
  titleExtra?: React.ReactNode[];
  header: string;
  subHeader?: React.ReactNode;
}

const StatsGraph = ({ id, loading, title, titleExtra, header, subHeader }: IStatsGraphProps) => (
  <div className={styles.container} id={id}>
    {title && (
      <Typography.Title className={styles.title} level={4}>
        {title}
      </Typography.Title>
    )}
    <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
      <CollapsePanel className={styles.panel} extra={titleExtra} header={header} key="1">
        <Card className={styles.card} loading={loading}>
          <Space className={styles.content} direction="vertical" size={0}>
            {subHeader}
            <WrapperGraph />
          </Space>
        </Card>
      </CollapsePanel>
    </Collapse>
  </div>
);

export default StatsGraph;
