import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { IQueryResults } from 'graphql/models';
import { IStudyEntity, ITableStudyEntity } from 'graphql/studies/models';
import { DEFAULT_PAGE_SIZE, SCROLL_WRAPPER_ID } from 'views/Studies/utils/constant';

import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
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
    title: 'Study ID',
  },
  {
    dataIndex: 'name',
    key: 'study_name',
    sorter: {
      multiple: 1,
    },
    title: 'Study Name',
  },
  {
    dataIndex: 'domain',
    key: 'domain',
    sorter: {
      multiple: 1,
    },
    title: 'Domain',
  },
  {
    dataIndex: 'population',
    key: 'population',
    sorter: {
      multiple: 1,
    },
    title: 'Population',
  },
  {
    key: 'participants',
    render: (record: IStudyEntity) => record.participants.hits.total,
    title: 'Participants',
  },
  {
    key: 'seq',
    render: (record: IStudyEntity) => {
      const sq = record.summary.data_category.hits.edges.find(
        (item: any) => item.node.key === 'Sequencing reads',
      );
      return sq?.node.participants;
    },
    title: 'Seq',
  },
  {
    key: 'snv',
    render: (record: IStudyEntity) => {
      const snv = record.summary.data_category.hits.edges.find(
        (item: any) => item.node.key === 'Simple nucleotide variation',
      );
      return snv?.node.participants;
    },
    title: 'SNV',
  },
  {
    key: 'exp',
    render: (record: IStudyEntity) => {
      const exp = record.summary.data_category.hits.edges.find(
        (item: any) => item.node.key === 'Transcriptome profiling',
      );
      return exp?.node.participants;
    },
    title: 'Exp',
  },
  {
    key: 'files',
    render: (record: IStudyEntity) => record.files.hits.total,
    title: 'Files',
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
