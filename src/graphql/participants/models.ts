import { IFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IParticipantResultTree {
  participants: ArrangerResultsTree<IParticipantEntity>;
}

export interface IPhenotype {
  id: any;
  // age_at_event: number;
  display_name: string;
  internal_phenotype_id: number;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
  phenotype_id: string;
  main_category: string;
  score: number;
}

export interface IDiagnosis {
  id: string;
  internal_diagnosis_id: string;
  submitter_participant_id: string;
  is_cancer: boolean;
  is_cancer_primary: string;
  is_self_reported: string;
  m_category: string;
  n_category: string;
  stage_group: string;
  submitter_diagnosis_id: string;
  t_category: string;
  tumor_staging_system: string;
  score: string;
  age_at_diagnosis: string;
  diagnosis_ICD_code: string;
  diagnosis_mondo_code: string;
  diagnosis_source_text: string;
  diagnosis_type: string;
  // follow_ups: FileDiagnosesFollow_ups
  // tagged_icd: FileDiagnosesTagged_icd
  // tagged_mondo: FileDiagnosesTagged_mondo
  // treatments:FileDiagnosesTreatments
}

export interface IMondo {
  age_at_event: number;
  display_name: string;
  internal_diagnosis_id: string;
  is_leaf: boolean;
  is_tagged: boolean;
  name: string;
  parents: string[];
  phenotype_id: string;
}

export interface IParticipantEntity {
  id: string;
  participant_id: string;
  submitter_participant_id: string;
  internal_participant_id: string;
  score: number;
  age_at_recruitment: number;
  age_of_death: number;
  cause_of_death: string;
  date_of_recruitment: string;
  dictionary_version: number;
  dob: string;
  environment_exposure_available: boolean;
  ethnicity: string;
  family_history_available: boolean;
  gender: string;
  genealogy_available: boolean;
  is_a_proband: string;
  is_affected: string;
  laboratory_measures_available: boolean;
  lifestyle_available: boolean;
  medication_available: boolean;
  physical_measures_available: boolean;
  study_version: number;
  study_version_creation_date: string;
  vital_status: string;
  files: ArrangerResultsTree<IFileEntity>;
  studies: ArrangerResultsTree<IStudyEntity>;
  mondo: IMondo;
  diagnoses: ArrangerResultsTree<IDiagnosis>;
  phenotype: IPhenotype;
  phenotypes_tagged: ArrangerResultsTree<IPhenotype>;
}

export type ITableParticipantEntity = IParticipantEntity & {
  key: string;
};
