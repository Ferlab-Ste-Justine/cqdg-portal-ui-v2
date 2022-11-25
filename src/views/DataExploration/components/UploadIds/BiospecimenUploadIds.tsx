import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { MATCH_BIOSPECIMENS } from 'graphql/biospecimens/queries';
import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import { uniqBy } from 'lodash';

import { ArrangerApi } from 'services/api/arranger';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const BiospecimenUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="biospecimen"
    entityIdTrans="Sample"
    entityIdentifiers="Sample ID"
    placeHolder="e.g. HTP0001B2_Whole blood, BS_011DYZ2J_DNA, 238981007"
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: MATCH_BIOSPECIMENS.loc?.source.body,
        variables: {
          first: 10000,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['sample_id'].map((field) =>
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
        response.data?.data?.biospecimen?.hits?.edges || [],
      );

      return uniqBy(biospecimens, 'sample_id').map((biospecimen) => ({
        key: biospecimen.biospecimen_id,
        submittedId: ids.find((id) => [biospecimen.sample_id].includes(id))!,
        mappedTo: biospecimen.sample_id,
        matchTo: biospecimen.study_id,
      }));
    }}
    onUpload={(match) =>
      updateActiveQueryField({
        queryBuilderId,
        // field: 'biospecimen_facet_ids.biospecimen_fhir_id_2',
        field: 'biospecimen_id',
        value: match.map((value) => value.key),
        index: INDEXES.BIOSPECIMEN,
        overrideValuesName: intl.get('components.uploadIds.modal.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
      })
    }
  />
);

export default BiospecimenUploadIds;
