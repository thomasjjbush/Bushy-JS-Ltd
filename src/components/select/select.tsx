import React, { ChangeEvent, ReactNode } from 'react';
import cx from 'classnames';

import style from './select.module.scss';

interface Props {
  className?: string;
  icon?: ReactNode;
  label: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  selected?: string;
}

export function Select({ className, icon, label, onChange, options, selected }: Props) {
  return (
    <label className={cx(style.container, className)}>
      <div className={style.info}>
        {icon}
        <p>{label}</p>
      </div>
      <select className={style.select} onChange={onChange} value={selected}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
