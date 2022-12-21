import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { IFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IParticipantResultTree {
  Participant: ArrangerResultsTree<IParticipantEntity>;
}

export interface IPhenotype {
  id: any;
  age_at_event: number;
  internal_phenotype_id?: number;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
  score: number;
}

export interface IMondo {
  id: string;
  age_at_event: number;
  score: string;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
}

export interface IMondoTagged {
  id: string;
  age_at_event: number;
  score: string;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
  internal_phenotype_id: string;
  source_text: string;
}

export interface IIcd {
  id: string;
  score: number;
  age_at_event: number;
  internal_phenotype_id: string;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
}

export interface IParticipantEntity {
  id: string;
  participant_id: string;
  submitter_participant_id: string;
  internal_participant_id: string;
  score: number;
  age_at_recruitment: number;
  age_of_death: number;
  ethnicity: string;
  gender: string;
  is_a_proband: string;
  is_affected: string;
  vital_status: string;
  files: ArrangerResultsTree<IFileEntity>;
  study: IStudyEntity;
  study_id: string;
  study_code: string;
  mondo: ArrangerResultsTree<IMondo>;
  mondo_tagged: ArrangerResultsTree<IMondoTagged>;
  observed_phenotypes: ArrangerResultsTree<IPhenotype>;
  observed_phenotype_tagged: ArrangerResultsTree<IPhenotype>;
  non_observed_phenotype_tagged: ArrangerResultsTree<IPhenotype>;
  icd_tagged: ArrangerResultsTree<IIcd>;
  biospecimens: ArrangerResultsTree<IBiospecimenEntity>;
}

export type ITableParticipantEntity = IParticipantEntity & {
  key: string;
};
