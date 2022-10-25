import { useEffect } from 'react';

interface Options {
  condition?: boolean;
  selector: string;
}

export function useOuterClick(cb: () => void, { condition = true, selector }: Options): void {
  useEffect(() => {
    if (condition) {
      const handler = (e: Event): void => {
        if (!(e.target as Element).closest(selector)) {
          cb();
        }
      };

      document.addEventListener('click', handler);
      return () => document.removeEventListener('click', handler);
    }
  }, [condition, selector]);
}
