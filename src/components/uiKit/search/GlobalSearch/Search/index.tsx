import { useEffect, useState } from 'react';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateWildCardValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { DocumentNode } from 'graphql';
import { INDEXES } from 'graphql/constants';

import SearchAutocomplete, {
  ISearchAutocomplete,
  OptionsType,
} from 'components/uiKit/search/GlobalSearch/Search/SearchAutocomplete';
import { ArrangerApi } from 'services/api/arranger';
import { ISuggestionPayload } from 'services/api/arranger/models';

const aggregationToData = (buckets: any[] = [], field: string): any[] =>
  buckets.map(({ doc_count, key }) => {
    const dataKey = key === ArrangerValues.missing ? 'No Data' : key;
    return {
      field,
      value: dataKey,
      count: doc_count,
    };
  });

interface IGlobalSearch<T> {
  query: DocumentNode;
  index: INDEXES;
  searchKey: string[];
  setCurrentOptions: (result: T[], search: string) => OptionsType[];
  searchValueTransformer?: (search: string) => string;
  onSelect: (values: string[]) => void;
  customHandleSearch?: TCustomHandleSearch<T>;
  isAggregation?: boolean;
}

export type TCustomHandleSearch<T> = (searchText: string) => Promise<ISuggestionPayload<T>>;

type TGlobalSearch<T> = IGlobalSearch<T> &
  Omit<ISearchAutocomplete, 'onClose' | 'onSearch' | 'onSelect' | 'options'>;

const Search = <T,>({
  onSelect,
  query,
  index,
  searchKey,
  selectedItems = [],
  setCurrentOptions,
  searchValueTransformer,
  customHandleSearch,
  isAggregation = false,
  ...props
}: TGlobalSearch<T>) => {
  const [options, setOptions] = useState<OptionsType[]>([]);

  const handleSearch = async (search: string) => {
    if (customHandleSearch) {
      if (search) {
        const results = await customHandleSearch(search);
        setOptions(setCurrentOptions(results.suggestions, search));
      }
    } else {
      const payload = {
        operator: BooleanOperators.or,
        newFilters: searchKey.map((key) =>
          generateWildCardValueFilter({
            fields: [key],
            value: [`*${search}*`],
            index,
          }),
        ),
      };
      const searchFilter = generateQuery(payload);

      const { data } = await ArrangerApi.graphqlRequest<any>({
        query: query.loc?.source.body,
        variables: {
          sqon: {
            op: searchFilter.op,
            content: searchFilter.content,
          },
        },
      });

      let _options = (data?.data?.[index]?.hits?.edges || []).map((edges: any) => ({
        ...edges?.node,
      }));
      if (isAggregation) {
        const bucketsValues = Object.entries(data?.data?.[index]?.aggregations)?.map((value: any) =>
          aggregationToData(value[1]?.buckets || [], value[0]),
        );
        _options = bucketsValues?.flat() || [];
      }

      setOptions(setCurrentOptions(_options, search));
    }
  };

  useEffect(() => {
    handleSearch('');
    // run handleSearch just once to get all the options first
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchAutocomplete
      onSearch={(value) =>
        handleSearch(searchValueTransformer ? searchValueTransformer(value) : value)
      }
      onSelect={onSelect}
      options={options}
      selectedItems={selectedItems}
      {...props}
    />
  );
};

export default Search;
