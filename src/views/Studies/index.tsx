import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { INDEXES } from 'graphql/constants';
import { STUDIES_AGGREGATIONS } from 'graphql/studies/queries';

import useGetAggregations from 'hooks/graphql/useGetAggregations';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import PageContent from './components/PageContent';
import StudiesSidebar from './components/Sidebar';
import { SCROLL_WRAPPER_ID, STUDIES_EXPLORATION_QB_ID } from './utils/constant';

import styles from './index.module.scss';

const Studies = () => {
  const { queryList, activeQuery } = useQueryBuilderState(STUDIES_EXPLORATION_QB_ID);
  const studyMappingResults = useGetExtendedMappings(INDEXES.STUDY);

  const results = useGetAggregations(
    {
      sqon: resolveSyntheticSqon(queryList, activeQuery),
    },
    STUDIES_AGGREGATIONS(['domain', 'population', 'icd_terms', 'mondo_terms']),
    INDEXES.STUDY,
  );

  return (
    <div className={styles.studiesExplorationLayout}>
      <StudiesSidebar
        queryBuilderId={STUDIES_EXPLORATION_QB_ID}
        aggregations={results.aggregations}
        extendedMapping={studyMappingResults}
        filters={activeQuery as ISqonGroupFilter}
        isLoading={studyMappingResults.loading || results.loading}
      />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent studiesMapping={studyMappingResults} />
      </ScrollContent>
    </div>
  );
};

export default Studies;
