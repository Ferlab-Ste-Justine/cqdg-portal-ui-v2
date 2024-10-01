import { gql } from '@apollo/client';

export const GET_QUICK_FILTER_EXPLO = gql`
  query getQuickFilterExploFacets($sqon: JSON) {
    Participant {
      aggregations(filters: $sqon, include_missing: false) {
        study__study_code {
          buckets {
            key
            doc_count
          }
        }
        observed_phenotypes__name {
          buckets {
            key
            doc_count
          }
        }
        mondo__name {
          buckets {
            key
            doc_count
          }
        }
        icd_tagged__name {
          buckets {
            key
            doc_count
          }
        }
        relationship_to_proband {
          buckets {
            key
            doc_count
          }
        }
        family_type {
          buckets {
            key
            doc_count
          }
        }
        sex {
          buckets {
            key
            doc_count
          }
        }
        age_at_recruitment {
          buckets {
            key
            doc_count
          }
        }
        mondo_tagged__age_at_event {
          buckets {
            key
            doc_count
          }
        }
        ethnicity {
          buckets {
            key
            doc_count
          }
        }
        observed_phenotype_tagged__source_text {
          buckets {
            key
            doc_count
          }
        }
        mondo_tagged__source_text {
          buckets {
            key
            doc_count
          }
        }

        biospecimens__sample_type {
          buckets {
            key
            doc_count
          }
        }
        biospecimens__biospecimen_tissue_source {
          buckets {
            key
            doc_count
          }
        }
        biospecimens__age_biospecimen_collection {
          buckets {
            key
            doc_count
          }
        }

        files__dataset {
          buckets {
            key
            doc_count
          }
        }
        files__data_category {
          buckets {
            key
            doc_count
          }
        }
        files__data_type {
          buckets {
            key
            doc_count
          }
        }
        files__sequencing_experiment__experimental_strategy {
          buckets {
            key
            doc_count
          }
        }
        files__file_format {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;
