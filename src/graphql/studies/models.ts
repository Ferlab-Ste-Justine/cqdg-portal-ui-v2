import { ArrangerResultsTree } from 'graphql/models';

export interface IStudyResultTree {
  Study: ArrangerResultsTree<IStudyEntity>;
}

export type ITableStudyEntity = IStudyEntity & {
  key: string;
};

export interface ISummaryDataCategory {
  id: string;
  donors: number;
  key: string;
}

export interface IStudyEntity {
  id: string;
  domain: string;
  internal_study_id: string;
  name: string;
  population: string;
  description: string;
  donors: ArrangerResultsTree<{ id: string }>;
  files: ArrangerResultsTree<{ id: string }>;

  summary: {
    data_category: ArrangerResultsTree<ISummaryDataCategory>;
  };
}
