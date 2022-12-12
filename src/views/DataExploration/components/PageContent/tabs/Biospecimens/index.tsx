import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import useQueryBuilderState, {
  addQuery,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { IQueryResults } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import {
  DATA_EXPLORATION_QB_ID,
  DEFAULT_PAGE_SIZE,
  SCROLL_WRAPPER_ID,
} from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import { ReportType } from 'services/api/reports/models';
import { SetType } from 'services/api/savedSet/models';
import { fetchReport } from 'store/report/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

const getDefaultColumns = (): ProColumnType<any>[] => [
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.sample_id'),
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_id'),
    render: (biospecimen_id: string) => biospecimen_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant.participant_id',
    dataIndex: 'participant',
    title: intl.get('screen.dataExploration.tabs.biospecimens.participant_id'),
    render: (participant: IParticipantEntity) => participant.participant_id,
  },
  {
    key: 'study_id',
    dataIndex: 'study_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.study_id'),
    sorter: { multiple: 1 },
    render: (study_id) => study_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('screen.dataExploration.tabs.biospecimens.sample_type'),
    sorter: { multiple: 1 },
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_tissue_source',
    dataIndex: 'biospecimen_tissue_source',
    title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_tissue_source'),
    sorter: { multiple: 1 },
    render: (biospecimen_tissue_source: string) =>
      biospecimen_tissue_source || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_biospecimen_collection',
    dataIndex: 'age_biospecimen_collection',
    title: intl.get('screen.dataExploration.tabs.biospecimens.age_biospecimen_collection'),
    render: (age_biospecimen_collection) => age_biospecimen_collection || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'files',
    title: 'Files',
    render: (record: IBiospecimenEntity) => {
      const nbFiles = record?.files?.hits?.total || 0;
      return nbFiles ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'sample_id',
                    value: [record.sample_id],
                    index: INDEXES.BIOSPECIMEN,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {nbFiles}
        </Link>
      ) : (
        nbFiles
      );
    },
  },
];

interface IBiospecimenTabProps {
  results: IQueryResults<IBiospecimenEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const BiospecimenTab = ({ results, setQueryConfig, queryConfig, sqon }: IBiospecimenTabProps) => {
  const dispatch = useDispatch();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateSelectionSqon(INDEXES.BIOSPECIMEN, selectedKeys);

  return (
    <ProTable
      tableId="biospecimen_table"
      columns={getDefaultColumns()}
      wrapperClassName={styles.biospecimenTabWrapper}
      loading={results.loading}
      enableRowSelection={true}
      showSorterTooltip={false}
      initialSelectedKey={selectedKeys}
      onChange={({ current, pageSize }, _, sorter) =>
        setQueryConfig({
          pageIndex: current!,
          size: pageSize!,
          sort: formatQuerySortList(sorter),
        })
      }
      headerConfig={{
        itemCount: {
          pageIndex: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          total: results.total,
        },
        enableColumnSort: true,
        enableTableExport: true,
        onSelectAllResultsChange: setSelectedAllResults,
        onSelectedRowsChange: (keys) => setSelectedKeys(keys),
        extra: [
          <SetsManagementDropdown
            key={1}
            results={results}
            sqon={getCurrentSqon()}
            selectedAllResults={selectedAllResults}
            type={SetType.BIOSPECIMEN}
            selectedKeys={selectedKeys}
          />,
          <Button
            key={2}
            icon={<DownloadOutlined />}
            onClick={() =>
              dispatch(
                fetchReport({
                  data: {
                    sqon: getCurrentSqon(),
                    name: ReportType.BIOSEPCIMEN_DATA,
                  },
                }),
              )
            }
            disabled={selectedKeys.length === 0}
          >
            Download sample data
          </Button>,
        ],
      }}
      bordered
      size="small"
      pagination={{
        current: queryConfig.pageIndex,
        pageSize: queryConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results.total,
        onChange: () => scrollToTop(SCROLL_WRAPPER_ID),
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.sample_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default BiospecimenTab;
