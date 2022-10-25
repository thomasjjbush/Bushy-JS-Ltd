import React from 'react';

interface Props {
  alt: string;
  className?: string;
  loadingFallback?: boolean;
  src: string;
  width: number;
}

const formats = ['avif', 'webp'];
const resolutions = [1, 2, 3, 4];

function srcSet(src: string, { format, width }: { format?: string; width: number }) {
  return resolutions
    .map(
      (resolution) =>
        `${src}?${new URLSearchParams({
          ...(format && { fm: format }),
          w: Math.round(width * resolution).toString(),
        })} ${resolution}x`,
    )
    .join(',');
}

export function ContentfulImage({ alt, className, src, width }: Props) {
  if (!src) {
    return null;
  }

  return (
    <picture>
      {formats.map((format) => (
        <source key={format} srcSet={srcSet(src, { format, width })} type={`image/${format}`} />
      ))}
      <img alt={alt} className={className} height="auto" loading="lazy" src={src} width="100%" />
    </picture>
  );
}
