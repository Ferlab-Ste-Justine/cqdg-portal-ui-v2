import React from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink/index';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Popover } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IQueryResults } from 'graphql/models';
import { IStudyDataAccessCodes, IStudyEntity, ITableStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';
import { DEFAULT_PAGE_SIZE, SCROLL_WRAPPER_ID } from 'views/Studies/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
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
    key: 'study_code',
    dataIndex: 'study_code',
    title: intl.get('screen.studies.code'),
    sorter: { multiple: 1 },
    render: (study_code: string) => (
      <Link to={`${STATIC_ROUTES.STUDIES}/${study_code}`}>{study_code}</Link>
    ),
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
    render: (study: IStudyEntity) =>
      study?.participant_count ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_code',
                    value: [study.study_code],
                    index: INDEXES.STUDY,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberFormat(study?.participant_count)}
        </Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'family_count',
    title: intl.get('screen.studies.families'),
    dataIndex: 'family_count',
    render: (family_count: number) =>
      family_count ? numberFormat(family_count) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'genomics',
    title: intl.get('screen.studies.genomics'),
    align: 'center',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_category === 'Genomics',
      );
      return elem?.node?.participant_count ? <CheckOutlined /> : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'transcriptomics',
    title: intl.get('screen.studies.transcriptomics'),
    align: 'center',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_category === 'Transcriptomics',
      );
      return elem?.node?.participant_count ? <CheckOutlined /> : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'imaging',
    title: intl.get('screen.studies.imaging'),
    align: 'center',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_category === 'Imaging',
      );
      return elem?.node?.participant_count ? <CheckOutlined /> : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'file_count',
    title: intl.get('screen.studies.files'),
    render: (study: IStudyEntity) =>
      study?.file_count ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_code',
                    value: [study.study_code],
                    index: INDEXES.STUDY,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberFormat(study.file_count)}
        </Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
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
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        renderItem={(item, index) => {
          const info = extractDuoTitleAndCode(item);
          return info ? (
            <div key={index}>
              {info.title} (DUO:{' '}
              <ExternalLink
                href={`http://purl.obolibrary.org/obo/DUO_${info.code}`}
                className={styles.link}
              >
                {info.code}
              </ExternalLink>
              )
            </div>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          );
        }}
      />
    ),
  },
  {
    key: 'access_requirements',
    title: intl.get('screen.studies.accessRequirement'),
    dataIndex: 'data_access_codes',
    defaultHidden: true,
    render: (data_access_codes: IStudyDataAccessCodes) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={data_access_codes?.access_requirements || []}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        renderItem={(item, index) => {
          const info = extractDuoTitleAndCode(item);
          return info ? (
            <div key={index}>
              {info.title} (DUO:{' '}
              <ExternalLink
                href={`http://purl.obolibrary.org/obo/DUO_${info.code}`}
                className={styles.link}
              >
                {info.code}
              </ExternalLink>
              )
            </div>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          );
        }}
      />
    ),
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

const Studies = ({ results, setQueryConfig, queryConfig }: OwnProps) => {
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
          pageIndex: current,
          size: pageSize,
          sort: formatQuerySortList(sorter),
        } as IQueryConfig)
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
      dataSource={results.data.map((i) => ({ ...i, key: i.study_code }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default Studies;
