import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import Empty from '@ferlab/ui/core/components/Empty';
import EntityPage, {
  EntityDescriptions,
  EntityTable,
  EntityTitle,
} from '@ferlab/ui/core/pages/EntityPage';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { useFile } from 'graphql/files/actions';
import { IFileEntity } from 'graphql/files/models';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import SummaryHeader from 'views/FileEntity/SummaryHeader';
import getAnalysisDescriptions from 'views/FileEntity/utils/getAnalysisDescriptions';
import getAnalysisFilesColumns from 'views/FileEntity/utils/getAnalysisFilesColumns';
import getBiospecimensColumns from 'views/FileEntity/utils/getBiospecimensColumns';
import getDataTypeDescriptions from 'views/FileEntity/utils/getDataTypeDescriptions';
import getExperimentalProcedureDescriptions from 'views/FileEntity/utils/getExperimentalProcedureDescriptions';
import getSummaryDescriptions from 'views/FileEntity/utils/getSummaryDescriptions';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

const FileEntity = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { file_id } = useParams<{ file_id: string }>();

  const { data, loading } = useFile({
    field: 'file_id',
    values: [file_id],
  });

  enum SectionId {
    SUMMARY = 'SUMMARY',
    DATA_TYPE = 'DATA_TYPE',
    BIOSPECIMENS = 'BIOSPECIMENS',
    EXPERIMENTAL_PROCEDURE = 'EXPERIMENTAL_PROCEDURE',
    ANALYSIS = 'ANALYSIS',
    ANALYSIS_FILES = 'ANALYSIS_FILES',
  }

  const links: IAnchorLink[] = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.file.summary') },
    { href: `#${SectionId.DATA_TYPE}`, title: intl.get('entities.file.dataType') },
    { href: `#${SectionId.BIOSPECIMENS}`, title: intl.get('entities.file.participantsSamples') },
    {
      href: `#${SectionId.EXPERIMENTAL_PROCEDURE}`,
      title: intl.get('entities.file.experimentalProcedure'),
    },
    { href: `#${SectionId.ANALYSIS}`, title: intl.get('entities.file.analysis') },
    { href: `#${SectionId.ANALYSIS_FILES}`, title: intl.get('entities.file.analysisFiles') },
  ];

  const dataBiospecimensTable: IBiospecimenEntity[] =
    data?.biospecimens?.hits?.edges?.map((e) => ({ key: e.node.sample_id, ...e.node })) || [];
  const dataAnalysisFilesTable: IFileEntity[] = data ? [{ key: data.file_id, ...data }] : [];

  if (!data && !loading) {
    return <Empty imageType="row" size="large" description={intl.get('no.data.available')} />;
  }

  return (
    <EntityPage links={links} pageId={'file-entity-page'}>
      <EntityTitle text={data?.file_id} icon={<FileTextOutlined size={24} />} loading={loading} />
      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryDescriptions(data)}
        header={intl.get('entities.file.summary')}
        subheader={<SummaryHeader file={data} />}
      />
      <EntityDescriptions
        id={SectionId.DATA_TYPE}
        loading={loading}
        descriptions={getDataTypeDescriptions(data)}
        header={intl.get('entities.file.dataType')}
        title={intl.get('entities.file.dataType')}
      />
      <EntityTable
        id={SectionId.BIOSPECIMENS}
        loading={loading}
        header={intl.get('entities.file.participantsSamples')}
        columns={getBiospecimensColumns()}
        data={dataBiospecimensTable}
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
      <EntityTable
        id={SectionId.ANALYSIS_FILES}
        loading={loading}
        header={intl.get('entities.file.analysisFiles')}
        columns={getAnalysisFilesColumns()}
        data={dataAnalysisFilesTable}
        initialColumnState={userInfo?.config.files?.tables?.files?.columns}
        dictionary={getProTableDictionary()}
        headerConfig={{
          enableTableExport: true,
          onTableExportClick: () =>
            dispatch(
              fetchTsvReport({
                columnStates: userInfo?.config.files?.tables?.biospecimens?.columns,
                columns: getAnalysisFilesColumns(),
                index: INDEXES.BIOSPECIMEN,
                sqon: generateSelectionSqon(
                  INDEXES.FILE,
                  dataAnalysisFilesTable.map((file) => file.file_id),
                ),
              }),
            ),
          enableColumnSort: true,
          onColumnSortChange: (newState) =>
            dispatch(updateUserConfig({ files: { tables: { files: { columns: newState } } } })),
        }}
      />
    </EntityPage>
  );
};

export default FileEntity;
