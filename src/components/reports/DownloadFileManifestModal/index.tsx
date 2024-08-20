import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Checkbox, Modal, Tooltip, Typography } from 'antd';
import EnvVariables from 'helpers/EnvVariables';

import TooMuchFilesAlert from 'components/reports/TooMuchFilesAlert';
import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';
import { getDocLang } from 'utils/doc';

import FilesTable from './FilesTable';

import styles from './index.module.css';

const { Text } = Typography;

interface IDownloadFileManifestProps {
  sqon: ISyntheticSqon;
  type?: 'default' | 'primary';
  isDisabled?: boolean;
  hasTooManyFiles?: boolean;
  hasFamily?: boolean;
  isStudy?: boolean;
  isDataset?: boolean;
  fileName?: string;
}

const DownloadFileManifestModal = ({
  sqon,
  type = 'default',
  isDisabled,
  hasTooManyFiles,
  hasFamily = true,
  isStudy = false,
  isDataset = false,
  fileName = '',
}: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);

  const _fileName =
    fileName || (isFamilyChecked ? ReportType.FILE_MANIFEST_FAMILY : ReportType.FILE_MANIFEST);

  const Content = () => (
    <Text>
      <p>
        {isStudy
          ? intl.get('api.report.fileManifest.textStudy')
          : isDataset
          ? intl.get('api.report.fileManifest.textDataset')
          : intl.get('api.report.fileManifest.text')}
      </p>
    </Text>
  );

  const getTooltipTitle = () =>
    isDisabled ? (
      intl.get('screen.dataExploration.youMustSelect')
    ) : (
      <>
        {intl.get('api.report.fileManifest.tooltip')}
        <ExternalLink
          className={styles.externalLinkFerload}
          hasIcon
          href={`${EnvVariables.configFor(
            'CQDG_DOCUMENTATION',
          )}/docs/comment-utiliser-le-client-ferload${getDocLang()}`}
        >
          {intl.get('global.ferload')}
        </ExternalLink>
      </>
    );

  return (
    <Tooltip title={getTooltipTitle()} open={isModalVisible ? false : undefined}>
      <Button
        icon={<DownloadOutlined />}
        onClick={() => setIsModalVisible(true)}
        type={type}
        disabled={isDisabled}
        data-cy="FileManifest_Button"
      >
        {intl.get('api.report.fileManifest.button')}
      </Button>
      <Modal
        open={isModalVisible}
        title={intl.get('api.report.fileManifest.title')}
        okText={intl.get('api.report.fileManifest.okText')}
        okButtonProps={{ disabled: hasTooManyFiles }}
        cancelText={intl.get('api.report.fileManifest.cancel')}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          dispatch(
            fetchReport({
              data: {
                name: _fileName,
                sqon,
                withFamily: isFamilyChecked,
              },
              callback: () => setIsModalVisible(false),
            }),
          );
        }}
        className={styles.modal}
        data-cy="FileManifest_Modal"
      >
        <Content />
        {hasFamily && (
          <Checkbox checked={isFamilyChecked} onChange={() => setIsFamilyChecked(!isFamilyChecked)}>
            {intl.get('api.report.fileManifest.textCheckbox')}
          </Checkbox>
        )}
        {hasTooManyFiles && <TooMuchFilesAlert />}
        {!hasTooManyFiles && isModalVisible && <FilesTable sqon={sqon} />}
      </Modal>
    </Tooltip>
  );
};

export default DownloadFileManifestModal;
