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
  participant_count: number;
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

interface IExperimentalStrategy {
  id: string;
  experimental_strategy: string;
  file_count: number;
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
  experimental_strategies: ArrangerResultsTree<IExperimentalStrategy>;
  family_count: number;
  family_data: boolean;
  status: string;
  study_version: string;
  access_authority: { type: string; value: string };
  datasets: ArrangerResultsTree<IDataSet>;
  security?: Security;
}
