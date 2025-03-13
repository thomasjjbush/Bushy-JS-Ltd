import React, { useState } from 'react';
import cx from 'classnames';

import { Button } from '@components/button/button';

import style from './clamped-text.module.scss';
import { Translation } from '@components/translation/translation';

interface Props {
  asLink?: boolean;
  children: string;
  className?: string;
  onClick?: () => void;
}

export function ClampedText({ asLink, className, children, onClick }: Props) {
  const [clamped, setClamped] = useState(true);

  return (
    <div className={className}>
      <p className={cx(style.text, { [style.textClamped]: clamped, [style.textAsLink]: asLink })}>{children}</p>
      {asLink ? (
        <span
          className={style.textLink}
          onClick={() => {
            onClick?.();
            setClamped(!clamped);
          }}
        >
          <Translation id={clamped ? 'project.responsibilities.readMore' : 'project.responsibilities.readLess'} />
        </span>
      ) : (
        <Button
          label={
            <Translation id={clamped ? 'project.responsibilities.readMore' : 'project.responsibilities.readLess'} />
          }
          onClick={() => {
            onClick?.();
            setClamped(!clamped);
          }}
        />
      )}
    </div>
  );
}
