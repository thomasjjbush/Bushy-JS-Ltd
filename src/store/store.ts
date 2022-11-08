import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useNativeDispatch } from 'react-redux';

import { trackingMiddleware } from '@store/middleware/tracking';

import employmentReducer from '@store/slices/employment/slice';
import projectReducer from '@store/slices/project/slice';
import projectsReducer from '@store/slices/projects/slice';
import settingsReducer from '@store/slices/settings/slice';
import userReducer from '@store/slices/user/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(trackingMiddleware),
  reducer: {
    employment: employmentReducer,
    project: projectReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    user: userReducer,
  },
});

export const useDispatch: () => typeof store.dispatch = useNativeDispatch;
