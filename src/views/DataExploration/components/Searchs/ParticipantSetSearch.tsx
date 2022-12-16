import intl from 'react-intl-universal';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import SetSearch from 'components/uiKit/search/SetSearch';
import { SetType } from 'services/api/savedSet/models';

const ParticipantSetSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const sqon = useParticipantResolvedSqon(queryBuilderId);

  return (
    <SetSearch
      index={INDEXES.PARTICIPANT}
      title={intl.get('components.search.savedParticipantSets')}
      placeholder={intl.get('components.search.selectSavedSet')}
      emptyDescription={intl.get('components.search.noParticipantSetFound')}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      type={SetType.PARTICIPANT}
      sqon={sqon}
    />
  );
};

export default ParticipantSetSearch;
