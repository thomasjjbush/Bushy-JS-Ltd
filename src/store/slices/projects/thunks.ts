import { createAsyncThunk } from '@reduxjs/toolkit';

import api, { ServiceError } from '@services/api';

import { Endpoints, Project, Rejected, Store } from '@types';

export const getMoreProjects = createAsyncThunk('projects/getMore', (_, { getState }) =>
  api.get<{ projects: Project[]; total: number }>(Endpoints.GET_PROJECTS, {
    queries: {
      locale: (getState() as Store).settings.locale,
      skip: ((getState() as Store).projects.projects?.length ?? 0).toString(),
    },
  }),
);

export const getProjects = createAsyncThunk<{ projects: Project[]; total: number }, void, { rejectValue: Rejected }>(
  'projects/get',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await api.get<{ projects: Project[]; total: number }>(Endpoints.GET_PROJECTS, {
        queries: { locale: (getState() as Store).settings.locale },
      });
      return res;
    } catch (e) {
      return rejectWithValue({ message: (e as ServiceError).message, status: (e as ServiceError).status });
    }
  },
);
