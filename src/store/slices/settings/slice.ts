import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Locales, Theme } from '@types';

interface State {
  locale: Locales;
  theme: Theme;
}

const initialState: State = {
  locale: navigator.language.split('-')[0] === 'fr' ? 'fr' : 'en',
  theme: document.documentElement.getAttribute('data-theme') as Theme,
};

const { actions, reducer } = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    setLocale(state, action: PayloadAction<Locales>) {
      state.locale = action.payload;
    },
    setTheme(state, { payload: theme }: PayloadAction<Theme>) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      state.theme = theme;
    },
  },
});

export const setLocale = actions.setLocale;
export const setTheme = actions.setTheme;
export default reducer;
