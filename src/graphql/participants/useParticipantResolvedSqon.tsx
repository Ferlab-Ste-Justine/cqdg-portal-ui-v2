import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';

import { mapFilterForParticipant } from 'utils/fieldMapper';

const useParticipantResolvedSqon = (queryBuilderId: string): ISqonGroupFilter => {
  const { queryList, activeQuery } = useQueryBuilderState(queryBuilderId);

  return mapFilterForParticipant(resolveSyntheticSqon(queryList, activeQuery));
};

export default useParticipantResolvedSqon;
