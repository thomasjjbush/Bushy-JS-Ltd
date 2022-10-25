import { useEffect } from 'react';

export function useFixScroll(condition = true) {
  useEffect(() => {
    if (condition) {
      const scrollY = window.scrollY;

      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';

      return () => {
        document.body.style.top = `unset`;
        document.body.style.position = 'relative';
        document.body.style.height = 'auto';
        document.body.style.overflow = 'auto';
        document.documentElement.style.height = 'auto';
        window.scrollTo(0, scrollY);
      };
    }
  }, [condition]);
}
