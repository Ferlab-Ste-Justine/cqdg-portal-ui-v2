import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Table } from 'antd';
import { useFilesReport } from 'graphql/files/actions';
import { IFileEntity } from 'graphql/files/models';

import { MAX_ITEMS_QUERY, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import styles from 'components/reports/DownloadRequestAccessModal/index.module.scss';

interface IFileByDataType {
  key: string;
  study_name: string;
  nb_files: number;
}

export const getFilesInfo = (files: IFileEntity[]) => {
  const filesInfosData: IFileByDataType[] = [];
  for (const file of files) {
    const filesFound = files.filter(
      ({ study: { study_code } }) => study_code === file.study?.study_code,
    );
    if (!filesInfosData.find((f) => f.key === file.study?.study_code)) {
      filesInfosData.push({
        key: file.study?.study_code,
        study_name: file.study?.name || file.study?.study_code,
        nb_files: filesFound.length,
      });
    }
  }
  return filesInfosData;
};

export const getColumns = (): ProColumnType<any>[] => [
  {
    key: 'study_name',
    dataIndex: 'study_name',
    title: intl.get('entities.study.study'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    dataIndex: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const FilesTable = ({ sqon }: { sqon: ISyntheticSqon }) => {
  const { data: files, loading } = useFilesReport({
    first: MAX_ITEMS_QUERY,
    sqon,
  });

  return (
    <Table
      columns={getColumns()}
      dataSource={getFilesInfo(files)}
      pagination={false}
      size="small"
      rowClassName={styles.notStriped}
      className={styles.table}
      bordered
      loading={loading}
    />
  );
};

export default FilesTable;
