import { Kernel } from 'inversify';

import { diModule } from './di';
import {
  clientModule,
  CLIENT_BOOTSTRAPPER,
  IClientBootstrapper,
} from './client';
import {
  serverModule, middlewareFactoryModuleFactory,
  SERVER_BOOTSTRAPPER,
  IServerBootstrapper, IRetaxMiddleware, IServerConfig,
} from './server';
import {
  componentsModule, ANNOTATOR,
  IAnnotator,
} from './components';

const kernel = new Kernel();

kernel.load(diModule);
kernel.load(clientModule);
kernel.load(componentsModule);

// // core
export { setAuthToken, removeAuthToken } from './core';

// // retax client
export const retax = kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);

// // retax server
export function retaxMiddleware(config: IServerConfig): IRetaxMiddleware {
  kernel.load(serverModule, middlewareFactoryModuleFactory(config.serverRendering));

  const bootstrap = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);

  bootstrap.config(config);

  return bootstrap.bootstrap();
}

// // components
export const annotator = kernel.get<IAnnotator>(ANNOTATOR);
export { AbstractActionsCreator, AbstractApi, AbstractLifecycleManager } from './components';

// // utils
export { actionsCreatorFactory, reducerFactory } from './utils';
