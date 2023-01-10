import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Card } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { IFileEntity } from 'graphql/files/models';
import capitalize from 'lodash/capitalize';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

const getDefaultColumns = (): ProColumnType<any>[] => [
  {
    key: 'participant_id',
    dataIndex: 'participant_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.participant_id'),
    render: (participant_id: string) => participant_id,
  },
  {
    key: 'study_code',
    dataIndex: 'study_code',
    title: intl.get('screen.dataExploration.tabs.biospecimens.study_code'),
    render: (study_code) => study_code,
  },
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.sample_id'),
    render: (sample_id: string) => sample_id,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('screen.dataExploration.tabs.biospecimens.sample_type'),
    render: (sample_type: string) => {
      if (!sample_type) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(sample_type);
      return (
        <>
          {capitalize(title)} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_id'),
    render: (biospecimen_id: string) => biospecimen_id,
  },
  {
    key: 'biospecimen_tissue_source',
    dataIndex: 'biospecimen_tissue_source',
    title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_tissue_source'),
    render: (biospecimen_tissue_source: string) => {
      if (!biospecimen_tissue_source) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(biospecimen_tissue_source);
      return (
        <>
          {capitalize(title)} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
];

interface IBiospecimensProps {
  file?: IFileEntity;
  loading: boolean;
  id: string;
}

const Biospecimens = ({ file, loading, id }: IBiospecimensProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const dataSource: IBiospecimenEntity[] =
    file?.biospecimens?.hits?.edges?.map((e) => ({ key: e.node.sample_id, ...e.node })) || [];

  return (
    <div id={id} className={styles.container}>
      <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
        <CollapsePanel
          header={intl.get('entities.file.participantsSamples')}
          key="1"
          className={styles.panel}
        >
          <Card loading={loading} className={styles.card}>
            <ProTable
              tableId="file_biospecimens_table"
              dataSource={dataSource}
              columns={getDefaultColumns()}
              loading={loading}
              initialColumnState={userInfo?.config.files?.tables?.biospecimens?.columns}
              headerConfig={{
                itemCount: {
                  pageIndex: 1,
                  pageSize: 1,
                  total: 1,
                },
                enableTableExport: true,
                // onTableExportClick: () =>
                //   dispatch(
                //     fetchTsvReport({
                //       columnStates: userInfo?.config.files?.tables?.biospecimens?.columns,
                //       columns: getDefaultColumns(),
                //       index: INDEXES.BIOSPECIMEN,
                //       sqon: getCurrentSqon(),
                //     }),
                //   ),
                enableColumnSort: true,
                onColumnSortChange: (newState) =>
                  dispatch(
                    updateUserConfig({
                      files: {
                        tables: {
                          biospecimens: {
                            columns: newState,
                          },
                        },
                      },
                    }),
                  ),
              }}
              bordered
              size="small"
              dictionary={getProTableDictionary()}
            />
          </Card>
        </CollapsePanel>
      </Collapse>
    </div>
  );
};

export default Biospecimens;
