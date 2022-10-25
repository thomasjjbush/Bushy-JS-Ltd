import { ServiceError } from '@services/error/error';

import type { Endpoints } from '@types';

interface Options {
  body?: Record<string, unknown>;
  params?: {
    commentId?: string;
    content?: string;
    likeId?: string;
    slug?: string;
  };
  queries?: Record<string, string>;
}

class Api {
  private configureEndpoint = (endpoint: Endpoints, options?: Options): string => {
    return Object.entries(options?.params ?? {})
      .reduce((url: string, [key, value]) => url.replace(`:${key}`, value), endpoint)
      .concat(...(options?.queries ? ['?', new URLSearchParams(options.queries).toString()] : ['']));
  };

  private configureResponse = async (response: Response) => {
    const body = await response.json();
    if (response.status !== 200) {
      throw new ServiceError({
        message: body.message,
        status: body.status,
      });
    }
    return body;
  };

  public delete = <T>(endpoint: Endpoints, options?: Options): Promise<T> => {
    return fetch(process.env.API_DOMAIN + this.configureEndpoint(endpoint, options), {
      credentials: 'include',
      method: 'DELETE',
    }).then(this.configureResponse);
  };

  public get = <T>(endpoint: Endpoints, options?: Options): Promise<T> => {
    return fetch(process.env.API_DOMAIN + this.configureEndpoint(endpoint, options), {
      credentials: 'include',
      method: 'GET',
    }).then(this.configureResponse);
  };

  public post = <T>(endpoint: Endpoints, options?: Options): Promise<T> => {
    return fetch(process.env.API_DOMAIN + this.configureEndpoint(endpoint, options), {
      ...(options?.body && {
        body: JSON.stringify(options.body),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      }),
      credentials: 'include',
      method: 'POST',
    }).then(this.configureResponse);
  };
}
export { ServiceError };
export default new Api();
