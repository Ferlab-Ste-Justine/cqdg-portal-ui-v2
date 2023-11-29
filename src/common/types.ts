import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';

export type AlterTypes = 'success' | 'info' | 'warning' | 'error';

export interface IProColumnExport extends ProColumnType {
  exportValue?: (row: any) => string;
}
