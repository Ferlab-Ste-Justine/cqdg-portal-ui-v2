import React from 'react';
import { Aggregations } from 'graphql/models';
import { ExtendedMappingResults } from 'graphql/models';
import { generateFilters } from 'graphql/utils/Filters';

import style from './index.module.scss';

export type SidebarFilterProps = {
  queryBuilderId: string;
  aggregations: Aggregations;
  extendedMapping: ExtendedMappingResults;
};

const SidebarFilters = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
}: SidebarFilterProps): React.ReactElement => (
  <>
    {generateFilters({
      queryBuilderId,
      aggregations,
      extendedMapping,
      className: style.facetCollapse,
      filtersOpen: true,
      filterFooter: true,
      showSearchInput: true,
      useFilterSelector: false,
    })}
  </>
);

export default SidebarFilters;
