import { createSlice } from '@reduxjs/toolkit';

import * as thunkActions from '@store/slices/project/thunks';

import type { Comment, Like, Project, Rejected, User } from '@types';

interface State {
  error?: Rejected | false;
  loading: boolean;
  loadingMoreComments: boolean;
  loadingMoreLikes: boolean;
  project?: Project;
  related: {
    sameClient: Project[];
    sameTag: Project[];
  };
}

const initialState: State = {
  error: false,
  loading: window.location.pathname.includes('/project/'),
  loadingMoreComments: false,
  loadingMoreLikes: false,
  related: {
    sameClient: [],
    sameTag: [],
  },
};

function getIndex(items: (Comment | Like)[], id: string): number {
  return items.findIndex(({ _id }) => _id === id);
}

const { actions, reducer } = createSlice({
  extraReducers: (builder) => {
    builder.addCase(thunkActions.getProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(thunkActions.getProject.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(thunkActions.getProject.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.project = action.payload.project;
      state.related = {
        sameClient: [],
        sameTag: [],
      };
    });
    builder.addCase(thunkActions.getMoreComments.pending, (state) => {
      state.loadingMoreComments = true;
    });
    builder.addCase(thunkActions.getMoreComments.fulfilled, (state, action) => {
      state.loadingMoreComments = false;
      state.project?.comments?.push(...action.payload.comments);
    });
    builder.addCase(thunkActions.getMoreLikes.pending, (state) => {
      state.loadingMoreLikes = true;
    });
    builder.addCase(thunkActions.getMoreLikes.fulfilled, (state, action) => {
      state.loadingMoreLikes = false;
      state.project?.likes?.push(...action.payload.likes);
    });
    builder.addCase(thunkActions.addComment.pending, (state, action) => {
      if (state.project) {
        const index = getIndex(state.project.comments, action.meta.arg._id);
        if (index >= 0) {
          state.project.comments[index] = {
            ...state.project.comments[index],
            state: 'loading',
          };
        } else {
          state.project.comments.unshift({
            _id: action.meta.arg._id as string,
            author: action.meta.user as User,
            comment: action.meta.arg.comment,
            date: new Date().toISOString(),
            project: action.meta.arg.slug,
            state: 'loading',
          });
        }
      }
    });
    builder.addCase(thunkActions.addComment.fulfilled, (state, action) => {
      if (state.project) {
        const index = getIndex(state.project.comments, action.meta.arg._id);
        state.project.comments[index] = action.payload.comment;
        state.project.commentCount = state.project.commentCount + 1;
      }
    });
    builder.addCase(thunkActions.addComment.rejected, (state, action) => {
      if (state.project) {
        const index = getIndex(state.project.comments, action.meta.arg._id);
        state.project.comments[index] = { ...state.project.comments[index], state: 'insert-error' };
      }
    });
    builder.addCase(thunkActions.deleleComment.pending, (state, action) => {
      if (state.project) {
        const index = getIndex(state.project.comments, action.meta.arg._id);
        state.project.comments[index] = { ...state.project.comments[index], state: 'loading' };
      }
    });
    builder.addCase(thunkActions.deleleComment.fulfilled, (state, action) => {
      if (state.project) {
        state.project.comments = state.project.comments.filter(({ _id }) => _id !== action.meta.arg._id);
        state.project.commentCount = state.project.commentCount - 1;
      }
    });
    builder.addCase(thunkActions.deleleComment.rejected, (state, action) => {
      if (state.project) {
        const index = getIndex(state.project.comments, action.meta.arg._id);
        state.project.comments[index] = { ...state.project.comments[index], state: 'delete-error' };
      }
    });
    builder.addCase(thunkActions.addLike.pending, (state) => {
      if (state.project) {
        state.project.hasLiked = true;
        state.project.likeCount = state.project.likeCount + 1;
      }
    });
    builder.addCase(thunkActions.addLike.fulfilled, (state, action) => {
      if (state.project) {
        state.project.likes.unshift(action.payload.like);
      }
    });
    builder.addCase(thunkActions.addLike.rejected, (state) => {
      if (state.project) {
        state.project.hasLiked = false;
        state.project.likeCount = state.project.likeCount - 1;
      }
    });

    builder.addCase(thunkActions.deletelLike.pending, (state) => {
      if (state.project) {
        state.project.hasLiked = false;
        state.project.likeCount = state.project.likeCount - 1;
      }
    });
    builder.addCase(thunkActions.deletelLike.fulfilled, (state, action) => {
      if (state.project) {
        state.project.likes = state.project.likes.filter(({ author }) => author._id !== action.meta.arg.userId);
      }
    });
    builder.addCase(thunkActions.deletelLike.rejected, (state) => {
      if (state.project) {
        state.project.hasLiked = true;
        state.project.likeCount = state.project.likeCount + 1;
      }
    });
    builder.addCase(thunkActions.getRelatedProjects.fulfilled, (state, action) => {
      state.related = action.payload;
    });
  },
  initialState,
  name: 'project',
  reducers: {
    deleteCommentEvent(state, { payload }) {
      if (state.project) {
        state.project.commentCount = state.project.commentCount - 1;

        if (state.project.comments.some(({ _id }) => _id === payload._id)) {
          state.project.comments = state.project.comments.filter(({ _id }) => _id !== payload._id);
        }
      }
    },
    deleteLikeEvent(state, { payload }) {
      if (state.project) {
        state.project.likeCount = state.project.likeCount - 1;

        if (state.project.likes.some(({ _id }) => _id === payload._id)) {
          state.project.likes = state.project.likes.filter(({ _id }) => _id !== payload._id);
        }
      }
    },
    newCommentEvent(state, { payload }) {
      if (state.project) {
        state.project.comments.unshift(payload);
        state.project.commentCount = state.project.commentCount + 1;
      }
    },
    newLikeEvent(state, { payload }) {
      if (state.project) {
        state.project.likes.unshift(payload);
        state.project.likeCount = state.project.likeCount + 1;
      }
    },
  },
});

export { actions };
export default reducer;
