import React, { ChangeEvent } from 'react';
import cx from 'classnames';

import { Icon } from '@components/icon/icon';

import { Icons } from '@types';

import style from './text-input.module.scss';

interface Props {
  className?: string;
  disabled?: boolean;
  icon?: false | Icons;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}

export function TextInput({
  className,
  disabled,
  icon,
  onChange,
  pattern,
  placeholder,
  required,
  type = 'text',
  value,
}: Props) {
  return (
    <div className={cx(style.input, className)}>
      <input
        className={style.inputField}
        disabled={disabled}
        onChange={onChange}
        pattern={pattern}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {icon !== false && <Icon icon={icon ?? Icons.SEARCH} size="S" />}
    </div>
  );
}
