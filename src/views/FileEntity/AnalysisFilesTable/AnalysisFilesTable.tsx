import intl from 'react-intl-universal';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage/index';
import { INDEXES } from 'graphql/constants';
import { useFiles } from 'graphql/files/actions';
import { IFileEntity } from 'graphql/files/models';
import { GET_FILES } from 'graphql/files/queries';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import getAnalysisFilesColumns from 'views/FileEntity/utils/getAnalysisFilesColumns';

import { useUser } from 'store/user';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

const AnalysisFilesTable = ({ file, id }: { file: IFileEntity; id: string }) => {
  const { userInfo } = useUser();

  const { data, loading } = useFiles({
    field: 'sequencing_experiment.analysis_id',
    values: [file.sequencing_experiment.analysis_id],
    query: GET_FILES,
  });

  const filesWithoutCurrent = data?.filter((f) => f.file_id !== file.file_id) || [];
  const filesWithoutCurrentSorted =
    filesWithoutCurrent?.sort((a, b) => (a.file_id > b.file_id ? 1 : -1)) || [];
  const files: IFileEntity[] = [file, ...filesWithoutCurrentSorted];

  return (
    <EntityTable
      id={id}
      loading={loading}
      header={intl.get('entities.file.analysisFiles')}
      columns={getAnalysisFilesColumns()}
      data={files}
      total={files.length}
      initialColumnState={userInfo?.config.files?.tables?.files?.columns}
      dictionary={getProTableDictionary()}
      emptyMessage={intl.get('api.noDataAvailable')}
      titleExtra={[
        <EntityTableRedirectLink
          key="1"
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          icon={<ExternalLinkIcon width="14" />}
          data-cy="Analysis_RedirectLink"
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'sequencing_experiment.analysis_id',
                    value: file?.sequencing_experiment?.analysis_id
                      ? [file.sequencing_experiment.analysis_id]
                      : [],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {intl.get('global.viewInDataExploration')}
        </EntityTableRedirectLink>,
      ]}
    />
  );
};

export default AnalysisFilesTable;
