jest.unmock('inversify');
jest.unmock('../InversifyKernelFacade');

import { IKernel, IKernelModule } from 'inversify';
import { IUserModule } from '../interfaces';
import InversifyKernelFacade from '../InversifyKernelFacade';

describe('InversifyKernelFacade', () => {
  const module1Id = Symbol('module1');
  const module2Id = Symbol('module2');

  const baseModules: IUserModule[] = [
    {
      kernelModuleLoader: (kernel: IKernel): any => kernel.bind(module1Id).toConstantValue(1),
      kernelModuleUnloader: (kernel: IKernel): any => kernel.unbind(module1Id),
      serviceId: module1Id,
    },
    {
      kernelModuleLoader: (kernel: IKernel): any => kernel.bind(module2Id).toConstantValue(2),
      kernelModuleUnloader: (kernel: IKernel): any => kernel.unbind(module2Id),
      serviceId: module2Id,
    },
  ];

  it('loads modules into the kernel', () => {
    const kernelFacade = new InversifyKernelFacade();

    kernelFacade.loadModules(baseModules);

    expect((<any>kernelFacade)._loadedUserModules.get(module1Id)).toEqual(true);
    expect((<any>kernelFacade)._loadedUserModules.get(module2Id)).toEqual(true);

    expect(kernelFacade.getService(module1Id)).toEqual(1);
    expect(kernelFacade.getService(module2Id)).toEqual(2);

    const module3Id = Symbol('module3');
    const userModules2: IUserModule[] = [
      {
        kernelModuleLoader: (kernel: IKernel): any => kernel.bind(module3Id).toConstantValue(3),
        kernelModuleUnloader: (kernel: IKernel): any => kernel.unbind(module3Id),
        serviceId: module3Id,
      },
    ];

    kernelFacade.loadModules(userModules2);

    expect((<any>kernelFacade)._loadedUserModules.get(module3Id)).toEqual(true);

    expect(kernelFacade.getService(module3Id)).toEqual(3);
  });

  it('unloads modules from the kernel', () => {
    const kernelFacade = new InversifyKernelFacade();

    kernelFacade.loadModules(baseModules);
    kernelFacade.unloadModules(baseModules);

    expect((<any>kernelFacade)._loadedUserModules.get(module1Id)).toEqual(false);
    expect((<any>kernelFacade)._loadedUserModules.get(module2Id)).toEqual(false);
  });

  it('get all services with a same id', () => {
    const kernelFacade = new InversifyKernelFacade();

    const moduleId = Symbol('module');

    const modules: IUserModule[] = [
      {
        kernelModuleLoader: (kernel: IKernel): any => {
          kernel.bind(moduleId).toConstantValue(1);
          kernel.bind(moduleId).toConstantValue(2);
        },
        kernelModuleUnloader: (kernel: IKernel): any => kernel.unbind(moduleId),
        serviceId: moduleId,
      },
    ];

    kernelFacade.loadModules(modules);

    expect((<any>kernelFacade)._loadedUserModules.get(moduleId)).toEqual(true);

    expect(kernelFacade.getAllServices(moduleId)).toEqual([1, 2]);
  });

  it('loads raw kernel module into the kernel', () => {
    const kernelFacade = new InversifyKernelFacade();

    const moduleId = Symbol('module');

    const modules: IKernelModule[] = [
      (kernel: IKernel): any => kernel.bind(moduleId).toConstantValue(1),
    ];

    kernelFacade.loadKernelModules(modules);

    expect(kernelFacade.getService(moduleId)).toEqual(1);
  });
});

