import EnvironmentVariables from 'helpers/EnvVariables';

export enum LANG {
  EN = 'en',
  FR = 'fr',
}

export const REDIRECT_URI_KEY = 'redirect_path';

export const TABLE_EMPTY_PLACE_HOLDER = '-';

export const MAIN_SCROLL_WRAPPER_ID = 'main-scroll-wrapper';

export const FILTER_ID_QUERY_PARAM_KEY = 'filterId';
export const SHARED_FILTER_ID_QUERY_PARAM_KEY = 'sharedFilterId';

export const MAX_TITLE_LENGTH = 200;
// This regex needs to match the one set in Users-Api:
export const SET_FILTER_NAME_REGEX = /^[\w\s()\-_,.|:'[\]]+$/iu;

export const MAX_ITEMS_QUERY = Number(
  EnvironmentVariables.configFor('ES_MAX_ITEMS_QUERY') || 10000,
);
