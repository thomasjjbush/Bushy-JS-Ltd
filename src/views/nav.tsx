import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cx from 'classnames';

import { routes } from '@const/routes';

import { Icon } from '@components/icon/icon';
import { UserProfile } from '@components/user-profile/user-profile';
import { Translation } from '@components/translation/translation';

import { useFixScroll } from '@hooks/use-fix-scroll/use-fix-scroll';
import { useFocusTrap } from '@hooks/use-focus-trap/use-focus-trap';
import { useKeyPress } from '@hooks/use-key-press/use-key-press';
import { useOuterClick } from '@hooks/use-outer-click/use-outer-click';

import { Settings } from '@modules/settings/settings';
import { SignIn } from '@modules/sign-in/sign-in';

import { Icons } from '@types';

import { scrollToAnchor } from '@utils/scroll-to-anchor/scroll-to-anchor';
import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import style from './nav.module.scss';

export default function Nav() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const closeNav = () => setIsOpen(false);

  useFocusTrap({ condition: isOpen, selector: '#nav' });
  useOuterClick(closeNav, { condition: isOpen, selector: '#nav' });
  useKeyPress(closeNav, { condition: isOpen, key: 'Escape' });
  useFixScroll(isOpen);

  const onLinkClick = (to: string): void => {
    closeNav();

    setTimeout(() => {
      if (window.location.pathname === '/' && to.includes('/#')) {
        return scrollToAnchor(to.replace('/#', ''));
      }
      navigate(to);
    }, 200);

    tracking.track(TrackingEvents.CLICK, { label: `Navigate to ${to.replace('/#', '')}` });
  };

  return (
    <nav className={cx(style.nav, { [style.navOpen]: isOpen })} id="nav">
      <button
        aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
        className={style.navMenu}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon={isOpen ? Icons.CLOSE : Icons.MENU} size="L" />
      </button>
      <UserProfile vertical />
      <div>
        {routes.map(({ icon, label, to }) => (
          <NavLink className={style.navItem} key={to} onClick={() => onLinkClick(to)} to={to}>
            <Icon icon={icon} />
            <Translation id={label as 'nav.routes.skills' | 'nav.routes.employment' | 'nav.routes.projects'} />
          </NavLink>
        ))}
      </div>
      <div>
        <Settings />
        <SignIn />
      </div>
    </nav>
  );
}
