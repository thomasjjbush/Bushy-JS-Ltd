import React from 'react';
import { useSelector } from 'react-redux';

import { Icon } from '@components/icon/icon';
import { Translation } from '@components/translation/translation';

import { selectUser } from '@store/slices/user/selectors';
import { signOut } from '@store/slices/user/thunks';
import { useDispatch } from '@store/store';

import { Endpoints, Icons } from '@types';

import style from './sign-in.module.scss';

export function SignIn() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const onClick = () => {
    if (user) {
      return dispatch(signOut());
    }
    window.location.href = process.env.API_DOMAIN + Endpoints.SIGN_IN;
  };

  return (
    <button className={style.signIn} onClick={onClick}>
      <Icon icon={user ? Icons.SIGN_OUT : Icons.SIGN_OUT} size="S" />
      <Translation id={user ? 'nav.settings.signOut' : 'nav.settings.signIn'} />
    </button>
  );
}
