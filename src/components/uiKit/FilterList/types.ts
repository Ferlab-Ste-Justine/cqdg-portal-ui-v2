import React from 'react';
import { DocumentNode } from 'graphql';
import { ExtendedMappingResults } from 'graphql/models';

export interface FilterGroup {
  title?: string;
  facets: string[] | React.ReactNode[];
  tooltips?: string[];
}

export interface FilterInfo {
  customSearches?: React.ReactNode[];
  defaultOpenFacets?: string[];
  groups: FilterGroup[];
}

export type TAggregationFunction = (
  index: string,
  aggList: string[],
  mappingResults: ExtendedMappingResults,
) => DocumentNode;
