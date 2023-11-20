import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { IFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IParticipantResultTree {
  Participant: ArrangerResultsTree<IParticipantEntity>;
}

export interface IPhenotype {
  id: any;
  age_at_event: string;
  internal_phenotype_id?: number;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
  score: number;
  is_observed?: boolean;
  source_text?: string;
}

export interface IMondo {
  id: string;
  age_at_event: string;
  score: string;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
}

export interface IMondoTagged {
  id: string;
  age_at_event: string;
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
  age_at_event: string;
  internal_phenotype_id: string;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
}

export interface IDiagnoses {
  id: string;
  fhir_id: string;
  diagnosis_ICD_code: string;
  diagnosis_mondo_code: string;
  diagnosis_source_text: string;
  age_at_diagnosis: string;
  diagnosis_icd_display: string;
  diagnosis_mondo_display: string;
}

export interface IFamilyRelationships {
  id: string;
  family_id: string;
  family_type: string;
  focus_participant_id: string;
  relationship_to_proband: string;
  submitter_family_id: string;
  submitter_participant_id: string;
  is_affected: string;
  participant_id: string;
}

export interface IParticipantEntity {
  id: string;
  participant_id: string;
  submitter_participant_id: string;
  internal_participant_id: string;
  score: number;
  age_at_recruitment: string;
  age_of_death: string;
  cause_of_death: string;
  ethnicity: string;
  gender: string;
  is_a_proband: string;
  is_affected: string;
  vital_status: string;
  files: ArrangerResultsTree<IFileEntity>;
  study: IStudyEntity;
  study_id: string;
  study_code: string;
  family_id: string;
  family_type: string;
  relationship_to_proband: string;
  mondo: ArrangerResultsTree<IMondo>;
  mondo_tagged: ArrangerResultsTree<IMondoTagged>;
  observed_phenotypes: ArrangerResultsTree<IPhenotype>;
  observed_phenotype_tagged: ArrangerResultsTree<IPhenotype>;
  non_observed_phenotype_tagged: ArrangerResultsTree<IPhenotype>;
  phenotypes_tagged: ArrangerResultsTree<IPhenotype>;
  icd_tagged: ArrangerResultsTree<IIcd>;
  biospecimens: ArrangerResultsTree<IBiospecimenEntity>;
  diagnoses: ArrangerResultsTree<IDiagnoses>;
  family_relationships: ArrangerResultsTree<IFamilyRelationships>;
}

export type ITableParticipantEntity = IParticipantEntity & {
  key: string;
};
