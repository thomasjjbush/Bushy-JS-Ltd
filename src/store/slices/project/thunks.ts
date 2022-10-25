import { createAsyncThunk } from '@reduxjs/toolkit';

import api, { ServiceError } from '@services/api';

import { Comment, Endpoints, Like, Project, Rejected, Store, User } from '@types';

export const addComment = createAsyncThunk<
  { comment: Comment },
  { _id: string; comment: string; slug: string },
  { pendingMeta: { user: User } }
>(
  'project/addComment',
  ({ _id, comment, slug }: { _id: string; comment: string; slug: string }) =>
    api.post<{ comment: Comment }>(Endpoints.POST_PROJECT_COMMENT, { body: { comment }, params: { slug } }),
  { getPendingMeta: (_, { getState }) => ({ user: (getState() as Store).user.user as User }) },
);

export const addLike = createAsyncThunk('project/addLike', (slug: string) =>
  api.post<{ like: Like }>(Endpoints.POST_PROJECT_LIKE, { params: { slug } }),
);

export const deleleComment = createAsyncThunk('project/deleteComment', ({ _id, slug }: { _id: string; slug: string }) =>
  api.delete<{ message: string }>(Endpoints.DELETE_PROJECT_COMMENT, { params: { commentId: _id, slug } }),
);

export const deletelLike = createAsyncThunk(
  'project/deletelLike',
  ({ userId, slug }: { slug: string; userId: string }) =>
    api.delete<{ message: string }>(Endpoints.DELETE_PROJECT_LIKE, { params: { slug } }),
);

export const getMoreComments = createAsyncThunk(
  'project/getMoreComments',
  ({ slug, skip }: { skip: number; slug: string }) =>
    api.get<{ comments: Comment[]; skipped: number }>(Endpoints.GET_MORE, {
      params: { content: 'comments', slug },
      queries: { skip: skip.toString() },
    }),
);

export const getMoreLikes = createAsyncThunk('project/getMoreLikes', ({ slug, skip }: { skip: number; slug: string }) =>
  api.get<{ likes: Like[]; skipped: number }>(Endpoints.GET_MORE, {
    params: { content: 'likes', slug },
    queries: { skip: skip.toString() },
  }),
);

export const getProject = createAsyncThunk<{ project: Project }, string, { rejectValue: Rejected }>(
  'project/getProject',
  async (slug: string, { getState, rejectWithValue }) => {
    try {
      const res = await api.get<{ project: Project }>(Endpoints.GET_PROJECT, {
        params: { slug },
        queries: { locale: (getState() as Store).settings.locale },
      });
      return res;
    } catch (e) {
      return rejectWithValue({ message: (e as ServiceError).message, status: (e as ServiceError).status });
    }
  },
);

export const getRelatedProjects = createAsyncThunk(
  'project/getRelatedProjects',
  async ({ client, slug, tag }: { client: string; slug: string; tag: string }, { getState }) =>
    api.get<{ sameClient: Project[]; sameTag: Project[] }>(Endpoints.GET_RELATED_PROJECTS, {
      params: { slug: slug },
      queries: {
        client: client,
        locale: (getState() as Store).settings.locale,
        tag: tag,
      },
    }),
);
