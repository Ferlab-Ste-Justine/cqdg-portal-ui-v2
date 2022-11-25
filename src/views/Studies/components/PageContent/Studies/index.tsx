import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Popover } from 'antd';
import { IQueryResults } from 'graphql/models';
import { IStudyDataAccessCodes, IStudyEntity, ITableStudyEntity } from 'graphql/studies/models';
import { DEFAULT_PAGE_SIZE, SCROLL_WRAPPER_ID } from 'views/Studies/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { truncateString } from 'utils/string';
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
    key: 'study_id',
    dataIndex: 'study_id',
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
    render: (domain: string) => domain || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    dataIndex: 'population',
    key: 'population',
    title: intl.get('screen.studies.population'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (population: string) => population || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant_count',
    title: intl.get('screen.studies.participants'),
    dataIndex: 'participant_count',
    render: (participant_count: number) =>
      participant_count ? (
        <Link to={`${STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}`}>{participant_count}</Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'family_count',
    title: intl.get('screen.studies.families'),
    dataIndex: 'family_count',
    render: (family_count: string) => family_count || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'genomics',
    title: intl.get('screen.studies.genomics'),
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_type === 'Genomics',
      );
      return elem?.node.participant_count || TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'transcriptomics',
    title: intl.get('screen.studies.transcriptomics'),
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_type === 'Transcriptomics',
      );
      return elem?.node.participant_count || TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'imaging',
    title: intl.get('screen.studies.imaging'),
    dataIndex: 'imaging',
    render: (imaging: string) => imaging || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'file_count',
    title: intl.get('screen.studies.files'),
    dataIndex: 'file_count',
    render: (file_count: number) =>
      file_count ? (
        <Link to={`${STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}`}>{file_count}</Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'access_limitations',
    title: intl.get('screen.studies.accessLimitation'),
    dataIndex: 'data_access_codes',
    defaultHidden: true,
    render: (data_access_codes: IStudyDataAccessCodes) =>
      data_access_codes?.access_limitations?.length ? (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={data_access_codes?.access_limitations || []}
        />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'access_requirements',
    title: intl.get('screen.studies.accessRequirement'),
    dataIndex: 'access_requirements',
    defaultHidden: true,
    render: (data_access_codes: IStudyDataAccessCodes) =>
      data_access_codes?.access_requirements?.length ? (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={data_access_codes?.access_requirements || []}
        />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'sample_availability',
    title: intl.get('screen.studies.sampleAvailability'),
    dataIndex: 'sample_availability',
    defaultHidden: true,
    render: (sample_availability: string) => sample_availability || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'description',
    title: intl.get('screen.studies.description'),
    dataIndex: 'description',
    defaultHidden: true,
    render: (description: string) => (
      <Popover content={description} trigger="hover">
        {truncateString(description, 20) || TABLE_EMPTY_PLACE_HOLDER}
      </Popover>
    ),
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
      dataSource={results.data.map((i) => ({ ...i, key: i.study_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default StudiesTab;
