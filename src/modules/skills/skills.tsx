import React from 'react';
import cx from 'classnames';

import { Button } from '@components/button/button';
import { Icon } from '@components/icon/icon';
import { MarchingAnts } from '@components/marching-ants';
import { ThemedImage } from '@components/themed-image/themed-image';
import { Translation } from '@components/translation/translation';

import { Icons } from '@types';

import { scrollToAnchor } from '@utils/scroll-to-anchor/scroll-to-anchor';
import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import style from './skills.module.scss';

export function Skills() {
  const onClick = (skill: string) => {
    scrollToAnchor('projects');
    window.location.hash = '#projects';

    tracking.track(TrackingEvents.CLICK, { label: `See ${skill} examples` });
  };

  return (
    <section className={style.container} id="skills">
      <h2 className={style.title}>
        <Translation id="skills.title" />
      </h2>
      <div className={cx(style.skill, style.skillDesign)}>
        <ThemedImage alt="design" className={style.skillImage} img="design.svg" />
        <div className={style.skillDetails}>
          <h3 className={style.skillName}>
            <Translation id="skills.design.title" />
            <MarchingAnts className={style.skillNameDots} direction="left" position="bottom" />
          </h3>
          <p className={style.skillDescription}>
            <Translation id="skills.design.description" />
          </p>
          <Button
            icon={<Icon icon={Icons.PROJECTS} primary size="S" />}
            label={<Translation id="skills.cta" />}
            onClick={() => onClick('design')}
          />
        </div>
        <MarchingAnts direction="down" position="right" />
      </div>
      <div className={cx(style.skill, style.skillBackend)}>
        <div className={style.skillImage}>
          <ThemedImage alt="backend" img="backend.svg" />
          <MarchingAnts className={style.skillDotsDesktop} direction="left" position="top" />
          <MarchingAnts className={style.skillDotsDesktop} direction="down" position="left" />
          <MarchingAnts className={style.skillDotsDesktop} direction="right" position="bottom" />
        </div>
        <div className={style.skillDetails}>
          <h3 className={style.skillName}>
            <Translation id="skills.backend.title" />
            <MarchingAnts className={style.skillNameDots} direction="left" position="bottom" />
          </h3>
          <p className={style.skillDescription}>
            <Translation id="skills.backend.description" />
          </p>
          <Button
            icon={<Icon icon={Icons.PROJECTS} primary size="S" />}
            label={<Translation id="skills.cta" />}
            onClick={() => onClick('backend')}
          />
        </div>
        <MarchingAnts className={style.skillDotsMobile} direction="down" position="right" />
      </div>
      <div className={cx(style.skill, style.skillFrontend)}>
        <MarchingAnts className={style.skillDotsMobile} direction="down" position="right" />
        <ThemedImage alt="frontend" className={style.skillImage} img="frontend.svg" />
        <div className={style.skillDetails}>
          <h3 className={style.skillName}>
            <Translation id="skills.frontend.title" />
            <MarchingAnts className={style.skillNameDots} direction="left" position="bottom" />
            <MarchingAnts className={style.skillNameDotsDown} direction="down" position="right" />
          </h3>
          <p className={style.skillDescription}>
            <Translation id="skills.frontend.description" />
          </p>
          <Button
            icon={<Icon icon={Icons.PROJECTS} primary size="S" />}
            label={<Translation id="skills.cta" />}
            onClick={() => onClick('frontend')}
          />
        </div>
      </div>
    </section>
  );
}
