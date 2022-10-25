import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { signIn } from '@store/slices/user/thunks';
import { store } from '@store/store';

import Navigation from './views/nav';

import './styles/global.scss';

store.dispatch(signIn());

const routes = [
  { component: lazy(() => import(/* webpackChunkName: "project" */ './views/project')), path: '/project/:slug' },
  { component: lazy(() => import(/* webpackChunkName: "home" */ './views/home')), path: '/' },
];

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          {routes.map(({ component: Component, path }) => (
            <Route element={<Component />} key={path} path={path} />
          ))}
        </Routes>
      </Suspense>
      <Navigation />
    </BrowserRouter>
  </Provider>,
);
