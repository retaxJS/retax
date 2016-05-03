jest.unmock('inversify');
jest.unmock('../RequestCookieProxy');
jest.unmock('../CookieProxy');

import RequestCookieProxy from '../RequestCookieProxy';

describe('RequestCookieProxy', () => {
  const configStore = {
    config: {
      COOKIE_AUTH_TOKEN_KEY: 'auth_token',
      INITIAL_STATE_KEY: '__INITIAL_STATE__',
    },
  };
  const context = {
    request: {
      req: {
        cookies: {
          [configStore.config.COOKIE_AUTH_TOKEN_KEY]: '1234',
        },
      },
      res: {
        cookie: jest.fn(),
      },
    },
  };

  it('reads the current auth token', () => {
    const cookieProxy = new RequestCookieProxy(<any>configStore, <any>context);

    /* tslint:disable */
    const { authToken } = cookieProxy;
    /* tslint:enable */

    expect(context.request.req.cookies[configStore.config.COOKIE_AUTH_TOKEN_KEY])
      .toEqual('1234');
  });

  it('set the auth token', () => {
    const cookieProxy = new RequestCookieProxy(<any>configStore, <any>context);

    cookieProxy.authToken = '1234';

    expect(context.request.res.cookie).toBeCalledWith(
      configStore.config.COOKIE_AUTH_TOKEN_KEY,
      '1234'
    );
  });

  it('removes the auth token', () => {
    const cookieProxy = new RequestCookieProxy(<any>configStore, <any>context);

    cookieProxy.deleteAuthToken();

    expect(context.request.res.cookie).toBeCalledWith(
      configStore.config.COOKIE_AUTH_TOKEN_KEY,
      undefined
    );
  });
});

