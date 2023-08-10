import intl from 'react-intl-universal';
import { EntityTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { useFiles } from 'graphql/files/actions';
import { GET_FILES_TABLE } from 'graphql/files/queries';

import {
  getDataTypeColumns,
  getExperimentalStrategyColumns,
  getFilesDataTypeInfo,
  getFilesInfoByKey,
} from '../utils/getFilesColumns';

interface IFilesTableProps {
  id: string;
  study_code: string;
}

const FilesTable = ({ id, study_code }: IFilesTableProps) => {
  const { data: files = [], loading } = useFiles({
    field: 'study_code',
    values: [study_code],
    query: GET_FILES_TABLE,
  });

  const dataTypeInfoData = getFilesDataTypeInfo(files);
  const experimentalStrategyData = getFilesInfoByKey(files, 'experimental_strategy');

  return (
    <EntityTableMultiple
      id={id}
      loading={loading}
      title={intl.get('entities.file.datafile')}
      header={intl.get('entities.file.datafiles')}
      total={files.length}
      tables={[
        {
          columns: getDataTypeColumns(files.length, study_code),
          data: dataTypeInfoData,
          subTitle: intl.get('entities.file.numberByDataTypes'),
        },
        {
          columns: getExperimentalStrategyColumns(files.length, study_code),
          data: experimentalStrategyData,
          subTitle: intl.get('entities.file.numberByExperimentalStrategy'),
        },
      ]}
    />
  );
};
export default FilesTable;
