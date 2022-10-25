import React from 'react';
import { useSelector } from 'react-redux';

import { selectTheme } from '@store/slices/settings/selectors';

interface Props {
  alt: string;
  className?: string;
  img: string;
  width?: number | string;
}

export function ThemedImage({ alt, className, img, width = '100%' }: Props) {
  const theme = useSelector(selectTheme);

  return <img alt={alt} className={className} src={`/img/${theme}-mode/${img}`} loading="lazy" width={width} />;
}
