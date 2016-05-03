import { IKernelModule } from 'inversify';

export interface IUserModule {
  serviceId: Symbol;
  kernelModuleLoader: IKernelModule;
  kernelModuleUnloader: IKernelModule;
}

export interface IInversifyKernelFacade {
  getService<T>(serviceId: Symbol): T;
  getAllServices<T>(serviceId: Symbol): T[];

  loadKernelModules(modules: IKernelModule[]): void;
  loadModules(modules: IUserModule[]): void;
  unloadModules(modules: IUserModule[]): void;
}
