import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LockOutlined, SafetyOutlined, UnlockFilled } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import useQueryBuilderState, {
  addQuery,
  updateActiveQueryField,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { FileAccessType, IFileEntity, ITableFileEntity } from 'graphql/files/models';
import { IQueryResults } from 'graphql/models';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import {
  DATA_EXPLORATION_QB_ID,
  DEFAULT_PAGE_SIZE,
  SCROLL_WRAPPER_ID,
} from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import { STUDIES_EXPLORATION_QB_ID } from 'views/Studies/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import { SetType } from 'services/api/savedSet/models';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { userHasAccessToFile } from 'utils/dataFiles';
import { formatFileSize } from 'utils/formatFileSize';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IFileEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (): ProColumnType<any>[] => [
  {
    key: 'lock',
    title: intl.get('screen.dataExploration.tabs.datafiles.fileAuthorization'),
    iconTitle: <LockOutlined />,
    tooltip: intl.get('screen.dataExploration.tabs.datafiles.fileAuthorization'),
    align: 'center',
    render: (record: IFileEntity) => {
      const hasAccess = userHasAccessToFile(record);
      return hasAccess ? (
        <Tooltip title="Authorized">
          <UnlockFilled className={styles.authorizedLock} />
        </Tooltip>
      ) : (
        <Tooltip title="Unauthorized">
          <LockOutlined className={styles.unauthorizedLock} />
        </Tooltip>
      );
    },
  },
  {
    key: 'data_access',
    title: intl.get('screen.dataExploration.tabs.datafiles.dataAccess'),
    iconTitle: <SafetyOutlined />,
    tooltip: intl.get('screen.dataExploration.tabs.datafiles.dataAccess'),
    dataIndex: 'data_access',
    sorter: { multiple: 1 },
    align: 'center',
    width: 75,
    render: (data_access: string) =>
      !data_access ? (
        '-'
      ) : data_access.toLowerCase() === FileAccessType.CONTROLLED.toLowerCase() ? (
        <Tooltip title={intl.get('screen.dataExploration.tabs.datafiles.controlled')}>
          <Tag color="geekblue">C</Tag>
        </Tooltip>
      ) : (
        <Tooltip title={intl.get('screen.dataExploration.tabs.datafiles.registered')}>
          <Tag color="green">R</Tag>
        </Tooltip>
      ),
  },
  {
    key: 'file_id',
    title: intl.get('screen.dataExploration.tabs.datafiles.file'),
    dataIndex: 'file_id',
    sorter: { multiple: 1 },
  },
  {
    key: 'study_code',
    title: intl.get('screen.dataExploration.tabs.datafiles.study_code'),
    dataIndex: 'study_code',
    sorter: { multiple: 1 },
    className: styles.studyIdCell,
    render: (study_code: string) => (
      <Link
        to={STATIC_ROUTES.STUDIES}
        onClick={() =>
          updateActiveQueryField({
            queryBuilderId: STUDIES_EXPLORATION_QB_ID,
            field: 'study_code',
            value: [study_code],
            index: INDEXES.STUDY,
          })
        }
      >
        {study_code}
      </Link>
    ),
  },
  {
    key: 'data_category',
    title: intl.get('screen.dataExploration.tabs.datafiles.dataCategory'),
    dataIndex: 'data_category',
    sorter: { multiple: 1 },
  },
  {
    key: 'data_type',
    title: intl.get('screen.dataExploration.tabs.datafiles.dataType'),
    dataIndex: 'data_type',
    sorter: { multiple: 1 },
    render: (data_type) => data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'experimental_strategy',
    title: intl.get('screen.dataExploration.tabs.datafiles.experimentalStrategy'),
    dataIndex: 'sequencing_experiment',
    sorter: { multiple: 1 },
    render: (sequencing_experiment) =>
      sequencing_experiment?.experimental_strategy || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'file_format',
    title: intl.get('screen.dataExploration.tabs.datafiles.format'),
    dataIndex: 'file_format',
    sorter: { multiple: 1 },
  },
  {
    key: 'file_size',
    title: intl.get('screen.dataExploration.tabs.datafiles.size'),
    dataIndex: 'file_size',
    sorter: { multiple: 1 },
    render: (file_size) => formatFileSize(file_size, { output: 'string' }),
  },
  {
    key: 'platform',
    title: intl.get('screen.dataExploration.tabs.datafiles.platform'),
    dataIndex: 'platform',
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (platform) => platform || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_participants',
    title: intl.get('screen.dataExploration.tabs.datafiles.participants'),
    sorter: { multiple: 1 },
    render: (file: IFileEntity) => {
      const participantIds = file?.participants?.hits.edges.map((p) => p.node.participant_id) || [];
      return participantIds?.length ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'file_id',
                    value: [file.file_id],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {participantIds.length}
        </Link>
      ) : (
        0
      );
    },
  },
  {
    key: 'nb_biospecimens',
    title: intl.get('screen.dataExploration.tabs.datafiles.biospecimens'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (file: IFileEntity) => {
      const sampleIds: string[] = [];
      file?.participants?.hits.edges.forEach((edge) => {
        edge.node.biospecimens?.hits.edges.forEach((edge) => {
          sampleIds.push(edge.node.sample_id);
        });
      });
      return sampleIds.length ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'file_id',
                    value: [file.file_id],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {sampleIds.length}
        </Link>
      ) : (
        0
      );
    },
  },
  {
    key: 'file_name',
    title: intl.get('screen.dataExploration.tabs.datafiles.name'),
    dataIndex: 'file_name',
    defaultHidden: true,
    render: (file_name) => file_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_reference',
    title: intl.get('screen.dataExploration.tabs.datafiles.sample'),
    dataIndex: 'biospecimen_reference',
    defaultHidden: true,
    render: (biospecimen_reference) => biospecimen_reference || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const DataFilesTab = ({ results, setQueryConfig, queryConfig, sqon }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
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
      : generateSelectionSqon(INDEXES.FILE, selectedKeys);

  return (
    <ProTable<ITableFileEntity>
      tableId="datafiles_table"
      columns={getDefaultColumns()}
      initialSelectedKey={selectedKeys}
      wrapperClassName={styles.dataFilesTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.datafiles?.columns}
      enableRowSelection={true}
      showSorterTooltip={false}
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
        onSelectedRowsChange: (keys) => {
          setSelectedKeys(keys);
        },
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.data_exploration?.tables?.datafiles?.columns,
              columns: getDefaultColumns(),
              index: INDEXES.FILE,
              sqon:
                selectedAllResults || !selectedKeys.length
                  ? sqon
                  : generateSelectionSqon(INDEXES.FILE, selectedKeys),
            }),
          ),
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  datafiles: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        extra: [
          <SetsManagementDropdown
            key="SetsManagementDropdown"
            results={results}
            sqon={getCurrentSqon()}
            selectedAllResults={selectedAllResults}
            type={SetType.FILE}
            selectedKeys={selectedKeys}
          />,
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
      dataSource={results.data.map((i) => ({ ...i, key: i.file_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default DataFilesTab;
