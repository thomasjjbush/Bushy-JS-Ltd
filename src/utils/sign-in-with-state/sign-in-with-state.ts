import { Endpoints } from '@types';

/**
 * describes the action the user was performing when sign in was initiated
 * this is passed to the sign-in endpoint as query parameters
 */
type State = {
  slug: string;
} & (
  | {
      action: 'comment';
      comment: string;
    }
  | {
      action: 'like';
      fromProjectPage?: string;
    }
);

export function signInWithState(state: State) {
  const url = new URL(process.env.API_DOMAIN + Endpoints.SIGN_IN);
  if (state.action === 'comment') {
    url.searchParams.append('action', state.action);
    url.searchParams.append('comment', state.comment);
    url.searchParams.append('slug', state.slug);
  }

  if (state.action === 'like') {
    url.searchParams.append('action', state.action);
    url.searchParams.append('fromProjectPage', state.fromProjectPage || '0');
    url.searchParams.append('slug', state.slug);
  }

  window.location.href = url.toString();
}
