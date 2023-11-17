import intl from 'react-intl-universal';
import { setLocale } from '@ferlab/ui/core/utils/localeUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';
import keycloak from 'auth/keycloak-api/keycloak';
import locales from 'locales';

import { LANG } from 'common/constants';
import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { initialState, MessageArgsPropsCustom } from 'store/global/types';
import { fetchUser } from 'store/user/thunks';

import { fetchStats } from './thunks';

const getNavigatorLang = () => {
  // eslint-disable-next-line no-prototype-builtins
  if (locales.hasOwnProperty(navigator.language)) {
    return navigator.language;
  }
  return LANG.EN;
};

export const GlobalState: initialState = {
  lang: getNavigatorLang(),
  notification: undefined,
  message: undefined,
  messagesToDestroy: [],
  stats: undefined,
  isFetchingStats: false,
};

const setLocalConfig = (locale: string) => {
  intl.init({
    currentLocale: locale,
    locales,
  });
  setLocale(locale);
};

const globalSlice = createSlice({
  name: 'global',
  initialState: GlobalState,
  reducers: {
    changeLang: (state, action: PayloadAction<LANG>) => {
      setLocalConfig(action.payload);
      return {
        ...state,
        lang: action.payload,
      };
    },

    displayMessage: (state, action: PayloadAction<MessageArgsPropsCustom>) => ({
      ...state,
      message: action.payload,
    }),

    destroyMessages: (state, action: PayloadAction<string[]>) => ({
      ...state,
      message: undefined,
      messagesToDestroy: action.payload,
    }),

    displayNotification: (state, action: PayloadAction<NotificationArgsProps>) => ({
      ...state,
      notification: action.payload,
    }),

    destroyNotification: (state) => ({
      ...state,
      notification: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStats.pending, (state) => {
      state.isFetchingStats = true;
    });
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.isFetchingStats = false;
      state.stats = action.payload;
    });
    builder.addCase(fetchStats.rejected, (state) => {
      state.isFetchingStats = false;
    });
    builder.addCase(fetchUser.fulfilled, (state) => {
      const { locale } = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
      setLocalConfig(locale);
      return {
        ...state,
        lang: locale,
      };
    });
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
