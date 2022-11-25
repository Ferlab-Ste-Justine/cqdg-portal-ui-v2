import intl from 'react-intl-universal';
import useBiospecimenResolvedSqon from 'graphql/biospecimens/useBiospecimenResolvedSqon';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import SetSearch from 'components/uiKit/search/SetSearch';
import { SetType } from 'services/api/savedSet/models';

const BiospecimenSetSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { sqon } = useBiospecimenResolvedSqon(queryBuilderId);

  return (
    <SetSearch
      index={INDEXES.BIOSPECIMEN}
      title={intl.get('screen.dataExploration.savedBiospecimenSets')}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      type={SetType.BIOSPECIMEN}
      sqon={sqon}
      emptyDescription={intl.get('screen.dataExploration.noBiospecimenSetsFound')}
    />
  );
};

export default BiospecimenSetSearch;
