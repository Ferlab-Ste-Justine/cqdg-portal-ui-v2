import { gql } from '@apollo/client';

export const SOCIODEMOGRAPHIC_QUERY = gql`
  query AggregationSocioDemographicInfo($sqon: JSON) {
    Participant {
      aggregations(filters: $sqon, aggregations_filter_themselves: true) {
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
        familyData: family_relationships__family_type {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const DATATYPE_QUERY = gql`
  query ($sqon: JSON) {
    Participant {
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        files__data_type {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const DATA_CATEGORY_QUERY = gql`
  query ($sqon: JSON) {
    Participant {
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        files__data_category {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const STUDIESPIE_QUERY = gql`
  query AggregationStudiesPie($sqon: JSON) {
    Participant {
      aggregations(filters: $sqon, aggregations_filter_themselves: true) {
        study__name {
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
      }
    }
  }
`;
