import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button, Checkbox, Modal, Table } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';
import { formatFileSize } from 'utils/formatFileSize';

import styles from './index.module.scss';

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
        nb_participants: filesFound.reduce(
          (a, b) => a + (b?.participants?.hits?.edges?.length || 0),
          0,
        ),
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

interface IDownloadFileManifestProps {
  files: IFileEntity[];
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
}

const DownloadFileManifestModal = ({
  files,
  sqon,
  type = 'default',
}: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);

  const getCurrentSqon = (): any =>
    sqon ||
    generateSelectionSqon(
      INDEXES.FILE,
      files.map((f) => f.file_id),
    );

  const filesInfoData = getFilesDataTypeInfo(files);

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        onClick={() => setIsModalVisible(true)}
        type={type}
        disabled={!files.length}
      >
        {intl.get('api.report.fileManifest.button')}
      </Button>
      <Modal
        visible={isModalVisible}
        title={intl.get('api.report.fileManifest.title')}
        okText={intl.get('api.report.fileManifest.okText')}
        cancelText={intl.get('api.report.fileManifest.cancel')}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          dispatch(
            fetchReport({
              data: {
                name: isFamilyChecked ? ReportType.FILE_MANIFEST_FAMILY : ReportType.FILE_MANIFEST,
                sqon: getCurrentSqon(),
              },
              callback: () => setIsModalVisible(false),
            }),
          );
        }}
        className={styles.modal}
      >
        <p>{intl.get('api.report.fileManifest.text')}</p>
        <p className={styles.subText}>{intl.get('api.report.fileManifest.subText')}</p>
        <p>
          <Checkbox checked={isFamilyChecked} onChange={() => setIsFamilyChecked(!isFamilyChecked)}>
            {intl.get('api.report.fileManifest.textCheckbox')}
          </Checkbox>
        </p>
        <Table
          columns={getDataTypeColumns()}
          dataSource={filesInfoData}
          pagination={false}
          size="small"
          rowClassName={styles.notStriped}
          bordered
        />
      </Modal>
    </>
  );
};

export default DownloadFileManifestModal;
