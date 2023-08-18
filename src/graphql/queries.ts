import { gql } from '@apollo/client';
import { dotToUnderscore, underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';

import { ExtendedMapping, ExtendedMappingResults } from './models';

export type TSortDirection = 'asc' | 'desc';

export type Sort = {
  field: string;
  order: TSortDirection;
};

export type QueryVariable = {
  sqon?: ISyntheticSqon;
  first?: number;
  offset?: number;
  sort?: Sort[];
  pageSize?: number;
};

export const INDEX_EXTENDED_MAPPING = (index: string) => gql`
  query ExtendedMapping {
    ${index} {
      extended
    }
  }
`;

const DEFAULT_QUERY = (index: string) => gql`
  query AggregationInformation {
    ${index} { 
      aggregations { 
        __typename
      }
    }
  }
`;

export const AGGREGATION_QUERY = (
  index: string,
  aggList: string[],
  mappingResults: ExtendedMappingResults,
) => {
  if (!mappingResults || mappingResults.loading) {
    console.error('[AGGREGATION_QUERY] mappingResults missing');
    return DEFAULT_QUERY(index);
  }

  const aggListDotNotation = aggList.map((i) => underscoreToDot(i));
  const extendedMappingsFields = aggListDotNotation.flatMap((i) =>
    (mappingResults?.data || []).filter((e) => e.field === i),
  );
  const aggregations = generateAggregations(extendedMappingsFields);

  if (!aggregations) {
    console.error('[AGGREGATION_QUERY] impossible to generate aggregations');
    return DEFAULT_QUERY(index);
  }

  return gql`
    query AggregationInformation($sqon: JSON) {
      ${index} {
        aggregations (filters: $sqon, include_missing: false) {
          ${aggregations}
        }
      }
    }
  `;
};

const generateAggregations = (extendedMappingFields: ExtendedMapping[]) => {
  const aggs = extendedMappingFields.map((f) => {
    if (['keyword', 'id'].includes(f.type)) {
      return dotToUnderscore(f.field) + '{buckets{key doc_count}}';
    } else if (['long', 'float', 'integer', 'date'].includes(f.type)) {
      return dotToUnderscore(f.field) + '{stats{max min}}';
    } else if (['boolean'].includes(f.type)) {
      return dotToUnderscore(f.field) + '{buckets{key doc_count}}';
    }
    return dotToUnderscore(f.field);
  });
  return aggs.join(' ');
};
