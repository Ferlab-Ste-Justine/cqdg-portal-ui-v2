import { ArrangerResultsTree } from 'graphql/models';
import { IParticipantEntity, IMondo, IPhenotype, IDiagnosis } from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';
import { IBiospecimenEntity } from '../biospecimens/models';

export interface IFileResultTree {
  file: ArrangerResultsTree<IFileEntity>;
}

export interface IFileDataAccessCodes {
  access_limitations: string;
  access_requirements: string[];
}

export interface IFileIcd {
  id: string;
  score: number;
  age_at_event: number;
  display_name: string;
  internal_phenotype_id: string;
  is_leaf: boolean;
  is_tagged: boolean;
  main_category: string;
  name: string;
  parents: string[];
  phenotype_id: string;
}

export interface IFileEntity {
  id: string;
  file_id: string;
  participants: ArrangerResultsTree<IParticipantEntity>;
  biospecimens: ArrangerResultsTree<IBiospecimenEntity>;
  studies: ArrangerResultsTree<IStudyEntity>;
  data_category: string;
  data_type: string;
  file_format: string;
  score: number;
  data_access: string;
  dictionary_version: number;
  experimental_strategy: string;
  file_size: number;
  file_variant_class: string;
  is_harmonized: boolean;
  platform: string;
  study_version: number;
  study_version_creation_date: string;
  data_access_codes: IFileDataAccessCodes;
  diagnoses: ArrangerResultsTree<IDiagnosis>;
  icd: IFileIcd;
  mondo: IMondo;
  non_observed_phenotypes: ArrangerResultsTree<IPhenotype>;
  not_observed_phenotype_tagged: ArrangerResultsTree<IPhenotype>;
  observed_phenotype_tagged: ArrangerResultsTree<IPhenotype>;
  observed_phenotypes: ArrangerResultsTree<IPhenotype>;
}

export enum FileAccessType {
  CONTROLLED = 'Controlled',
  REGISTERED = 'Registered',
}

export type ITableFileEntity = IFileEntity & {
  key: string;
};
