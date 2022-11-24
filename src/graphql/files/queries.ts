import { gql } from '@apollo/client';

export const SEARCH_FILES_QUERY = gql`
  query searchFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    File {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            file_id
            participants {
              hits {
                total
                edges {
                  node {
                    participant_id
                  }
                }
              }
            }
            study {
              study_id
              name
            }
            study_id
            data_category
            data_type
            file_format
            file_size
            score
          }
        }
      }
    }
  }
`;

export const MATCH_FILES = gql`
  query matchFiles($sqon: JSON, $first: Int, $offset: Int) {
    file {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            fhir_id
            file_id
            study {
              study_id
            }
          }
        }
      }
    }
  }
`;

export const FILE_SEARCH_BY_ID_QUERY = gql`
  query searchFileById($sqon: JSON) {
    File {
      hits(filters: $sqon) {
        edges {
          node {
            id
            file_id
          }
        }
      }
    }
  }
`;
