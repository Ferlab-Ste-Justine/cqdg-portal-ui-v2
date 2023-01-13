import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import capitalize from 'lodash/capitalize';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getBiospecimensColumns = (): ProColumnType<any>[] => [
  {
    key: 'participant_id',
    dataIndex: 'participant_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.participant_id'),
    render: (participant_id: string) => participant_id,
  },
  {
    key: 'study_code',
    dataIndex: 'study_code',
    title: intl.get('screen.dataExploration.tabs.biospecimens.study_code'),
    render: (study_code: string) => study_code,
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
          {capitalize(title)} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_id'),
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
          {capitalize(title)} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
];

export default getBiospecimensColumns;
