import React, { useState } from 'react';

import { TextInput } from '@components/text-input/text-input';
import { Translation, useTranslation } from '@components/translation/translation';

import style from './project-filter.module.scss';

export function ProjectFilter() {
  const [search, setSearch] = useState('');

  const placeholder = useTranslation('projects.search');

  return (
    <div className={style.container}>
      <div className={style.projectFilter}>
        <h2 className={style.projectFilterTitle}>
          <span>
            <Translation id="projects.title" />
          </span>
        </h2>
        <div className={style.projectFilterInput}>
          <TextInput onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} value={search} />
        </div>
      </div>
    </div>
  );
}
