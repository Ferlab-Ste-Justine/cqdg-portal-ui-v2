import { DocumentNode } from '@apollo/client';
import { IQueryOperationsConfig, IQueryVariable } from '@ferlab/ui/core/graphql/types';
import { computeSearchAfter, hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { INDEXES } from 'graphql/constants';

import { MAX_ITEMS_QUERY } from 'common/constants';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IFileResultTree } from './models';
import { GET_FILES, GET_FILES_COUNT } from './queries';

export const useDataFiles = (
  variables?: IQueryVariable,
  operations?: IQueryOperationsConfig,
  query?: DocumentNode,
) => {
  const { loading, result } = useLazyResultQuery<IFileResultTree>(query || GET_FILES, {
    variables,
    fetchPolicy: 'network-only',
  });

  return {
    loading,
    data: hydrateResults(result?.File?.hits?.edges || [], operations?.previous),
    total: result?.File?.hits?.total || 0,
    searchAfter: computeSearchAfter(result?.File?.hits?.edges || [], operations),
  };
};

export const useFiles = ({
  field,
  values,
  query,
}: {
  field: string;
  values: string[];
  query: DocumentNode;
}) => {
  const sqon = {
    content: [{ content: { field, value: values, index: INDEXES.FILE }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IFileResultTree>(query, {
    variables: { sqon, first: MAX_ITEMS_QUERY },
  });

  const data = hydrateResults(result?.File?.hits?.edges || []) || undefined;

  return {
    loading,
    data,
    total: result?.File?.hits?.total || 0,
  };
};

export const useFile = ({ field, value }: { field: string; value: string }) => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.FILE }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IFileResultTree>(GET_FILES, {
    variables: { sqon },
  });

  const data = result?.File?.hits?.edges[0]?.node || undefined;

  return {
    loading,
    data,
  };
};

export const useTotalDataFiles = (variables?: IQueryVariable): number => {
  const { result } = useLazyResultQuery<IFileResultTree>(GET_FILES_COUNT, {
    variables,
  });

  return result?.File?.hits?.total || 0;
};
