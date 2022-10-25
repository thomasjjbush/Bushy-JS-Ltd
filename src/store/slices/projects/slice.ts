import { createSlice } from '@reduxjs/toolkit';

import * as actions from '@store/slices/projects/thunks';

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

const { reducer } = createSlice({
  extraReducers: (builder) => {
    builder.addCase(actions.getProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(actions.getProjects.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.projects = action.payload.projects;
      state.total = action.payload.total;
    });
    builder.addCase(actions.getMoreProjects.pending, (state) => {
      state.loadingMore = true;
    });
    builder.addCase(actions.getMoreProjects.rejected, (state) => {
      state.loadingMore = false;
    });
    builder.addCase(actions.getMoreProjects.fulfilled, (state, action) => {
      state.loadingMore = false;
      state.projects = [...(state.projects as Project[]), ...action.payload.projects];
    });
  },
  initialState,
  name: 'projects',
  reducers: {},
});

export default reducer;
