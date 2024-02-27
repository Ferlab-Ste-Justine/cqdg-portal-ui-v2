import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { ReadOutlined } from '@ant-design/icons';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import EntityPage, { EntityDescriptions, EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { useStudy } from 'graphql/studies/actions';
import { pageId, queryId } from 'views/StudyEntity/utils/constant';

import { MAX_ITEMS_QUERY } from 'common/constants';
import DownloadClinicalDataButton from 'components/reports/DownloadClinicalDataButton';
import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';
import DownloadRequestAccessModal from 'components/reports/DownloadRequestAccessModal';

import getDataAccessDescriptions from './utils/getDataAccessDescriptions';
import getSummaryDescriptions from './utils/getSummaryDescriptions';
import Datasets from './Datasets';
import FilesTable from './FilesTable';
import SummaryHeader from './SummaryHeader';

import styles from './index.module.scss';

const StudyEntity = () => {
  const { study_code } = useParams<{ study_code: string }>();
  const participantSqon = useParticipantResolvedSqon(queryId);
  const fileSqon = useFileResolvedSqon(queryId);

  const { data: study, loading } = useStudy({
    field: 'study_code',
    value: study_code,
  });

  const hasTooManyFiles = (study?.file_count || 0) > MAX_ITEMS_QUERY;
  const isRestricted = study ? study.security === 'R' : true;
  const hasFamily = !!study?.family_count;

  enum SectionId {
    SUMMARY = 'summary',
    DATA_ACCESS = 'data_access',
    DATA_FILE = 'data_file',
    DATASET = 'dataset',
  }

  const defaultLinks: any = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('global.summary') },
    {
      href: `#${SectionId.DATA_ACCESS}`,
      title: intl.get('entities.study.data_access'),
    },
    {
      href: `#${SectionId.DATA_FILE}`,
      title: intl.get('entities.file.datafile'),
    },
    ...[
      study?.datasets && {
        href: `#${SectionId.DATASET}`,
        title: intl.get('entities.file.available_datasets'),
      },
    ],
  ];
  const links: IAnchorLink[] = defaultLinks.filter((link: IAnchorLink) => link);

  /** We initialize here a sqon by queryBuilderId to handle graphs and actions */
  useEffect(() => {
    if (study_code) {
      addQuery({
        queryBuilderId: queryId,
        query: generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'study_code',
              value: [study_code],
              index: INDEXES.STUDY,
            }),
          ],
        }),
        setAsActive: true,
      });
    }
  }, [study_code]);

  return (
    <EntityPage loading={loading} data={study} links={links} pageId={pageId}>
      <EntityTitle
        text={study?.name}
        icon={<ReadOutlined className={styles.titleIcon} />}
        loading={loading}
        extra={
          <Space>
            {!isRestricted && study && <DownloadClinicalDataButton sqon={participantSqon} />}
            {!isRestricted && study && (
              <DownloadFileManifestModal
                sqon={fileSqon}
                hasTooManyFiles={hasTooManyFiles}
                hasFamily={hasFamily}
              />
            )}
            {study && (
              <DownloadRequestAccessModal
                sqon={fileSqon}
                buttonType={'primary'}
                withoutFiles
                isRestricted={isRestricted}
              />
            )}
          </Space>
        }
      />
      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryDescriptions(study)}
        header={intl.get('global.summary')}
        subheader={<SummaryHeader study={study} isRestricted={isRestricted} />}
      />
      <EntityDescriptions
        id={SectionId.DATA_ACCESS}
        loading={loading}
        descriptions={getDataAccessDescriptions(study)}
        header={intl.get('entities.file.data_access')}
        title={intl.get('entities.file.data_access')}
      />
      <FilesTable id={SectionId.DATA_FILE} study={study} loading={loading} />
      {study?.datasets && (
        <Datasets
          id={SectionId.DATASET}
          loading={loading}
          title={intl.get('entities.file.available_datasets')}
          datasets={study?.datasets}
        />
      )}
    </EntityPage>
  );
};

export default StudyEntity;
