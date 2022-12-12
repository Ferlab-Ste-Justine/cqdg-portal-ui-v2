import { hydrateResults, IQueryResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IBiospecimenEntity, IBiospecimenResultTree } from './models';
import { GET_BIOSPECIMENS } from './queries';

export const useBiospecimens = (variables?: QueryVariable): IQueryResults<IBiospecimenEntity[]> => {
  const { loading, result } = useLazyResultQuery<IBiospecimenResultTree>(GET_BIOSPECIMENS, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Biospecimen?.hits?.edges || []),
    total: result?.Biospecimen?.hits?.total || 0,
  };
};
