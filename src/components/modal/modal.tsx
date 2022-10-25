import React, { ReactNode } from 'react';

import { Icon } from '@components/icon/icon';

import { useOuterClick } from '@hooks/use-outer-click/use-outer-click';
import { useKeyPress } from '@hooks/use-key-press/use-key-press';
import { useFocusTrap } from '@hooks/use-focus-trap/use-focus-trap';
import { useFixScroll } from '@hooks/use-fix-scroll/use-fix-scroll';

import { Icons } from '@types';

import style from './modal.module.scss';

interface Props {
  children: ReactNode;
  onClose: () => void;
  title: string;
}
Icons;
export function Modal({ children, onClose, title }: Props) {
  useOuterClick(onClose, { selector: '#modal' });
  useKeyPress(onClose, { key: 'Escape' });
  useFocusTrap({ selector: '#modal' });
  useFixScroll();

  return (
    <div className={style.modalBackdrop}>
      <dialog className={style.modal} open id="modal">
        <div className={style.modalControls}>
          <h2>{title}</h2>
          <button className={style.modalControlsButton} onClick={onClose}>
            <Icon icon={Icons.CLOSE} size="L" />
          </button>
        </div>
        {children}
      </dialog>
    </div>
  );
}
