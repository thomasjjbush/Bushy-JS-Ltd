import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import dateFormat from 'dateformat';

import { ThemedImage } from '@components/themed-image/themed-image';
import { Translation } from '@components/translation/translation';

import { useLazyEffect } from '@hooks/use-lazy-effect/use-lazy-effect';

import { Error } from '@modules/error/error';

import { selectEmployment } from '@store/slices/employment/selectors';
import { getEmployment } from '@store/slices/employment/thunks';
import { selectLocale } from '@store/slices/settings/selectors';
import { useDispatch } from '@store/store';

import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import style from './employment.module.scss';
import { ClampedText } from '@components/clamped-text/clamped-text';

export function Employment() {
  const dispatch = useDispatch();

  const locale = useSelector(selectLocale);
  const { error, loading, employment } = useSelector(selectEmployment);

  useLazyEffect('employment', () => dispatch(getEmployment()), {
    dependancies: [locale],
  });

  return (
    <section className={style.container} id="employment">
      <div>
        <h2 className={style.title}>
          <span className={style.titleLabel}>
            <Translation id="employment.title" />
          </span>
          <span className={style.titleWire} />
        </h2>
        {!loading && error && (
          <Error message={error.message} onRetry={() => dispatch(getEmployment())} status={error.status} />
        )}
        {(loading ? new Array(5).fill({}) : employment)?.map(
          ({ endDate, companyName, responsibilities, startDate, title, url }, i) => (
            <div className={cx(style.employment, { [style.employmentLoading]: loading })} key={startDate || i}>
              <a
                className={style.employmentLogo}
                href={url}
                onClick={() => tracking.track(TrackingEvents.CLICK, { label: `Visit ${companyName}` })}
                target="_blank"
                rel="noreferrer"
              >
                {loading ? (
                  <ThemedImage alt="loading" img="loading-gif.gif" />
                ) : (
                  <img src={`https://logo.clearbit.com/${new URL(url).hostname.replace('www.', '')}`} />
                )}
              </a>
              <div>
                <p className={style.employmentTitle}>{title}</p>
                <a
                  className={style.employmentName}
                  href={url}
                  onClick={() => tracking.track(TrackingEvents.CLICK, { label: `Visit ${companyName}` })}
                  target="_blank"
                  rel="noreferrer"
                >
                  {companyName}
                </a>
                <ClampedText asLink>{responsibilities}</ClampedText>
                {startDate && (
                  <p className={style.employmentTime}>
                    {dateFormat(startDate, 'mmmm yyyy')} - {endDate ? dateFormat(endDate, 'mmmm yyyy') : 'Present'}
                  </p>
                )}
              </div>
            </div>
          ),
        )}
      </div>
      <ThemedImage alt="desk" className={style.vector} img="desk.svg" />
    </section>
  );
}
