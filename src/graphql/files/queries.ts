import { gql } from '@apollo/client';

export const SEARCH_FILES_QUERY = gql`
  query searchFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    File {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            fhir_id
            file_id: fhir_id
            participants {
              hits {
                total
              }
            }
            #            studies: study {
            #              hits {
            #                total
            #                edges {
            #                  node {
            #                    internal_study_id
            #                    name: title
            #                  }
            #                }
            #              }
            #            }
            data_category
            data_type
            file_format
            score
            experimental_strategy
            file_size
            platform
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
            fhir_id
            file_id: fhir_id
          }
        }
      }
    }
  }
`;
