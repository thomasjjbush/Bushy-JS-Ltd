import { useEffect } from 'react';

const focusableSelector = [
  'a[href]:not([disabled])',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input[type="text"]:not([disabled])',
  'input[type="radio"]:not([disabled])',
  'input[type="checkbox"]:not([disabled])',
  'select:not([disabled])',
].join(',');

interface Options {
  condition?: boolean;
  selector: string;
}

export function useFocusTrap({ condition = true, selector }: Options) {
  useEffect(() => {
    if (condition) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const container = document.querySelector(selector);

          if (container) {
            const focusable = container.querySelectorAll(focusableSelector);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              return (last as HTMLElement).focus();
            }

            if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              return (first as HTMLElement).focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [condition, selector]);
}
