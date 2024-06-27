import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Table } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import styles from 'components/reports/DownloadRequestAccessModal/index.module.scss';

import { IFileEntity } from '../../graphql/files/models';

interface IFileByStudy {
  key: string;
  study_name: string;
  study_code: string;
  nb_files: number;
}

export const getColumns = (): ProColumnType<any>[] => [
  {
    key: 'study_name',
    dataIndex: 'study_name',
    title: intl.get('entities.study.study'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'study_code',
    dataIndex: 'study_code',
    title: intl.get('entities.study.study_code'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    dataIndex: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (label: string) => label,
  },
];

interface IFilesTableProps {
  filesAuthorized: IFileEntity[];
}

const FilesTable = ({ filesAuthorized }: IFilesTableProps) => {
  const filesAuthorizedByStudies: IFileByStudy[] = [];
  filesAuthorized.forEach((file) => {
    const study = filesAuthorizedByStudies.find((e) => e.study_code === file.study.study_code);
    if (!study) {
      const filesByStudy = filesAuthorized.filter(
        (f) => f.study.study_code === file.study.study_code,
      );
      filesAuthorizedByStudies.push({
        key: file.study_code,
        study_name: file.study.name,
        study_code: file.study.study_code,
        nb_files: filesByStudy.length,
      });
    }
  });

  return (
    <Table
      columns={getColumns()}
      dataSource={filesAuthorizedByStudies}
      pagination={false}
      size="small"
      rowClassName={styles.notStriped}
      className={styles.table}
      bordered
    />
  );
};

export default FilesTable;
