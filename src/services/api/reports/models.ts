import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';

export type ReportConfig = {
  sqon: ISyntheticSqon;
  name: string;
};

export enum ReportType {
  CLINICAL_DATA = 'clinicalData',
  CLINICAL_DATA_FAMILY = 'familyClinicalData',
  BIOSPECIMEN_DATA = 'biospecimenData',
  FILE_MANIFEST = 'manifest',
  FILE_MANIFEST_FAMILY = 'familyManifest',
}
