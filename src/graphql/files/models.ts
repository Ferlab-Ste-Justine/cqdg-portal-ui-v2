import { ArrangerResultsTree } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IFileResultTree {
  File: ArrangerResultsTree<IFileEntity>;
}

export interface IFileSequencingExperiment {
  alir: string;
  bio_informatic_analysis: string;
  capture_kit: string;
  experimental_strategy: string;
  gcnv: string;
  genome_build: string;
  gsv: string;
  is_paired_end: boolean;
  labAliquotID: string;
  owner: string;
  platform: string;
  read_length: string;
  run_alias: string;
  run_date: string;
  run_name: string;
  sequencer_id: string;
  snv: string;
  ssup: string;
  workflow_name: string;
  workflow_version: string;
}

export interface IFileEntity {
  id: string;
  file_id: string;
  participants: ArrangerResultsTree<IParticipantEntity>;
  data_category: string;
  data_type: string;
  file_format: string;
  score: number;
  data_access: string;
  file_size: number;
  study_id: string;
  study: IStudyEntity;
  biospecimen_reference: string;
  ferload_url: string;
  file_hash: string;
  file_name: string;
  release_id: string;
  sequencing_experiment: IFileSequencingExperiment;
  nb_biospecimens: number;
}

export enum FileAccessType {
  CONTROLLED = 'Controlled',
  REGISTERED = 'Registered',
}

export type ITableFileEntity = IFileEntity & {
  key: string;
};
