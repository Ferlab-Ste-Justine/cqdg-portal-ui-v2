import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { pageId } from 'views/FileEntity';

import { STATIC_ROUTES } from 'utils/routes';

const getFamilyColumns = (): ProColumnType<any>[] => [
  {
    key: 'family_relationships.submitter_participant_id',
    dataIndex: 'submitter_participant_id',
    title: intl.get('entities.participant.participant'),
    render: (participant_id: string) => (
      <Link
        to={`${STATIC_ROUTES.PARTICIPANTS}/${participant_id}`}
        onClick={() => document.getElementById(pageId)?.scrollTo(0, 0)}
      >
        {participant_id}
      </Link>
    ),
  },
  {
    key: 'family_relationships.relationship_to_proband',
    dataIndex: 'relationship_to_proband',
    title: intl.get('entities.participant.family_position'),
  },
  {
    key: 'family_relationships.is_affected',
    dataIndex: 'is_affected',
    title: intl.get('entities.participant.disease_status'),
  },
];

export default getFamilyColumns;
