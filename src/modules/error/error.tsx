import React from 'react';
import cx from 'classnames';

import { Button } from '@components/button/button';
import { ThemedImage } from '@components/themed-image/themed-image';
import { Translation, useTranslation } from '@components/translation/translation';

import style from './error.module.scss';

interface Props {
  fullSize?: boolean;
  message?: string;
  onRetry?: () => unknown;
  retryLabel?: string;
  status?: number;
}

export function Error({ fullSize, message, onRetry, retryLabel, status }: Props) {
  const defaultRetryLabel = useTranslation('error.retry');

  return (
    <div className={cx(style.error, { [style.errorFullSize]: fullSize })}>
      <ThemedImage alt="error" img="error.svg" />
      <h2 className={style.errorStatus}>{status || <Translation id="error.title" />}</h2>
      <p className={style.errorMessage}>{message || <Translation id="error.message" />}</p>
      {Boolean(onRetry) && (
        <Button className={style.errorButton} label={retryLabel || defaultRetryLabel} onClick={onRetry} />
      )}
    </div>
  );
}
