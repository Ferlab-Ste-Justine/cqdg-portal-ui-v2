import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { MATCH_FILES } from 'graphql/files/queries';
import { hydrateResults } from 'graphql/models';

import { MAX_ITEMS_QUERY } from 'common/constants';
import { ArrangerApi } from 'services/api/arranger';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const FileUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="file"
    entityIdTrans={intl.get('components.uploadIds.file')}
    entityIdentifiers={intl.get('components.uploadIds.fileID')}
    placeHolder={intl.get('components.uploadIds.filePlaceholder')}
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: MATCH_FILES.loc?.source.body,
        variables: {
          first: MAX_ITEMS_QUERY,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['file_id'].map((field) =>
              generateValueFilter({
                field,
                value: ids,
                index: INDEXES.FILE,
              }),
            ),
          }),
        },
      });

      const files: IFileEntity[] = hydrateResults(response.data?.data?.File?.hits?.edges || []);

      return files?.flatMap((file) => {
        const matchedIds: string[] = ids.filter(
          (id: string) => file.file_id.toLocaleLowerCase() === id.toLocaleLowerCase(),
        );

        return matchedIds.map((id, index) => ({
          key: `${file.file_id}:${index}`,
          submittedId: id,
          mappedTo: file.study_code,
          matchTo: file.file_id,
        }));
      });
    }}
    onUpload={(matches) =>
      updateActiveQueryField({
        queryBuilderId,
        field: 'file_2_id',
        value: matches.map((match) => match.matchTo),
        index: INDEXES.FILE,
        overrideValuesName: intl.get('components.uploadIds.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.APPEND_VALUES,
      })
    }
  />
);

export default FileUploadIds;
