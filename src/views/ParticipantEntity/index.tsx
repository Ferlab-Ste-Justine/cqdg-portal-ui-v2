import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import EntityPage, {
  EntityDescriptions,
  EntityTable,
  EntityTitle,
} from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { useParticipant } from 'graphql/participants/actions';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import BiospecimensTable from 'views/ParticipantEntity/BiospecimensTable';
import DiagnosesTable from 'views/ParticipantEntity/DiagnosesTable';
import PhenotypesTable from 'views/ParticipantEntity/PhenotypesTable';
import getDataAccessDescriptions from 'views/ParticipantEntity/utils/getDataAccessDescriptions';
import getFamilyColumns from 'views/ParticipantEntity/utils/getFamilyColumns';
import getProfileDescriptions from 'views/ParticipantEntity/utils/getProfileDescriptions';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

import getSummaryDescriptions from './utils/getSummaryDescriptions';
import SummaryHeader from './SummaryHeader';

const ParticipantEntity = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { participant_id } = useParams<{ participant_id: string }>();

  const { data, loading } = useParticipant({
    field: 'participant_id',
    value: participant_id,
  });

  enum SectionId {
    SUMMARY = 'SUMMARY',
    PROFILE = 'PROFILE',
    FAMILY = 'FAMILY',
    DATA_ACCESS = 'DATA_ACCESS',
    DIAGNOSIS = 'DIAGNOSIS',
    PHENOTYPE = 'PHENOTYPE',
    BIOSPECIMEN = 'BIOSPECIMEN',
    DATA_FILE = 'DATA_FILE',
  }

  const links: IAnchorLink[] = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.global.summary') },
    { href: `#${SectionId.PROFILE}`, title: intl.get('entities.participant.profile') },
    { href: `#${SectionId.FAMILY}`, title: intl.get('entities.participant.family') },
    {
      href: `#${SectionId.DATA_ACCESS}`,
      title: intl.get('entities.file.data_access'),
    },
    { href: `#${SectionId.DIAGNOSIS}`, title: intl.get('entities.participant.diagnosis') },
    { href: `#${SectionId.PHENOTYPE}`, title: intl.get('entities.participant.phenotype') },
    { href: `#${SectionId.BIOSPECIMEN}`, title: intl.get('entities.biospecimen.biospecimen') },
    { href: `#${SectionId.DATA_FILE}`, title: intl.get('entities.file.file') },
  ];

  //todo: fetch participants by family_id
  const familyData: any[] = [];

  return (
    <EntityPage loading={loading} data={data} links={links} pageId={'participant-entity-page'}>
      <EntityTitle
        text={data?.participant_id}
        icon={<UserOutlined size={24} />}
        loading={loading}
      />
      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryDescriptions(data)}
        header={intl.get('entities.global.summary')}
        subheader={<SummaryHeader participant={data} />}
      />
      <EntityDescriptions
        id={SectionId.PROFILE}
        loading={loading}
        descriptions={getProfileDescriptions(data)}
        header={intl.get('entities.participant.profile')}
        title={intl.get('entities.participant.profile')}
      />

      <EntityTable
        id={SectionId.FAMILY}
        loading={loading}
        title={intl.get('entities.participant.family')}
        header={intl.get('entities.participant.family')}
        columns={getFamilyColumns()}
        data={familyData}
        initialColumnState={userInfo?.config.participants?.tables?.family?.columns}
        dictionary={getProTableDictionary()}
        headerConfig={{
          enableTableExport: true,
          onTableExportClick: () =>
            dispatch(
              fetchTsvReport({
                columnStates: userInfo?.config.participants?.tables?.family?.columns,
                columns: getFamilyColumns(),
                index: INDEXES.PARTICIPANT,
                sqon: generateSelectionSqon(
                  INDEXES.PARTICIPANT,
                  familyData.map((participant) => participant.participant_id),
                ),
              }),
            ),
          enableColumnSort: true,
          onColumnSortChange: (newState) =>
            dispatch(
              updateUserConfig({ participants: { tables: { family: { columns: newState } } } }),
            ),
        }}
      />

      <EntityDescriptions
        id={SectionId.DATA_ACCESS}
        loading={loading}
        descriptions={getDataAccessDescriptions(data)}
        header={intl.get('entities.file.data_access')}
        title={intl.get('entities.file.data_access')}
      />

      <>{data && <DiagnosesTable participant={data} id={SectionId.DIAGNOSIS} />}</>
      <>{data && <PhenotypesTable participant={data} id={SectionId.PHENOTYPE} />}</>
      <BiospecimensTable participant={data} id={SectionId.BIOSPECIMEN} loading={loading} />
    </EntityPage>
  );
};

export default ParticipantEntity;
