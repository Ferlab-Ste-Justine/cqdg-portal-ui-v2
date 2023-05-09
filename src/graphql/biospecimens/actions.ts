import { IQueryOperationsConfig, IQueryVariable } from '@ferlab/ui/core/graphql/types';
import { computeSearchAfter, hydrateResults } from '@ferlab/ui/core/graphql/utils';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IBiospecimenResultTree } from './models';
import { GET_BIOSPECIMEN_COUNT, GET_BIOSPECIMENS } from './queries';

export const useBiospecimens = (
  variables?: IQueryVariable,
  operations?: IQueryOperationsConfig,
) => {
  const { loading, result } = useLazyResultQuery<IBiospecimenResultTree>(GET_BIOSPECIMENS, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Biospecimen?.hits?.edges || [], operations?.previous),
    total: result?.Biospecimen?.hits?.total || 0,
    searchAfter: computeSearchAfter(result?.Biospecimen?.hits?.edges || [], operations),
  };
};

export const useTotalBiospecimens = (variables?: IQueryVariable): number => {
  const { result } = useLazyResultQuery<IBiospecimenResultTree>(GET_BIOSPECIMEN_COUNT, {
    variables,
  });

  return result?.Biospecimen?.hits?.total || 0;
};
