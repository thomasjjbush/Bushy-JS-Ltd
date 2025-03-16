import React from 'react';
import cx from 'classnames';

import style from './marching-ants.module.scss';

export function MarchingAnts({
  className,
  direction,
  position,
}: {
  className?: string;
  direction: 'down' | 'left' | 'right' | 'up';
  position: 'bottom' | 'left' | 'right' | 'top';
}) {
  return (
    <div
      className={cx(
        style.marchingAnts,
        style[`marching-ants--direction-${direction}`],
        style[`marching-ants--position-${position}`],
        className,
      )}
    />
  );
}
