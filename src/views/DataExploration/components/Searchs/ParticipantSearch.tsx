import intl from 'react-intl-universal';
import { UserOutlined } from '@ant-design/icons';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { GET_PARTICIPANT_BY_ID } from 'graphql/participants/queries';

import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/search/GlobalSearch/utils';
import SelectItem from 'components/uiKit/select/SelectItem';

const ParticipantSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);

  return (
    <GlobalSearch<IParticipantEntity>
      queryBuilderId={queryBuilderId}
      field="participant_id"
      index={INDEXES.PARTICIPANT}
      placeholder={intl.get('components.search.participantPlaceholder')}
      emptyDescription={intl.get('components.search.noParticipantFound')}
      query={GET_PARTICIPANT_BY_ID}
      sqon={activeQuery as ISqonGroupFilter}
      optionsFormatter={(options, matchRegex, search) =>
        options.map((option) => ({
          label: (
            <SelectItem
              icon={<UserOutlined />}
              title={highlightSearchMatch(option.participant_id, matchRegex, search)}
            />
          ),
          value: option.participant_id,
        }))
      }
      title={intl.get('components.search.searchByParticipantId')}
    />
  );
};

export default ParticipantSearch;
