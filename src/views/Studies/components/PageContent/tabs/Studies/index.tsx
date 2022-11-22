import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { IQueryResults } from 'graphql/models';
import { IStudyDataAccessCodes, IStudyEntity, ITableStudyEntity } from 'graphql/studies/models';
import { DEFAULT_PAGE_SIZE, SCROLL_WRAPPER_ID } from 'views/Studies/utils/constant';

import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IStudyEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (): ProColumnType<ITableStudyEntity>[] => [
  {
    key: 'internal_study_id',
    dataIndex: 'internal_study_id',
    title: intl.get('screen.studies.code'),
    sorter: { multiple: 1 },
  },
  {
    dataIndex: 'name',
    key: 'study_name',
    title: intl.get('screen.studies.name'),
    sorter: { multiple: 1 },
  },
  {
    dataIndex: 'domain',
    key: 'domain',
    title: intl.get('screen.studies.domain'),
    sorter: { multiple: 1 },
  },
  {
    dataIndex: 'population',
    key: 'population',
    title: intl.get('screen.studies.population'),
    sorter: { multiple: 1 },
  },
  {
    key: 'participant_count',
    title: intl.get('screen.studies.participants'),
    dataIndex: 'participant_count',
    render: (participant_count: number) => (
      <Link to={`${STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}`}>{participant_count}</Link>
    ),
    defaultHidden: true,
  },
  {
    key: 'family_count',
    title: intl.get('screen.studies.families'),
    dataIndex: 'family_count',
  },
  {
    key: 'genomics',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories.hits.edges.find(
        (item: any) => item.node.data_type === 'Genomics',
      );
      return elem?.node.participant_count;
    },
    title: intl.get('screen.studies.genomics'),
  },
  {
    key: 'transcriptomics',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories.hits.edges.find(
        (item: any) => item.node.data_type === 'Transcriptomics',
      );
      return elem?.node.participant_count;
    },
    title: intl.get('screen.studies.transcriptomics'),
  },
  {
    key: 'imaging',
    title: intl.get('screen.studies.imaging'),
    dataIndex: 'imaging',
  },
  {
    key: 'file_count',
    title: intl.get('screen.studies.files'),
    dataIndex: 'file_count',
    render: (file_count: number) => (
      <Link to={`${STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}`}>{file_count}</Link>
    ),
  },
  {
    key: 'access_limitations',
    title: intl.get('screen.studies.accessLimitation'),
    dataIndex: 'data_access_codes',
    defaultHidden: true,
    render: (data_access_codes: IStudyDataAccessCodes) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={data_access_codes?.access_limitations || []}
      />
    ),
  },
  {
    key: 'access_requirements',
    title: intl.get('screen.studies.accessRequirement'),
    dataIndex: 'access_requirements',
    defaultHidden: true,
    render: (data_access_codes: IStudyDataAccessCodes) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={data_access_codes?.access_requirements || []}
      />
    ),
  },
  {
    key: 'sample_availability',
    title: intl.get('screen.studies.sampleAvailability'),
    dataIndex: 'sample_availability',
    defaultHidden: true,
  },
  {
    key: 'description',
    title: intl.get('screen.studies.description'),
    dataIndex: 'description',
    defaultHidden: true,
  },
];

const StudiesTab = ({ results, setQueryConfig, queryConfig }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  return (
    <ProTable<ITableStudyEntity>
      tableId="studies-exploration-table"
      columns={getDefaultColumns()}
      initialColumnState={userInfo?.config.studies?.tables?.studies?.columns}
      wrapperClassName={styles.studyTabWrapper}
      loading={results.loading}
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
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              studies: {
                tables: {
                  studies: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
      }}
      bordered
      size="small"
      pagination={{
        current: queryConfig.pageIndex,
        pageSize: queryConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results.total,
        onChange: () => scrollToTop(SCROLL_WRAPPER_ID),
        hideOnSinglePage: true,
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.internal_study_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default StudiesTab;
