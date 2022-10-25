import { createAsyncThunk } from '@reduxjs/toolkit';

import api, { ServiceError } from '@services/api';

import { Employment, Endpoints, Rejected, Store } from '@types';

export const getEmployment = createAsyncThunk<{ employment: Employment[] }, void, { rejectValue: Rejected }>(
  'employment/get',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await api.get<{ employment: Employment[] }>(Endpoints.GET_EMPLOYMENT, {
        queries: { locale: (getState() as Store).settings.locale },
      });
      return res;
    } catch (e) {
      return rejectWithValue({ message: (e as ServiceError).message, status: (e as ServiceError).status });
    }
  },
);
