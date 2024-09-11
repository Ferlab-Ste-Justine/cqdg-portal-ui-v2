import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { CopyOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Checkbox, Modal, Tooltip, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import EnvVariables from 'helpers/EnvVariables';

import TooMuchFilesAlert from 'components/reports/TooMuchFilesAlert';
import { ReportType } from 'services/api/reports/models';
import { globalActions } from 'store/global';
import { fetchReport } from 'store/report/thunks';
import { PROJECT_ID, useSavedSet } from 'store/savedSet';
import { createSavedSet } from 'store/savedSet/thunks';
import { getDocLang } from 'utils/doc';
import { getIdFieldByType } from 'utils/fieldMapper';
import { truncateString } from 'utils/string';

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
  isIconButton?: boolean;
  setId?: string;
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
  isIconButton = false,
  setId = '',
}: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);
  const [isManifestIdTriggered, setIsManifestIdTriggered] = useState(false);
  const { isLoading, savedSets } = useSavedSet();
  const lastSetId: string = savedSets?.find((s) => s.is_phantom_manifest)?.id || '';

  const handleClose = () => {
    setIsManifestIdTriggered(false);
    setIsModalVisible(false);
  };

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

  const handleDownload = () =>
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

  const handleManifestIdCallback = () => {
    setIsManifestIdTriggered(true);
  };

  const handleManifestIdCopy = () => {
    if (lastSetId) {
      navigator.clipboard.writeText(lastSetId);
      dispatch(
        globalActions.displayMessage({
          content: 'Copied Manifest ID',
          type: 'success',
        }),
      );
    }
  };

  const handleManifestId = async () => {
    if ((isManifestIdTriggered && lastSetId) || setId) {
      handleManifestIdCopy();
    } else {
      setIsManifestIdTriggered(true);
      dispatch(
        createSavedSet({
          idField: getIdFieldByType(INDEXES.FILE),
          projectId: PROJECT_ID,
          sort: [],
          sqon: sqon as ISqonGroupFilter,
          type: INDEXES.FILE,
          onCompleteCb: handleManifestIdCallback,
          tag: 'manifestIdSet',
          is_phantom_manifest: true,
          sharedpublicly: true,
        }),
      );
    }
  };

  return (
    <Tooltip title={getTooltipTitle()} open={isModalVisible ? false : undefined}>
      <Button
        icon={<DownloadOutlined />}
        onClick={() => setIsModalVisible(true)}
        type={isIconButton ? 'text' : type}
        size={isIconButton ? 'small' : undefined}
        disabled={isDisabled}
        data-cy="FileManifest_Button"
      >
        {!isIconButton && intl.get('api.report.fileManifest.button')}
      </Button>
      <Modal
        open={isModalVisible}
        title={intl.get('api.report.fileManifest.title')}
        onCancel={handleClose}
        footer={[
          <Button key="1" onClick={handleClose}>
            {intl.get('api.report.fileManifest.cancel')}
          </Button>,
          <Tooltip
            key="2"
            title={
              isManifestIdTriggered || setId
                ? intl.get('api.report.fileManifest.copyToClipboardToFerload')
                : intl.get('api.report.fileManifest.manifestIdButtonTooltip')
            }
          >
            <Button
              onClick={handleManifestId}
              loading={isLoading}
              icon={isManifestIdTriggered || setId ? <CopyOutlined /> : <FileTextOutlined />}
            >
              {(!isLoading && isManifestIdTriggered) || setId
                ? truncateString(lastSetId, 20)
                : intl.get('api.report.fileManifest.manifestIdButton')}
            </Button>
          </Tooltip>,
          <Button
            key="3"
            type="primary"
            disabled={hasTooManyFiles}
            onClick={handleDownload}
            icon={<DownloadOutlined />}
          >
            {intl.get('api.report.fileManifest.okText')}
          </Button>,
        ]}
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
