import type { Store } from '@types';

export function selectEmployment(state: Store) {
  return state.employment;
}
