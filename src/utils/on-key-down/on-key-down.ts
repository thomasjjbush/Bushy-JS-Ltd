import type { KeyboardEvent } from 'react';

export function onKeyDown(cb: () => void, key = 'Enter') {
  return function (e: KeyboardEvent<HTMLElement>) {
    if (e.key === key) {
      cb();
    }
  };
}
