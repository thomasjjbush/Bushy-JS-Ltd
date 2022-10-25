import type { Project, Store } from '@types';

export function selectProject(state: Store) {
  const { comments, commentCount, likes, likeCount, ...project } = state.project.project ?? {};

  return {
    error: state.project.error,
    loading: state.project.loading,
    project: Object.keys(project).length ? (project as Project) : null,
  };
}

export function selectComments(state: Store) {
  return state.project.project?.comments;
}

export function selectCommentCount(state: Store) {
  return state.project.project?.commentCount ?? 0;
}

export function selectLikes(state: Store) {
  return state.project.project?.likes ?? [];
}

export function selectLikeCount(state: Store) {
  return state.project.project?.likeCount ?? 0;
}

export function selectHasLiked(state: Store) {
  return state.project.project?.hasLiked ?? false;
}

export function selectRelated(state: Store) {
  return state.project.related;
}
