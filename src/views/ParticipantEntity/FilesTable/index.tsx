import intl from 'react-intl-universal';
import { EntityTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';
import { IParticipantEntity } from 'graphql/participants/models';
import {
  getDataTypeColumns,
  getExperimentalStrategyColumns,
  getFilesDataTypeInfo,
  getFilesInfoByKey,
} from 'views/ParticipantEntity/utils/getFilesColumns';

interface IFilesTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const FilesTable = ({ participant, id, loading }: IFilesTableProps) => {
  const files: IFileEntity[] = participant?.files?.hits.edges.map(({ node }) => node) || [];

  const dataTypeInfoData = getFilesDataTypeInfo(files, participant?.participant_id);
  const experimentalStrategyData = getFilesInfoByKey(
    files,
    'experimental_strategy',
    participant?.participant_id,
  );

  return (
    <EntityTableMultiple
      id={id}
      loading={loading}
      title={intl.get('entities.file.datafile')}
      header={intl.get('entities.file.files')}
      total={files.length}
      tables={[
        {
          columns: getDataTypeColumns(files.length),
          data: dataTypeInfoData,
          subTitle: intl.get('entities.file.numberByDataTypes'),
        },
        {
          columns: getExperimentalStrategyColumns(files.length),
          data: experimentalStrategyData,
          subTitle: intl.get('entities.file.numberByExperimentalStrategy'),
        },
      ]}
    />
  );
};
export default FilesTable;
