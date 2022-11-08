import { Middleware } from '@reduxjs/toolkit';
import tracking, { TrackingEvents } from '@utils/tracking/tracking';

enum Actions {
  ADD_COMMENT = 'project/addComment/fulfilled',
  ADD_LIKE = 'project/addLike/fulfilled',
  DELETE_COMMENT = 'project/deleteComment/fulfilled',
  DELETE_LIKE = 'project/deletelLike/fulfilled',
  SET_LOCALE = 'settings/setLocale',
  SET_THEME = 'settings/setTheme',
  SIGN_IN = 'user/signIn/fulfilled',
  SIGN_OUT = 'user/signOut/fulfilled',
}

const eventMap = {
  [Actions.ADD_COMMENT]: TrackingEvents.ADD_COMMENT,
  [Actions.ADD_LIKE]: TrackingEvents.ADD_LIKE,
  [Actions.DELETE_COMMENT]: TrackingEvents.DELETE_COMMENT,
  [Actions.DELETE_LIKE]: TrackingEvents.DELETE_LIKE,
  [Actions.SET_LOCALE]: TrackingEvents.SET_LOCALE,
  [Actions.SET_THEME]: TrackingEvents.SET_THEME,
  [Actions.SIGN_IN]: TrackingEvents.SIGN_IN,
  [Actions.SIGN_OUT]: TrackingEvents.SIGN_OUT,
};

export const trackingMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (Object.values(Actions).includes(action.type)) {
      switch (action.type) {
        case Actions.SIGN_IN: {
          if (action.payload.user) {
            tracking.identify(action.payload.user._id);
          }
          break;
        }
        case Actions.SET_LOCALE:
        case Actions.SET_THEME: {
          const user = getState().user.user;

          tracking.track(eventMap[action.type as Actions], {
            value: action.payload,
            ...(user && { user }),
          });
          break;
        }
        default: {
          const project = action.meta.arg?.slug ?? action.meta.arg;

          tracking.track(eventMap[action.type as Actions], {
            user: getState().user.user,
            ...(project && { project }),
          });
        }
      }
    }

    return next(action);
  };
