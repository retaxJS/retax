(jest as any).disableAutomock();

jest.mock('react-helmet');

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { Kernel } from 'inversify';
import { diModule } from '../../di';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { IServerBootstrapper } from '../bootstrap';
import { serverModule, middlewareFactoryModuleFactory, SERVER_BOOTSTRAPPER } from '../inversify';

describe('Retax Server', () => {

  const About = connect(state => {
    return {
      counter: state.counter,
    };
  })(
    (props) => <div>Hello About! {`TheCounterValue${props.counter}`}</div>
  );

  function counterReducer(state: number = 0, action: any): number {
    switch (action.type) {
      case 'INC':
        return state + 1;
      default:
        return state;
    }
  }

  const retaxConfig = {
    lifecycle: undefined,
    react: {
      appendChild: undefined,
    },
    router: {
      static: (
        <Route path="/">
          <Route path="about" component={About}/>
        </Route>
      ),
    },
    store: {
      reducers: {
        counter: counterReducer,
      },
    },
  };

  const serverConfig = {
    isomorphicTools: {
      assets: jest.fn(() => ({
        javascript: {
          'bundle': '/bundle.js',
          'vendor': '/vendor.js',
        },
      })),
    },
    retaxConfig,
    serverRendering: undefined,
  };

  pit('bootstraps a retax on server without server rendering', async () => {
    const kernel = new Kernel();
    kernel.load(diModule, serverModule, middlewareFactoryModuleFactory(false));
    const bootstrapper = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);

    bootstrapper.config(serverConfig as any);
    const middleware = bootstrapper.bootstrap();

    // express mock
    const send = jest.fn();
    const req = {
      originalUrl: '/home',
    };
    const res = {
      send,
    };
    const next = jest.fn();

    middleware(req as any, res as any, next as any);

    expect(res.send).toBeCalledWith(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>RetaxTest</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </head>
        <body class="fullbleed layout vertical">
          <div id="root" class="flex layout vertical">
            Loading...
          </div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify({})};
          </script>
          <script src="/bundle.js" defer></script><script src="/vendor.js" defer></script>
        </body>
      </html>
    `);
  });

  pit('bootstraps a retax on server with server rendering', async () => {
    const kernel = new Kernel();
    kernel.load(diModule, serverModule, middlewareFactoryModuleFactory(true));
    const bootstrapper = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);

    bootstrapper.config(serverConfig as any);
    const middleware = bootstrapper.bootstrap();

    // express mock
    const send = jest.fn();
    const req = {
      cookies: jest.fn(() => '1234'),
      originalUrl: '/about',
    };
    const res = {
      send,
    };
    const next = jest.fn();

    await middleware(req as any, res as any, next as any);

    expect(res.send.mock.calls[0][0]).toContain('Hello About!');
    expect(res.send.mock.calls[0][0]).toContain('TheCounterValue0');
  });
});
