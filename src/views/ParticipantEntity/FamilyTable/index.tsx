import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import getAnalysisFilesColumns from 'views/FileEntity/utils/getAnalysisFilesColumns';
import getFamilyColumns from 'views/ParticipantEntity/utils/getFamilyColumns';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from 'views/FileEntity/index.module.scss';

interface IFamilyTableProps {
  participant?: IParticipantEntity;
  loading: boolean;
  id: string;
}

const FamilyTable = ({ participant, loading, id }: IFamilyTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const familyData =
    participant?.family_relationships?.hits.edges.map(({ node }) => ({
      key: node.submitter_participant_id,
      ...node,
    })) || [];

  const FamilyLink = () => (
    <Link
      className={styles.link}
      to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
      onClick={() =>
        participant &&
        addQuery({
          queryBuilderId: DATA_EXPLORATION_QB_ID,
          query: generateQuery({
            newFilters: [
              generateValueFilter({
                field: 'family_id',
                value: [participant.family_id],
                index: INDEXES.PARTICIPANT,
              }),
            ],
          }),
          setAsActive: true,
        })
      }
    >
      {`${intl.get('entities.participant.family')} (${participant?.family_id})`}
    </Link>
  );

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.participant.family')}
      header={participant?.family_id ? <FamilyLink /> : intl.get('entities.participant.family')}
      columns={getFamilyColumns()}
      data={familyData}
      emptyMessage={intl.get('api.noData')}
      initialColumnState={userInfo?.config.participants?.tables?.family?.columns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { family: { columns: newState } } } }),
          ),
        enableTableExport: true,
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.participants?.tables?.family?.columns,
              columns: getAnalysisFilesColumns(),
              index: INDEXES.PARTICIPANT,
              sqon: generateSelectionSqon(
                INDEXES.PARTICIPANT,
                familyData.map((p) => p.submitter_participant_id),
              ),
              fileName: `cqdg-family-table`,
            }),
          ),
      }}
    />
  );
};
export default FamilyTable;
