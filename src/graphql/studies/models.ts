import { IFileDataAccessCodes } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';

export interface IStudyResultTree {
  Study: ArrangerResultsTree<IStudyEntity>;
}

export type ITableStudyEntity = IStudyEntity & {
  key: string;
};

export interface ISummary {
  id: string;
  clinical_data_available: ArrangerResultsTree<{
    id: string;
    score: number;
    participants: number;
    key: string;
  }>;
  data_category: ArrangerResultsTree<{
    id: string;
    score: number;
    participants: number;
    key: string;
    files: number;
  }>;
  experimental_strategy: ArrangerResultsTree<{
    id: string;
    score: number;
    participants: number;
    key: string;
    files: number;
  }>;
}

export interface IStudyEntity {
  id: string;
  score: number;
  access_authority: string;
  keyword: string;
  short_name: string;
  short_name_keyword: string;
  study_id: string;
  study_id_keyword: string;
  data_access_codes: IFileDataAccessCodes;
  domain: string;
  internal_study_id: string;
  name: string;
  population: string;
  description: string;
  participant_count: number;
  file_count: number;
}
