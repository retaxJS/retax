import { Store, Middleware, ReducersMapObject, StoreEnhancer } from 'redux';

import { ILifecycleServiceConstructor } from '../../components';

import { IConfigStore } from '../../../utils';

export interface IClientConfig {
  keepInitialState?: boolean;
}

export interface IReducersMap {
  [key: string]: Function;
}

export interface IReduxStoreConfig {
  nonImmutableKeys?: string[];
  middlewares?: Middleware[];
  reducers?: ReducersMapObject;
  initialState?: Object;
  storeEnhancers?: StoreEnhancer<any>[];
}

export type IRoute = ReactRouter.PlainRoute | ReactRouter.RouteElement;

export interface IReactRouterConfig {
  static?: IRoute;
  dynamic?: (store: Store<any>, userAgent: string) => IRoute;
}

export interface IReactConfig {
  appendChild?: JSX.Element;
}

export interface IApiConfig {
  baseUrl?: string;
  authHeaderName?: string;
}

export interface IRetaxConfig {
  api?: IApiConfig;
  client?: IClientConfig;
  lifecycle?: ILifecycleServiceConstructor;
  react?: IReactConfig;
  router?: IReactRouterConfig;
  store?: IReduxStoreConfig;
}


export interface IRetaxConfigStore extends IConfigStore<IRetaxConfig> {
  /**
   * Runtime evaluated config
   */
  evaluateConfig(store: Store<any>): IRetaxConfig;
}
