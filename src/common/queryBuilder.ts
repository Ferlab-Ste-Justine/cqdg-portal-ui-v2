import {
  DATA_EPLORATION_FILTER_TAG,
  DATA_EXPLORATION_QB_ID,
} from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

export const FILTER_TAG_PAGE_MAPPING: Record<string, string> = {
  [DATA_EPLORATION_FILTER_TAG]: STATIC_ROUTES.DATA_EXPLORATION,
};

export const FILTER_TAG_QB_ID_MAPPING: Record<string, string> = {
  [DATA_EPLORATION_FILTER_TAG]: DATA_EXPLORATION_QB_ID,
};
