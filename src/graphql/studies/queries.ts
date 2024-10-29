import { gql } from '@apollo/client';

export const GET_STUDIES = gql`
  query getStudies($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Study {
      hits(offset: $offset, sort: $sort, first: $first, filters: $sqon) {
        total
        edges {
          node {
            id
            domain
            study_code
            study_id
            name
            population
            keyword
            description
            participant_count
            sample_count
            file_count
            family_count
            security
            access_authority {
              value
              type
            }
            data_categories {
              hits {
                total
                edges {
                  node {
                    participant_count
                    data_category
                  }
                }
              }
            }
            data_types {
              hits {
                total
                edges {
                  node {
                    participant_count
                    data_type
                  }
                }
              }
            }
            experimental_strategies {
              hits {
                total
                edges {
                  node {
                    file_count
                    experimental_strategy
                  }
                }
              }
            }
            data_access_codes {
              access_limitations
              access_requirements
            }
            datasets {
              hits {
                total
                edges {
                  node {
                    data_types
                    description
                    experimental_strategies
                    file_count
                    name
                    participant_count
                  }
                }
              }
            }
            restricted
            study_designs
            data_collection_methods
            expected_number_participants
            expected_number_biospecimens
            expected_number_files
            restricted_number_participants
            restricted_number_biospecimens
            restricted_number_files
            principal_investigators
            contact_names
            contact_extensions
            contact_institutions
            contact_emails
            telecom
            websites
            funding_sources
            citation_statement
            selection_criteria
            expected_items
          }
        }
      }
    }
  }
`;

export const STUDIES_AGGREGATIONS = (fields: string[]) => gql`
  query studiesAgg($sqon: JSON) {
    Study {
      aggregations(filters: $sqon) {
        ${fields.map((f) => f + '{\nbuckets{\nkey\ndoc_count\n}\n}')}
      }
    }
  }
`;

export const GET_STUDIES_COUNT = gql`
  query getStudiesCount($sqon: JSON) {
    Study {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const SEARCH_STUDIES_BY_ID_AND_NAME_QUERY = gql`
  query searchStudyById($sqon: JSON) {
    Study {
      hits(filters: $sqon) {
        edges {
          node {
            study_id
            study_code
            name
          }
        }
      }
    }
  }
`;
