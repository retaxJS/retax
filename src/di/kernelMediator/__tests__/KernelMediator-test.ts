jest.unmock('inversify');
jest.unmock('../../../core');
jest.unmock('../KernelMediator');

import KernelMediator from '../KernelMediator';

describe('KernelMediator', () => {
  const kernelFactory = {
    create: jest.fn(() => ({ loadModules: jest.fn() })),
  };

  const injector = {
    userModules: [
      { firstModule: true },
      { secondModule: true },
    ],
  };

  it('create a kernel facade', () => {
    const kernelMediator = new KernelMediator(
      <any>kernelFactory,
      <any>injector
    );

    const kernelFacade = kernelMediator.create([]);

    expect(kernelFactory.create).toBeCalledWith([], [
      { firstModule: true },
      { secondModule: true },
    ]);

    expect(kernelFacade.loadModules).toBeTruthy();
  });

  it('reload a kernel facade', () => {
    const kernelMediator = new KernelMediator(
      <any>kernelFactory,
      <any>injector
    );

    const kernelFacade = kernelMediator.create([]);

    kernelMediator.reload();
    expect(kernelFacade.loadModules).not.toBeCalled();

    kernelMediator.reload(kernelFacade);
    expect(kernelFacade.loadModules).toBeCalledWith([
      { firstModule: true },
      { secondModule: true },
    ]);
  });
});
