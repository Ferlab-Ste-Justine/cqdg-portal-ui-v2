import { gql } from '@apollo/client';

export const SEARCH_FILES_QUERY = gql`
  query searchFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    file: File {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            file_id: internal_file_id
            participants: donors {
              hits {
                total
              }
            }
            biospecimens: biospecimen {
              hits {
                total
              }
            }
            studies: study {
              hits {
                total
                edges {
                  node {
                    internal_study_id
                    name
                  }
                }
              }
            }
            data_category
            data_type
            file_format
            score
            data_access
            dictionary_version
            experimental_strategy
            file_size
            file_variant_class
            is_harmonized
            platform
            study_version
            study_version_creation_date
            data_access_codes {
              access_limitations
              access_requirements
            }
            icd {
              hits {
                total
              }
            }
            diagnoses {
              hits {
                total
                edges {
                  node {
                    internal_diagnosis_id
                    score
                    age_at_diagnosis
                    diagnosis_ICD_code
                    diagnosis_mondo_code
                    diagnosis_source_text
                    diagnosis_type
                    is_cancer
                    is_cancer_primary
                    is_self_reported
                    m_category
                    submitter_participant_id: submitter_donor_id
                    submitter_diagnosis_id
                  }
                }
              }
            }
            mondo {
              age_at_event
              display_name
              internal_diagnosis_id
              is_leaf
              is_tagged
              name
              parents
              phenotype_id
            }
          }
        }
      }
    }
  }
`;

export const FILE_SEARCH_BY_ID_QUERY = gql`
  query searchFileById($sqon: JSON) {
    file: File {
      hits(filters: $sqon) {
        edges {
          node {
            id
            file_id: internal_file_id
          }
        }
      }
    }
  }
`;
