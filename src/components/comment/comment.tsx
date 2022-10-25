import React, { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { Angle } from '@components/angle/angle';
import { ConfirmationModal } from '@modules/confirmation-modal/confirmation-modal';
import { Date } from '@components/date/date';
import { Icon } from '@components/icon/icon';
import { UserProfile } from '@components/user-profile/user-profile';

import { addComment, deleleComment } from '@store/slices/project/thunks';
import { useDispatch } from '@store/store';

import { Comment as CommentType, Icons, User } from '@types';

import style from './comment.module.scss';

interface Props {
  comment: CommentType;
  user: User | null;
}

export function Comment({ comment, user }: Props) {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = () => {
    dispatch(deleleComment({ _id: comment._id, slug: slug as string }));
  };

  const onRetry = () => {
    if (comment.state === 'delete-error') {
      dispatch(deleleComment({ _id: comment._id, slug: slug as string }));
    }
    if (comment.state === 'insert-error') {
      dispatch(addComment({ _id: comment._id, comment: comment.comment, slug: slug as string }));
    }
  };

  return (
    <>
      <Angle className={style.container}>
        <UserProfile
          className={cx(style.comment, { [style.commentLoading]: comment.state })}
          user={comment.author}
          size="S"
        >
          <p>{comment.comment}</p>
          {comment.state ? (
            <p className={style.commentDate}>Just now</p>
          ) : (
            <Date className={style.commentDate} date={comment.date} />
          )}
          {user?._id === comment.author._id && !comment.state && (
            <button className={style.commentDelete} onClick={onDelete} title="Delete comment">
              <Icon icon={Icons.DELETE} size="S" />
            </button>
          )}
        </UserProfile>
        {comment.state?.includes('error') && (
          <div className={style.commentError}>
            <p className={style.commentErrorMessage}>Failed to {comment.state.split('-')[0]} comment</p>
            <button className={style.commentErrorButton} onClick={onRetry}>
              Retry
            </button>
          </div>
        )}
      </Angle>
      {isDeleteModalOpen && (
        <ConfirmationModal
          confirmationString={(user as User).name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmation={onConfirmDelete}
        />
      )}
    </>
  );
}
