import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { FileTextOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink/index';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Modal, Tag, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';

import TooMuchFilesAlert from 'components/reports/TooMuchFilesAlert';

import { MAX_ITEMS_QUERY } from '../../common/constants';
import { useDataFiles } from '../../graphql/files/actions';
import { GET_FILES_CAVATICA } from '../../graphql/files/queries';
import EnvVariables from '../../helpers/EnvVariables';
import { fetchCavaticaManifest } from '../../store/report/thunks';

import FilesTable from './FilesTable';

import styles from './index.module.scss';

const { Text } = Typography;

const docHref = `${EnvVariables.configFor(
  'CQDG_DOCUMENTATION',
)}/docs/faire-une-demande-daccès-aux-données-du-cqdg`;

interface ICavaticaModalProps {
  sqon: ISyntheticSqon;
  buttonType?: 'default' | 'primary';
  hasTooManyFiles?: boolean;
  withoutFiles?: boolean;
  study?: IStudyEntity;
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CavaticaModal = ({
  sqon,
  hasTooManyFiles = false,
  isOpen = false,
  setIsOpen,
}: ICavaticaModalProps) => {
  const dispatch = useDispatch();

  const { data: files = [] } = useDataFiles(
    {
      first: hasTooManyFiles ? 0 : MAX_ITEMS_QUERY,
      sqon,
    },
    undefined,
    GET_FILES_CAVATICA,
  );

  const filesAuthorized = files.filter((file) => file.user_authorized);
  const filesAuthorizedCount: number = filesAuthorized?.length || 0;
  const filesTotalCount: number = files?.length || 0;
  const file_ids = files.map((file) => file.file_id);

  const ContentUnauthorized = () => (
    <Text>
      <h5>
        <CloseCircleOutlined className={styles.unauthorizedIcon} />{' '}
        {intl.get('screen.cavatica.analyseModal.unauthorizedFiles')}
      </h5>
      {intl.get('screen.cavatica.analyseModal.unauthorizedFilesDescription')}
      <ExternalLink href={docHref}>
        {intl.get('screen.cavatica.analyseModal.dataAccess')}
      </ExternalLink>
      .
    </Text>
  );

  const Content = () =>
    filesAuthorizedCount ? (
      <>
        <Text>
          {intl.get('screen.cavatica.analyseModal.youAreAuthorizedToCopy')}
          <Tag className={styles.authorizedFilesTag} icon={<FileTextOutlined />}>
            {intl.get('screen.cavatica.analyseModal.countFiles', {
              filesAuthorizedCount,
            })}
          </Tag>
          {intl.get('screen.cavatica.analyseModal.ofFiles', {
            filesTotalCount,
          })}
        </Text>
        {!hasTooManyFiles && <FilesTable filesAuthorized={filesAuthorized} />}
      </>
    ) : (
      <ContentUnauthorized />
    );

  return (
    <Modal
      open={isOpen}
      title={intl.get('screen.cavatica.analyseModal.title')}
      okText={intl.get('screen.cavatica.analyseModal.copyFiles')}
      okButtonProps={{ disabled: hasTooManyFiles || !filesAuthorizedCount }}
      cancelText={intl.get('screen.cavatica.analyseModal.cancel')}
      onCancel={() => setIsOpen(false)}
      onOk={() => {
        dispatch(
          fetchCavaticaManifest({
            data: {
              file_ids,
            },
            callback: (url) => {
              window.open(url, '_blank');
            },
          }),
        );
      }}
      className={styles.modal}
      data-cy="Cavatica_Modal"
    >
      {hasTooManyFiles && <TooMuchFilesAlert marginTop={0} />}
      {!hasTooManyFiles && <Content />}
    </Modal>
  );
};

export default CavaticaModal;
