import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { Space, Typography } from 'antd';
import { useStudies } from 'graphql/studies/actions';
import isEmpty from 'lodash/isEmpty';
import StudiesTab from 'views/Studies/components/PageContent/Studies';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  STUDIES_EXPLORATION_QB_ID,
} from 'views/Studies/utils/constant';

import styles from './index.module.css';

const { Title } = Typography;

const PageContent = () => {
  const { queryList, activeQuery } = useQueryBuilderState(STUDIES_EXPLORATION_QB_ID);
  const [studiesQueryConfig, setStudiesQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const studiesResolvedSqon = resolveSyntheticSqon(queryList, activeQuery);

  const studiesResults = useStudies({
    first: studiesQueryConfig.size,
    offset: studiesQueryConfig.size * (studiesQueryConfig.pageIndex - 1),
    sqon: studiesResolvedSqon,
    sort: isEmpty(studiesQueryConfig.sort)
      ? [{ field: 'study_code', order: 'asc' }]
      : studiesQueryConfig.sort,
  });

  useEffect(() => {
    setStudiesQueryConfig({
      ...studiesQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  return (
    <Space direction="vertical" size={24} className={styles.studyExplorePageContent}>
      <Title level={4} className={styles.studyTitle} data-cy="Title_Studies">
        {intl.get('screen.studies.title')}
      </Title>
      <StudiesTab
        results={studiesResults}
        setQueryConfig={setStudiesQueryConfig}
        queryConfig={studiesQueryConfig}
        sqon={studiesResolvedSqon}
      />
    </Space>
  );
};

export default PageContent;
