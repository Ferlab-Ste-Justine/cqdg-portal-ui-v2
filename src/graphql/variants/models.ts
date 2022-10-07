import { ArrangerResultsTree } from 'graphql/models';

export interface IVariantResultTree {
  Variant: ArrangerResultsTree<IVariantEntity>;
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

  //clin:
  cadd_score: string;
  dann_score: string;
  sift_converted_rank_score: string;
  FATHMM_converted_rankscore: string;
}

export type FreqAll = { ac: number; af: number; an: number };
export type FreqOneThousand = FreqAll & { homozygotes: number };
export type Freqgnomad = FreqAll & { homozygotes: number };
export type FreqCombined = FreqAll & { heterozygotes: number; homozygotes: number };
export type FreqTopmed = FreqAll & { homozygotes: number };

type BoundType = {
  ac: number;
  af: number;
  an: number;
  heterozygotes: number;
  homozygotes: number;
};

export interface IVariantStudyFrequencies {
  lower_bound_kf: BoundType;
  upper_bound_kf: BoundType;
}

export interface IVariantFrequenciesInterval {
  lower_bound_kf: BoundType;
  upper_bound_kf: BoundType;
}

export interface IVariantFrequencies {
  internal: IVariantFrequenciesInterval;
  topmed: FreqTopmed;
  one_thousand_genomes: FreqOneThousand;
  gnomad_exomes_2_1: Freqgnomad;
  gnomad_genomes_2_1: Freqgnomad;
  gnomad_genomes_3_0: Freqgnomad;
  gnomad_genomes_3_1_1: Freqgnomad;
  [key: string]: any;
}

export interface IVariantConsequenceNode {
  node: IVariantConsequence;
}

export interface IVariantConsequence {
  fathmm_pred: string;

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

export type OmimCondition = {
  omimName: string;
  omimId: string;
};
export type OmimConditions = OmimCondition[];

export type HpoCondition = {
  hpoTermLabel: string;
  hpoTermTermId: string;
};
export type HpoConditions = HpoCondition[];

export type OrphanetCondition = {
  panel: string;
  disorderId: number;
};
export type OrphanetConditions = OrphanetCondition[];

export type DddCondition = string;
export type DddConditions = DddCondition[];

export type CosmicCondition = string;
export type CosmicConditions = CosmicCondition[];

export type Conditions =
  | OmimConditions
  | HpoConditions
  | OrphanetConditions
  | DddConditions
  | CosmicConditions;

export type OrphanetInheritance = string[][];
export type OmimInheritance = string[][];
export type SingleValuedInheritance = string;
export type Inheritance = SingleValuedInheritance | OrphanetInheritance | OmimInheritance;

export type OmimGene = string[][];

export type OmimEntity = {
  id: string;
  omim_id: string;
  name: string;
  inheritance: OmimInheritance | undefined | null;
};

export type HpoEntity = {
  id: string;
  hpo_term_label: string;
  hpo_term_id: string;
};

export type DddEntity = {
  id: string;
  disease_name: string;
};

export type CosmicEntity = {
  id: string;
  tumour_types_germline: string[];
};

export type OrphanetEntity = {
  id: string;
  panel: string;
  inheritance: OrphanetInheritance | null | undefined;
  disorder_id: number;
};

export enum ClinicalGenesTableSource {
  orphanet = 'Orphanet',
  omim = 'OMIM',
  hpo = 'HPO',
  ddd = 'DDD',
  cosmic = 'Cosmic',
}

export interface IVariantGene {
  id: any;
  score: number;
  alias: string;
  ensembl_gene_id: string;
  entrez_gene_id: number;
  hgnc: string;
  location: string;
  name: string;
  omim_gene_id: string;
  symbol: string;
  cosmic: ArrangerResultsTree<CosmicEntity>;
  ddd: ArrangerResultsTree<DddEntity>;
  hpo: ArrangerResultsTree<HpoEntity>;
  omim: ArrangerResultsTree<OmimEntity>;
  orphanet: ArrangerResultsTree<OrphanetEntity>;

  //clin:
  biotype: string;
}

export interface IVariantStudyEntity {
  id: string;
  score: number;
  acls: string[];
  external_study_ids: string[];
  participant_ids: string[];
  participant_number: number;
  study_code: string;
  study_id: string;
  transmissions: string[];
  frequencies: IVariantStudyFrequencies;

  //todo: add domain
  domain?: string;
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
  studies: ArrangerResultsTree<IVariantStudyEntity>;
  consequences: ArrangerResultsTree<IVariantConsequence>;
  clinvar: IClinVar;
  frequencies: IVariantFrequencies;
  genes: ArrangerResultsTree<IVariantGene>;

  position: string;
}

export type ITableVariantEntity = IVariantEntity & {
  key: string;
};
