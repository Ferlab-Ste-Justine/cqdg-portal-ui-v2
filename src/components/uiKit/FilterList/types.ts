import React from 'react';

export interface FilterGroup {
  title?: string;
  facets: string[] | React.ReactNode[];
  tooltips?: string[];
  noDataOption?: string[];
}

export interface FilterInfo {
  customSearches?: React.ReactNode[];
  defaultOpenFacets?: string[];
  groups: FilterGroup[];
}
