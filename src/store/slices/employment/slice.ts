import { createSlice } from '@reduxjs/toolkit';

import * as actions from '@store/slices/employment/thunks';

import type { Employment, Rejected } from '@types';

interface State {
  employment?: Employment[];
  error?: Rejected | false;
  loading: boolean;
}

const initialState: State = {
  error: false,
  loading: window.location.pathname === '/',
};

const { reducer } = createSlice({
  extraReducers: (builder) => {
    builder.addCase(actions.getEmployment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getEmployment.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(actions.getEmployment.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.employment = action.payload.employment;
    });
  },
  initialState,
  name: 'employment',
  reducers: {},
});

export default reducer;
