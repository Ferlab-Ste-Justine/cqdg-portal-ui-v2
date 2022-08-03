import { gql } from '@apollo/client';

export const SEARCH_VARIANT_QUERY = gql`
  query searchVariant($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    variants: Variant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            variant_id: id
            score
            alternate
            chromosome
            genome_build
            hash
            hgvsg
            locus
            max_impact_score
            participant_frequency
            participant_number
            participant_number_visible
            participant_total_number
            reference
            release_id
            rsnumber
            start
            variant_class

            frequencies {
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

            clinvar {
              clin_sig
              clinvar_id
              conditions
              inheritance
              interpretations
            }

            consequences {
              hits {
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
                  }
                }
              }
            }

            studies {
              hits {
                total
                edges {
                  node {
                    study_id
                    study_code
                  }
                }
              }
            }

            # there before:
            # suggestion_id
            # symbol_aa_change
            # type

            # todo: mapping or types to fix:
            # acls
            # gene_external_reference
            # external_study_ids
            # variant_external_reference
            # vep_impacts
            # zygosity
            # tansmissions
          }
        }
      }
    }
  }
`;

export const SEARCH_VARIANT_BY_ID_QUERY = gql`
  query searchVariantById($sqon: JSON) {
    variant {
      hits(filters: $sqon) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
