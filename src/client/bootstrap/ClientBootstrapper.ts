import { injectable, inject } from 'inversify';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import { IClientBootstrapper } from './interfaces';

import {
  IKernelMediator, KERNEL_MEDIATOR,
} from '../../di';
import {
  clientModule, contextModuleFactory, lifecycleModuleFactory,
  IInversifyKernelFacade,
  IRetaxConfig,
  MEDIATOR, IRetaxMediator,
} from '../../core';

@injectable()
export default class ClientBootstrapper implements IClientBootstrapper {
  private _retaxConfig: IRetaxConfig;
  private _kernelFacade: IInversifyKernelFacade;

  constructor(
    @inject(KERNEL_MEDIATOR) private _kernelMediator: IKernelMediator
  ) {}

  public config(config: IRetaxConfig): void {
    this._retaxConfig = config;
  }

  public async bootstrap(element: Element): Promise<void> {
    // configure history
    const history = browserHistory;
    const location = history.createLocation(window.location);
    history.replace(location);

    // create IOC kernel
    this._kernelFacade = this._kernelMediator.create([
      clientModule,
      contextModuleFactory({ history, retaxConfig: this._retaxConfig }),
      lifecycleModuleFactory(this._retaxConfig.lifecycle),
    ]);

    // build the app
    const mediator = this._kernelFacade.getService<IRetaxMediator>(MEDIATOR);
    const app = await mediator.run(this._kernelFacade);

    // reload the kernel (usefull if the user uses code splitting)
    this._kernelMediator.reload(this._kernelFacade);

    // render!
    render(app, element);
  }

  public reload(): void {
    this._kernelMediator.reload(this._kernelFacade);
  }
}
