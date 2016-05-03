import { IKernel, IKernelModule } from 'inversify';

import { IServerBootstrapper, ServerBootstrapper } from '../../bootstrap';
import { IServerConfigStore, ServerConfigStore } from '../../configStores';
import { IRetaxMiddlewareFactory, StaticMiddlewareFactory, RenderingMiddlewareFactory } from '../../middlewares';

import {
  IInternalConfigStore, InternalConfigStore,
  INTERNAL_CONFIG_STORE,
} from '../../../core';

import {
  SERVER_BOOTSTRAPPER,
  SERVER_CONFIG_STORE,
  MIDDLEWARE_FACTORY,
} from '../identifiers';

export default function serverModule(kernel: IKernel): void {
  kernel.bind<IServerBootstrapper>(SERVER_BOOTSTRAPPER).to(ServerBootstrapper);

  kernel.bind<IInternalConfigStore>(INTERNAL_CONFIG_STORE).to(InternalConfigStore).inSingletonScope();
  kernel.bind<IServerConfigStore>(SERVER_CONFIG_STORE).to(ServerConfigStore).inSingletonScope();
}

export function middlewareFactoryModuleFactory(serverRendering: boolean): IKernelModule {
  return function middlewareFactoryModule(kernel: IKernel): void {
    if (serverRendering) {
      kernel.bind<IRetaxMiddlewareFactory>(MIDDLEWARE_FACTORY).to(RenderingMiddlewareFactory);
    } else {
      kernel.bind<IRetaxMiddlewareFactory>(MIDDLEWARE_FACTORY).to(StaticMiddlewareFactory);
    }
  };
}
