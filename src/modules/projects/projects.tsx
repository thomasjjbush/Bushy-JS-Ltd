import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { Angle } from '@components/angle/angle';
import { Button } from '@components/button/button';
import { Client } from '@components/client/client';
import { ContentfulImage } from '@components/contentful-image/contentful-image';
import { Icon } from '@components/icon/icon';
import { ThemedImage } from '@components/themed-image/themed-image';
import { Translation, useTranslation } from '@components/translation/translation';

import { useLazyEffect } from '@hooks/use-lazy-effect/use-lazy-effect';

import { ProjectFilter } from '@modules/project-filter/project-filter';

import { addLike, deletelLike } from '@store/slices/project/thunks';
import { selectUser } from '@store/slices/user/selectors';
import { actions } from '@store/slices/projects/slice';
import { selectProjects } from '@store/slices/projects/selectors';
import { getMoreProjects, getProjects } from '@store/slices/projects/thunks';
import { selectLocale } from '@store/slices/settings/selectors';
import { useDispatch } from '@store/store';

import { signInWithState } from '@utils/sign-in-with-state';
import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import { Icons, Project } from '@types';

import style from './projects.module.scss';

function predictWidth() {
  const gridWidth = Math.min(document.documentElement.clientWidth - 64, 1136);

  switch (true) {
    case gridWidth <= 615:
      return Math.round(gridWidth);
    case gridWidth <= 896:
      return Math.round((gridWidth - 32) / 2);
    default:
      return Math.round((gridWidth - 64) / 3);
  }
}

export function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const locale = useSelector(selectLocale);
  const { error, loading, loadingMore, projects = [], total } = useSelector(selectProjects);
  const user = useSelector(selectUser);

  useLazyEffect('projects', () => dispatch(getProjects()), {
    dependancies: [locale],
  });

  const viewMoreLabel = useTranslation('projects.viewMore');

  let test: Project[] = loading ? new Array(6).fill({}) : projects || [];
  if (loadingMore) {
    test = [...projects, ...new Array(Math.min(6, total - projects?.length || 0)).fill({})];
  }

  return (
    <section id="projects" className={style.wrapper}>
      <div className={style.container}>
        <ProjectFilter />
        <div className={style.projects}>
          {test.map(({ client, commentCount, description, hasLiked, likeCount, name, slug, thumbnail }, i) => (
            <article className={cx(style.project, { [style.projectLoading]: !name })} key={slug ?? i}>
              <Angle raised>
                {client && <Client className={style.projectClient} client={client} />}
                {!name ? (
                  <ThemedImage alt="loading" img="loading-gif.gif" />
                ) : (
                  <ContentfulImage
                    alt={name}
                    className={style.projectThumbnail}
                    src={thumbnail.url}
                    width={predictWidth()}
                  />
                )}
                <div className={style.projectDetails}>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <div className={style.projectInteractions}>
                    <Button
                      label={<Translation id="projects.project.cta" />}
                      to={`/project/${slug}`}
                      onTracking={() => tracking.track(TrackingEvents.CLICK, { label: `Read more about ${name}` })}
                    />
                    <div className={style.projectInteractionsStats}>
                      <div>
                        <button
                          onClick={() => {
                            if (user?._id) {
                              navigate(`project/${slug}?commenting=true`);
                            } else {
                              signInWithState({ action: 'comment', comment: '', slug });
                            }
                          }}
                        >
                          <Icon icon={Icons.COMMENT} primary size="S" />
                        </button>
                        <p>
                          {commentCount} <Translation id="projects.project.comments" />
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={async () => {
                            if (user?._id) {
                              if (hasLiked) {
                                await dispatch(deletelLike({ slug, userId: user._id }));
                              } else {
                                await dispatch(addLike(slug));
                              }
                              dispatch(actions.like({ slug }));
                            } else {
                              signInWithState({ action: 'like', slug });
                            }
                          }}
                        >
                          <Icon icon={hasLiked ? Icons.LIKED : Icons.LIKE} primary size="S" />
                        </button>
                        <p>
                          {likeCount} <Translation id="projects.project.likes" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Angle>
            </article>
          ))}
          {!error && projects.length && projects.length < total && (
            <Button
              label={viewMoreLabel}
              onClick={() => dispatch(getMoreProjects())}
              rootClassName={style.projectsLoadMore}
            />
          )}
        </div>
      </div>
    </section>
  );
}
