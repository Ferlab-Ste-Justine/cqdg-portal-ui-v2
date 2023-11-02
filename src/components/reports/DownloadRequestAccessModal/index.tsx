import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Checkbox, Modal } from 'antd';
import EnvVariables from 'helpers/EnvVariables';

import RestrictedStudyAlert from 'components/reports/RestrictedStudyAlert';
import TooMuchFilesAlert from 'components/reports/TooMuchFilesAlert';
import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

import FilesTable from './FilesTable';

import styles from './index.module.scss';

interface IDownloadFileManifestProps {
  sqon: ISyntheticSqon;
  buttonType?: 'default' | 'primary';
  isDisabled?: boolean;
  hasTooManyFiles?: boolean;
  withoutFiles?: boolean;
  isRestricted?: boolean;
}

const DownloadRequestAccessModal = ({
  sqon,
  buttonType = 'default',
  isDisabled = false,
  hasTooManyFiles = false,
  withoutFiles = false,
  isRestricted = false,
}: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);

  const locale = intl.getInitOptions().currentLocale;
  const docHref = `${EnvVariables.configFor('CQDG_DOCUMENTATION')}${
    locale === 'fr' ? '/' : '/en/'
  }acces-donnees/demande-acces-donnees`;

  return (
    <>
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
        <div>
          {intl.get('api.report.requestAccess.text')}
          <ExternalLink href={docHref}>
            {intl.get('api.report.requestAccess.textLink')}
          </ExternalLink>
          .
        </div>
        {!withoutFiles && (
          <>
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
    </>
  );
};

export default DownloadRequestAccessModal;
