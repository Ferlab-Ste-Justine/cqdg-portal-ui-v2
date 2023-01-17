import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantEntity } from 'graphql/participants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getAccessData = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.participant.ethnicity'),
    value: participant?.ethnicity || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getAccessData;
