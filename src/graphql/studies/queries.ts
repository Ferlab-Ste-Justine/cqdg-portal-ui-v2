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
            contact {
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
            data_access_codes {
              access_limitations
              access_requirements
            }
            datasets {
              hits {
                total
                edges {
                  node {
                    data_type
                    description
                    experimental_strategy
                    file_count
                    name
                    participant_count
                  }
                }
              }
            }
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
