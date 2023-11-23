import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ColorTag, { ColorTagType } from '@ferlab/ui/core/components/ColorTag';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  addQuery,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IQueryConfig } from '@ferlab/ui/core/graphql/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { INDEXES } from 'graphql/constants';
import { ArrangerResultsTree } from 'graphql/models';
import { useParticipants } from 'graphql/participants/actions';
import {
  ageCategories,
  IIcd,
  IMondoTagged,
  IParticipantEntity,
  IPhenotype,
  ITableParticipantEntity,
} from 'graphql/participants/models';
import capitalize from 'lodash/capitalize';
import {
  DATA_EXPLORATION_QB_ID,
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PARTICIPANT_QUERY_SORT,
  DEFAULT_QUERY_CONFIG,
  PARTICIPANTS_SAVED_SETS_FIELD,
  SCROLL_WRAPPER_ID,
} from 'views/DataExploration/utils/constant';
import {
  extractIcdTitleAndCode,
  extractMondoTitleAndCode,
  extractPhenotypeTitleAndCode,
} from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import DownloadClinicalDataDropdown from 'components/reports/DownloadClinicalDataDropdown';
import SetsManagementDropdown from 'components/uiKit/SetsManagementDropdown';
import { SetType } from 'services/api/savedSet/models';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

const getDefaultColumns = (): ProColumnType<any>[] => [
  {
    key: 'participant_id',
    title: intl.get('screen.dataExploration.tabs.participants.participant'),
    dataIndex: 'participant_id',
    render: (participant_id: string) => (
      <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant_id}`}>{participant_id}</Link>
    ),
  },
  {
    key: 'study_code',
    title: intl.get('screen.dataExploration.tabs.participants.study_code'),
    dataIndex: 'study_code',
    sorter: { multiple: 1 },
    className: styles.studyIdCell,
    render: (study_code: string) => (
      <Link to={`${STATIC_ROUTES.STUDIES}/${study_code}`}>{study_code}</Link>
    ),
  },
  {
    key: 'gender',
    title: intl.get('screen.dataExploration.tabs.participants.gender'),
    dataIndex: 'gender',
    sorter: { multiple: 1 },
    render: (sex: string) => <ColorTag type={ColorTagType.Gender} value={capitalize(sex)} />,
  },
  {
    key: 'mondo_tagged',
    title: intl.get('screen.dataExploration.tabs.participants.diagnosis'),
    dataIndex: 'mondo_tagged',
    className: styles.diagnosisCell,
    render: (mondo_tagged: ArrangerResultsTree<IMondoTagged>) => {
      const mondoNames = mondo_tagged?.hits?.edges.map((m) => m.node.name);
      if (!mondoNames || mondoNames.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={3}
          dataSource={mondoNames}
          dictionnary={{
            'see.less': intl.get('global.seeLess'),
            'see.more': intl.get('global.seeMore'),
          }}
          renderItem={(mondo_id, id) => {
            const mondoInfo = extractMondoTitleAndCode(mondo_id);
            return (
              <div key={id}>
                {mondoInfo!.title} (MONDO:{' '}
                <ExternalLink href={`http://purl.obolibrary.org/obo/MONDO_${mondoInfo!.code}`}>
                  {mondoInfo!.code}
                </ExternalLink>
                )
              </div>
            );
          }}
        />
      );
    },
  },
  {
    key: 'observed_phenotype_tagged',
    title: intl.get('screen.dataExploration.tabs.participants.phenotype'),
    dataIndex: 'observed_phenotype_tagged',
    className: styles.phenotypeCell,
    render: (observed_phenotype_tagged: ArrangerResultsTree<IPhenotype>) => {
      const phenotypeNames = observed_phenotype_tagged?.hits?.edges.map((p) => p.node.name);
      if (!phenotypeNames || phenotypeNames.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={3}
          dataSource={phenotypeNames}
          dictionnary={{
            'see.less': intl.get('global.seeLess'),
            'see.more': intl.get('global.seeMore'),
          }}
          renderItem={(hpo_id_phenotype, index): React.ReactNode => {
            const phenotypeInfo = extractPhenotypeTitleAndCode(hpo_id_phenotype);
            return phenotypeInfo ? (
              <div key={index}>
                {phenotypeInfo.title} (HP:{' '}
                <ExternalLink href={`http://purl.obolibrary.org/obo/HP_${phenotypeInfo.code}`}>
                  {phenotypeInfo.code}
                </ExternalLink>
                )
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            );
          }}
        />
      );
    },
  },
  {
    key: 'age_at_recruitment',
    title: intl.get('screen.dataExploration.tabs.participants.ageAtRecruitment'),
    dataIndex: 'age_at_recruitment',
    sorter: { multiple: 1 },
    tooltip: (
      <>
        <b>{intl.get('screen.dataExploration.tabs.participants.ageAtRecruitmentTooltip')}</b>
        <br />
        <br />
        {ageCategories.map((category) => (
          <>
            <b>{category.label}</b>
            {` ${category.tooltip}`}
            <br />
          </>
        ))}
      </>
    ),
    render: (age_at_recruitment) => {
      const category = ageCategories.find((cat) => cat.key === age_at_recruitment);
      if (!category) return TABLE_EMPTY_PLACE_HOLDER;
      return category.label;
    },
  },
  {
    key: 'nb_files',
    title: intl.get('screen.dataExploration.tabs.participants.files'),
    render: (participant: ITableParticipantEntity) => {
      const fileCount = participant?.files?.hits.total || 0;
      return fileCount ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [participant.participant_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {fileCount}
        </Link>
      ) : (
        0
      );
    },
  },
  {
    key: 'nb_biospecimen',
    title: intl.get('screen.dataExploration.tabs.participants.biospecimen'),
    render: (participant: ITableParticipantEntity) => {
      const nb_biospecimens = participant?.biospecimens?.hits.total || 0;
      return nb_biospecimens ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [participant.participant_id],
                    index: INDEXES.PARTICIPANT,
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
    key: 'ethnicity',
    title: intl.get('screen.dataExploration.tabs.participants.ethnicity'),
    dataIndex: 'ethnicity',
    defaultHidden: true,
    sorter: { multiple: 1 },
    render: (ethnicity) => ethnicity || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'icd_tagged',
    title: intl.get('screen.dataExploration.tabs.participants.icdTagged'),
    dataIndex: 'icd_tagged',
    defaultHidden: true,
    className: styles.diagnosisCell,
    render: (icd_tagged: ArrangerResultsTree<IIcd>) => {
      const icdNames = icd_tagged?.hits?.edges.map((m) => m.node.name).filter((n) => n);
      if (!icdNames?.length) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={3}
          dataSource={icdNames}
          renderItem={(name, index) => {
            const { code, title } = extractIcdTitleAndCode(name);
            return (
              <div key={index}>
                {title} (
                <ExternalLink href={`http://purl.bioontology.org/ontology/ICD10CM/${code}`}>
                  {code}
                </ExternalLink>
                )
              </div>
            );
          }}
          dictionnary={{
            'see.less': intl.get('global.seeLess'),
            'see.more': intl.get('global.seeMore'),
          }}
        />
      );
    },
  },
  {
    key: 'mondo_tagged__source_text',
    title: intl.get('screen.dataExploration.tabs.participants.diagnosisSourceText'),
    dataIndex: 'mondo_tagged',
    defaultHidden: true,
    className: styles.diagnosisCell,
    render: (mondo_tagged: ArrangerResultsTree<IMondoTagged>) => {
      const sourceTexts = mondo_tagged?.hits?.edges.map((m) => m.node.source_text);
      if (!sourceTexts?.length) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={3}
          dataSource={sourceTexts}
          renderItem={(sourceText, id) => <div key={id}>{sourceText}</div>}
          dictionnary={{
            'see.less': intl.get('global.seeLess'),
            'see.more': intl.get('global.seeMore'),
          }}
        />
      );
    },
  },
  {
    key: 'submitter_participant_id',
    title: intl.get('screen.dataExploration.tabs.participants.submitterParticipantId'),
    dataIndex: 'submitter_participant_id',
    defaultHidden: true,
    render: (submitter_participant_id) => submitter_participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'vital_status',
    title: intl.get('screen.dataExploration.tabs.participants.vitalStatus'),
    dataIndex: 'vital_status',
    defaultHidden: true,
    sorter: { multiple: 1 },
    render: (vital_status) => vital_status || TABLE_EMPTY_PLACE_HOLDER,
  },
];

