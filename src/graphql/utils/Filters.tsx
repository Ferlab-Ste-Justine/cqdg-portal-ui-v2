import intl from 'react-intl-universal';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import FilterSelector from '@ferlab/ui/core/components/filters/FilterSelector';
import { IFilter, TExtendedMapping } from '@ferlab/ui/core/components/filters/types';
import { updateActiveQueryFilters } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { keyEnhance, underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { getFilterGroup } from '@ferlab/ui/core/data/filters/utils';
import { getSelectedFilters } from '@ferlab/ui/core/data/sqon/utils';
import { IExtendedMappingResults, TAggregations } from '@ferlab/ui/core/graphql/types';

import { getFacetsDictionary, getFiltersDictionary } from 'utils/translation';

import { transformNameIfNeeded } from './nameTransformer';

export interface RangeAggs {
  stats: {
    max: number;
    min: number;
  };
}
export interface TermAggs {
  buckets: TermAgg[];
}

export interface TermAgg {
  doc_count: number;
  key: string;
}

export type Aggs = TermAggs | RangeAggs;

const isTermAgg = (obj: TermAggs) => !!obj.buckets;

export const generateFilters = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
  className = '',
  filtersOpen = true,
  filterFooter = false,
  showSearchInput = false,
  useFilterSelector = false,
  index,
  headerTooltip,
}: {
  queryBuilderId: string;
  aggregations: TAggregations;
  extendedMapping: IExtendedMappingResults;
  className: string;
  filtersOpen: boolean;
  filterFooter: boolean;
  showSearchInput: boolean;
  useFilterSelector: boolean;
  index?: string;
  headerTooltip?: boolean;
}) =>
  Object.keys(aggregations || []).map((key) => {
    if (key === '__typename') return null;

    const found = (extendedMapping?.data || []).find(
      (f: TExtendedMapping) => f.field === underscoreToDot(key),
    );

    const filterGroup = getFilterGroup(
      found,
      aggregations[key],
      [],
      filterFooter,
      headerTooltip,
      getFacetsDictionary(),
    );
    const filters = getFilters(aggregations, key);
    const selectedFilters = getSelectedFilters({
      queryBuilderId,
      filters,
      filterGroup,
    });
    const FilterComponent = useFilterSelector ? FilterSelector : FilterContainer;
    const searchInputVisible = showSearchInput || key === 'study_code';

    return (
      <div className={className} key={`${key}_${filtersOpen}`}>
        <FilterComponent
          dictionary={getFiltersDictionary()}
          maxShowing={5}
          isOpen={filtersOpen}
          filterGroup={filterGroup}
          filters={filters}
          collapseProps={{
            headerBorderOnly: true,
            arrowIcon: 'caretFilled',
          }}
          onChange={(fg, f) => {
            updateActiveQueryFilters({
              queryBuilderId,
              filterGroup: fg,
              selectedFilters: f,
              index,
            });
          }}
          searchInputVisible={searchInputVisible}
          selectedFilters={selectedFilters}
        />
      </div>
    );
  });

const translateWhenNeeded = (group: string, key: string) =>
  intl.get(`facets.options.${group}.${keyEnhance(key)}`).defaultMessage(keyEnhance(key));

export const getFilters = (aggregations: TAggregations | null, key: string): IFilter[] => {
  if (!aggregations || !key) return [];

  if (isTermAgg(aggregations[key])) {
    return aggregations[key!].buckets
      .map((f: any) => {
        const enhanceKey = f.key_as_string ?? f.key;
        const translatedKey = translateWhenNeeded(key, enhanceKey);
        const name = transformNameIfNeeded(key, translatedKey || enhanceKey);
        return {
          data: {
            count: f.doc_count,
            key: enhanceKey,
          },
          id: f.key,
          name,
        };
      })
      .filter((f: any) => f.name);
  } else if (aggregations[key]?.stats) {
    return [
      {
        data: { max: 1, min: 0 },
        id: key,
        name: translateWhenNeeded(key, key),
      },
    ];
  }
  return [];
};
