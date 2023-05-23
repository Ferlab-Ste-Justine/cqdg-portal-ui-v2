import intl from 'react-intl-universal';
import { ExperimentOutlined } from '@ant-design/icons';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { BIOSPECIMEN_SEARCH_BY_ID_QUERY } from 'graphql/biospecimens/queries';
import { INDEXES } from 'graphql/constants';

import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/search/GlobalSearch/utils';
import SelectItem from 'components/uiKit/select/SelectItem';
import { uniqBy } from 'utils/array';

const SampleSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);
  const sqon = activeQuery as ISqonGroupFilter;

  return (
    <GlobalSearch<IBiospecimenEntity>
      queryBuilderId={queryBuilderId}
      field="sample_id"
      index={INDEXES.BIOSPECIMEN}
      title={intl.get('components.search.searchBySampleId')}
      placeholder={intl.get('components.search.samplePlaceholder')}
      emptyDescription={intl.get('components.search.noSampleFound')}
      query={BIOSPECIMEN_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options, matchRegex, search) =>
        uniqBy(options, (opt: { sample_id: string }) => opt.sample_id).map((option) => ({
          label: (
            <SelectItem
              icon={<ExperimentOutlined />}
              title={highlightSearchMatch(option.sample_id, matchRegex, search)}
            />
          ),
          value: option.sample_id,
        }))
      }
    />
  );
};

export default SampleSearch;
