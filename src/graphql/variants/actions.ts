import { INDEXES } from 'graphql/constants';
import { hydrateResults, IQueryResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IVariantEntity, IVariantResultTree } from './models';
import { SEARCH_VARIANT_QUERY } from './queries';

export const useVariants = (variables?: QueryVariable): IQueryResults<IVariantEntity[]> => {
  const { loading, result } = useLazyResultQuery<IVariantResultTree>(SEARCH_VARIANT_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Variant?.hits?.edges || []),
    total: result?.Variant?.hits?.total || 0,
  };
};

interface IUseVariantProps {
  field: string;
  values: string[];
}
interface IUseVariantReturn {
  loading: boolean;
  data: IVariantEntity | null;
}

export const useVariant = ({ field, values }: IUseVariantProps): IUseVariantReturn => {
  const sqon = {
    content: [{ content: { field, value: values, index: INDEXES.VARIANT }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IVariantResultTree>(SEARCH_VARIANT_QUERY, {
    variables: { sqon },
  });

  const data = result?.Variant?.hits?.edges[0].node || null;

  return {
    loading,
    data,
  };
};
