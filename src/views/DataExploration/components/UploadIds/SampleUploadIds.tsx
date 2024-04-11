import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { MATCH_BIOSPECIMENS } from 'graphql/biospecimens/queries';
import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';

import { MAX_ITEMS_QUERY } from 'common/constants';
import { ArrangerApi } from 'services/api/arranger';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const SampleUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="biospecimen"
    entityIdTrans={intl.get('entities.biospecimen.sample')}
    entityIdentifiers={`${intl.get('entities.biospecimen.sample_id')}, ${intl.get(
      'entities.biospecimen.submitter_sample_id',
    )}`}
    title={intl.get('components.uploadIds.sampleTitle')}
    placeHolder={intl.get('components.uploadIds.samplePlaceholder')}
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: MATCH_BIOSPECIMENS.loc?.source.body,
        variables: {
          first: MAX_ITEMS_QUERY,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['sample_id', 'submitter_sample_id'].map((field) =>
              generateValueFilter({
                field,
                value: ids,
                index: INDEXES.BIOSPECIMEN,
              }),
            ),
          }),
        },
      });

      const biospecimens: IBiospecimenEntity[] = hydrateResults(
        response.data?.data?.Biospecimen?.hits?.edges || [],
      );

      return biospecimens?.flatMap((biospecimen) => {
        const matchedIds: string[] = ids.filter(
          (id: string) =>
            biospecimen.sample_id.toLocaleLowerCase() === id.toLocaleLowerCase() ||
            biospecimen.submitter_sample_id.toLocaleLowerCase() === id.toLocaleLowerCase(),
        );

        return matchedIds.map((id, index) => ({
          key: `${biospecimen.sample_id}:${index}`,
          submittedId: id,
          mappedTo: biospecimen.study_code,
          matchTo: biospecimen.sample_id,
        }));
      });
    }}
    onUpload={(matches) =>
      updateActiveQueryField({
        queryBuilderId,
        field: 'sample_2_id',
        value: matches.map((match) => match.matchTo),
        index: INDEXES.BIOSPECIMEN,
        overrideValuesName: intl.get('components.uploadIds.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
      })
    }
  />
);

export default SampleUploadIds;
