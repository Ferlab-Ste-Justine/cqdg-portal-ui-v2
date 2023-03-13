import { gql } from '@apollo/client';

export const GET_FILES = gql`
  query getFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    File {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            file_id
            file_format
            file_size
            file_name
            file_hash
            ferload_url
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
            biospecimens {
              hits {
                total
                edges {
                  node {
                    biospecimen_tissue_source
                    sample_id
                    sample_type
                    biospecimen_id
                    participant {
                      participant_id
                      study_code
                    }
                  }
                }
              }
            }
            study_code
            study_id
            study {
              study_code
              name
            }
            data_category
            data_type
            biospecimen_reference
            sequencing_experiment {
              experimental_strategy
              type_of_sequencing
              read_length
              platform
              capture_kit
              sequencer_id
              run_date
              run_name
              labAliquotID
              bio_informatic_analysis
              workflow_name
              workflow_version
              genome_build
              analysis_id
            }
          }
        }
      }
    }
  }
`;

export const MATCH_FILES = gql`
  query matchFiles($sqon: JSON, $first: Int, $offset: Int) {
    File {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            file_id
            study_code
          }
        }
      }
    }
  }
`;

export const GET_FILE_BY_ID = gql`
  query getFileById($sqon: JSON) {
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
