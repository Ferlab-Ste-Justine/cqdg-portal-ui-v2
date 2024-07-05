import { LANG } from 'common/constants';
import getStoreConfig from 'store';

export const getDocLang = () => {
  const { store } = getStoreConfig();
  const locale = store.getState().global.lang;

  switch (locale) {
    case LANG.FR:
      return '?ljs=fr';
    case LANG.EN:
      return '?ljs=en-ca';
    default:
      return '';
  }
};
