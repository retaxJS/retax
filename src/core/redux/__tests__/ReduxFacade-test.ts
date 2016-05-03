(<any>jest).disableAutomock();

import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';

import ReduxFacade from '../ReduxFacade';

describe('ReduxFacade Flow', () => {
  const context = {
    history: browserHistory,
  };

  const cookieProxy = {
    authToken: '1234',
  };

  const configStore = {
    config: {
      store: {
        middlewares: [],

        reducers: {},
        storeEnhancers: [],
      },
    },
  };

  it('throws an error when the store is undefined', () => {
    const facade = new ReduxFacade(
      <any>configStore,
      <any>cookieProxy,
      <any>context
    );

    expect(() => facade.store).toThrow();
  });

  it('initializes the store and retrieve the auth token', () => {
    const facade = new ReduxFacade(
      <any>configStore,
      <any>cookieProxy,
      <any>context
    );

    const store = facade.initialize({});

    expect(facade.store).toEqual(store);
    expect(facade.getAuthToken()).toEqual('1234');
  });

  it('initializes the store with an initiale state', () => {
    const facade = new ReduxFacade(
      <any>configStore,
      <any>cookieProxy,
      <any>context
    );

    facade.initialize({
      retax: fromJS({ here: true }),
    });

    expect(facade.store.getState().retax.toJS()).toEqual({
      authToken: '1234',
      here: true,
    });
  });

  it('set the auth token', () => {
    const facade = new ReduxFacade(
      <any>configStore,
      <any>cookieProxy,
      <any>context
    );

    facade.initialize({});
    facade.setAuthToken('4321');
    expect(facade.getAuthToken()).toEqual('4321');
  });
});
