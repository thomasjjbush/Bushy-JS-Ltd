import { useEffect, useState } from 'react';

enum Thresholds {
  FOUR_WEEKS = 2419200,
  NOW = 0,
  ONE_DAY = 86400,
  ONE_HOUR = 3600,
  ONE_MINUTE = 60,
  ONE_WEEK = 604800,
  ONE_YEAR = 29030400,
  TWO_DAYS = 172800,
  TWO_HOURS = 7200,
  TWO_MINUTES = 120,
  TWO_WEEKS = 1209600,
}

function generateInterval(date: string): number {
  const then = new Date(date);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / 1000);
}

function generateFormattedDate(interval: number, date: string): string {
  switch (true) {
    case interval === Thresholds.NOW:
      return 'Just now';
    case interval < Thresholds.ONE_MINUTE:
      return `${interval} seconds ago`;
    case interval < Thresholds.TWO_MINUTES:
      return '1 minute ago';
    case interval < Thresholds.ONE_HOUR:
      return `${Math.floor(interval / Thresholds.ONE_MINUTE)} minutes ago`;
    case interval < Thresholds.TWO_HOURS:
      return '1 Hour ago';
    case interval < Thresholds.ONE_DAY:
      return `${Math.floor(interval / Thresholds.ONE_HOUR)} hours ago`;
    case interval < Thresholds.TWO_DAYS:
      return 'Yesterday';
    case interval < Thresholds.ONE_WEEK:
      return `${Math.floor(interval / Thresholds.ONE_DAY)} days ago`;
    case interval < Thresholds.TWO_WEEKS:
      return 'Last week';
    case interval < Thresholds.FOUR_WEEKS:
      return `${Math.floor(interval / Thresholds.ONE_WEEK)} weeks ago`;
    default: {
      const monthNow = new Date().getMonth();
      const yearNow = new Date().getFullYear();

      const monthThen = new Date(date).getMonth();
      const yearThen = new Date(date).getFullYear();

      const monthsAgo = monthNow - monthThen + 12 * (yearNow - yearThen);

      if (monthsAgo < 12) {
        if (!monthsAgo) {
          return 'This month';
        }
        if (monthsAgo === 1) {
          return 'Last month';
        }
        return `${monthsAgo} months ago`;
      }

      return `${Math.floor(interval / Thresholds.ONE_YEAR)} years ago`;
    }
  }
}

function generateMs(interval: number): number {
  switch (true) {
    case interval < 60:
      return 1000;
    case interval < 7200:
      return 1000 * 60;
    default:
      return 1000 * 60 * 60;
  }
}

export function useFormattedDate(date: string) {
  const [interval, setInterval] = useState(() => generateInterval(date));

  useEffect(() => {
    if (interval < Thresholds.ONE_DAY) {
      const timeout = setTimeout(() => setInterval(generateInterval(date)), generateMs(interval));

      return () => clearTimeout(timeout);
    }
  }, [interval]);

  return generateFormattedDate(interval, date);
}
