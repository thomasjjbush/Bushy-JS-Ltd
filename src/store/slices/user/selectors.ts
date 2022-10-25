import type { Store } from '@types';

export function selectUser(state: Store) {
  return state.user.user;
}
