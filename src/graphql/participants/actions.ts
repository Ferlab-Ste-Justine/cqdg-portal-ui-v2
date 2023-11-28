import { IQueryOperationsConfig, IQueryVariable } from '@ferlab/ui/core/graphql/types';
import { computeSearchAfter, hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { INDEXES } from 'graphql/constants';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IParticipantResultTree } from './models';
import { GET_PARTICIPANTS, GET_PARTICIPANTS_COUNT } from './queries';

export const useParticipants = (
  variables?: IQueryVariable,
  operations?: IQueryOperationsConfig,
) => {
  const { loading, result } = useLazyResultQuery<IParticipantResultTree>(GET_PARTICIPANTS, {
    variables,
    fetchPolicy: 'network-only',
  });

  return {
    loading,
    data: hydrateResults(result?.Participant?.hits?.edges || [], operations?.previous),
    total: result?.Participant?.hits?.total || 0,
    searchAfter: computeSearchAfter(result?.Participant?.hits?.edges || [], operations),
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

export const useTotalParticipants = (variables?: IQueryVariable): number => {
  const { result } = useLazyResultQuery<IParticipantResultTree>(GET_PARTICIPANTS_COUNT, {
    variables,
  });

  return result?.Participant?.hits?.total || 0;
};
