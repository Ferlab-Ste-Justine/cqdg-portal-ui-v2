import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { pageId } from 'views/FileEntity';

import { STATIC_ROUTES } from 'utils/routes';

const getFamilyColumns = (current_participant_id = ''): ProColumnType<any>[] => [
  {
    key: 'participant_id',
    dataIndex: 'participant_id',
    title: intl.get('entities.participant.participant'),
    render: (participant_id: string) =>
      current_participant_id !== participant_id ? (
        <Link
          to={`${STATIC_ROUTES.PARTICIPANTS}/${participant_id}`}
          onClick={() => document.getElementById(pageId)?.scrollTo(0, 0)}
        >
          {participant_id}
        </Link>
      ) : (
        participant_id
      ),
  },
  {
    key: 'relationship_to_proband',
    dataIndex: 'relationship_to_proband',
    title: intl.get('entities.participant.family_position'),
  },
  {
    key: 'is_affected',
    dataIndex: 'is_affected',
    title: intl.get('entities.participant.disease_status'),
  },
];

export default getFamilyColumns;
