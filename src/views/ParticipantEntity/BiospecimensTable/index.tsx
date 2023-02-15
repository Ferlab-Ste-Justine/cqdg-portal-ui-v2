import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import getBiospecimensColumns from 'views/ParticipantEntity/utils/getBiospecimensColumns';

import DownloadSampleDataButton from 'components/reports/DownloadSamplelDataButton';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';
interface IBiospecimensTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const BiospecimensTable = ({ participant, id, loading }: IBiospecimensTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const biospecimensData = participant?.biospecimens
    ? participant.biospecimens?.hits?.edges?.map(({ node }) => ({
        ...node,
        key: node.biospecimen_id,
      }))
    : [];

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.biospecimen.biospecimen')}
      header={intl.get('entities.biospecimen.biospecimens')}
      columns={getBiospecimensColumns()}
      data={biospecimensData}
      initialColumnState={userInfo?.config.participants?.tables?.biospecimens?.columns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableTableExport: true,
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.participants?.tables?.biospecimens?.columns,
              columns: getBiospecimensColumns(),
              index: INDEXES.BIOSPECIMEN,
              sqon: generateSelectionSqon(
                INDEXES.BIOSPECIMEN,
                biospecimensData.map((b) => b.sample_id),
              ),
            }),
          ),
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { biospecimens: { columns: newState } } } }),
          ),
        extra: [
          <DownloadSampleDataButton key={1} sampleIds={biospecimensData.map((b) => b.sample_id)} />,
        ],
      }}
    />
  );
};
export default BiospecimensTable;
