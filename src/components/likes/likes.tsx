import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { Icon } from '@components/icon/icon';
import { Translation } from '@components/translation/translation';

import { addLike, deletelLike } from '@store/slices/project/thunks';
import { selectHasLiked, selectLikeCount, selectLikes } from '@store/slices/project/selectors';
import { selectUser } from '@store/slices/user/selectors';
import { useDispatch } from '@store/store';

import { Icons } from '@types';

import style from './likes.module.scss';
import { signInWithState } from '@utils/sign-in-with-state';
import { Tooltip } from 'react-tooltip';

interface Props {
  className?: string;
  slug: string;
}

function writeLabel({ name, remaining }: { name: string; remaining: number }) {
  const label = `Liked by ${name}`;

  if (!remaining) {
    return label;
  }

  return label + ` and ${remaining} other${remaining > 1 ? 's' : ''}`;
}

export function Likes({ className, slug }: Props) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const likeCount = useSelector(selectLikeCount);
  const likes = useSelector(selectLikes);
  const hasLiked = useSelector(selectHasLiked);

  const onClick = () => {
    if (user?._id) {
      if (hasLiked) {
        return dispatch(deletelLike({ slug, userId: user._id }));
      }
      dispatch(addLike(slug));
    } else {
      signInWithState({ action: 'like', fromProjectPage: '1', slug });
    }
  };

  return (
    <div className={cx(style.like, className)}>
      <button className={style.likeButton} onClick={onClick} title="Like">
        <Icon
          className={cx(style.likeButtonFill, { [style.likeButtonFillFilled]: hasLiked })}
          icon={Icons.LIKED}
          size="L"
          primary
        />
        <Icon
          className={cx(style.likeButtonOutline, { [style.likeButtonOutlineLiked]: hasLiked })}
          icon={Icons.LIKE}
          size="L"
        />
      </button>
      {Boolean(likeCount) && Boolean(likes.length) ? (
        <>
          <p id="likes">{writeLabel({ name: hasLiked ? 'you' : likes[0].author.name, remaining: likeCount - 1 })}</p>
          <Tooltip anchorSelect="#likes">
            <div>
              <p>Liked by:</p>
              <ul>
                {likes.map(({ _id, author }) => (
                  <li key={_id}>{author.name}</li>
                ))}
              </ul>
            </div>
          </Tooltip>
        </>
      ) : (
        <p>
          <Translation id="project.likes.empty" />
        </p>
      )}
    </div>
  );
}
