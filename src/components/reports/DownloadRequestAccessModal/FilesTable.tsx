import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Table } from 'antd';
import { AxiosRequestConfig } from 'axios';
import EnvironmentVariables from 'helpers/EnvVariables';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import styles from 'components/reports/DownloadRequestAccessModal/index.module.css';
import useApi from 'hooks/useApi';
import { headers, REPORTS_ROUTES } from 'services/api/reports';
import { ReportType } from 'services/api/reports/models';

const PROJECT_ID = EnvironmentVariables.configFor('PROJECT_ID');

interface IFileByStudy {
  key: string;
  study_name: string;
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
    dataIndex: 'key',
    title: intl.get('entities.study.study_code'),
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
  const config: AxiosRequestConfig = {
    url: REPORTS_ROUTES[ReportType.FILE_REQUEST_ACCESS_STATS],
    method: 'POST',
    responseType: 'json',
    data: {
      sqon,
      projectId: PROJECT_ID,
    },
    headers: headers(),
  };
  const { loading, result } = useApi({ config });
  const files = (result as IFileByStudy[]) || [];

  return (
    <Table
      columns={getColumns()}
      dataSource={files}
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
