import intl from 'react-intl-universal';
import { INDEXES } from 'graphql/constants';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import SetSearch from 'components/uiKit/search/SetSearch';
import { SetType } from 'services/api/savedSet/models';

const FileSetSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const sqon = useFileResolvedSqon(queryBuilderId);

  return (
    <SetSearch
      index={INDEXES.FILE}
      title={intl.get('components.search.savedFileSets')}
      emptyDescription={intl.get('components.search.noFileSetFound')}
      placeholder={intl.get('components.search.selectSavedSet')}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      type={SetType.FILE}
      sqon={sqon}
    />
  );
};

export default FileSetSearch;
