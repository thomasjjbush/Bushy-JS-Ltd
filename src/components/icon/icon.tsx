import React from 'react';
import cx from 'classnames';

import { Icons } from '@types';

import style from './icon.module.scss';

interface Props {
  className?: string;
  icon: Icons;
  inverse?: boolean;
  primary?: boolean;
  size?: 'L' | 'M' | 'S' | 'XL';
}

export function Icon({ className, icon, inverse, primary, size = 'M' }: Props) {
  return (
    <span
      className={cx(style.icon, style[icon], style['icon' + size], className, {
        [style.iconPrimary]: primary,
        [style.iconInverse]: inverse,
      })}
    />
  );
}
