import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IQueryConfig, ISort } from '@ferlab/ui/core/graphql/types';

export const STUDIES_REPO_QB_ID = 'cqdg-studies-exploration-repo-key';
export const SCROLL_WRAPPER_ID = 'studies-explore-scroll-wrapper';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

export const DEFAULT_STUDY_QUERY_SORT = [
  { field: 'study_code', order: SortDirection.Asc },
] as ISort[];

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  sort: [],
};
