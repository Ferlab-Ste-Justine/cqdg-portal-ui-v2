import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { MATCH_PARTICIPANTS } from 'graphql/participants/queries';

import { MAX_ITEMS_QUERY } from 'common/constants';
import { WrapperApi } from 'services/api/wrapper';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const ParticipantUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="participant"
    entityIdTrans={intl.get('entities.participant.participant')}
    entityIdentifiers={`${intl.get('entities.participant.participant_id')}, ${intl.get(
      'entities.participant.submitter_participant_id',
    )}`}
    placeHolder={intl.get('components.uploadIds.participantPlaceholder')}
    fetchMatch={async (ids) => {
      const response = await WrapperApi.graphqlRequest({
        query: MATCH_PARTICIPANTS.loc?.source.body,
        variables: {
          first: MAX_ITEMS_QUERY,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['participant_id', 'submitter_participant_id'].map((field) =>
              generateValueFilter({
                field,
                value: ids,
                index: INDEXES.PARTICIPANT,
              }),
            ),
          }),
        },
      });

      const participants: IParticipantEntity[] = hydrateResults(
        response.data?.data?.Participant?.hits?.edges || [],
      );

      return participants?.flatMap((participant) => {
        const matchedIds: string[] = ids.filter(
          (id: string) =>
            participant.participant_id.toLocaleLowerCase() === id.toLocaleLowerCase() ||
            participant.submitter_participant_id.toLocaleLowerCase() === id.toLocaleLowerCase(),
        );

        return matchedIds.map((id, index) => ({
          key: `${participant.participant_id}:${index}`,
          submittedId: id,
          mappedTo: participant.study_code,
          matchTo: participant.participant_id,
        }));
      });
    }}
    onUpload={(matches) =>
      updateActiveQueryField({
        queryBuilderId,
        field: 'participant_2_id',
        value: matches.map((match) => match.matchTo),
        index: INDEXES.PARTICIPANT,
        overrideValuesName: intl.get('components.uploadIds.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
      })
    }
  />
);

export default ParticipantUploadIds;
