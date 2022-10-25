import React, { ChangeEvent, useState } from 'react';

import { Button } from '@components/button/button';
import { Modal } from '@components/modal/modal';
import { TextInput } from '@components/text-input/text-input';

import style from './confirmation-modal.module.scss';

interface Props {
  confirmationString: string;
  label?: string;
  onClose: () => void;
  onConfirmation: () => void;
  title?: string;
}

export function ConfirmationModal({
  confirmationString,
  label,
  onClose,
  onConfirmation,
  title = 'Are you sure?',
}: Props) {
  const [attempt, setAttempt] = useState('');

  const onClick = () => {
    onClose();
    onConfirmation();
  };

  return (
    <Modal title={title} onClose={onClose}>
      <div className={style.confirmationModal}>
        <p className={style.confirmationModalLabel}>
          This action cannot be undone. This will permanently delete your comment, please type{' '}
          <b>{confirmationString}</b> to confirm you wish to proceed.
        </p>
        <TextInput
          className={style.confirmationModalInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAttempt(e.target.value)}
          value={attempt}
        />
        <Button label="Delete comment" disabled={attempt !== confirmationString} raised onClick={onClick} />
      </div>
    </Modal>
  );
}
