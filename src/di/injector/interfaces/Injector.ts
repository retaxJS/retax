import { IKernelModule } from 'inversify';

import { IUserServiceConstructor } from '../../../core';

export interface IUserModule {
  serviceId: Symbol;
  kernelModuleLoader: IKernelModule;
  kernelModuleUnloader: IKernelModule;
}

export interface IInjector {
  userModules: IUserModule[];

  registerService(Service: IUserServiceConstructor, name?: string): Symbol;
  registerService(Services: IUserServiceConstructor[], name?: string): Symbol;
}




