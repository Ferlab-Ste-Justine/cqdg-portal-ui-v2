import { useEffect } from 'react';
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
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { useStudy } from 'graphql/studies/actions';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import StatsGraph from 'views/StudyEntity/StatsGraph';
import { pageId, queryId } from 'views/StudyEntity/utils/constant';

import { MAX_ITEMS_QUERY } from 'common/constants';
import DownloadClinicalDataDropdown from 'components/reports/DownloadClinicalDataDropdown';
import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';
import DownloadRequestAccessModal from 'components/reports/DownloadRequestAccessModal';
import { STATIC_ROUTES } from 'utils/routes';

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
  //todo: to change with the futur study.is_restricted field
  const isRestricted = study_code === 'CAG';

  enum SectionId {
    SUMMARY = 'summary',
    DATA_ACCESS = 'data_access',
    DATA_FILE = 'data_file',
    DATASET = 'dataset',
    STATISTIC = 'statistic',
  }

  const defaultLinks: any = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('global.summary') },
    {
      href: `#${SectionId.DATA_ACCESS}`,
      title: intl.get('entities.study.data_access'),
    },
    ...[
      !isRestricted && {
        href: `#${SectionId.DATA_FILE}`,
        title: intl.get('entities.study.file'),
      },
    ],
    ...[
      study?.datasets && {
        href: `#${SectionId.DATASET}`,
        title: intl.get('entities.study.dataset'),
      },
    ],
    ...[
      !isRestricted && {
        href: `#${SectionId.STATISTIC}`,
        title: intl.get('entities.study.statistic'),
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
            {!isRestricted && study && <DownloadClinicalDataDropdown sqon={participantSqon} />}
            {!isRestricted && study && (
              <DownloadFileManifestModal sqon={fileSqon} hasTooManyFiles={hasTooManyFiles} />
            )}
            {study && (
              <DownloadRequestAccessModal
                sqon={fileSqon}
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
      {!isRestricted && <FilesTable id={SectionId.DATA_FILE} study_code={study_code} />}
      {study?.datasets && (
        <Datasets
          id={SectionId.DATASET}
          loading={loading}
          title={intl.get('entities.study.dataset')}
          datasets={study?.datasets}
        />
      )}
      {!isRestricted && (
        <StatsGraph
          id={SectionId.STATISTIC}
          loading={loading}
          title={intl.get('entities.study.statistic')}
          header={intl.get('entities.study.statistics')}
          titleExtra={[
            !isRestricted && (
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
              </EntityTableRedirectLink>
            ),
          ]}
        />
      )}
    </EntityPage>
  );
};

export default StudyEntity;
