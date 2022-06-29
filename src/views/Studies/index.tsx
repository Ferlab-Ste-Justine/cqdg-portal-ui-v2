import ApolloProvider from 'provider/ApolloProvider';
import { GraphqlBackend } from 'provider/types';

import styles from './index.module.scss';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { SCROLL_WRAPPER_ID, STUDIES_EXPLORATION_QB_ID } from './utils/constant';
import PageContent from './components/PageContent';
import StudiesSidebar from './components/Sidebar';
import useGetAggregations from 'hooks/graphql/useGetAggregations';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { STUDIES_AGGREGATIONS } from 'graphql/studies/queries';

const Studies = () => {
  const { queryList, activeQuery } = useQueryBuilderState(STUDIES_EXPLORATION_QB_ID);
  const studyMappingResults = useGetExtendedMappings(INDEXES.STUDY);

  const results = useGetAggregations(
    {
      sqon: resolveSyntheticSqon(queryList, activeQuery),
    },
    STUDIES_AGGREGATIONS([
      'domain',
      'population',
      'donors__diagnoses__tagged_icd__main_category',
      'donors__observed_phenotype_tagged__main_category',
      'donors__diagnoses__tagged_mondo__main_category',
      'files__data_category',
    ]),
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

const StudiesWrapper = (props: any) => {
  return (
    <ApolloProvider backend={GraphqlBackend.ARRANGER}>
      <Studies {...props} />
    </ApolloProvider>
  );
};

export default StudiesWrapper;
