import type { Store } from '@types';

export function selectTheme(state: Store) {
  return state.settings.theme;
}

export function selectLocale(state: Store) {
  return state.settings.locale;
}

export function selectSettings(state: Store) {
  return state.settings;
}
