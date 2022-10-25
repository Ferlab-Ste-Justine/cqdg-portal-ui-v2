import { hydrateResults, IQueryResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IParticipantEntity, IParticipantResultTree } from './models';
import { GET_PARTICIPANTS } from './queries';

export const useParticipants = (variables?: QueryVariable): IQueryResults<IParticipantEntity[]> => {
  const { loading, result } = useLazyResultQuery<IParticipantResultTree>(GET_PARTICIPANTS, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Participant?.hits?.edges || []),
    total: result?.Participant?.hits?.total || 0,
  };
};
