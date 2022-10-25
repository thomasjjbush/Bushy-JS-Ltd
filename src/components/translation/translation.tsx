import React from 'react';
import { useSelector } from 'react-redux';

import { selectLocale } from '@store/slices/settings/selectors';

import en from '@translations/en.json';
import fr from '@translations/fr.json';

const labels = {
  en,
  fr,
};

interface Props {
  fallback?: string;
  id: keyof typeof en;
}

export function Translation({ fallback, id }: Props) {
  const locale = useSelector(selectLocale);
  return <>{labels[locale][id] ?? fallback ?? ''}</>;
}

export function useTranslation(id: keyof typeof en | (keyof typeof en)[]): any {
  const locale = useSelector(selectLocale);

  if (Array.isArray(id)) {
    return id.reduce((acc, id) => ({ ...acc, [id]: labels[locale][id] || '' }), {});
  }

  return labels[locale][id] || '';
}
