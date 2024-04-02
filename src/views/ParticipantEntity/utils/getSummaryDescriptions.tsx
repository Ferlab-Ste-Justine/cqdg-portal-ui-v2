import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IParticipantEntity } from 'graphql/participants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.scss';

const getSummaryDescriptions = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.participant.participant_id'),
    value: participant?.participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.submitter_participant_id'),
    value: participant?.submitter_participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.study'),
    value: (
      <Link to={`${STATIC_ROUTES.STUDIES}/${participant?.study?.study_code}`}>
        {`${participant?.study?.name} (${participant?.study?.study_code})`}
      </Link>
    ),
  },
  {
    label: intl.get('entities.participant.family_type'),
    value: participant?.family_type ? (
      <Tag color="cyan" className={styles.tag}>
        {participant?.family_type}
      </Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.participant.family_position'),
    value: participant?.relationship_to_proband ? (
      <Tag color="purple" className={styles.tag}>
        {participant?.relationship_to_proband}
      </Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];

export default getSummaryDescriptions;
