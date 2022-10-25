import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import isEqual from 'lodash.isequal';

import { Angle } from '@components/angle/angle';
import { ClampedText } from '@components/clamped-text/clamped-text';
import { Client } from '@components/client/client';
import { Icon } from '@components/icon/icon';
import { Likes } from '@components/likes/likes';
import { Translation } from '@components/translation/translation';

import { useEvents } from '@hooks/use-events/use-events';

import { Comments } from '@modules/comments/comments';
import { PreviewGallery } from '@modules/preview-gallery/preview-gallery';
import { RelatedProjects } from '@modules/related/related';

import { getProject } from '@store/slices/project/thunks';
import { selectProject } from '@store/slices/project/selectors';
import { actions } from '@store/slices/project/slice';
import { selectLocale } from '@store/slices/settings/selectors';
import { useDispatch } from '@store/store';

import style from './project.module.scss';

export default function Project() {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();

  const { loading, project } = useSelector(selectProject, isEqual);
  const locale = useSelector(selectLocale);

  useEffect(() => {
    if (slug) {
      dispatch(getProject(slug));
    }
  }, [locale, slug]);

  useEvents({
    addComment: actions.newCommentEvent,
    addLike: actions.newLikeEvent,
    deleteComment: actions.deleteCommentEvent,
    deleteLike: actions.deleteLikeEvent,
  });

  if (loading || !project) {
    return <p>loading</p>;
  }

  return (
    <main className={style.project}>
      <section>
        <h2 className={style.projectName}>{project.name}</h2>
        <Client className={style.projectClient} client={project.client} />
        <Likes className={style.projectLikes} slug={slug as string} />
        <div className={style.projectTags}>
          {project.tags.map(({ name, slug }) => (
            <Angle border className={style.projectTagsTag} key={slug}>
              <p>{name}</p>
            </Angle>
          ))}
        </div>
        <p className={style.projectDescription}>{project.description}</p>
      </section>
      <section>
        <h2 className={style.projectResponsibilitiesTitle}>
          <Translation id="project.responsibilities.title" />
        </h2>
        <div className={style.projectResponsibilities}>
          {project.responsibilities.map(({ description, icon, name }) => (
            <article className={style.projectResponsibility} key={name}>
              <Icon className={style.projectResponsibilityIcon} icon={icon} size="XL" />
              <h3 className={style.projectResponsibilityName}>{name}</h3>
              <ClampedText className={style.projectResponsibilityDescription}>{description}</ClampedText>
            </article>
          ))}
        </div>
      </section>
      {Boolean(project.gallery?.length) && (
        <PreviewGallery gallery={[project.video, ...project.gallery].filter(Boolean)} />
      )}
      <Comments slug={slug as string} />
      <RelatedProjects project={project} />
    </main>
  );
}
