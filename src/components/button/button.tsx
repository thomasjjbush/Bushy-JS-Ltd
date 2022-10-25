import React, { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import style from './button.module.scss';
import { Angle } from '@components/angle/angle';

interface Props {
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  label: ReactNode | string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  raised?: boolean;
  to?: string;
}

export function Button({ className, disabled, icon, label, onClick, raised = false, to }: Props) {
  const classNames = cx(style.button, className);

  const content = to ? (
    <Link className={classNames} to={to}>
      {icon}
      {label}
    </Link>
  ) : (
    <button className={classNames} disabled={disabled} onClick={onClick}>
      {icon}
      {label}
    </button>
  );

  return (
    <Angle className={cx({ [style.buttonDisabled]: disabled })} border raised={raised}>
      {content}
    </Angle>
  );
}
