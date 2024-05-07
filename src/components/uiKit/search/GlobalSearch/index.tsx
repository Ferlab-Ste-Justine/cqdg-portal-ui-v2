import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter, MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { findSqonValueByField } from '@ferlab/ui/core/data/sqon/utils';
import { DocumentNode } from 'graphql';
import { INDEXES } from 'graphql/constants';

import Search, { TCustomHandleSearch } from 'components/uiKit/search/GlobalSearch/Search';
import { OptionsType } from 'components/uiKit/search/GlobalSearch/Search/SearchAutocomplete';

export interface ICustomSearchProps {
  queryBuilderId: string;
}

interface OwnProps<T> {
  queryBuilderId: string;
  title: string;
  placeholder: string;
  field: string;
  emptyDescription?: string;
  searchFields?: string[];
  index: INDEXES;
  query: DocumentNode;
  sqon: ISqonGroupFilter;
  tooltipText?: string;
  limit?: number;
  handleSearch?: TCustomHandleSearch<T>;
  optionsFormatter: (options: T[], matchRegex: RegExp, search: string) => OptionsType[];
  isAggregation?: boolean;
  disableOnSelect?: boolean;
}

const GlobalSearch = <T,>({
  queryBuilderId,
  title,
  placeholder,
  emptyDescription,
  field,
  searchFields,
  index,
  query,
  sqon,
  optionsFormatter,
  tooltipText,
  limit,
  handleSearch,
  isAggregation = false,
  disableOnSelect = false,
}: OwnProps<T>) => (
  <Search<T>
    onSelect={(values) =>
      !disableOnSelect &&
      updateActiveQueryField({
        queryBuilderId,
        field,
        value: values,
        index,
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
      })
    }
    index={index}
    tooltipText={tooltipText}
    emptyDescription={emptyDescription}
    placeHolder={placeholder}
    query={query}
    searchKey={searchFields ?? [field]}
    selectedItems={findSqonValueByField(field, sqon) as string[]}
    customHandleSearch={handleSearch}
    setCurrentOptions={(options, search) =>
      optionsFormatter(
        options,
        new RegExp(search.replace(/[-/\\^$*+?.()|[\]{}]/g, ''), 'gi'),
        search,
      )
    }
    title={title}
    limit={limit}
    isAggregation={isAggregation}
  />
);

export default GlobalSearch;
