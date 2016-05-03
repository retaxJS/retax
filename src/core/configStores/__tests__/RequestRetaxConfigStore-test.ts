(jest as any).disableAutomock();

jest.mock('../RetaxConfigStore');

import configureStore from 'redux-mock-store';
import RequestRetaxConfigStore from '../RequestRetaxConfigStore';

describe('RequestRetaxConfigStore', () => {
  const staticContext = {
    request: {
      req: {
        header: jest.fn(),
      },
    },
    retaxConfig: {
      router: {
        static: { myRoute: true },
      },
    },
  };

  const dynamicContext = {
    request: {
      req: {
        header: jest.fn(),
      },
    },
    retaxConfig: {
      router: {
        dynamic: jest.fn(),
      },
    },
  };

  it('evaluates the config with a static router', () => {
    const reduxStore = configureStore()();
    const configStore = new RequestRetaxConfigStore(<any>staticContext);

    configStore.config = staticContext.retaxConfig; // simulate the behavior of RetaxConfigStore

    const evaluatedConfig = configStore.evaluateConfig(reduxStore);

    expect(evaluatedConfig).toEqual({
      router: {
        static: { myRoute: true },
      },
    });
  });

  it('evaluates the config with a dynamic router', () => {
    const reduxStore = configureStore()();
    const configStore = new RequestRetaxConfigStore(<any>dynamicContext);

    configStore.config = dynamicContext.retaxConfig; // simulate the behavior of RetaxConfigStore

    const evaluatedConfig = configStore.evaluateConfig(reduxStore);

    expect(dynamicContext.request.req.header).toBeCalled();

    expect(dynamicContext.retaxConfig.router.dynamic).toBeCalledWith(
      reduxStore,
      undefined
    );

    expect(evaluatedConfig).toEqual({
      router: {
        dynamic: dynamicContext.retaxConfig.router.dynamic,
        static: undefined,
      },
    });
  });
});
