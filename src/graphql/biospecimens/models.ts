import { IFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IBiospecimenResultTree {
  Biospecimen: ArrangerResultsTree<IBiospecimenEntity>;
}

export interface IBiospecimenEntity {
  key?: string;
  id: string;
  score: number;
  study_id: string;
  study_code: string;
  age_biospecimen_collection: string;
  biospecimen_id: string;
  biospecimen_tissue_source: string;
  sample_id: string;
  sample_type: string;
  submitter_biospecimen_id: string;
  submitter_sample_id: string;
  participant: IParticipantEntity;
  study: IStudyEntity;
  files: ArrangerResultsTree<IFileEntity>;
}
