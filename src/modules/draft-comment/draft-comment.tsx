import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { Angle } from '@components/angle/angle';
import { Button } from '@components/button/button';
import { Icon } from '@components/icon/icon';
import { Translation, useTranslation } from '@components/translation/translation';

import { addComment } from '@store/slices/project/thunks';
import { selectUser } from '@store/slices/user/selectors';
import { useDispatch } from '@store/store';

import { uuid } from '@utils/uuid/uuid';

import { Endpoints, Icons } from '@types';

import style from './draft-comment.module.scss';

interface Props {
  className?: string;
}

export function DraftComment({ className }: Props) {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const placeholder = useTranslation('project.comments.placeholder');

  const user = useSelector(selectUser);

  const [comment, setComment] = useState('');

  const onClick = () => {
    if (!user) {
      return (window.location.href = window.location.href = process.env.API_DOMAIN + Endpoints.SIGN_IN);
    } else if (comment && slug) {
      dispatch(addComment({ _id: uuid(), comment, slug }));
      setComment('');
    }
  };

  return (
    <div className={cx(style.container, className)}>
      <Angle className={style.angle}>
        <textarea
          className={style.textArea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
          value={comment}
          placeholder={placeholder}
          rows={8}
        />
      </Angle>
      <Button
        disabled={Boolean(user && !comment)}
        icon={<Icon icon={user ? Icons.ADD_COMMENT : Icons.SIGN_IN} primary size="S" />}
        label={<Translation id={user ? 'project.comments.post' : 'project.comments.signIn'} />}
        onClick={onClick}
      />
    </div>
  );
}
