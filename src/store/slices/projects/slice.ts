import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as thunkActions from '@store/slices/projects/thunks';

import type { Project, Rejected } from '@types';

interface State {
  error?: Rejected | false;
  loading: boolean;
  loadingMore: boolean;
  projects?: Project[];
  total: number;
}

const initialState: State = {
  error: false,
  loading: window.location.pathname === '/',
  loadingMore: false,
  total: 0,
};

const { actions, reducer } = createSlice({
  extraReducers: (builder) => {
    builder.addCase(thunkActions.getProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(thunkActions.getProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(thunkActions.getProjects.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.projects = action.payload.projects;
      state.total = action.payload.total;
    });
    builder.addCase(thunkActions.getMoreProjects.pending, (state) => {
      state.loadingMore = true;
    });
    builder.addCase(thunkActions.getMoreProjects.rejected, (state) => {
      state.loadingMore = false;
    });
    builder.addCase(thunkActions.getMoreProjects.fulfilled, (state, action) => {
      state.loadingMore = false;
      state.projects = [...(state.projects as Project[]), ...action.payload.projects];
    });
  },
  initialState,
  name: 'projects',
  reducers: {
    like(state, action: PayloadAction<{ slug: string }>) {
      const projectIndex = state.projects?.findIndex((project) => project.slug === action.payload.slug) ?? -1;
      const project = state.projects?.[projectIndex];
      if (project) {
        project.likeCount += project.hasLiked ? -1 : 1;
        project.hasLiked = !project.hasLiked;
      }
    },
  },
});

export { actions };
export default reducer;
