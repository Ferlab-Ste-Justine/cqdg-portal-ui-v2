import { gql } from '@apollo/client';

export const GET_BIOSPECIMENS = gql`
  query getBiospecimens($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort], $searchAfter: JSON) {
    Biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
            id
            biospecimen_id
            age_biospecimen_collection
            biospecimen_tissue_source
            release_id
            study_id
            study_code
            participant {
              participant_id
            }

            sample_type
            sample_id
            submitter_biospecimen_id
            submitter_sample_id

            files {
              hits {
                total
                edges {
                  node {
                    file_id
                    file_size
                    file_name
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

export const MATCH_BIOSPECIMENS = gql`
  query matchBiospecimens($sqon: JSON, $first: Int, $offset: Int) {
    Biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset) {
        total
        edges {
          node {
            sample_id
            study_code
            submitter_sample_id
          }
        }
      }
    }
  }
`;

export const BIOSPECIMEN_SEARCH_BY_ID_QUERY = gql`
  query getBiospecimenById($sqon: JSON) {
    Biospecimen {
      hits(filters: $sqon) {
        edges {
          node {
            biospecimen_id
            sample_id
          }
        }
      }
    }
  }
`;

export const GET_BIOSPECIMEN_COUNT = gql`
  query getBiospecimenCount($sqon: JSON) {
    Biospecimen {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;
