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
            internal_study_id
            name: title
            population
            description
            participant_count
            file_count
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
