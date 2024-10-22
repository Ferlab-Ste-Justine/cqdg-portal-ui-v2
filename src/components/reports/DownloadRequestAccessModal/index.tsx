import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Checkbox, Modal, Tooltip, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import EnvVariables from 'helpers/EnvVariables';

import RestrictedStudyAlert from 'components/reports/RestrictedStudyAlert';
import TooMuchFilesAlert from 'components/reports/TooMuchFilesAlert';
import ExternalMailToLink from 'components/utils/ExternalMailToLink';
import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';
import { getDocLang } from 'utils/doc';

import FilesTable from './FilesTable';

import styles from './index.module.css';

const { Text } = Typography;

interface IDownloadFileManifestProps {
  sqon: ISyntheticSqon;
  buttonType?: 'default' | 'primary';
  isDisabled?: boolean;
  hasTooManyFiles?: boolean;
  withoutFiles?: boolean;
  isRestricted?: boolean;
  study?: IStudyEntity;
}

const DownloadRequestAccessModal = ({
  sqon,
  buttonType = 'default',
  isDisabled = false,
  hasTooManyFiles = false,
  withoutFiles = false,
  isRestricted = false,
  study,
}: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);

  const docHref = `${EnvVariables.configFor(
    'CQDG_DOCUMENTATION',
  )}/docs/faire-une-demande-daccès-aux-données-du-cqdg${getDocLang()}`;

  const Content = () =>
    study ? (
      <Text>
        {intl.get('api.report.requestAccess.text')}
        <br />
        <br />
        <ExternalMailToLink email={study.access_authority?.value} />
        <br />
        <br />
        {intl.get('api.report.requestAccess.text2')}
        <br />
        <br />
        {intl.get('api.report.requestAccess.text3')}
        <ExternalLink href={docHref}>{intl.get('api.report.requestAccess.textLink')}</ExternalLink>.
      </Text>
    ) : (
      <Text>
        {intl.get('api.report.requestAccess.content')}
        <br />
        <br />
        {intl.get('api.report.requestAccess.content2')}
        <ExternalLink href={docHref}>{intl.get('api.report.requestAccess.textLink')}</ExternalLink>.
      </Text>
    );

  return (
    <Tooltip
      title={intl.get('screen.dataExploration.youMustSelect')}
      trigger={isDisabled ? 'hover' : 'none'}
    >
      <Button
        icon={<DownloadOutlined />}
        onClick={() => setIsModalVisible(true)}
        type={buttonType}
        disabled={isDisabled}
        data-cy="RequestAccess_Button"
      >
        {intl.get('api.report.requestAccess.button')}
      </Button>
      <Modal
        open={isModalVisible}
        title={intl.get('api.report.requestAccess.title')}
        okText={intl.get('api.report.requestAccess.okText')}
        okButtonProps={{ disabled: hasTooManyFiles || isRestricted }}
        cancelText={intl.get('api.report.requestAccess.cancel')}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          dispatch(
            fetchReport({
              data: {
                name: ReportType.FILE_REQUEST_ACCESS,
                sqon,
                withFamily: isFamilyChecked,
                withoutFiles,
              },
              callback: () => setIsModalVisible(false),
            }),
          );
        }}
        className={styles.modal}
        data-cy="RequestAccess_Modal"
      >
        <Content />
        {!withoutFiles && (
          <>
            <br />
            <br />
            <Checkbox
              checked={isFamilyChecked}
              onChange={() => setIsFamilyChecked(!isFamilyChecked)}
            >
              {intl.get('api.report.requestAccess.textCheckbox')}
            </Checkbox>
          </>
        )}
        {!hasTooManyFiles && isModalVisible && <FilesTable sqon={sqon} />}
        {!withoutFiles && hasTooManyFiles && <TooMuchFilesAlert />}
        {isRestricted && <RestrictedStudyAlert />}
      </Modal>
    </Tooltip>
  );
};

export default DownloadRequestAccessModal;
