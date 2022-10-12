import { gql } from '@apollo/client';

export const GENES_FRAGMENT = gql`
  fragment genesFragment on VariantGenes {
    hits {
      total
      edges {
        node {
          score
          ensembl_gene_id
          entrez_gene_id
          hgnc
          location
          name
          omim_gene_id
          symbol
          alias

          cosmic {
            hits {
              total
              edges {
                node {
                  score
                  tumour_types_germline
                }
              }
            }
          }
          ddd {
            hits {
              total
              edges {
                node {
                  score
                  disease_name
                }
              }
            }
          }
          hpo {
            hits {
              total
              edges {
                node {
                  score
                  hpo_term_id
                  hpo_term_label
                  hpo_term_name
                }
              }
            }
          }
          omim {
            hits {
              total
              edges {
                node {
                  score
                  inheritance
                  inheritance_code
                  name
                  omim_id
                }
              }
            }
          }
          orphanet {
            hits {
              total
              edges {
                node {
                  score
                  inheritance
                  disorder_id
                  panel
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FREQUENCIES_FRAGMENT = gql`
  fragment frequenciesFragment on VariantFrequencies {
    gnomad_exomes_2_1 {
      ac
      af
      an
      homozygotes
    }
    gnomad_genomes_2_1 {
      ac
      af
      an
      homozygotes
    }
    gnomad_genomes_3_0 {
      ac
      af
      an
      homozygotes
    }
    gnomad_genomes_3_1_1 {
      ac
      af
      an
      homozygotes
    }
    one_thousand_genomes {
      ac
      af
      an
    }
    topmed {
      ac
      af
      an
      homozygotes
      heterozygotes
    }
    internal {
      lower_bound_kf {
        ac
        af
        an
        heterozygotes
        homozygotes
      }
      upper_bound_kf {
        ac
        af
        an
        heterozygotes
        homozygotes
      }
    }
  }
`;

export const CONSEQUENCES_FRAGMENT = gql`
  fragment consequencesFragment on VariantConsequences {
    hits {
      total
      edges {
        node {
          predictions {
            fathmm_pred
            lrt_pred
            lrt_converted_rankscore
            revel_rankscore
            sift_pred
            polyphen2_hvar_pred
            polyphen2_hvar_rankscore
            sift_converted_rankscore
            cadd_rankscore
            dann_rankscore
            fathmm_converted_rankscore
          }
          hgvsc
          consequences

          aa_change
          biotype
          canonical
          cdna_position
          cds_position
          coding_dna_change
          consequences
          ensembl_gene_id
          ensembl_transcript_id
          entrez_gene_id
          feature_type
          hgvsc
          hgvsp
          impact_score
          mane_plus
          mane_select
          protein_position
          refseq_mrna_id
          refseq_protein_id
          strand
          symbol
          vep_impact
        }
      }
    }
  }
`;

export const CLINVAR_FRAGMENT = gql`
  fragment clinvarFragment on VariantClinvar {
    clin_sig
    clinvar_id
    conditions
    inheritance
    interpretations
  }
`;

export const STUDIES_VARIANT_FRAGMENT = gql`
  fragment studiesVariantFragment on VariantStudies {
    hits {
      total
      edges {
        node {
          score
          participant_ids
          participant_number
          study_code
          study_id
          acls
          external_study_ids
          transmissions
          frequencies {
            lower_bound_kf {
              ac
              af
              an
              heterozygotes
              homozygotes
            }
            upper_bound_kf {
              ac
              af
              an
              heterozygotes
              homozygotes
            }
          }
        }
      }
    }
  }
`;
