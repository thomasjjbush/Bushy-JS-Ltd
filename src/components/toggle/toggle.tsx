import React, { ReactNode } from 'react';

import { onKeyDown } from '@utils/on-key-down/on-key-down';

import style from './toggle.module.scss';

interface Props {
  checked: boolean;
  icon?: ReactNode;
  label: string;
  onChange: (checked: boolean) => void;
}

export function Toggle({ checked, icon, label, onChange }: Props) {
  return (
    <label className={style.container}>
      <div className={style.info}>
        {icon}
        <p>{label}</p>
      </div>
      <div className={style.toggle}>
        <input
          checked={checked}
          onChange={() => onChange(!checked)}
          onKeyDown={onKeyDown(() => onChange(!checked))}
          type="checkbox"
        />
        <span />
      </div>
    </label>
  );
}
