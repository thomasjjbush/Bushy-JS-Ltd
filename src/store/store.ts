import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useNativeDispatch } from 'react-redux';

import employmentReducer from '@store/slices/employment/slice';
import projectReducer from '@store/slices/project/slice';
import projectsReducer from '@store/slices/projects/slice';
import settingsReducer from '@store/slices/settings/slice';
import userReducer from '@store/slices/user/slice';

import { User } from '@types';

export const store = configureStore({
  reducer: {
    employment: employmentReducer,
    project: projectReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    user: userReducer,
  },
});

export const useDispatch: () => typeof store.dispatch = useNativeDispatch;
