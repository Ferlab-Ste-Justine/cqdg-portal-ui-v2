import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LockOutlined, SafetyOutlined, UnlockFilled } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  addQuery,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IQueryConfig } from '@ferlab/ui/core/graphql/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useDataFiles } from 'graphql/files/actions';
import { FileAccessType, IFileEntity, ITableFileEntity } from 'graphql/files/models';
import capitalize from 'lodash/capitalize';
import {
  DATA_EXPLORATION_QB_ID,
  DATA_FILES_SAVED_SETS_FIELD,
  DEFAULT_FILE_QUERY_SORT,
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  SCROLL_WRAPPER_ID,
} from 'views/DataExploration/utils/constant';

import { MAX_ITEMS_QUERY, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';
import DownloadRequestAccessModal from 'components/reports/DownloadRequestAccessModal';
import SetsManagementDropdown from 'components/uiKit/SetsManagementDropdown';
import ExternalDataTypeLink from 'components/utils/ExternalDataTypeLink';
import { SetType } from 'services/api/savedSet/models';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { userHasAccessToFile } from 'utils/dataFiles';
import formatFileSize from 'utils/formatFileSize';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { userColumnPreferencesOrDefault } from 'utils/tables';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

const getDefaultColumns = (): ProColumnType[] => [
  {
    key: 'lock',
    title: intl.get('entities.file.file_authorization'),
    tooltip: intl.get('entities.file.file_authorization'),
    iconTitle: <LockOutlined />,
    align: 'center',
    render: (file: IFileEntity) => {
      const hasAccess = userHasAccessToFile(file);
      return hasAccess ? (
        <Tooltip title={intl.get('entities.file.authorized')}>
          <UnlockFilled className={styles.authorizedLock} />
        </Tooltip>
      ) : (
        <Tooltip title={intl.get('entities.file.controlled')}>
          <LockOutlined className={styles.unauthorizedLock} />
        </Tooltip>
      );
    },
  },
  {
    key: 'data_access',
    title: intl.get('entities.file.data_access'),
    tooltip: intl.get('entities.file.data_access'),
    iconTitle: <SafetyOutlined />,
    dataIndex: 'data_access',
    sorter: { multiple: 1 },
    align: 'center',
    render: (data_access: string) =>
      data_access === FileAccessType.REGISTERED ? (
        <Tooltip title={intl.get('entities.file.registered')}>
          <Tag color="green">R</Tag>
        </Tooltip>
      ) : (
        <Tooltip title={intl.get('entities.file.controlled')}>
          <Tag color="geekblue">C</Tag>
        </Tooltip>
      ),
  },
  {
    key: 'file_id',
    title: intl.get('entities.file.file_id'),
    dataIndex: 'file_id',
    render: (file_id: string) => <Link to={`${STATIC_ROUTES.FILES}/${file_id}`}>{file_id}</Link>,
  },
  {
    key: 'study_code',
    title: intl.get('entities.study.study'),
    dataIndex: 'study_code',
    sorter: { multiple: 1 },
    className: styles.studyIdCell,
    render: (study_code: string) => (
      <Link to={`${STATIC_ROUTES.STUDIES}/${study_code}`}>{study_code}</Link>
    ),
  },
  {
    key: 'dataset',
    title: intl.get('entities.file.dataset'),
    dataIndex: 'dataset',
    defaultHidden: true,
    sorter: { multiple: 1 },
    render: (dataset) => (dataset ? capitalize(dataset) : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'data_category',
    title: intl.get('entities.file.data_category'),
    dataIndex: 'data_category',
    sorter: { multiple: 1 },
  },
  {
    key: 'data_type',
    title: intl.get('entities.file.data_type'),
    tooltip: <ExternalDataTypeLink />,
    dataIndex: 'data_type',
    sorter: { multiple: 1 },
    render: (data_type) => data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sequencing_experiment.experimental_strategy',
    title: intl.get('entities.file.strategy'),
    dataIndex: 'sequencing_experiment',
    sorter: { multiple: 1 },
    render: (sequencing_experiment) =>
      sequencing_experiment?.experimental_strategy || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'file_format',
    title: intl.get('entities.file.file_format'),
    dataIndex: 'file_format',
    sorter: { multiple: 1 },
  },
  {
    key: 'file_size',
    title: intl.get('entities.file.file_size'),
    dataIndex: 'file_size',
    sorter: { multiple: 1 },
    render: (file_size) => formatFileSize(file_size, { output: 'string', round: 1 }),
  },
  {
    key: 'nb_participants',
    title: intl.get('entities.participant.participants'),
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
          {numberFormat(participantIds.length)}
        </Link>
      ) : (
        0
      );
    },
  },
  {
    key: 'nb_biospecimens',
    title: intl.get('entities.biospecimen.biospecimens'),
    render: (file: IFileEntity) => {
      const nb_biospecimens = file?.biospecimens?.hits.total || 0;
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
                    value: [file.file_id],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberFormat(nb_biospecimens)}
        </Link>
      ) : (
        0
      );
    },
  },
  {
    key: 'file_name',
    title: intl.get('entities.file.file_name'),
    dataIndex: 'file_name',
    defaultHidden: true,
    render: (file_name) => file_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sequencing_experiment.platform',
    title: intl.get('entities.file.sequencing_experiment.platform'),
    dataIndex: 'sequencing_experiment',
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (sequencing_experiment) => sequencing_experiment?.platform || TABLE_EMPTY_PLACE_HOLDER,
  },
];

