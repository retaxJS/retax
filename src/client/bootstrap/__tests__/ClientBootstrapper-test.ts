(jest as any).disableAutomock();

jest.mock('react-dom');
jest.mock('react-router');

import { render } from 'react-dom';

import ClientBootstrapper from '../ClientBootstrapper';

describe('ClientBootstrapper Flow', () => {
  const retaxConfig = {
    lifecycle: {},
  };

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

  it('set the framework configuration', () => {
    const bootstrapper = new ClientBootstrapper(<any>kernelMediator);

    bootstrapper.config(<any>retaxConfig);

    expect((<any>bootstrapper)._retaxConfig).toEqual({
      lifecycle: {},
    });
  });

  pit('controls the bootstrapping process', async () => {
    const bootstrapper = new ClientBootstrapper(<any>kernelMediator);
    bootstrapper.config(<any>retaxConfig);

    const div = document.createElement('div');

    await bootstrapper.bootstrap(div);

    expect(kernelMediator.create).toBeCalled();
    expect((<any>bootstrapper)._kernelFacade.getService).toBeCalled();
    expect(kernelMediator.reload).toBeCalledWith((<any>bootstrapper)._kernelFacade);
    expect(render).toBeCalled();
  });

  pit('reloads a kernel', async () => {
    const bootstrapper = new ClientBootstrapper(<any>kernelMediator);
    bootstrapper.config(<any>retaxConfig);

    const div = document.createElement('div');

    await bootstrapper.bootstrap(div);

    bootstrapper.reload();

    expect((<any>bootstrapper)._kernelMediator.reload).toBeCalledWith((<any>bootstrapper)._kernelFacade);

    expect(kernelMediator.create).toBeCalled();
    expect((<any>bootstrapper)._kernelFacade.getService).toBeCalled();
    expect(kernelMediator.reload).toBeCalledWith((<any>bootstrapper)._kernelFacade);
    expect(render).toBeCalled();
  });
});
