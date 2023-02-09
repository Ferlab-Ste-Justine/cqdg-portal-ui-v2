import intl from 'react-intl-universal';
import { EntityTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';
import { IParticipantEntity } from 'graphql/participants/models';
import {
  getExperimentalStrategyColumns,
  getFilesInfoByKey,
  getTypeSequencingColumns,
} from 'views/ParticipantEntity/utils/getFilesColumns';

interface IFilesTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const FilesTable = ({ participant, id, loading }: IFilesTableProps) => {
  const files: IFileEntity[] = participant?.files?.hits.edges.map(({ node }) => node) || [];

  const typeOfSequencingData = getFilesInfoByKey(
    files,
    'type_of_sequencing',
    participant?.participant_id,
  );
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
      tables={[
        {
          columns: getTypeSequencingColumns(),
          data: typeOfSequencingData,
          subTitle: intl.get('entities.file.numberByDataTypes'),
        },
        {
          columns: getExperimentalStrategyColumns(),
          data: experimentalStrategyData,
          subTitle: intl.get('entities.file.numberByExperimentalStrategy'),
        },
      ]}
    />
  );
};
export default FilesTable;
