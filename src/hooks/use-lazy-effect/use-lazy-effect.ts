import { useEffect } from 'react';

interface Options {
  condition?: boolean;
  dependancies?: unknown[];
  root?: string;
}

export function useLazyEffect(
  id: string,
  cb: () => unknown,
  { condition = true, dependancies = [], root = '' }: Options = {},
): void {
  useEffect(() => {
    const target = document.getElementById(id);

    if (condition && target) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          for (const { isIntersecting, intersectionRatio } of entries) {
            if (isIntersecting && intersectionRatio) {
              cb();
              observer.disconnect();
            }
          }
        },
        { root: document.getElementById(root), threshold: 0.1 },
      );
      observer.observe(target);

      return () => observer.disconnect();
    }
  }, [condition, id, ...dependancies]);
}
