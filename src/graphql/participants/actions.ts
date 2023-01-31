import { INDEXES } from 'graphql/constants';
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

export const useParticipantsFromField = ({ field, value }: { field: string; value: string }) => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.PARTICIPANT }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IParticipantResultTree>(GET_PARTICIPANTS, {
    variables: { sqon },
  });

  const data = result?.Participant?.hits?.edges || [];
  const total = result?.Participant?.hits?.total || 0;

  return {
    loading,
    data,
    total,
  };
};

export const useParticipant = ({ field, value }: { field: string; value: string }) => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.PARTICIPANT }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IParticipantResultTree>(GET_PARTICIPANTS, {
    variables: { sqon },
  });

  const data = result?.Participant?.hits?.edges[0]?.node || undefined;

  return {
    loading,
    data,
  };
};
