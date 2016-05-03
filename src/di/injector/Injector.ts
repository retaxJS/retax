import { IKernelModule, injectable } from 'inversify';

import { IInjector, IUserModule } from './interfaces';

import { IUserService, IUserServiceConstructor } from '../../core';
import { generateRandomId } from '../../utils';

@injectable()
export default class Injector implements IInjector {
  private _userModules: Map<IUserServiceConstructor|IUserServiceConstructor[], IUserModule> =
    new Map<IUserServiceConstructor|IUserServiceConstructor[], IUserModule>();

  get userModules(): IUserModule[] {
    const res: IUserModule[] = [];

    this._userModules.values();

    for (const userModule of this._userModules.values()) {
      res.push(userModule);
    }

    return res;
  }

  public registerService(Services: IUserServiceConstructor|IUserServiceConstructor[], name?: string): Symbol {
    let serviceId: Symbol;

    if (Services instanceof Array) {
      serviceId = Symbol(`UserService[] - ${name || generateRandomId()}`);
    } else {
      serviceId = Symbol(`UserService - ${name || generateRandomId()}`);
    }

    const kernelModuleLoader = this._createKernelModuleLoader(serviceId, Services);
    const kernelModuleUnloader = this._createKernelModuleUnloader(serviceId);
    this._setUserModule(Services, serviceId, kernelModuleLoader, kernelModuleUnloader);

    return serviceId;
  }

  private _setUserModule(
    key: IUserServiceConstructor|IUserServiceConstructor[],
    serviceId: Symbol,
    kernelModuleLoader: IKernelModule,
    kernelModuleUnloader: IKernelModule
  ): void {
    if (this._userModules.has(key)) {
      throw new Error(`Duplicate module for key ${key.toString()} of id ${serviceId}`);
    }

    this._userModules.set(key, { serviceId, kernelModuleLoader, kernelModuleUnloader });
  }

  private _createKernelModuleLoader(id: Symbol, Services: IUserServiceConstructor|IUserServiceConstructor[]): IKernelModule {
    return kernel => {
      if (!Services || (Services instanceof Array && Services.length === 0)) { // we need to bind something for id.
        kernel.bind<IUserService>(id).toConstantValue(undefined);
      } else if (!(Services instanceof Array)) {
        kernel.bind<IUserService>(id).to(Services);
      } else {
        Services.forEach(Service => {
          kernel.bind<IUserService>(id).to(Service);
        });
      }
    };
  }

  private _createKernelModuleUnloader(id: Symbol): IKernelModule {
    return kernel => {
      kernel.unbind(id);
    };
  }
}
