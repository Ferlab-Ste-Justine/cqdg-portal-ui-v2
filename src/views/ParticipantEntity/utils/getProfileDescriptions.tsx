import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IParticipantEntity } from 'graphql/participants/models';
import capitalize from 'lodash/capitalize';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from 'views/FileEntity/index.module.scss';

const getProfileDescriptions = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.participant.gender'),
    value: (
      <Tag color="blue" className={styles.tag}>
        {capitalize(participant?.gender) || TABLE_EMPTY_PLACE_HOLDER}
      </Tag>
    ),
  },
  {
    label: intl.get('entities.participant.ethnicity'),
    value: participant?.ethnicity || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.age_at_recruitment'),
    value: participant?.age_at_recruitment || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.vital_status'),
    value: (
      <Tag color="red" className={styles.tag}>
        {participant?.vital_status || TABLE_EMPTY_PLACE_HOLDER}
      </Tag>
    ),
  },
  {
    label: intl.get('entities.participant.age_of_death'),
    value: participant?.age_of_death || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.cause_of_death'),
    value: participant?.cause_of_death || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getProfileDescriptions;
