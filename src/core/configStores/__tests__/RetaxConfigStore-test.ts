(jest as any).disableAutomock();

import RetaxConfigStore from '../RetaxConfigStore';

describe('RetaxConfigStore', () => {
  class Consumer extends RetaxConfigStore {
    public evaluateConfig(store: any): any {
      return store;
    }
  }

  it('defines the initial config', () => {
    const store = new Consumer({
      router: {
        dynamic: undefined,
      },
    });

    expect(store.config).toEqual({
      api: {
        authHeaderName: 'auth_token',
        baseUrl: '',
      },
      client: {
        keepInitialState: false,
      },
      lifecycle: undefined,
      react: {},
      router: {
        dynamic: undefined,
        static: {},
      },
      store: {
        initialState: {},
        middlewares: [],
        nonImmutableKeys: ['routing'],
        reducers: undefined,
        storeEnhancers: [],
      },
    });
  });
});
