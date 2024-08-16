import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import getFamilyColumns from 'views/ParticipantEntity/utils/getFamilyColumns';

import { generateLocalTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';
import { userColumnPreferencesOrDefault } from 'utils/tables';
import { getProTableDictionary } from 'utils/translation';

import styles from 'views/FileEntity/index.module.css';

interface IFamilyTableProps {
  participant?: IParticipantEntity;
  loading: boolean;
  id: string;
}

const FamilyTable = ({ participant, loading, id }: IFamilyTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const familyRelationships =
    participant?.family_relationships?.hits.edges.map(({ node }) => ({
      key: node.participant_id,
      ...node,
    })) || [];
  const familyWithoutCurrentParticipant =
    familyRelationships.filter((p) => p.participant_id !== participant?.participant_id) || [];
  const currentParticipant = familyRelationships.find(
    (p) => p.participant_id === participant?.participant_id,
  );
  const familySorted = currentParticipant
    ? [currentParticipant, ...familyWithoutCurrentParticipant]
    : [];

  const defaultCols = getFamilyColumns(participant?.participant_id);
  const userCols = userInfo?.config?.participants?.tables?.family?.columns || [];
  const userColumns = userColumnPreferencesOrDefault(userCols, defaultCols);

  const FamilyLink = () => (
    <>
      {`${intl.get('entities.participant.family')} ( `}
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        data-cy="FamilyLink"
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
        {participant?.family_id}
      </Link>
      {` )`}
    </>
  );

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.participant.family')}
      header={participant?.family_id ? <FamilyLink /> : intl.get('entities.participant.family')}
      columns={getFamilyColumns(participant?.participant_id)}
      data={familySorted}
      emptyMessage={intl.get('api.noDataAvailable')}
      initialColumnState={userColumns}
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
            generateLocalTsvReport({
              fileName: 'family',
              index: INDEXES.PARTICIPANT,
              headers: getFamilyColumns(participant?.participant_id),
              cols: userColumns,
              rows: familySorted,
            }),
          ),
      }}
    />
  );
};
export default FamilyTable;
