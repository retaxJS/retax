import { Kernel, IKernel, IKernelModule, injectable } from 'inversify';

import { IInversifyKernelFacade, IUserModule } from './interfaces';

@injectable()
export default class InversifyKernelFacade implements IInversifyKernelFacade {
  private _kernel: IKernel;
  private _loadedUserModules: Map<Symbol, boolean>;

  constructor() {
    this._kernel = new Kernel();
    this._loadedUserModules = new Map<Symbol, boolean>();
  }

  public getService<T>(serviceId: Symbol): T {
    return this._kernel.get<T>(serviceId);
  }

  public getAllServices<T>(serviceId: Symbol): T[] {
    return this._kernel.getAll<T>(serviceId);
  }

  public loadKernelModules(modules: IKernelModule[] = []): void {
    this._kernel.load(...modules);
  }

  public loadModules(modules: IUserModule[] = []): void {
    modules.forEach(m => {
      if (!this._loadedUserModules.get(m.serviceId)) {
        this._kernel.load(m.kernelModuleLoader);
        this._loadedUserModules.set(m.serviceId, true);
      }
    });
  }

  public unloadModules(modules: IUserModule[] = []): void {
    modules.forEach(m => {
      if (this._loadedUserModules.get(m.serviceId)) {
        this._kernel.load(m.kernelModuleUnloader);
        this._loadedUserModules.set(m.serviceId, false);
      }
    });
  }
}
