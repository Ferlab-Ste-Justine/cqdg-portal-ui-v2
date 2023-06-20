import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import EntityPage, {
  EntityDescriptions,
  EntityTable,
  EntityTableRedirectLink,
  EntityTitle,
} from '@ferlab/ui/core/pages/EntityPage';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { useFile } from 'graphql/files/actions';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import AnalysisFilesTable from 'views/FileEntity/AnalysisFilesTable/AnalysisFilesTable';
import SummaryHeader from 'views/FileEntity/SummaryHeader';
import getAnalysisDescriptions from 'views/FileEntity/utils/getAnalysisDescriptions';
import getBiospecimensColumns from 'views/FileEntity/utils/getBiospecimensColumns';
import getDataTypeDescriptions from 'views/FileEntity/utils/getDataTypeDescriptions';
import getExperimentalProcedureDescriptions from 'views/FileEntity/utils/getExperimentalProcedureDescriptions';
import getSummaryDescriptions from 'views/FileEntity/utils/getSummaryDescriptions';

import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from 'views/ParticipantEntity/index.module.scss';

export const pageId = 'file-entity-page';

const FileEntity = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { file_id } = useParams<{ file_id: string }>();

  const { data, loading } = useFile({
    field: 'file_id',
    value: file_id,
  });

  enum SectionId {
    SUMMARY = 'summary',
    DATA_TYPE = 'data_type',
    BIOSPECIMENS = 'biospecimens',
    EXPERIMENTAL_PROCEDURE = 'experimental_procedure',
    ANALYSIS = 'analysis',
    ANALYSIS_FILES = 'analysis_files',
  }

  const links: IAnchorLink[] = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('global.summary') },
    { href: `#${SectionId.DATA_TYPE}`, title: intl.get('entities.file.data_type') },
    {
      href: `#${SectionId.BIOSPECIMENS}`,
      title: intl.get('entities.participant.participantSample'),
    },
    {
      href: `#${SectionId.EXPERIMENTAL_PROCEDURE}`,
      title: intl.get('entities.file.experimentalProcedure'),
    },
    { href: `#${SectionId.ANALYSIS}`, title: intl.get('entities.file.analysis') },
  ];

  const dataBiospecimensTable: IBiospecimenEntity[] =
    data?.biospecimens?.hits?.edges?.map((e) => ({ key: e.node.sample_id, ...e.node })) || [];

  const getCurrentSqon = (): any => generateSelectionSqon(INDEXES.FILE, [file_id]);

  return (
    <EntityPage loading={loading} data={data} links={links} pageId={pageId}>
      <EntityTitle
        text={data?.file_id}
        icon={<FileTextOutlined className={styles.titleIcon} />}
        loading={loading}
        extra={data && <DownloadFileManifestModal sqon={getCurrentSqon()} type="primary" />}
      />
      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryDescriptions(data)}
        header={intl.get('global.summary')}
        subheader={<SummaryHeader file={data} />}
      />
      <EntityDescriptions
        id={SectionId.DATA_TYPE}
        loading={loading}
        descriptions={getDataTypeDescriptions(data)}
        header={intl.get('entities.file.data_type')}
        title={intl.get('entities.file.data_type')}
      />
      <EntityTable
        id={SectionId.BIOSPECIMENS}
        loading={loading}
        header={intl.get('entities.participant.participantsSamples')}
        title={intl.get('entities.participant.participantSample')}
        titleExtra={[
          <EntityTableRedirectLink
            key="1"
            to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
            icon={<ExternalLinkIcon width="14" />}
            data-cy="ParticipantsSamples_RedirectLink"
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'file_id',
                      value: data ? [data.file_id] : [],
                      index: INDEXES.FILE,
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
        columns={getBiospecimensColumns()}
        data={dataBiospecimensTable}
        total={dataBiospecimensTable.length}
        initialColumnState={userInfo?.config.files?.tables?.biospecimens?.columns}
        dictionary={getProTableDictionary()}
        headerConfig={{
          enableTableExport: true,
          onTableExportClick: () =>
            dispatch(
              fetchTsvReport({
                columnStates: userInfo?.config.files?.tables?.biospecimens?.columns,
                columns: getBiospecimensColumns(),
                index: INDEXES.BIOSPECIMEN,
                sqon: generateSelectionSqon(
                  INDEXES.BIOSPECIMEN,
                  dataBiospecimensTable.map((biospecimen) => biospecimen.sample_id),
                ),
                fileName: 'cqdg-participants-table',
              }),
            ),
          enableColumnSort: true,
          onColumnSortChange: (newState) =>
            dispatch(
              updateUserConfig({ files: { tables: { biospecimens: { columns: newState } } } }),
            ),
        }}
      />
      <EntityDescriptions
        id={SectionId.EXPERIMENTAL_PROCEDURE}
        loading={loading}
        descriptions={getExperimentalProcedureDescriptions(data)}
        header={intl.get('entities.file.experimentalProcedure')}
        title={intl.get('entities.file.experimentalProcedure')}
      />
      <EntityDescriptions
        id={SectionId.ANALYSIS}
        loading={loading}
        descriptions={getAnalysisDescriptions(data)}
        header={intl.get('entities.file.analysisProperties')}
        title={intl.get('entities.file.analysis')}
      />
      <>
        {data?.sequencing_experiment?.analysis_id && (
          <AnalysisFilesTable file={data} id={SectionId.ANALYSIS_FILES} />
        )}
      </>
    </EntityPage>
  );
};

export default FileEntity;
