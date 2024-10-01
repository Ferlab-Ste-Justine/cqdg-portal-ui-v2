import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';

export type ReportConfig = {
  sqon: ISyntheticSqon;
  name: string;
  fileName?: string;
  withFamily?: boolean;
  withoutFiles?: boolean;
};

export enum ReportType {
  CLINICAL_DATA = 'clinicalData',
  CLINICAL_DATA_FAMILY = 'familyClinicalData',
  BIOSPECIMEN_DATA = 'biospecimenData',
  FILE_MANIFEST = 'manifest',
  FILE_MANIFEST_FAMILY = 'familyManifest',
  FILE_MANIFEST_STATS = 'fileManifestStats',
  FILE_REQUEST_ACCESS = 'fileRequestAccess',
  FILE_REQUEST_ACCESS_STATS = 'fileRequestAccessStats',
}
