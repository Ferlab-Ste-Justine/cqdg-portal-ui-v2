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
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { FileAccessType, IFileEntity, ITableFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree, IQueryResults } from 'graphql/models';
import { IStudyEntity } from 'graphql/studies/models';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import {
  DATA_EXPLORATION_QB_ID,
  DEFAULT_PAGE_SIZE,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
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
    title: intl.get('screen.dataExploration.tabs.datafiles.fileID'),
    dataIndex: 'file_id',
    sorter: { multiple: 1 },
  },
  {
    key: 'studies',
    title: intl.get('screen.dataExploration.tabs.datafiles.studies'),
    dataIndex: 'studies',
    sorter: {
      multiple: 1,
    },
    className: styles.studyIdCell,
    render: (studies: ArrangerResultsTree<IStudyEntity>) => {
      if (!studies?.hits?.edges?.length) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      const studiesInfo = studies?.hits.edges.map((study) => ({
        name: study.node.name,
        id: study.node.internal_study_id,
      }));
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={studiesInfo}
          renderItem={(item, index) => (
            <Link
              key={index}
              to={STATIC_ROUTES.STUDIES}
              onClick={() =>
                updateActiveQueryField({
                  queryBuilderId: STUDIES_EXPLORATION_QB_ID,
                  field: 'internal_study_id',
                  value: item.id ? [item.id] : [],
                  index: INDEXES.STUDY,
                })
              }
            >
              {item.name}
            </Link>
          )}
        />
      );
    },
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
    key: 'access_urls',
    title: intl.get('screen.dataExploration.tabs.datafiles.accessUrl'),
    dataIndex: 'access_urls',
    sorter: { multiple: 1 },
    defaultHidden: true,
  },
  {
    key: 'file_format',
    title: intl.get('screen.dataExploration.tabs.datafiles.format'),
    dataIndex: 'file_format',
    sorter: { multiple: 1 },
  },
  {
    key: 'size',
    title: intl.get('screen.dataExploration.tabs.datafiles.size'),
    dataIndex: 'size',
    sorter: { multiple: 1 },
    render: (size) => formatFileSize(size, { output: 'string' }),
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
    render: (record: IFileEntity) => {
      const nb_participants = record?.participants.hits.total || 0;
      return nb_participants ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'file_id',
                    value: [record.file_id],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {nb_participants}
        </Link>
      ) : (
        nb_participants
      );
    },
  },
  {
    key: 'nb_biospecimens',
    title: intl.get('screen.dataExploration.tabs.datafiles.biospecimens'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (record: IFileEntity) => {
      const nb_biospecimens = record?.nb_biospecimens || 0;
      return nb_biospecimens ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'file_id',
                    value: [record.file_id],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {nb_biospecimens}
        </Link>
      ) : (
        nb_biospecimens
      );
    },
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
      : generateSelectionSqon(TAB_IDS.DATA_FILES, selectedKeys);

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
                  : generateSelectionSqon(TAB_IDS.DATA_FILES, selectedKeys),
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
