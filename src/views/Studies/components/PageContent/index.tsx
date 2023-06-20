import { ReactElement, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { ReadOutlined } from '@ant-design/icons';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { Space, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { useStudies } from 'graphql/studies/actions';
import { IStudyResultTree } from 'graphql/studies/models';
import { GET_STUDIES_COUNT } from 'graphql/studies/queries';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import StudiesTab from 'views/Studies/components/PageContent/Studies';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  STUDIES_EXPLORATION_QB_ID,
} from 'views/Studies/utils/constant';

import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import { ArrangerApi } from 'services/api/arranger';
import { combineExtendedMappings } from 'utils/fieldMapper';
import { getFacetsDictionary, getQueryBuilderDictionary } from 'utils/translation';

import styles from './index.module.scss';

const { Title } = Typography;

type OwnProps = {
  studiesMapping: ExtendedMappingResults;
  tabId?: string;
};

const PageContent = ({ studiesMapping }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(STUDIES_EXPLORATION_QB_ID);
  const [selectedFilterContent, setSelectedFilterContent] = useState<ReactElement | undefined>(
    undefined,
  );
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

  const facetTransResolver = (key: string) => {
    const title = get(getFacetsDictionary(), key, key);
    return title
      ? title
      : combineExtendedMappings([studiesMapping])?.data?.find(
          (mapping: ExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  return (
    <Space direction="vertical" size={24} className={styles.studyExplorePageContent}>
      <Title level={4} className={styles.studyTitle} data-cy="Title_Studies">
        {intl.get('screen.studies.title')}
      </Title>
      <QueryBuilder
        id={STUDIES_EXPLORATION_QB_ID}
        className="studies-exploration-repo__query-builder"
        headerConfig={{
          showHeader: false,
          showTools: false,
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            const field = filter.content.field;
            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={STUDIES_EXPLORATION_QB_ID}
                index={INDEXES.STUDY}
                field={dotToUnderscore(field)}
                sqon={studiesResolvedSqon}
                extendedMappingResults={studiesMapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<ReadOutlined size={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={studiesResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver, [])}
        getResolvedQueryForCount={(sqon) => resolveSyntheticSqon(queryList, sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IStudyResultTree }>({
            query: GET_STUDIES_COUNT.loc?.source.body,
            variables: {
              sqon: resolveSyntheticSqon(queryList, sqon),
            },
          });
          return data?.data?.Study.hits.total ?? 0;
        }}
      />
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
