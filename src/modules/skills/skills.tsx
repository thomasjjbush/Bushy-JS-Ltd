import React from 'react';
import cx from 'classnames';

import { Button } from '@components/button/button';
import { Icon } from '@components/icon/icon';
import { ThemedImage } from '@components/themed-image/themed-image';
import { Translation } from '@components/translation/translation';

import { Icons } from '@types';

import { scrollToAnchor } from '@utils/scroll-to-anchor/scroll-to-anchor';

import style from './skills.module.scss';

const skills = [
  { className: 'skillDesign', id: 'design' },
  { className: 'skillBackend', id: 'backend' },
  { className: 'skillFrontend', id: 'frontend' },
];

export function Skills() {
  const onClick = () => {
    scrollToAnchor('projects');
    window.location.hash = '#projects';
  };

  return (
    <section className={style.container} id="skills">
      <h2 className={style.title}>
        <Translation id="skills.title" />
      </h2>
      {skills.map(({ className, id: skill }) => (
        <div className={cx(style.skill, style[className])} key={skill}>
          <ThemedImage alt={skill} className={style.skillImage} img={`${skill}.svg`} />
          <div>
            <h3 className={style.skillName}>
              <Translation id={`skills.${skill}.title` as any} />
            </h3>
            <p className={style.skillDescription}>
              <Translation id={`skills.${skill}.description` as any} />
            </p>
            <Button
              icon={<Icon icon={Icons.PROJECTS} primary size="S" />}
              label={<Translation id="skills.cta" />}
              onClick={onClick}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
