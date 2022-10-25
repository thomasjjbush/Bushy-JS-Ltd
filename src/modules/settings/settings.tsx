import React from 'react';
import { useSelector } from 'react-redux';

import { Icon } from '@components/icon/icon';
import { Select } from '@components/select/select';
import { Toggle } from '@components/toggle/toggle';
import { useTranslation } from '@components/translation/translation';

import { selectSettings } from '@store/slices/settings/selectors';
import { setLocale, setTheme } from '@store/slices/settings/slice';
import { useDispatch } from '@store/store';

import { Icons, Locales } from '@types';

export function Settings() {
  const dispatch = useDispatch();

  const { locale, theme } = useSelector(selectSettings);

  const { 'nav.settings.locale': localeLabel, 'nav.settings.theme': themeLabel } = useTranslation([
    'nav.settings.locale',
    'nav.settings.theme',
  ]);

  return (
    <div>
      <Toggle
        checked={theme === 'dark'}
        icon={<Icon icon={Icons.DARK_MODE} size="S" />}
        label={themeLabel}
        onChange={(enabled) => dispatch(setTheme(enabled ? 'dark' : 'light'))}
      />
      <Select
        icon={<Icon icon={Icons.LOCALE} size="S" />}
        label={localeLabel}
        onChange={(e) => dispatch(setLocale(e.target.value as Locales))}
        options={['en', 'fr']}
        selected={locale}
      />
    </div>
  );
}
