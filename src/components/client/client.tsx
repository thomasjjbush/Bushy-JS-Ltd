import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { ContentfulImage } from '@components/contentful-image/contentful-image';
import { selectTheme } from '@store/slices/settings/selectors';

import type { Client } from '@types';

import style from './client.module.scss';

interface Props {
  className?: string;
  client: Client;
  inverse?: boolean;
}

export function Client({ className, client, inverse = false }: Props) {
  const theme = useSelector(selectTheme);
  return (
    <ContentfulImage
      alt={client.name}
      className={cx(style.client, className, {
        [style.clientInverse]: inverse || (client.requiresInverseLogo && theme === 'dark'),
      })}
      src={client.logo.url}
      width={200}
    />
  );
}
