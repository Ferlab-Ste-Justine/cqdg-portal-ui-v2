import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { useFiles } from 'graphql/files/actions';
import { IFileEntity } from 'graphql/files/models';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import getAnalysisFilesColumns from 'views/FileEntity/utils/getAnalysisFilesColumns';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

const AnalysisFilesTable = ({ file, id }: { file: IFileEntity; id: string }) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const { data, loading } = useFiles({
    field: 'sequencing_experiment.analysis_id',
    value: file.sequencing_experiment.analysis_id,
  });

  const dataAnalysisFilesTable: IFileEntity[] = data || [];

  return (
    <EntityTable
      id={id}
      loading={loading}
      header={intl.get('entities.file.analysisFiles')}
      columns={getAnalysisFilesColumns()}
      data={dataAnalysisFilesTable}
      initialColumnState={userInfo?.config.files?.tables?.files?.columns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableTableExport: true,
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.files?.tables?.files?.columns,
              columns: getAnalysisFilesColumns(),
              index: INDEXES.FILE,
              sqon: generateSelectionSqon(
                INDEXES.FILE,
                dataAnalysisFilesTable.map((file) => file.file_id),
              ),
            }),
          ),
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(updateUserConfig({ files: { tables: { files: { columns: newState } } } })),
      }}
    />
  );
};
export default AnalysisFilesTable;
