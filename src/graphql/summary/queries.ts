import { gql } from '@apollo/client';

export const PARTICIPANT_AGG_QUERY = gql`
  query participantAggQuery($sqon: JSON) {
    Participant {
      hits(filters: $sqon) {
        # total needed to calc frequency of each tsv graph export
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: true) {
        study__study_code {
          buckets {
            key
            doc_count
          }
        }
        study__population {
          buckets {
            key
            doc_count
          }
        }
        study__domain {
          buckets {
            key
            doc_count
          }
        }
        gender {
          buckets {
            key
            doc_count
          }
        }
        ethnicity {
          buckets {
            key
            doc_count
          }
        }
        files__data_type {
          buckets {
            key
            doc_count
          }
        }
        files__sequencing_experiment__experimental_strategy {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const AGE_AT_DIAGNOSIS_QUERY = gql`
  query ($sqon: JSON) {
    Participant {
      hits(filters: $sqon) {
        total
      }
      _0to1: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "<=", content: { field: "diagnoses.age_at_diagnosis", value: [364] } }
          ]
        }
      ) {
        total
      }
      _1to5: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "diagnoses.age_at_diagnosis", value: [365, 1824] } }
          ]
        }
      ) {
        total
      }
      _5to10: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "diagnoses.age_at_diagnosis", value: [1825, 3649] } }
          ]
        }
      ) {
        total
      }
      _10to15: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "diagnoses.age_at_diagnosis", value: [3650, 5474] } }
          ]
        }
      ) {
        total
      }
      _15to18: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "diagnoses.age_at_diagnosis", value: [5475, 6569] } }
          ]
        }
      ) {
        total
      }
      _18plus: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: ">=", content: { field: "diagnoses.age_at_diagnosis", value: [6570] } }
          ]
        }
      ) {
        total
      }
    }
  }
`;
