import { IKernel } from 'inversify';

import commonModule from './common';

import { Html } from '../../components';
import { ICookieProxy, RequestCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ServerBuilder } from '../../JSXBuilders';
import { IStateProxy, RequestStateProxy } from '../../stateProxies';
import { IRetaxConfigStore, RequestRetaxConfigStore } from '../../configStores';

import {
  COMPONENTS,
  RETAX_CONFIG_STORE,
  COOKIE_PROXY,
  JSX_BUILDER,
  STATE_PROXY,
} from '../identifiers';

export default function serverModule(kernel: IKernel): void {
  kernel.load(commonModule);

  kernel.bind<IRetaxConfigStore>(RETAX_CONFIG_STORE).to(RequestRetaxConfigStore).inSingletonScope();
  kernel.bind<ICookieProxy>(COOKIE_PROXY).to(RequestCookieProxy).inSingletonScope();
  kernel.bind<IStateProxy>(STATE_PROXY).to(RequestStateProxy).inSingletonScope();
  kernel.bind<IJSXBuilder>(JSX_BUILDER).to(ServerBuilder);

  kernel.bind<typeof Html>(COMPONENTS.HTML_COMPONENT).toConstructor(Html);
}
