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
            study_id
            name
            population
            description
            participant_count
            file_count
            data_category
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
