import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IStudyResultTree } from './models';
import { GET_STUDIES } from './queries';

export const useStudies = (variables?: QueryVariable) => {
  const { loading, result } = useLazyResultQuery<IStudyResultTree>(GET_STUDIES, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Study?.hits?.edges || []),
    total: result?.Study?.hits?.total || 0,
  };
};

export const useStudy = ({ field, value }: { field: string; value: string }) => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.PARTICIPANT }, op: 'in' }],
    op: 'and',
  };
  const { loading, result } = useLazyResultQuery<IStudyResultTree>(GET_STUDIES, {
    variables: { sqon },
  });
  const data = result?.Study?.hits?.edges[0]?.node || undefined;

  return {
    loading,
    data,
  };
};
