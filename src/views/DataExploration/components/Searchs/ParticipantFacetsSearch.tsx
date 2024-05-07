import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import useQueryBuilderState, {
  updateActiveQueryField,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { ISqonGroupFilter, MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Checkbox, Space, Tag, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { AGGREGATION_QUERY } from 'graphql/queries';

import GlobalSearch from 'components/uiKit/search/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/search/GlobalSearch/utils';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import styles from './ParticipantFacetsSearch.module.scss';

interface IOption {
  field: string;
  value: ReactNode;
  count: number;
  handleChange: () => any;
}

const Option = ({ field, count, value, handleChange }: IOption) => (
  <Space className={styles.checkboxContainer}>
    <Checkbox onChange={handleChange} type="checkbox">
      <div className={styles.checkboxTextContainer}>
        <Typography.Text ellipsis className={styles.checkboxText}>
          {field}
        </Typography.Text>
        <Typography.Text ellipsis className={styles.checkboxText}>
          {value}
        </Typography.Text>
      </div>
    </Checkbox>
    <Tag className={styles.tag}>{numberFormat(count)}</Tag>
  </Space>
);

interface IParticipantFacetsSearch {
  queryBuilderId: string;
  facets: string[];
}

const ParticipantFacetsSearch = ({ queryBuilderId, facets = [] }: IParticipantFacetsSearch) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);

  const facetsMapped: string[] = facets.map((facet) => underscoreToDot(facet));
  console.log('facetsMapped==', facetsMapped);

  const participantMappingResults = useGetExtendedMappings(INDEXES.PARTICIPANT);
  const query = AGGREGATION_QUERY(
    INDEXES.PARTICIPANT,
    facets,
    participantMappingResults,
    'GET_PARTICIPANT_FACET_AGG_QUERY',
  );

  return (
    <GlobalSearch<IParticipantEntity>
      queryBuilderId={queryBuilderId}
      field="participant_id"
      searchFields={facetsMapped}
      index={INDEXES.PARTICIPANT}
      placeholder={'male, proband, study1'}
      emptyDescription={intl.get('components.search.noParticipantFound')}
      title={'Recherche libre'}
      tooltipText={'Recherche dans toutes les Facettes'}
      query={query}
      sqon={activeQuery as ISqonGroupFilter}
      isAggregation
      disableOnSelect
      optionsFormatter={(options: any, matchRegex, search) =>
        options.map((option: any) => ({
          label: (
            <Option
              value={highlightSearchMatch(option.value, matchRegex, search)}
              field={option.field}
              count={option.count}
              handleChange={() =>
                updateActiveQueryField({
                  queryBuilderId,
                  field: option.field,
                  value: [option.value],
                  index: INDEXES.PARTICIPANT,
                  merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
                })
              }
            />
          ),
          value: option.value,
        }))
      }
    />
  );
};

export default ParticipantFacetsSearch;
