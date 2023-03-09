import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Table } from 'antd';
import { useFilesReport } from 'graphql/files/actions';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import styles from 'components/reports/DownloadFileManifestModal/index.module.scss';
import { formatFileSize } from 'utils/formatFileSize';

interface IFileByDataType {
  key: string;
  value: string;
  nb_participants: number;
  nb_files: number;
  size: number;
}

/** Join files by data_type */
export const getFilesDataTypeInfo = (files: IFileEntity[]) => {
  const filesInfosData: IFileByDataType[] = [];
  for (const file of files) {
    const filesFound = files.filter(({ data_type }) => data_type === file.data_type);
    if (!filesInfosData.find((f) => f.value === file.data_type)) {
      filesInfosData.push({
        key: file.data_type,
        value: file.data_type,
        nb_participants: filesFound.reduce((a, b) => a + (b?.participants?.hits?.total || 0), 0),
        nb_files: filesFound.length,
        size: filesFound.reduce((a, b) => a + (b?.file_size || 0), 0),
      });
    }
  }
  return filesInfosData;
};

export const getDataTypeColumns = (): ProColumnType<any>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('entities.file.data_type'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_participants',
    dataIndex: 'nb_participants',
    title: intl.get('entities.participant.participants'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    dataIndex: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'size',
    dataIndex: 'size',
    title: intl.get('entities.file.file_size'),
    render: (label: number) =>
      label ? formatFileSize(label, { output: 'string' }) : TABLE_EMPTY_PLACE_HOLDER,
  },
];

const FilesTable = ({ sqon }: { sqon: ISyntheticSqon }) => {
  const { data: files, loading } = useFilesReport({
    first: 10000,
    sqon,
  });

  return (
    <Table
      columns={getDataTypeColumns()}
      dataSource={getFilesDataTypeInfo(files)}
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