interface IDataFilesTabProps {
  sqon?: ISqonGroupFilter;
}

const DataFilesTab = ({ sqon }: IDataFilesTabProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<ITableFileEntity[]>([]);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_FILE_QUERY_SORT,
    size:
      userInfo?.config?.data_exploration?.tables?.participants?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const results = useDataFiles(
    {
      first: queryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: queryConfig.searchAfter,
      sqon,
      sort: tieBreaker({
        sort: queryConfig.sort,
        defaultSort: DEFAULT_FILE_QUERY_SORT,
        field: 'file_id',
        order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    queryConfig.operations,
  );
  const hasTooManyFiles =
    selectedKeys.length > MAX_ITEMS_QUERY ||
    (selectedAllResults && results.total > MAX_ITEMS_QUERY);

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateQuery({
          newFilters: [
            generateValueFilter({
              field: DATA_FILES_SAVED_SETS_FIELD,
              index: INDEXES.FILE,
              value: selectedRows.map((row) => row[DATA_FILES_SAVED_SETS_FIELD]),
            }),
          ],
        });

  const defaultCols = getDefaultColumns();
  const userCols = userInfo?.config.data_exploration?.tables?.datafiles?.columns || [];
  const userColumns = userColumnPreferencesOrDefault(userCols, defaultCols);

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
      setSelectedRows([]);
    }

    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        sort: DEFAULT_FILE_QUERY_SORT,
        size:
          userInfo?.config?.data_exploration?.tables?.participants?.viewPerQuery ||
          DEFAULT_PAGE_SIZE,
      },
      setQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  useEffect(() => {
    if (queryConfig.firstPageFlag !== undefined || queryConfig.searchAfter === undefined) {
      return;
    }

    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  return (
    <>
      <ProTable<ITableFileEntity>
        data-cy="ProTable_DataFiles"
        tableId="datafiles_table"
        columns={getDefaultColumns()}
        initialSelectedKey={selectedKeys}
        wrapperClassName={styles.dataFilesTabWrapper}
        loading={results.loading}
        initialColumnState={userInfo?.config.data_exploration?.tables?.datafiles?.columns}
        enableRowSelection={true}
        showSorterTooltip={false}
        onChange={(_pagination, _filter, sorter) => {
          setPageIndex(DEFAULT_PAGE_INDEX);
          setQueryConfig({
            pageIndex: DEFAULT_PAGE_INDEX,
            size: queryConfig.size,
            sort: formatQuerySortList(sorter),
          } as IQueryConfig);
        }}
        headerConfig={{
          itemCount: {
            pageIndex: pageIndex,
            pageSize: queryConfig.size,
            total: results.total,
          },
          enableColumnSort: true,
          enableTableExport: true,
          onSelectAllResultsChange: setSelectedAllResults,
          onSelectedRowsChange: (keys, rows) => {
            setSelectedKeys(keys);
            setSelectedRows(rows);
          },
          onTableExportClick: () =>
            dispatch(
              fetchTsvReport({
                columnStates: userColumns,
                columns: defaultCols,
                index: INDEXES.FILE,
                sqon: getCurrentSqon(),
              }),
            ),
          onColumnSortChange: (newState) =>
            dispatch(
              updateUserConfig({
                data_exploration: { tables: { datafiles: { columns: newState } } },
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
            <DownloadFileManifestModal
              key={2}
              sqon={getCurrentSqon()}
              isDisabled={!selectedKeys.length && !selectedAllResults}
              hasTooManyFiles={hasTooManyFiles}
            />,
            <DownloadRequestAccessModal
              key={3}
              sqon={getCurrentSqon()}
              isDisabled={!selectedKeys.length && !selectedAllResults}
              hasTooManyFiles={hasTooManyFiles}
            />,
          ],
        }}
        bordered
        size="small"
        pagination={{
          current: pageIndex,
          queryConfig,
          setQueryConfig,
          onChange: (page: number) => {
            scrollToTop(SCROLL_WRAPPER_ID);
            setPageIndex(page);
          },
          searchAfter: results.searchAfter,
          onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
            dispatch(
              updateUserConfig({
                data_exploration: {
                  tables: {
                    datafiles: {
                      ...userInfo?.config.data_exploration?.tables?.datafiles,
                      viewPerQuery,
                    },
                  },
                },
              }),
            );
          },
          defaultViewPerQuery: queryConfig.size,
        }}
        dataSource={results.data.map((e, i) => ({ ...e, key: e.file_id + i }))}
        dictionary={getProTableDictionary()}
      />
    </>
  );
};

export default DataFilesTab;
