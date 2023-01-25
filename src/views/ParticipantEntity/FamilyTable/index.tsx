import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantEntity } from 'graphql/participants/models';
import getFamilyColumns from 'views/ParticipantEntity/utils/getFamilyColumns';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

interface IFamilyTableProps {
  participant?: IParticipantEntity;
  loading: boolean;
  id: string;
}

const FamilyTable = ({ participant, loading, id }: IFamilyTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const familyData = participant?.family_relationships?.hits.edges || [];

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.participant.family')}
      header={intl.get('entities.participant.family')}
      columns={getFamilyColumns()}
      data={familyData}
      initialColumnState={userInfo?.config.participants?.tables?.family?.columns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { family: { columns: newState } } } }),
          ),
      }}
    />
  );
};
export default FamilyTable;
