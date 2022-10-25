import { createSlice } from '@reduxjs/toolkit';

import * as actions from '@store/slices/user/thunks';

import { User } from '@types';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

const { reducer } = createSlice({
  extraReducers: (builder) => {
    builder.addCase(actions.signIn.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.user = {
          ...action.payload.user,
          color: `hsla(${~~(360 * Math.random())}, 70%, 80%, 1)`,
        };
      }
    });
    builder.addCase(actions.signOut.fulfilled, (state) => {
      state.user = null;
    });
  },
  initialState,
  name: 'user',
  reducers: {},
});

export default reducer;
