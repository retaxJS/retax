import * as React from 'react';

import {
  IUserServiceConstructor,
  IApiServiceRuntimeConfig, IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
  RetaxConsumer,
} from '../../../core';

export interface IInjectionMap {
  keys: string[];
  serviceId: Symbol;
}

export interface IApiEnhancmentConfig extends IApiServiceRuntimeConfig {}

export interface IActionsCreatorEnhancmentConfig {
  apis?: IInjectionMap;
  actionsCreators?: IInjectionMap;
}

export interface IComponentEnhancmentConfig {
  actionsCreators?: IInjectionMap;
}

export interface IEnhancer {
  extendApi(
    Target: IApiServiceConstructor,
    config: IApiEnhancmentConfig
  ): IApiServiceConstructor;

  extendActionsCreator(
    Target: IActionsCreatorServiceConstructor,
    config: IActionsCreatorEnhancmentConfig
  ): IActionsCreatorServiceConstructor;

  extendComponent(
    ComposedComponent: React.ComponentClass<any>,
    config: IComponentEnhancmentConfig
  ): typeof RetaxConsumer;
}

export interface ISplitEntriesReturn {
  keys: string[];
  values: IUserServiceConstructor[];
}
