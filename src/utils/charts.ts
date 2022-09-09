import intl from 'react-intl-universal';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';

export const toChartData = ({ key, doc_count }: { key: string; doc_count: number }) => {
  const dataKey = key === ArrangerValues.missing ? intl.get('api.noData') : key;
  return {
    id: dataKey,
    label: dataKey,
    value: doc_count,
  };
};
