import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import useQueryBuilderState, {
  addQuery,
  updateActiveQueryField,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, Dropdown, Menu, Tag } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ArrangerResultsTree, IQueryResults } from 'graphql/models';
import {
  IDiagnosis,
  IParticipantEntity,
  IPhenotype,
  ITableParticipantEntity,
} from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';
import { capitalize } from 'lodash';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import {
  DATA_EXPLORATION_QB_ID,
  DEFAULT_PAGE_SIZE,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import { STUDIES_EXPLORATION_QB_ID } from 'views/Studies/utils/constant';

import { SEX, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import { ReportType } from 'services/api/reports/models';
import { SetType } from 'services/api/savedSet/models';
import { fetchReport, fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IParticipantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'participant_id',
    title: intl.get('screen.dataExploration.tabs.participants.participantID'),
    dataIndex: 'participant_id',
    sorter: {
      multiple: 1,
    },
  },
  {
    key: 'studies',
    title: intl.get('screen.dataExploration.tabs.participants.studies'),
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
    key: 'is_a_proband',
    title: intl.get('screen.dataExploration.tabs.participants.proband'),
    dataIndex: 'is_a_proband',
    sorter: {
      multiple: 1,
    },
  },
  {
    key: 'gender',
    title: intl.get('screen.dataExploration.tabs.participants.gender'),
    dataIndex: 'gender',
    sorter: {
      multiple: 1,
    },
    render: (gender: string) =>
      gender ? (
        <Tag
          color={
            gender.toLowerCase() === SEX.FEMALE
              ? 'magenta'
              : gender.toLowerCase() === SEX.MALE
              ? 'geekblue'
              : ''
          }
        >
          {capitalize(gender)}
        </Tag>
      ) : (
        ''
      ),
  },
  {
    key: 'family_history_available',
    title: intl.get('screen.dataExploration.tabs.participants.familyHistory'),
    dataIndex: 'family_history_available',
    sorter: {
      multiple: 1,
    },
    render: (family_history_available) => (
      <Tag color={family_history_available ? 'geekblue' : 'magenta'}>
        {family_history_available ? 'Yes' : 'No'}
      </Tag>
    ),
  },
  {
    key: 'age_at_recruitment',
    title: intl.get('screen.dataExploration.tabs.participants.ageAtRecruitment'),
    dataIndex: 'age_at_recruitment',
    sorter: {
      multiple: 1,
    },
    render: (age_at_recruitment) => age_at_recruitment || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'diagnoses',
    title: intl.get('screen.dataExploration.tabs.participants.diagnoses'),
    dataIndex: 'diagnoses',
    className: styles.diagnosisCell,
    render: (diagnoses: ArrangerResultsTree<IDiagnosis>) => {
      const diagnosisMondoCodes = diagnoses?.hits?.edges.map((diag) => ({
        code: diag.node.diagnosis_mondo_code,
        text: diag.node.diagnosis_source_text,
      }));
      if (!diagnosisMondoCodes || !diagnosisMondoCodes.length) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={diagnosisMondoCodes}
          renderItem={(item, index) => (
            <div key={index}>
              {capitalize(item.text)}
              <br />
              <ExternalLink href={`https://monarchinitiative.org/disease/${item.code}`}>
                {item.code}
              </ExternalLink>
            </div>
          )}
        />
      );
    },
  },
  {
    key: 'phenotypes_tagged',
    title: intl.get('screen.dataExploration.tabs.participants.phenotypes'),
    dataIndex: 'phenotypes_tagged',
    className: styles.phenotypeCell,
    render: (observed_phenotype: ArrangerResultsTree<IPhenotype>) => {
      const phenotypes = observed_phenotype?.hits?.edges
        .filter((p) => p.node.is_tagged)
        .map((p) => ({ name: p.node.name, code: p.node.phenotype_id }));
      if (!phenotypes || !phenotypes.length) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={phenotypes}
          renderItem={(item, index) => (
            <div key={index}>
              {capitalize(item.name)} <br />
              <ExternalLink href={`https://hpo.jax.org/app/browse/term/${item.code}`}>
                {item.code}
              </ExternalLink>
            </div>
          )}
        />
      );
    },
  },
  {
    key: 'nb_files',
    title: intl.get('screen.dataExploration.tabs.participants.files'),
    sorter: {
      multiple: 1,
    },
    render: (record: ITableParticipantEntity) =>
      record.files.hits.total ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [record.participant_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {record.files.hits.total}
        </Link>
      ) : (
        0
      ),
  },
  {
    key: 'ethnicity',
    title: intl.get('screen.dataExploration.tabs.participants.ethnicity'),
    dataIndex: 'ethnicity',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (ethnicity) => ethnicity || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'vital_status',
    title: intl.get('screen.dataExploration.tabs.participants.vitalStatus'),
    dataIndex: 'vital_status',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (vital_status) => vital_status || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'submitter_participant_id',
    title: intl.get('screen.dataExploration.tabs.participants.submitterParticipantId'),
    dataIndex: 'submitter_participant_id',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (submitter_participant_id) => submitter_participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_of_death',
    title: intl.get('screen.dataExploration.tabs.participants.ageAtDeath'),
    dataIndex: 'age_of_death',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (age_of_death) => age_of_death || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const ParticipantsTab = ({ results, setQueryConfig, queryConfig, sqon }: OwnProps) => {
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
      : generateSelectionSqon(TAB_IDS.PARTICIPANTS, selectedKeys);

  const menu = (
    <Menu
      onClick={(e) =>
        dispatch(
          fetchReport({
            data: {
              sqon: getCurrentSqon(),
              name: e.key,
            },
          }),
        )
      }
      items={[
        {
          key: ReportType.CLINICAL_DATA,
          label: intl.get('screen.dataExploration.tabs.participants.selectedParticipants'),
        },
        {
          key: ReportType.CLINICAL_DATA_FAM,
          label: intl.get('screen.dataExploration.tabs.participants.selectedParticipantsFamilies'),
        },
      ]}
    />
  );

  return (
    <ProTable<ITableParticipantEntity>
      tableId="participants_table"
      columns={defaultColumns}
      wrapperClassName={styles.participantTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.participants?.columns}
      enableRowSelection={true}
      initialSelectedKey={selectedKeys}
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
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  participants: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.data_exploration?.tables?.participants?.columns,
              columns: defaultColumns,
              index: INDEXES.PARTICIPANT,
              sqon: getCurrentSqon(),
            }),
          ),
        onSelectAllResultsChange: setSelectedAllResults,
        onSelectedRowsChange: (keys) => setSelectedKeys(keys),
        extra: [
          <SetsManagementDropdown
            key={1}
            results={results}
            selectedKeys={selectedKeys}
            selectedAllResults={selectedAllResults}
            sqon={getCurrentSqon()}
            type={SetType.PARTICIPANT}
          />,
          <Dropdown
            key={2}
            disabled={selectedKeys.length === 0}
            overlay={menu}
            placement="bottomLeft"
          >
            <Button icon={<DownloadOutlined />}>
              {intl.get('screen.dataExploration.tabs.participants.downloadClinicalData')}
            </Button>
          </Dropdown>,
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
      dataSource={results.data.map((i) => ({ ...i, key: i.participant_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default ParticipantsTab;
