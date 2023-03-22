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
import { ArrangerApi } from 'services/api/arranger';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const ParticipantUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="participant"
    entityIdTrans={intl.get('components.uploadIds.participant')}
    entityIdentifiers={intl.get('components.uploadIds.participantID')}
    placeHolder={intl.get('components.uploadIds.participantPlaceholder')}
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: MATCH_PARTICIPANTS.loc?.source.body,
        variables: {
          first: MAX_ITEMS_QUERY,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['participant_id'].map((field) =>
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

      return participants.map((participant) => ({
        key: participant.participant_id,
        // submittedId: ids.find((id) => [participant.participant_id].includes(id))!,
        submittedId:
          ids.find((id) => participant.participant_id.toLowerCase() === id.toLowerCase()) || '',
        mappedTo: participant.study_code,
        matchTo: participant.participant_id,
      }));
    }}
    onUpload={(match) =>
      updateActiveQueryField({
        queryBuilderId,
        // field: 'participant_facet_ids.participant_fhir_id_2',
        field: 'participant_id',
        value: match.map((value) => value.key),
        index: INDEXES.PARTICIPANT,
        overrideValuesName: intl.get('components.uploadIds.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
      })
    }
  />
);

export default ParticipantUploadIds;
