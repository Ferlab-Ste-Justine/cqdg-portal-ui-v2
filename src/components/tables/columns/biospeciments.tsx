import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

export const tissue_source = {
  key: 'biospecimen_tissue_source',
  dataIndex: 'biospecimen_tissue_source',
  title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_tissue_source'),
  sorter: { multiple: 1 },
  render: (biospecimen_tissue_source: string) => {
    if (!biospecimen_tissue_source) return TABLE_EMPTY_PLACE_HOLDER;
    if (biospecimen_tissue_source === 'Unknown') {
      return (
        <>
          {intl.get(
            'screen.dataExploration.tabs.biospecimens.biospecimen_tissue_source_data.unknown',
          )}
        </>
      );
    }
    const { code, title } = extractNcitTissueTitleAndCode(biospecimen_tissue_source);
    return (
      <>
        {title} (NCIT:{' '}
        <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
      </>
    );
  },
};
