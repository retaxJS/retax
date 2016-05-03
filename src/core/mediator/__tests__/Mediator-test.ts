jest.unmock('inversify');
jest.unmock('../Mediator');

import Mediator from '../Mediator';

describe('Mediator Flow', () => {
  const context = {
    history: {
      listen: jest.fn(),
    },
  };

  const cookieProxy = {
    authToken: '1234',
  };

  const stateProxy = {
    read: jest.fn(() => ({ initialState: true })),
  };

  const reduxFacade = {
    dispatch: jest.fn(),
    initialize: jest.fn(),
  };

  const routerFacade = {
    initialize: jest.fn(() => ({ renderProps: true })),
  };

  const lifecycleActions = {
    didResolveRoute: jest.fn(() => ({ didResolveRoute: true })),
    historyDidChanged: jest.fn(() => ({ historyDidChanged: true })),
    willResolveRoute: jest.fn(() => ({ willResolveRoute: true })),
  };

  const builder = {
    build: jest.fn(() => ({ theApp: true })),
  };

  const kernelFacade = {
    theKernel: true,
  };

  pit('mediates the flow of retax', async () => {
    const mediator = new Mediator(
      <any>context,
      <any>cookieProxy,
      <any>stateProxy,
      <any>reduxFacade,
      <any>routerFacade,
      <any>lifecycleActions,
      <any>builder
    );

    const app = await mediator.run(<any>kernelFacade);

    expect(stateProxy.read).toBeCalled();
    expect(reduxFacade.initialize).toBeCalledWith({ initialState: true });

    expect(lifecycleActions.willResolveRoute).toBeCalled();
    expect(reduxFacade.dispatch).toBeCalledWith({ willResolveRoute: true });

    expect(routerFacade.initialize).toBeCalled();

    expect(lifecycleActions.didResolveRoute).toBeCalled();
    expect(reduxFacade.dispatch).toBeCalledWith({ didResolveRoute: true });

    expect(builder.build).toBeCalledWith(kernelFacade);

    expect(context.history.listen).toBeCalled();

    expect(app).toEqual({ theApp: true });
  });
});
