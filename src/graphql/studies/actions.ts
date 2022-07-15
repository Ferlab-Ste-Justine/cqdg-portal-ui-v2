import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { IStudyResultTree } from './models';
import { GET_STUDIES_QUERY } from './queries';

export const useStudies = (variables?: QueryVariable) => {
  const { loading, result } = useLazyResultQuery<IStudyResultTree>(GET_STUDIES_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Study?.hits?.edges || []),
    total: result?.Study?.hits?.total || 0,
  };
};
