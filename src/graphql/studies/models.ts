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

export interface IDataSet {
  id: string;
  data_types: string[];
  description: string;
  experimental_strategies: string[];
  file_count: number;
  name: string;
  participant_count: number;
}

enum Security {
  R = 'R',
}

export interface IStudyEntity {
  id: string;
  keyword: string[];
  study_id: string;
  study_code: string;
  domain: string;
  name: string;
  population: string;
  description: string;
  participant_count: number;
  sample_count: number;
  file_count: number;
  data_types: ArrangerResultsTree<IDataType>;
  data_categories: ArrangerResultsTree<IDataType>;
  data_access_codes: IStudyDataAccessCodes;
  experimental_strategies: string[];
  family_count: number;
  family_data: boolean;
  release_id: string;
  status: string;
  study_version: string;
  contact: { type: string; value: string };
  datasets: ArrangerResultsTree<IDataSet>;
  security?: Security;
}
