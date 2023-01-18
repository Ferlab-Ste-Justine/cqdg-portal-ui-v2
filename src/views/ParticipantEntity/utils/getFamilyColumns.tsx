import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';

import { STATIC_ROUTES } from 'utils/routes';

const getFamilyColumns = (): ProColumnType<any>[] => [
  {
    key: 'participant_id',
    dataIndex: 'participant_id',
    title: intl.get('entities.participant.participant_id'),
    render: (participant_id: string) => (
      <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant_id}`}>{participant_id}</Link>
    ),
  },
  {
    key: 'family_position',
    dataIndex: 'family_position',
    title: intl.get('entities.participant.family_position'),
  },
  {
    key: 'disease_status',
    dataIndex: 'disease_status',
    title: intl.get('entities.participant.disease_status'),
  },
];

export default getFamilyColumns;
