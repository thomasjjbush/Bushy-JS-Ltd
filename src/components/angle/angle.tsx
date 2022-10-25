import React, { ReactNode } from 'react';
import cx from 'classnames';

import style from './angle.module.scss';

interface Props {
  border?: boolean;
  children: ReactNode;
  className?: string;
  direction?: 'Left' | 'Right';
  raised?: boolean;
}

export function Angle({ border, children, className, direction, raised }: Props) {
  return (
    <div
      className={cx(style.container, style['container' + direction], className, {
        [style.containerBorder]: border,
        [style.containerRaised]: raised,
      })}
    >
      {children}
      <span className={cx(style.containerCorner, style.containerCornerFirst)} />
      <span className={cx(style.containerCorner, style.containerCornerLast)} />
    </div>
  );
}
