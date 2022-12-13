import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IFileResultTree } from './models';
import { GET_FILES } from './queries';

export const useDataFiles = (variables?: QueryVariable) => {
  const { loading, result } = useLazyResultQuery<IFileResultTree>(GET_FILES, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.File?.hits?.edges || []),
    total: result?.File?.hits?.total || 0,
  };
};
