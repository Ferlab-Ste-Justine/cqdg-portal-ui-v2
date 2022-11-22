import { ArrangerResultsTree } from 'graphql/models';

export interface IStudyResultTree {
  Study: ArrangerResultsTree<IStudyEntity>;
}

export type ITableStudyEntity = IStudyEntity & {
  key: string;
};

export interface IStudyDataAccessCodes {
  access_limitations: string[];
  access_requirements: string[];
}

interface IDataType {
  id: string;
  data_type: string;
  participant_count: string;
}

export interface IStudyEntity {
  id: string;
  score: number;
  keyword: string;
  study_id: string;
  domain: string;
  internal_study_id: string;
  name: string;
  population: string;
  description: string;
  participant_count: number;
  data_category: string;
  file_count: number;
  data_types: ArrangerResultsTree<IDataType>;
  data_categories: ArrangerResultsTree<IDataType>;
  data_access_codes: IStudyDataAccessCodes;
  experimental_strategy: string[];
  family_count: number;
  family_data: boolean;
  hpo_terms: string[];
  icd_terms: string[];
  mondo_terms: string[];
  release_id: string;
  status: string;
  study_version: string;
  contact: { type: string; value: string };
}
