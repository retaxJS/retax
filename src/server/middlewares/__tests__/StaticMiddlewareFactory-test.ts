(<any>jest).disableAutomock();

import StaticMiddlewareFactory from '../StaticMiddlewareFactory';

describe('StaticMiddlewareFactory', () => {
  // serverConfigStore mock
  const serverConfigStore = {
    config: {
      isomorphicTools: {
        assets: jest.fn(() => ({
          javascript: {
            'bundle': '/bundle.js',
            'vendor': '/vendor.js',
          },
        })),
      },
    },
  };

  // internalConfigStore mock
  const internalConfigStore = {
    config: {
      INITIAL_STATE_KEY: '__INITIAL_STATE__',
    },
  };

  it('creates a middleware and respond to a request', () => {
    const factory = new StaticMiddlewareFactory(
      <any>serverConfigStore,
      <any>internalConfigStore
    );
    const middleware = factory.create();

    // express mock
    const send = jest.fn();
    const res = {
      send,
    };
    const next = jest.fn();
    const assets = serverConfigStore.config.isomorphicTools.assets();

    middleware(undefined, <any>res, <any>next);

    expect(send).toBeCalledWith(`
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
            window.${internalConfigStore.config.INITIAL_STATE_KEY} = ${JSON.stringify({})};
          </script>
          ${
            Object.keys(assets.javascript).map((scriptName: string, i: number) => (
              `<script src="${assets.javascript[scriptName]}" defer></script>`
            )).join('')
          }
        </body>
      </html>
    `);
  });

  it('creates a middleware and handle error', () => {
    const factory = new StaticMiddlewareFactory(
      <any>serverConfigStore,
      <any>undefined
    );
    const middleware = factory.create();

    // express mock
    const send = jest.fn();
    const status = jest.fn(() => ({
      send,
    }));
    const res = {
      status,
    };
    const next = jest.fn();

    middleware(undefined, <any>res, <any>next);
    expect(next).toBeCalled();
  });
});
