(<any>jest).disableAutomock();

import { createMemoryHistory } from 'react-router';
import configureStore from 'redux-mock-store';

import ReactRouterFacade from '../ReactRouterFacade';

describe('ReactRouterFacade', () => {
  const history = createMemoryHistory();
  const context = {
    history: history,
  };

  const reduxFacade = {
    store: configureStore()({}),
  };

  const configStore = {
    evaluateConfig: jest.fn(() => ({
      router: {
        static: {
          childRoutes: [
            { path: 'home' },
            {
              path: 'redirect',
              onEnter(nextState: any, replace: any): any {
                replace('/home');
              },
            },
          ],
          path: '/',
        },
      },
    })),
  };

  it('throws when render props are not yet computed', () => {
    const routerFacade = new ReactRouterFacade(
      <any>context,
      <any>reduxFacade,
      <any>configStore
    );

    expect(() => routerFacade.renderProps).toThrow();
  });

  pit('initialize the facade', async () => {
    history.replace('/home');

    const routerFacade = new ReactRouterFacade(
      <any>context,
      <any>reduxFacade,
      <any>configStore
    );

    const renderProps = await routerFacade.initialize();

    expect(renderProps).toBeTruthy();
    expect(renderProps.location.pathname).toEqual('/home');
    expect(routerFacade.renderProps).toEqual(renderProps);
  });

  pit('redirect to another route', async () => {
    history.replace('/redirect');

    const routerFacade = new ReactRouterFacade(
      <any>context,
      <any>reduxFacade,
      <any>configStore
    );

    const renderProps = await routerFacade.resolveRoute();

    expect(renderProps).toBeTruthy();
    expect(renderProps.location.pathname).toEqual('/home');
  });

  pit('throws an error when nothing match', async () => {
    history.replace('/error');

    const routerFacade = new ReactRouterFacade(
      <any>context,
      <any>reduxFacade,
      <any>configStore
    );

    let error;

    try {
      await routerFacade.resolveRoute();
    } catch (e) {
      error = e;
    } finally {
      expect(error.message).toEqual('Error in react-router, too much try');
    }
  });
});
