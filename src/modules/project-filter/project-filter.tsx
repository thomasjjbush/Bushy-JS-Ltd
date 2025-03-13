import React, { useEffect, useState } from 'react';

import { TextInput } from '@components/text-input/text-input';
import { Translation, useTranslation } from '@components/translation/translation';

import style from './project-filter.module.scss';
import { getProjects } from '@store/slices/projects/thunks';
import { useDispatch } from '@store/store';

export function ProjectFilter() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getProjects(search));
  }, [search]);

  return (
    <div className={style.container}>
      <div className={style.projectFilter}>
        <h2 className={style.projectFilterTitle}>
          <span>
            <Translation id="projects.title" />
          </span>
        </h2>
        <div className={style.projectFilterInput}>
          <TextInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder={useTranslation('projects.search')}
            value={search}
          />
        </div>
      </div>
    </div>
  );
}
