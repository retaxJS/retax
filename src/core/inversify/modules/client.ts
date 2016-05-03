import { IKernel } from 'inversify';

import commonModule from './common';

import { ICookieProxy, DomCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ClientBuilder } from '../../JSXBuilders';
import { IStateProxy, DomStateProxy } from '../../stateProxies';
import { IRetaxConfigStore, DomRetaxConfigStore } from '../../configStores';

import {
  RETAX_CONFIG_STORE,
  COOKIE_PROXY,
  JSX_BUILDER,
  STATE_PROXY,
} from '../identifiers';

export default function clientModule(kernel: IKernel): void {
  kernel.load(commonModule);

  kernel.bind<IRetaxConfigStore>(RETAX_CONFIG_STORE).to(DomRetaxConfigStore).inSingletonScope();
  kernel.bind<ICookieProxy>(COOKIE_PROXY).to(DomCookieProxy).inSingletonScope();
  kernel.bind<IStateProxy>(STATE_PROXY).to(DomStateProxy).inSingletonScope();
  kernel.bind<IJSXBuilder>(JSX_BUILDER).to(ClientBuilder);
}
