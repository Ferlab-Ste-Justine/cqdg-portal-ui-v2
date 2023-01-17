import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IParticipantEntity } from 'graphql/participants/models';
import capitalize from 'lodash/capitalize';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

import styles from 'views/FileEntity/index.module.scss';

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
