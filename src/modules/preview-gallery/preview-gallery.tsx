import React, { TransitionEvent, useRef, useState } from 'react';
import cx from 'classnames';

import { ContentfulImage } from '@components/contentful-image/contentful-image';
import { Icon } from '@components/icon/icon';

import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import { Asset, Icons } from '@types';

import style from './preview-gallery.module.scss';

interface Props {
  gallery: Asset[];
  slug: string;
}

export function PreviewGallery({ gallery, slug }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(1);

  const increment = () => {
    if (ref.current) {
      ref.current.style.transitionDuration = '350ms';
      pauseVideo(ref.current);
    }
    setIndex(index + 1);

    tracking.track(TrackingEvents.CLICK, { label: 'Increment gallery', project: slug });
  };

  const decrement = () => {
    if (ref.current) {
      ref.current.style.transitionDuration = '350ms';
      pauseVideo(ref.current);
    }
    setIndex(index - 1);

    tracking.track(TrackingEvents.CLICK, { label: 'Decrement gallery', project: slug });
  };

  const jump = (index: number) => {
    if (ref.current) {
      ref.current.style.transitionDuration = '350ms';
      pauseVideo(ref.current);
    }
    setIndex(index);
    tracking.track(TrackingEvents.CLICK, { label: 'Gallery jump', project: slug });
  };

  const pauseVideo = (ref: HTMLDivElement) => {
    const video = ref.querySelector('video');

    if (video && !video.paused) {
      video.pause();
    }
  };

  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (index === 0 || index === gallery.length + 1) {
      (e.target as HTMLDivElement).style.transitionDuration = '0ms';

      if (index === 0) {
        setIndex(gallery.length);
      }
      if (index === gallery.length + 1) {
        setIndex(1);
      }
    }
  };

  return (
    <section className={style.preview}>
      <div className={style.previewContent}>
        <button className={style.previewArrow} onClick={decrement}>
          <Icon icon={Icons.CHEVRON_LEFT} size="L" />
        </button>
        <ul className={style.previewGallery}>
          <div
            className={style.previewGalleryTrack}
            onTransitionEnd={onTransitionEnd}
            ref={ref}
            style={{ transform: `translateX(calc(${index} * -100%))` }}
          >
            {[gallery[gallery.length - 1], ...gallery, gallery[0]].map(({ url, title }, i) => (
              <li className={style.previewGalleryItem} key={i + url}>
                {url.includes('.mp4') ? (
                  <video
                    src={url}
                    controls={true}
                    onPlay={() => tracking.track(TrackingEvents.WATCH_VIDEO, { project: slug })}
                  />
                ) : (
                  <ContentfulImage alt={title} src={url} width={700} />
                )}
              </li>
            ))}
          </div>
        </ul>
        <button className={style.previewArrow} onClick={increment}>
          <Icon icon={Icons.CHEVRON_RIGHT} size="L" />
        </button>
      </div>
      <div className={style.previewDots}>
        {gallery.map((_, i) => (
          <button
            className={cx(style.previewDotsDot, { [style.previewDotsDotActive]: i + 1 === index })}
            key={i}
            onClick={() => jump(i + 1)}
          >
            &bull;
          </button>
        ))}
      </div>
    </section>
  );
}
