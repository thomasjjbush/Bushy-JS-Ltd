import { useEffect } from 'react';

interface Options {
  condition?: boolean;
  key: string;
}

export function useKeyPress(cb: () => void, { condition = true, key }: Options): void {
  useEffect(() => {
    if (condition) {
      const handler = (e: KeyboardEvent): void => {
        if (e.key === key) {
          cb();
        }
      };

      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [condition, key]);
}
