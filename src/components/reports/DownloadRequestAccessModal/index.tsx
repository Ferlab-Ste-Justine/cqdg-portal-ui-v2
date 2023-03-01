import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Button, Checkbox, Modal, Table } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import EnvVariables from 'helpers/EnvVariables';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

import styles from './index.module.scss';

interface IFileByDataType {
  key: string;
  study_name: string;
  nb_files: number;
}

export const getFilesInfo = (files: IFileEntity[]) => {
  const filesInfosData: IFileByDataType[] = [];
  for (const file of files) {
    const filesFound = files.filter(({ study_code }) => study_code === file.study_code);
    if (!filesInfosData.find((f) => f.key === file.study_code)) {
      filesInfosData.push({
        key: file.study_code,
        study_name: file.study?.name || file.study_code,
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

interface IDownloadFileManifestProps {
  files: IFileEntity[];
  type?: 'default' | 'primary';
}

const DownloadRequestAccessModal = ({ files, type = 'default' }: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);

  const getCurrentSqon = (): any =>
    generateSelectionSqon(
      INDEXES.FILE,
      files.map((f) => f.file_id),
    );

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        onClick={() => setIsModalVisible(true)}
        type={type}
        disabled={!files.length}
      >
        {intl.get('api.report.requestAccess.button')}
      </Button>
      <Modal
        visible={isModalVisible}
        title={intl.get('api.report.requestAccess.title')}
        okText={intl.get('api.report.requestAccess.okText')}
        cancelText={intl.get('api.report.requestAccess.cancel')}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          dispatch(
            fetchReport({
              data: {
                name: isFamilyChecked
                  ? ReportType.FILE_REQUEST_ACCESS_FAMILY
                  : ReportType.FILE_REQUEST_ACCESS,
                sqon: getCurrentSqon(),
              },
              callback: () => setIsModalVisible(false),
            }),
          );
        }}
        className={styles.modal}
      >
        <p>
          {intl.get('api.report.requestAccess.text')}
          <ExternalLink
            href={
              EnvVariables.configFor('CQDG_DOCUMENTATION') +
              '/en/acces-donnees/demande-acces-donnees/'
            }
          >
            {intl.get('api.report.requestAccess.textLink')}
          </ExternalLink>
          .
        </p>
        <p>
          <Checkbox checked={isFamilyChecked} onChange={() => setIsFamilyChecked(!isFamilyChecked)}>
            {intl.get('api.report.requestAccess.textCheckbox')}
          </Checkbox>
        </p>
        <Table
          columns={getColumns()}
          dataSource={getFilesInfo(files)}
          pagination={false}
          size="small"
          rowClassName={styles.notStriped}
          bordered
        />
      </Modal>
    </>
  );
};

export default DownloadRequestAccessModal;
