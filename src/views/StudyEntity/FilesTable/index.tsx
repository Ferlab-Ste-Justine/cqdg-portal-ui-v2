import intl from 'react-intl-universal';
import { EntityTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { IStudyEntity } from 'graphql/studies/models';

import { getDataTypeColumns, getExperimentalStrategyColumns } from '../utils/getFilesColumns';

interface IFilesTableProps {
  id: string;
  study?: IStudyEntity;
  loading: boolean;
}

const FilesTable = ({ id, study, loading }: IFilesTableProps) => {
  const total = study?.file_count || 0;
  const data_types =
    study?.data_types?.hits?.edges?.map(({ node }) => ({
      ...node,
      key: node.data_type,
      value: node.data_type,
      nb_files: node.participant_count,
      proportion_of_files: (node.participant_count / (total || 1)) * 100,
    })) || [];
  const experimental_strategies =
    study?.experimental_strategies?.hits?.edges?.map(({ node }) => ({
      ...node,
      key: node.experimental_strategy,
      value: node.experimental_strategy,
      nb_files: node.file_count,
      proportion_of_files: (node.file_count / (total || 1)) * 100,
    })) || [];

  return (
    <EntityTableMultiple
      id={id}
      loading={loading}
      title={intl.get('entities.file.datafile')}
      header={intl.get('entities.file.datafiles')}
      total={total}
      tables={[
        {
          columns: study ? getDataTypeColumns(total, study.study_code) : [],
          data: data_types,
          subTitle: intl.get('entities.file.numberByDataTypes'),
        },
        {
          columns: study ? getExperimentalStrategyColumns(total, study.study_code) : [],
          data: experimental_strategies,
          subTitle: intl.get('entities.file.numberByExperimentalStrategy'),
        },
      ]}
    />
  );
};
export default FilesTable;
