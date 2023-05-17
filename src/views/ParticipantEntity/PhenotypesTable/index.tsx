import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity, IPhenotype } from 'graphql/participants/models';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import getPhenotypesColumns from 'views/ParticipantEntity/utils/getPhenotypesColumns';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

interface IPhenotypesTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const PhenotypesTable = ({ participant, id, loading }: IPhenotypesTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const phenotypesData: IPhenotype[] =
    participant?.observed_phenotypes?.hits?.edges?.map(({ node }) => ({
      key: node.name,
      ...node,
    })) || [];

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.participant.phenotype')}
      header={intl.get('entities.participant.phenotypes')}
      columns={getPhenotypesColumns()}
      data={phenotypesData}
      total={phenotypesData.length}
      initialColumnState={userInfo?.config.participants?.tables?.phenotypes?.columns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableTableExport: true,
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.participants?.tables?.phenotypes?.columns,
              columns: getPhenotypesColumns(),
              index: INDEXES.PARTICIPANT,
              sqon: generateSelectionSqon(
                INDEXES.PARTICIPANT,
                phenotypesData.map(() => participant?.participant_id || ''),
              ),
            }),
          ),
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { phenotypes: { columns: newState } } } }),
          ),
      }}
    />
  );
};
export default PhenotypesTable;
