import { Key } from 'react';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';

import { getIdFieldByType } from 'utils/fieldMapper';

export const generateSelectionSqon = (type: string, ids: Key[]) =>
  generateQuery({
    newFilters: [
      generateValueFilter({
        field: getIdFieldByType(type),
        value: ids as string[],
      }),
    ],
  });
