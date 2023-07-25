import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { ReadOutlined } from '@ant-design/icons';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import EntityPage, { EntityDescriptions, EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage/index';
import { Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useFiles } from 'graphql/files/actions';
import { useParticipantsFromField } from 'graphql/participants/actions';
import { useStudy } from 'graphql/studies/actions';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import StatsGraph from 'views/StudyEntity/StatsGraph';

import { MAX_ITEMS_QUERY } from 'common/constants';
import DownloadClinicalDataDropdown from 'components/reports/DownloadClinicalDataDropdown';
import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';
import DownloadRequestAccessModal from 'components/reports/DownloadRequestAccessModal';
import { STATIC_ROUTES } from 'utils/routes';

import getDataAccessDescriptions from './utils/getDataAccessDescriptions';
import getSummaryDescriptions from './utils/getSummaryDescriptions';
import FilesTable from './FilesTable';
import SummaryHeader from './SummaryHeader';

import styles from './index.module.scss';

export const pageId = 'study-entity-page';

const StudyEntity = () => {
  const { study_code } = useParams<{ study_code: string }>();

  const { data, loading } = useStudy({
    field: 'study_code',
    value: study_code,
  });

  const { data: participantsData } = useParticipantsFromField({
    field: 'study_code',
    value: study_code,
  });

  const { data: filesData, loading: filesLoading } = useFiles({
    field: 'study_code',
    values: [study_code],
  });

  enum SectionId {
    SUMMARY = 'summary',
    STATISTIC = 'statistic',
    DATA_ACCESS = 'data_access',
    DATA_SET = 'data_set',
    DATA_FILE = 'data_file',
  }

  const links: IAnchorLink[] = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('global.summary') },
    { href: `#${SectionId.STATISTIC}`, title: intl.get('entities.study.statistic') },
    {
      href: `#${SectionId.DATA_ACCESS}`,
      title: intl.get('entities.study.data_access'),
    },
    // { href: `#${SectionId.DATA_SET}`, title: intl.get('entities.study.data_set') },
    { href: `#${SectionId.DATA_FILE}`, title: intl.get('entities.study.file') },
  ];

  const getCurrentSqon = (): any =>
    generateSelectionSqon(INDEXES.FILE, filesData?.map((f) => f?.file_id) || []);
  const hasTooManyFiles = filesData.length > MAX_ITEMS_QUERY;

  //todo: to change with the futur study.is_restricted field
  const isRestricted = study_code === 'CAG';

  return (
    <EntityPage loading={loading} data={data} links={links} pageId={pageId}>
      <EntityTitle
        text={data?.name}
        icon={<ReadOutlined className={styles.titleIcon} />}
        loading={loading}
        extra={
          <Space>
            {!isRestricted && data && participantsData && (
              <DownloadClinicalDataDropdown
                participantIds={participantsData?.map((p) => p.node.participant_id)}
              />
            )}
            {!isRestricted && data && filesData && (
              <DownloadFileManifestModal
                sqon={getCurrentSqon()}
                hasTooManyFiles={hasTooManyFiles}
              />
            )}
            {data && filesData && (
              <DownloadRequestAccessModal
                sqon={getCurrentSqon()}
                hasTooManyFiles={hasTooManyFiles}
                type={'primary'}
              />
            )}
          </Space>
        }
      />
      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryDescriptions(data)}
        header={intl.get('global.summary')}
        subheader={<SummaryHeader study={data} isRestricted={isRestricted} />}
      />
      <StatsGraph
        id={SectionId.STATISTIC}
        loading={loading}
        study_code={study_code}
        title={intl.get('entities.study.statistic')}
        header={intl.get('entities.study.statistic')}
        titleExtra={[
          <EntityTableRedirectLink
            key="1"
            to={STATIC_ROUTES.DATA_EXPLORATION_SUMMARY}
            icon={<ExternalLinkIcon width="14" />}
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
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
              })
            }
          >
            {intl.get('global.viewInDataExploration')}
          </EntityTableRedirectLink>,
        ]}
      />
      <EntityDescriptions
        id={SectionId.DATA_ACCESS}
        loading={loading}
        descriptions={getDataAccessDescriptions(data)}
        header={intl.get('entities.file.data_access')}
        title={intl.get('entities.file.data_access')}
      />
      <FilesTable
        id={SectionId.DATA_FILE}
        loading={filesLoading}
        files={filesData}
        study_code={study_code}
      />
    </EntityPage>
  );
};

export default StudyEntity;
