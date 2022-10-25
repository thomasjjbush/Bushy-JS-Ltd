import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { selectUser } from '@store/slices/user/selectors';

import { Store, User } from '@types';

import style from './user-profile.module.scss';

interface Props {
  children?: ReactNode;
  className?: string;
  size?: 'S' | 'M' | 'L';
  user?: User;
  vertical?: boolean;
}

export function UserProfile({ children, className, size = 'M', user: providedUser, vertical }: Props) {
  const user = useSelector((s: Store) => providedUser || selectUser(s));

  if (!user) {
    return null;
  }

  return (
    <div className={cx(style.userProfile, style['userProfile' + size], className)}>
      <div>
        <div className={style.userProfileAvatar} style={{ backgroundColor: user.color }}>
          {user.profilePicture ? (
            <img alt={user.initials} src={user.profilePicture} height="100%" width="100%" />
          ) : (
            <span>{user.initials}</span>
          )}
        </div>
        <p className={style.userProfileName}>{user.name}</p>
      </div>
      {children && <div className={style.userProfileChildren}>{children}</div>}
    </div>
  );
}
