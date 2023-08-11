import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { IParticipantEntity } from 'graphql/participants/models';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

const getBiospecimensColumns = (): ProColumnType<any>[] => [
  {
    key: 'participant.participant_id',
    dataIndex: 'participant',
    title: intl.get('screen.dataExploration.tabs.biospecimens.participant_id'),
    render: (participant: IParticipantEntity) => (
      <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant?.participant_id}`}>
        {participant?.participant_id}
      </Link>
    ),
  },
  {
    key: 'participant.study_code',
    dataIndex: 'participant',
    title: intl.get('screen.dataExploration.tabs.biospecimens.study_code'),
    render: (participant: IParticipantEntity) => (
      <Link to={`${STATIC_ROUTES.STUDIES}/${participant?.study_code}`}>
        {participant?.study_code}
      </Link>
    ),
  },
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.sample_id'),
    render: (sample_id: string) => sample_id,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('screen.dataExploration.tabs.biospecimens.sample_type'),
    render: (sample_type: string) => {
      if (!sample_type) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(sample_type);
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen'),
    render: (biospecimen_id: string) => biospecimen_id,
  },
  {
    key: 'biospecimen_tissue_source',
    dataIndex: 'biospecimen_tissue_source',
    title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_tissue_source'),
    render: (biospecimen_tissue_source: string) => {
      if (!biospecimen_tissue_source) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(biospecimen_tissue_source);
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
];

export default getBiospecimensColumns;
