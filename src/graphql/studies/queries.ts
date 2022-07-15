import { gql } from '@apollo/client';

export const GET_STUDIES_QUERY = gql`
  query getStudy($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Study {
      hits(offset: $offset, sort: $sort, first: $first, filters: $sqon) {
        total
        edges {
          node {
            domain
            internal_study_id
            name
            population
            description
            participants: donors {
              hits {
                total
              }
            }
            files {
              hits {
                total
              }
            }
            summary {
              data_category {
                hits {
                  edges {
                    node {
                      participants: donors
                      key
                    }
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
query studiesAgg ($sqon: JSON) {
    Study {
      aggregations (filters: $sqon){
        ${fields.map(
          (f) =>
            f +
            ' {\n          buckets {\n            key\n            doc_count\n          }\n        }',
        )}
      }
    }
  }`;

export const GET_STUDIES_COUNT = gql`
  query getStudiesCount($sqon: JSON) {
    Study {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;
