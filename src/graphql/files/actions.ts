import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IFileEntity, IFileResultTree } from './models';
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

interface IUseFileProps {
  field: string;
  values: string[];
}

interface IUseFileReturn {
  loading: boolean;
  data?: IFileEntity;
}

export const useFile = ({ field, values }: IUseFileProps): IUseFileReturn => {
  const sqon = {
    content: [{ content: { field, value: values, index: INDEXES.FILE }, op: 'in' }],
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
