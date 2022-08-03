import { ArrangerResultsTree } from 'graphql/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IVariantResultTree {
  variants: ArrangerResultsTree<IVariantEntity>;
}

export enum Impact {
  High = 'HIGH',
  Moderate = 'MODERATE',
  Low = 'LOW',
  Modifier = 'MODIFIER',
}

export interface IConservationsEntity {
  phylo_p17way_primate_rankscore: number;
}

export interface IPredictionEntity {
  fathmm_pred: number;
  lrt_pred: string;
  lrt_converted_rankscore: number;
  revel_rankscore: number;
  sift_pred: string;
  polyphen2_hvar_pred: string;
  polyphen2_hvar_rankscore: number;
  sift_converted_rankscore: number;
  cadd_rankscore: number;
  dann_rankscore: number;
  fathmm_converted_rankscore: number;

  // from CLIN:
  // FATHMM_converted_rankscore: number;
  // cadd_score: number;
  // dann_score: number;
  // sift_converted_rank_score: number;
  // polyphen2_hvar_score: number;
}

export interface IBoundType {
  ac?: number | undefined;
  af?: number | undefined;
  an?: number | undefined;
  hom?: number | undefined;
  pn?: number | undefined;
  pc?: number | undefined;
  pf?: number | undefined;
  heterozygotes?: number | undefined;
  homozygotes?: number | undefined;
}

interface IVariantFrequenciesInternal {
  lower_bound_kf: IBoundType;
  upper_bound_kf: IBoundType;
}

export interface IExternalFrequenciesEntity {
  // from CLIN:
  // topmed_bravo: IBoundType;
  // thousand_genomes: IBoundType;
  // gnomad_exomes_2_1_1: IBoundType;
  // gnomad_genomes_2_1_1: IBoundType;
  // gnomad_genomes_3_0: IBoundType;

  gnomad_exomes_2_1: IBoundType;
  gnomad_genomes_2_1: IBoundType;
  gnomad_genomes_3_0: IBoundType;
  gnomad_genomes_3_1_1: IBoundType;
  one_thousand_genomes: IBoundType;
  topmed: IBoundType;
  internal: IVariantFrequenciesInternal;
}

export interface IConsequenceNode {
  node: IConsequenceEntity;
}

export interface IConsequenceEntity {
  id: string;
  hgvsc: string;
  symbol: string;
  consequences: string[];
  vep_impact: Impact;
  aa_change: string | undefined | null;
  impact_score: number | null;
  canonical: boolean;
  coding_dna_change: string;
  strand: string;
  refseq_mrna_id: string[];
  ensembl_transcript_id: string;
  ensembl_gene_id: string;
  predictions: IPredictionEntity;
  conservations: IConservationsEntity;
}

export interface IClinVar {
  clinvar_id: string | undefined;
  inheritance: string[];
  conditions: string[];
  clin_sig: string[];
  interpretations: string[];
}

export interface IVariantEntity {
  id: string;

  score: number;
  acls: string;
  alternate: string;
  chromosome: string;
  external_study_ids: string;
  gene_external_reference: string;
  genome_build: string;
  hash: string;
  hgvsg: string;
  locus: string;
  max_impact_score: number;
  participant_frequency: number;
  participant_number: number;
  participant_number_visible: number;
  participant_total_number: number;
  reference: string;
  release_id: string;
  rsnumber: string;
  start: number;
  transmissions: string;
  variant_class: string;
  variant_external_reference: string;
  vep_impacts: string;
  zygosity: string;
  studies: ArrangerResultsTree<IStudyEntity>;
  consequences: ArrangerResultsTree<IConsequenceEntity>;
  clinvar: IClinVar;
  frequencies: IExternalFrequenciesEntity;
  // genes: VariantGenes
}

export type ITableVariantEntity = IVariantEntity & {
  key: string;
};
