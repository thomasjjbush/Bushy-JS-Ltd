import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '@services/api';

import { Endpoints, User } from '@types';

export const signIn = createAsyncThunk<{ user: User }>('user/signIn', () =>
  api.get(Endpoints.SIGN_IN, { queries: { persist: JSON.stringify(true) } }),
);

export const signOut = createAsyncThunk('user/signOut', () => api.get(Endpoints.SIGN_OUT));
