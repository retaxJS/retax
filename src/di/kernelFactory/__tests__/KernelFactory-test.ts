jest.unmock('inversify');
jest.unmock('../../../core');
jest.unmock('../KernelFactory');

import KernelFactory from '../KernelFactory';

describe('KernelFactory', () => {
  const loadKernelModules = jest.fn();
  const loadModules = jest.fn();

  const inversifyKernelFactory = () => {
    return {
      loadKernelModules,
      loadModules,
    };
  };

  it('creates a kernel and load the user modules into it', () => {
    const kernelFactory = new KernelFactory(<any>inversifyKernelFactory);

    const kernelFacade = kernelFactory.create([], []);

    expect(loadKernelModules).toBeCalledWith([]);
    expect(loadModules).toBeCalledWith([]);

    expect(kernelFacade).toEqual({
      loadKernelModules,
      loadModules,
    });
  });
});
