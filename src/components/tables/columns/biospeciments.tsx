import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { CompareFn } from 'antd/lib/table/interface';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

interface ISorter {
  multiple: number;
  compare?: CompareFn<any>;
}

interface tissueSourceProps {
  sorter?: ISorter | boolean;
}

export const tissueSource = ({ sorter = false }: tissueSourceProps): ProColumnType<any> => ({
  key: 'biospecimen_tissue_source',
  dataIndex: 'biospecimen_tissue_source',
  title: intl.get('screen.dataExploration.tabs.biospecimens.biospecimen_tissue_source'),
  sorter,
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
});
