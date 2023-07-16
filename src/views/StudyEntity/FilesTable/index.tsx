import intl from 'react-intl-universal';
import { EntityTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';

import {
  getDataTypeColumns,
  getExperimentalStrategyColumns,
  getFilesDataTypeInfo,
  getFilesInfoByKey,
} from '../utils/getFilesColumns';

interface IFilesTableProps {
  files: IFileEntity[];
  id: string;
  loading: boolean;
  study_code: string;
}

const FilesTable = ({ files, id, loading, study_code }: IFilesTableProps) => {
  const dataTypeInfoData = getFilesDataTypeInfo(files);
  const experimentalStrategyData = getFilesInfoByKey(files, 'experimental_strategy');

  return (
    <EntityTableMultiple
      id={id}
      loading={loading}
      title={intl.get('entities.file.datafile')}
      header={intl.get('entities.file.files')}
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
