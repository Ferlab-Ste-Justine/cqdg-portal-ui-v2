import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import EntityPage, { EntityDescriptions, EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { useParticipant } from 'graphql/participants/actions';
import BiospecimensTable from 'views/ParticipantEntity/BiospecimensTable';
import DiagnosesTable from 'views/ParticipantEntity/DiagnosesTable';
import FamilyTable from 'views/ParticipantEntity/FamilyTable';
import FilesTable from 'views/ParticipantEntity/FilesTable';
import PhenotypesTable from 'views/ParticipantEntity/PhenotypesTable';
import getDataAccessDescriptions from 'views/ParticipantEntity/utils/getDataAccessDescriptions';
import getProfileDescriptions from 'views/ParticipantEntity/utils/getProfileDescriptions';

import getSummaryDescriptions from './utils/getSummaryDescriptions';
import SummaryHeader from './SummaryHeader';

import styles from './index.module.scss';

const ParticipantEntity = () => {
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

  return (
    <EntityPage loading={loading} data={data} links={links} pageId={'participant-entity-page'}>
      <EntityTitle
        text={data?.participant_id}
        icon={<UserOutlined className={styles.titleIcon} />}
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
      <FamilyTable participant={data} loading={loading} id={SectionId.FAMILY} />
      <EntityDescriptions
        id={SectionId.DATA_ACCESS}
        loading={loading}
        descriptions={getDataAccessDescriptions(data)}
        header={intl.get('entities.file.data_access')}
        title={intl.get('entities.file.data_access')}
      />
      {data && <DiagnosesTable participant={data} id={SectionId.DIAGNOSIS} />}
      {data && <PhenotypesTable participant={data} id={SectionId.PHENOTYPE} />}
      <BiospecimensTable participant={data} id={SectionId.BIOSPECIMEN} loading={loading} />
      <FilesTable participant={data} id={SectionId.BIOSPECIMEN} loading={loading} />
    </EntityPage>
  );
};

export default ParticipantEntity;
