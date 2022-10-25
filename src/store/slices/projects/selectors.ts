import type { Store } from '@types';

export function selectProjects(state: Store) {
  return state.projects;
}
