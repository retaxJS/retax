jest.unmock('inversify');
jest.unmock('../DomCookieProxy');
jest.unmock('../CookieProxy');

import DomCookieProxy from '../DomCookieProxy';
import * as Cookie from 'js-cookie';

describe('DomCookieProxy', () => {
  const configStore = {
    config: {
      COOKIE_AUTH_TOKEN_KEY: 'auth_token',
      INITIAL_STATE_KEY: '__INITIAL_STATE__',
    },
  };

  it('reads the current auth token', () => {
    const cookieProxy = new DomCookieProxy(<any>configStore);

    /* tslint:disable */
    const { authToken } = cookieProxy;
    /* tslint:enable */

    expect(Cookie.get).toBeCalledWith(
      configStore.config.COOKIE_AUTH_TOKEN_KEY
    );
  });

  it('set the auth token', () => {
    const cookieProxy = new DomCookieProxy(<any>configStore);

    cookieProxy.authToken = '1234';

    expect(Cookie.set).toBeCalledWith(
      configStore.config.COOKIE_AUTH_TOKEN_KEY,
      '1234',
      { expires: 1 }
    );
  });

  it('removes the auth token', () => {
    const cookieProxy = new DomCookieProxy(<any>configStore);

    cookieProxy.deleteAuthToken();

    expect(Cookie.remove).toBeCalledWith(
      configStore.config.COOKIE_AUTH_TOKEN_KEY
    );
  });
});

