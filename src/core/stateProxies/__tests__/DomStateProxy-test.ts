jest.unmock('inversify');
jest.unmock('../DomStateProxy');

import DomStateProxy from '../DomStateProxy';

describe('DomStateProxy', () => {
  const internalConfigStore = {
    config: {
      COOKIE_AUTH_TOKEN_KEY: 'auth_token',
      INITIAL_STATE_KEY: '__INITIAL_STATE__',
    },
  };

  const retaxConfigStore = {
    config: {
       store: {
        nonImmutableKeys: ['routing'],
      },
    },
  };

  it('reads the initial state and convert it to an immutable object', () => {
    const proxy = new DomStateProxy(<any>retaxConfigStore, <any>internalConfigStore);

    window[internalConfigStore.config.INITIAL_STATE_KEY] = {
      app: {
        here: true,
      },
    };

    proxy.read();

    expect(proxy.convertStateToImmutable)
      .toBeCalledWith({
        app: {
          here: true,
        },
      }, [
          'routing',
      ]);

  });
});
