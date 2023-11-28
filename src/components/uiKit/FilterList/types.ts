import React from 'react';

export interface FilterGroup {
  title?: string;
  facets: string[] | React.ReactNode[];
  tooltips?: string[];
  noDataOption?: string[];
  intervalDecimal?: { [key: string]: number };
}

export interface FilterInfo {
  customSearches?: React.ReactNode[];
  defaultOpenFacets?: string[];
  groups: FilterGroup[];
}
