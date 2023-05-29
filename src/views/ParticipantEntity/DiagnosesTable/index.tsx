import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import getDiagnosesColumns from 'views/ParticipantEntity/utils/getDiagnosesColumns';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

interface IDiagnosesTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const DiagnosesTable = ({ participant, id, loading }: IDiagnosesTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const diagnosesData = participant?.diagnoses
    ? participant.diagnoses?.hits?.edges?.map(({ node }) => ({ ...node, key: node.fhir_id }))
    : [];

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.participant.diagnosis')}
      header={intl.get('entities.participant.diagnoses')}
      columns={getDiagnosesColumns()}
      data={diagnosesData}
      total={diagnosesData.length}
      initialColumnState={userInfo?.config.participants?.tables?.diagnoses?.columns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableTableExport: true,
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.participants?.tables?.diagnoses?.columns,
              columns: getDiagnosesColumns(),
              index: INDEXES.PARTICIPANT,
              sqon: generateSelectionSqon(
                INDEXES.PARTICIPANT,
                diagnosesData.map(() => participant?.participant_id || ''),
              ),
              fileName: `cqdg-diagnoses-table`,
            }),
          ),
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { diagnoses: { columns: newState } } } }),
          ),
      }}
    />
  );
};
export default DiagnosesTable;
