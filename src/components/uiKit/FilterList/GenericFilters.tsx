import { Layout, Spin } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { AGGREGATION_QUERY } from 'graphql/queries';
import { generateFilters } from 'graphql/utils/Filters';

import useGetAggregations from 'hooks/graphql/useGetAggregations';

import styles from './Filters.module.scss';

interface IGenericFiltersProps {
  queryBuilderId: string;
  index: string;
  field: string;
  sqon: any;
  extendedMappingResults: ExtendedMappingResults;
}

const GenericFilters = ({
  queryBuilderId,
  index,
  field,
  sqon,
  extendedMappingResults,
}: IGenericFiltersProps) => {
  const query = AGGREGATION_QUERY(index, [field], extendedMappingResults);
  const results = useGetAggregations({ sqon }, query, index);

  return (
    <Spin size="large" spinning={results.loading}>
      <Layout className={`${styles.filterWrapper} ${styles.genericFilterWrapper}`}>
        {generateFilters({
          queryBuilderId,
          aggregations: results?.aggregations,
          extendedMapping: extendedMappingResults,
          className: styles.customFilterContainer,
          filtersOpen: true,
          filterFooter: true,
          showSearchInput: true,
          useFilterSelector: true,
          index,
        })}
      </Layout>
    </Spin>
  );
};

export default GenericFilters;
