import React from 'react';
import dateformat from 'dateformat';

import { useFormattedDate } from '@hooks/use-formatted-date/use-formatted-date';

interface Props {
  className?: string;
  date: string;
}

export function Date({ className, date }: Props) {
  const formattedDate = useFormattedDate(date);
  return (
    <p className={className} title={dateformat(date, 'dd mmmm yyyy')}>
      {formattedDate}
    </p>
  );
}
