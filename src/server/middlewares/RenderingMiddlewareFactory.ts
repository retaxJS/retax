import { injectable, inject } from 'inversify';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';
import { Request, Response, NextFunction } from 'express';
import {
  serverModule, contextModuleFactory, lifecycleModuleFactory,
  IRetaxMediator, MEDIATOR,
} from '../../core';
import { IKernelMediator, KERNEL_MEDIATOR } from '../../di';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigStore } from '../configStores';
import { SERVER_CONFIG_STORE } from '../inversify';

@injectable()
export default class RenderingMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    @inject(SERVER_CONFIG_STORE) private _configStore: IServerConfigStore,
    @inject(KERNEL_MEDIATOR) private _kernelMediator: IKernelMediator
  ) {}

  public create(): IRetaxMiddleware {
    const { retaxConfig, isomorphicTools } = this._configStore.config;

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // configure history
        const history = createMemoryHistory();
        const location = history.createLocation(req.originalUrl);
        history.replace(location);

        // create IOC kernel
        const kernel = this._kernelMediator.create([
          serverModule,
          contextModuleFactory({ history, retaxConfig, request: { req, res, isomorphicTools } }),
          lifecycleModuleFactory(retaxConfig.lifecycle),
        ]);

        // builder the app
        const mediator = kernel.getService<IRetaxMediator>(MEDIATOR);
        const app = await mediator.run(kernel);

        // reload the kernel (usefull if the user uses code splitting)
        this._kernelMediator.reload(kernel);

        // render!
        const markup = renderToString(app);

        res.send(markup);
      } catch (e) {
        next(e);
      }
    };
  }
}
