import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import { MAX_ITEMS_QUERY } from 'common/constants';
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

export const useFiles = ({ field, values }: { field: string; values: string[] }) => {
  const sqon = {
    content: [{ content: { field, value: values, index: INDEXES.FILE }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IFileResultTree>(GET_FILES, {
    variables: { sqon, first: MAX_ITEMS_QUERY },
  });

  const data = hydrateResults(result?.File?.hits?.edges || []) || undefined;

  return {
    loading,
    data,
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
