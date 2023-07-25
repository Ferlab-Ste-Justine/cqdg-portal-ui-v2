import React, { useEffect } from 'react';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse/index';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Card, Space, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';

import { queryId } from './WrapperGraph/getStudyEntityLayout';
import WrapperGraph from './WrapperGraph';

import styles from '@ferlab/ui/core/pages/EntityPage/EntityDescriptions/index.module.scss';

interface IStatsGraphProps {
  study_code: string;
  id: string;
  loading: boolean;
  title?: string;
  titleExtra?: React.ReactNode[];
  header: string;
  subHeader?: React.ReactNode;
}

const StatsGraph = ({
  study_code,
  id,
  loading,
  title,
  titleExtra,
  header,
  subHeader,
}: IStatsGraphProps) => {
  useEffect(() => {
    addQuery({
      queryBuilderId: queryId,
      query: generateQuery({
        newFilters: [
          generateValueFilter({
            field: 'study_code',
            value: study_code ? [study_code] : [],
            index: INDEXES.STUDY,
          }),
        ],
      }),
      setAsActive: true,
    });
  }, [study_code]);

  return (
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
};

export default StatsGraph;
