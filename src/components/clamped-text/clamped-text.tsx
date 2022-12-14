import React, { useState } from 'react';
import cx from 'classnames';

import { Button } from '@components/button/button';

import style from './clamped-text.module.scss';
import { Translation } from '@components/translation/translation';

interface Props {
  children: string;
  className?: string;
  onClick?: () => void;
}

export function ClampedText({ className, children, onClick }: Props) {
  const [clamped, setClamped] = useState(true);

  return (
    <div className={className}>
      <p className={cx(style.text, { [style.textClamped]: clamped })}>{children}</p>
      <Button
        label={<Translation id={clamped ? 'project.responsibilities.readMore' : 'project.responsibilities.readLess'} />}
        onClick={() => {
          onClick?.();
          setClamped(!clamped);
        }}
      />
    </div>
  );
}
