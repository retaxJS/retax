jest.unmock('inversify');
jest.unmock('../ServerBootstrapper');

import ServerBootstrapper from '../ServerBootstrapper';

describe('ServerBootstrapper Flow', () => {
  const configStore = {
    config: undefined,
  };

  const middlewareFactory = {
    create: jest.fn(() => ({ theMiddleware: true })),
  };

  it('set the server configuration', () => {
    const bootstrapper = new ServerBootstrapper(
      <any>configStore,
      <any>middlewareFactory
    );

    bootstrapper.config(<any>{
      thisConfig: true,
    });

    expect((<any>bootstrapper)._configStore).toEqual({
      config: {
        thisConfig: true,
      },
    });
  });

  it('create the express middleware', () => {
    const bootstrapper = new ServerBootstrapper(
      <any>configStore,
      <any>middlewareFactory
    );

    const middleware = bootstrapper.bootstrap();

    expect(middlewareFactory.create).toBeCalled();
    expect(middleware).toEqual({ theMiddleware: true });
  });
});
