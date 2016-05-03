(jest as any).disableAutomock();

jest.mock('react-dom/server');

import RenderingMiddlewareFactory from '../RenderingMiddlewareFactory';

describe('RenderingMiddlewareFactory Flow', () => {
  // serverConfig mock
  const retaxConfig = {
    lifecycle: {},
  };
  const serverConfig = {
    config: {
      isomorphicTools: undefined,
      retaxConfig,
    },
  };

  // kernelMediator mock
  const run = jest.fn();
  const getService = jest.fn(() => ({
    run,
  }));
  const kernelMediator = {
    create: jest.fn(() => ({
      getService,
    })),
    reload: jest.fn(),
  };

  pit('controls the bootstrapping process', async () => {
    const factory = new RenderingMiddlewareFactory(
      <any>serverConfig,
      <any>kernelMediator
    );

    const middleware = factory.create();

    // express mock
    const send = jest.fn();
    const req = {
      originalUrl: '/home',
    };
    const res = {
      send,
    };
    const next = jest.fn();

    await middleware(<any>req, <any>res, <any>next);

    expect(kernelMediator.create).toBeCalled();
    expect(kernelMediator.reload).toBeCalled();
    expect(res.send).toBeCalled();
  });
});
