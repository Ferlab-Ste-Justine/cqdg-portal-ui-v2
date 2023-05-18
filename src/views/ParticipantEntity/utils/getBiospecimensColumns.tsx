import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDiagnosesColumns = (): ProColumnType<any>[] => [
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('entities.biospecimen.sample_id'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('entities.biospecimen.sample_type'),
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
    key: 'biospecimen_tissue_source',
    dataIndex: 'biospecimen_tissue_source',
    title: intl.get('entities.biospecimen.biospecimen_tissue_source'),
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
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('entities.biospecimen.biospecimen'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_biospecimen_collection',
    dataIndex: 'age_biospecimen_collection',
    title: intl.get('entities.biospecimen.age_biospecimen_collection'),
    tooltip: intl.get('entities.biospecimen.age_biospecimen_collection_tooltip'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDiagnosesColumns;
