import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import throttle from 'lodash.throttle';

import { Angle } from '@components/angle/angle';
import { ClampedText } from '@components/clamped-text/clamped-text';
import { Client } from '@components/client/client';
import { Icon } from '@components/icon/icon';
import { Likes } from '@components/likes/likes';
import { Translation } from '@components/translation/translation';

import { useEvents } from '@hooks/use-events/use-events';

import { Comments } from '@modules/comments/comments';
import { Error } from '@modules/error/error';
import { PreviewGallery } from '@modules/preview-gallery/preview-gallery';
import { RelatedProjects } from '@modules/related/related';

import { getProject } from '@store/slices/project/thunks';
import { selectProject } from '@store/slices/project/selectors';
import { actions } from '@store/slices/project/slice';
import { selectLocale } from '@store/slices/settings/selectors';
import { useDispatch } from '@store/store';

import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import style from './project.module.scss';
import { Project } from '@types';

export default function Project() {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();

  const { error, loading, project } = useSelector(selectProject, isEqual);
  const locale = useSelector(selectLocale);

  useEffect(() => {
    document.body.scrollTop = 0;
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

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return (
      <Error
        fullSize
        message={error.message}
        status={error.status}
        onRetry={() => dispatch(getProject(slug as string))}
      />
    );
  }

  if (project) {
    return <ProjectUI project={project} slug={slug} />;
  }

  return null;
}

function ProjectUI({ project, slug }: { project: Project; slug?: string }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroRendered, setHeroRendered] = useState(false);

  useEffect(() => {
    if (heroRendered && heroRef.current && !/Mobi|Android|Tablet|iPad/i.test(navigator.userAgent)) {
      const hero = heroRef.current as HTMLElement;
      const angle = hero.nextSibling as HTMLElement;

      const onScroll = throttle(() => {
        if (window.scrollY > 50) {
          hero.style.filter = `blur(${(window.scrollY / 15).toFixed(1)}px)`;
          angle.style.borderWidth = `${140 + window.scrollY / 1.5}px 0 0 100vw`;
        } else {
          hero.style.filter = 'blur(0px)';
          angle.style.borderWidth = '140px 0 0 100vw';
        }
      }, 100);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', onScroll);
          } else {
            window.removeEventListener('scroll', onScroll);
          }
        });
      });
      observer.observe(hero);
    }
  }, [heroRendered, slug]);

  return (
    <main className={style.project}>
      <section className={style.projectHero}>
        <div
          className={style.projectHeroImage}
          id={project.name}
          ref={(elem) => {
            heroRef.current = elem;
            setHeroRendered(true);
          }}
          style={{ backgroundImage: `url(${project.hero.url})` }}
        />
        <div className={style.projectHeroAngle} />
      </section>
      <section className={style.projectOverview}>
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
              <ClampedText
                className={style.projectResponsibilityDescription}
                onClick={() =>
                  tracking.track(TrackingEvents.CLICK, { label: `Read more about ${name}`, project: project.slug })
                }
              >
                {description}
              </ClampedText>
            </article>
          ))}
        </div>
      </section>
      {Boolean(project.gallery?.length) && (
        <PreviewGallery gallery={[project.video, ...project.gallery].filter(Boolean)} slug={project.slug} />
      )}
      <Comments slug={slug as string} />
      <RelatedProjects project={project} />
    </main>
  );
}