interface IParticipantsTabProps {
  sqon?: ISqonGroupFilter;
}

const ParticipantsTab = ({ sqon }: IParticipantsTabProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<IParticipantEntity[]>([]);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_PARTICIPANT_QUERY_SORT,
    size:
      userInfo?.config?.data_exploration?.tables?.participants?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const results = useParticipants(
    {
      first: queryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: queryConfig.searchAfter,
      sqon,
      sort: tieBreaker({
        sort: queryConfig.sort,
        defaultSort: DEFAULT_PARTICIPANT_QUERY_SORT,
        field: 'participant_id',
        order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    queryConfig.operations,
  );

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateQuery({
          newFilters: [
            generateValueFilter({
              field: PARTICIPANTS_SAVED_SETS_FIELD,
              index: INDEXES.PARTICIPANT,
              value: selectedRows.map((row) => row[PARTICIPANTS_SAVED_SETS_FIELD]),
            }),
          ],
        });

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
      setSelectedRows([]);
    }
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        sort: DEFAULT_PARTICIPANT_QUERY_SORT,
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
    <ProTable<ITableParticipantEntity>
      data-cy="ProTable_Participants"
      tableId="participants_table"
      columns={getDefaultColumns()}
      wrapperClassName={styles.participantTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.participants?.columns}
      enableRowSelection={true}
      initialSelectedKey={selectedKeys}
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
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: { tables: { participants: { columns: newState } } },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.data_exploration?.tables?.participants?.columns,
              columns: getDefaultColumns(),
              index: INDEXES.PARTICIPANT,
              sqon: getCurrentSqon(),
            }),
          ),
        onSelectAllResultsChange: setSelectedAllResults,
        onSelectedRowsChange: (keys, rows) => {
          setSelectedKeys(keys);
          setSelectedRows(rows);
        },
        extra: [
          <SetsManagementDropdown
            key={1}
            results={results}
            sqon={getCurrentSqon()}
            selectedAllResults={selectedAllResults}
            type={SetType.PARTICIPANT}
            selectedKeys={selectedKeys}
          />,
          <DownloadClinicalDataDropdown participantIds={selectedKeys} key={2} />,
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
                  participants: {
                    ...userInfo?.config.data_exploration?.tables?.participants,
                    viewPerQuery,
                  },
                },
              },
            }),
          );
        },
        defaultViewPerQuery: queryConfig.size,
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.participant_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};
export default ParticipantsTab;
