import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { routes } from '@const/routes';

import { Translation } from '@components/translation/translation';
import { Logo } from '@components/logo/logo';

import { useLazyEffect } from '@hooks/use-lazy-effect/use-lazy-effect';

import { selectRelated } from '@store/slices/project/selectors';
import { getRelatedProjects } from '@store/slices/project/thunks';
import { useDispatch } from '@store/store';

import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import { Project } from '@types';

import style from './related.module.scss';

function renderRelated(related: Project[], currentSlug: string) {
  return related.map(({ name, slug }) => (
    <Link
      className={style.relatedItem}
      key={slug}
      to={`/project/${slug}`}
      onClick={() => tracking.track(TrackingEvents.CLICK, { label: `Visit related ${slug}`, project: currentSlug })}
    >
      {name}
    </Link>
  ));
}

interface Props {
  project: Project;
}

export function RelatedProjects({ project }: Props) {
  const dispatch = useDispatch();

  const { sameClient, sameTag } = useSelector(selectRelated);

  useLazyEffect('related-projects', () =>
    dispatch(getRelatedProjects({ client: project.client.slug, slug: project.slug, tag: project.primaryTag.slug })),
  );

  return (
    <footer id="related-projects" className={style.container}>
      <div className={style.related}>
        <Logo className={style.relatedLogo} />
        {Boolean(sameTag.length) && (
          <div>
            <h3>Other projects using {project.primaryTag.name}</h3>
            {renderRelated(sameTag, project.slug)}
          </div>
        )}
        {Boolean(sameClient.length) && (
          <div>
            <h3>Other projects for {project.client.name}</h3>
            {renderRelated(sameClient, project.slug)}
          </div>
        )}
        <div>
          <h3>General</h3>
          {routes.map(({ label, to }) => (
            <Link className={style.relatedItem} key={to} to={to}>
              <Translation id={label as 'nav.routes.employment' | 'nav.routes.projects' | 'nav.routes.skills'} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
