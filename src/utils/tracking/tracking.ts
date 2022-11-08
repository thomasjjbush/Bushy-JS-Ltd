import mixpanel from 'mixpanel-browser';

import { store } from '@store/store';

import { User } from '@types';

export enum TrackingEvents {
  ADD_COMMENT = 'Add comment',
  ADD_LIKE = 'Add like',
  CLICK = 'Click',
  CONTACT = 'Contact form',
  DELETE_COMMENT = 'Delete comment',
  DELETE_LIKE = 'Delete like',
  SET_LOCALE = 'Set locale',
  SET_THEME = 'Set theme',
  SIGN_IN = 'Sign in',
  SIGN_OUT = 'Sign out',
  WATCH_VIDEO = 'Watch video',
}

class Tracking {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      mixpanel.init(process.env.MIXPANEL as string);
    }
  }

  identify = (id: string) => {
    mixpanel.identify(id);
  };

  track = (event: TrackingEvents, data: { [key: string]: unknown; user?: User | null }) => {
    if (process.env.NODE_ENV === 'production') {
      const { user = store.getState().user.user, ...properties } = data;

      mixpanel.track(event, {
        ...properties,
        ...(user && {
          // eslint-disable-next-line camelcase
          $distinct_id: user._id,
          $email: user.email,
          $name: user.name,
        }),
      });
    }
  };
}

export default new Tracking();
