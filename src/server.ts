import kernel from './di';

import {
  serverModule, middlewareFactoryModuleFactory,
  SERVER_BOOTSTRAPPER,
  IServerBootstrapper, IRetaxMiddleware, IServerConfig,
} from 'retax-server';

export default function retaxMiddleware(config: IServerConfig): IRetaxMiddleware {
  kernel.load(serverModule, middlewareFactoryModuleFactory(config.serverRendering));

  const bootstrap = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);

  bootstrap.config(config);

  return bootstrap.bootstrap();
}
