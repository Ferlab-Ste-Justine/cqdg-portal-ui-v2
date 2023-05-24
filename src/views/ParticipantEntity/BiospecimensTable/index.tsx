import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import getBiospecimensColumns from 'views/ParticipantEntity/utils/getBiospecimensColumns';

import DownloadSampleDataButton from 'components/reports/DownloadSamplelDataButton';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';
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
      titleExtra={[
        <EntityTableRedirectLink
          key="1"
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          icon={<ExternalLinkIcon width="14" />}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: participant?.participant_id ? [participant.participant_id] : [],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {intl.get('global.viewInDataExploration')}
        </EntityTableRedirectLink>,
      ]}
      header={intl.get('entities.biospecimen.biospecimens')}
      columns={getBiospecimensColumns()}
      data={biospecimensData}
      total={biospecimensData.length}
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
              fileName: `cqdg-${intl.get('entities.biospecimen.biospecimens')}-table`,
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
