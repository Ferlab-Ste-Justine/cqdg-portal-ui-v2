import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import getPhenotypesColumns from 'views/ParticipantEntity/utils/getPhenotypesColumns';

import { generateLocalTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { userColumnPreferencesOrDefault } from 'utils/tables';
import { getProTableDictionary } from 'utils/translation';

interface IPhenotypesTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const PhenotypesTable = ({ participant, id, loading }: IPhenotypesTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const phenotypesData =
    participant?.phenotypes_tagged?.hits?.edges?.map(({ node }) => ({
      ...node,
      key: node.internal_phenotype_id,
      is_observed: node.is_observed
        ? intl.get('entities.participant.observed')
        : intl.get('entities.participant.not_observed'),
    })) || [];

  const defaultCols = getPhenotypesColumns();
  const userCols = userInfo?.config?.participants?.tables?.phenotypes?.columns || [];
  const userColumns = userColumnPreferencesOrDefault(userCols, defaultCols);

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.participant.phenotype')}
      header={intl.get('entities.participant.phenotypes')}
      columns={getPhenotypesColumns()}
      data={phenotypesData}
      total={phenotypesData.length}
      initialColumnState={userColumns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableTableExport: true,
        onTableExportClick: () =>
          dispatch(
            generateLocalTsvReport({
              fileName: 'phenotypes',
              index: INDEXES.PARTICIPANT,
              headers: defaultCols,
              cols: userColumns,
              rows: phenotypesData,
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
