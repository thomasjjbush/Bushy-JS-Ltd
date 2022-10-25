import React from 'react';
import { useSelector } from 'react-redux';

import { Angle } from '@components/angle/angle';
import { Comment } from '@components/comment/comment';
import { Translation } from '@components/translation/translation';

import { useLazyEffect } from '@hooks/use-lazy-effect/use-lazy-effect';

import { DraftComment } from '@modules/draft-comment/draft-comment';

import { selectCommentCount, selectComments } from '@store/slices/project/selectors';
import { selectUser } from '@store/slices/user/selectors';
import { getMoreComments } from '@store/slices/project/thunks';
import { useDispatch } from '@store/store';

import style from './comments.module.scss';

interface Props {
  slug: string;
}

export function Comments({ slug }: Props) {
  const dispatch = useDispatch();

  const comments = useSelector(selectComments);
  const total = useSelector(selectCommentCount);
  const user = useSelector(selectUser);

  useLazyEffect('load-more-comments', () => dispatch(getMoreComments({ skip: comments?.length || 0, slug })), {
    condition: (comments?.length || 0) < total,
    dependancies: [comments?.length],
    root: 'comments-list',
  });

  return (
    <section className={style.comments}>
      <h2 className={style.commentsTitle}>
        <Translation id="project.comments.title" /> ({total})
      </h2>
      <div className={style.container}>
        <DraftComment className={style.commentsDraft} />
        <div className={style.commentsList} id="comments-list">
          {comments?.map((comment) => (
            <div className={style.commentsListItem} key={comment._id}>
              <Comment comment={comment} user={user} />
              <span className={style.commentsListItemHorizontalLine} />
              <span className={style.commentsListItemVerticalLine} />
            </div>
          ))}
          {!comments?.length && (
            <div className={style.commentsListItem}>
              <Angle className={style.commentsListItemEmpty}>
                <p>
                  <Translation id="project.comments.empty" />
                </p>
              </Angle>
              <span className={style.commentsListItemHorizontalLine} />
              <span className={style.commentsListItemVerticalLine} />
            </div>
          )}
          {(comments?.length || 0) < total && (
            <p className={style.commentsListLoading} id="load-more-comments">
              <Translation id="project.comments.loadingMore" />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
