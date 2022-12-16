import intl from 'react-intl-universal';
import useBiospecimenResolvedSqon from 'graphql/biospecimens/useBiospecimenResolvedSqon';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import SetSearch from 'components/uiKit/search/SetSearch';
import { SetType } from 'services/api/savedSet/models';

const SampleSetSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { sqon } = useBiospecimenResolvedSqon(queryBuilderId);

  return (
    <SetSearch
      index={INDEXES.BIOSPECIMEN}
      title={intl.get('components.search.savedSampleSets')}
      emptyDescription={intl.get('components.search.noSampleSetFound')}
      placeholder={intl.get('components.search.selectSavedSet')}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      type={SetType.BIOSPECIMEN}
      sqon={sqon}
    />
  );
};

export default SampleSetSearch;
