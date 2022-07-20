import { IQueryConfig } from 'common/searchPageTypes';

export const STUDIES_EXPLORATION_QB_ID = 'cqdg-studies-exploration-repo-key';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const STUDIES_EPLORATION_FILTER_TAG = 'studies-exploration';

export const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  sort: [],
};

export const SCROLL_WRAPPER_ID = 'studies-explore-scroll-wrapper';

export enum TAB_IDS {
  STUDIES = 'studies',
}
