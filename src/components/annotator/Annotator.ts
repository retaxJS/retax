import * as React from 'react';
import { injectable, inject } from 'inversify';

import { IAnnotator } from './interfaces';
import { METADATA_KEYS } from './metadataKeys';

import { IEnhancer } from '../enhancer';
import { INJECTOR, IInjector } from '../../di';
import {
  IInjectableUserServiceMap,
  IUserServiceConstructor,
  IApiServiceRuntimeConfig, IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
  IActionsCreatorServiceRuntimeConfig,
  IRetaxComponentRuntimeConfig,
} from '../../core';

import { ENHANCER } from '../inversify';

@injectable()
export default class Annotator implements IAnnotator {
  constructor(
    @inject(INJECTOR) private _injector: IInjector,
    @inject(ENHANCER) private _enhancer: IEnhancer
  ) {}

  public action(): MethodDecorator {
    return (target: typeof Object, key: string, descriptor: PropertyDescriptor) => {
      const metadata: string[] = Reflect.getMetadata(METADATA_KEYS.RETAX_ACTIONS, target) || [];

      metadata.push(key);

      Reflect.defineMetadata(METADATA_KEYS.RETAX_ACTIONS, metadata, target);
    };
  }

  public Api(config: IApiServiceRuntimeConfig = {}): ClassDecorator {
    return (Target: IApiServiceConstructor) => {

      const EnhancedTarget = this._enhancer.extendApi(Target, config);

      return EnhancedTarget;
    };
  }

  public ActionsCreator(config: IActionsCreatorServiceRuntimeConfig = {}): ClassDecorator {
    return (Target: IActionsCreatorServiceConstructor) => {
      const { keys: apiKeys, values: Apis } = this._splitEntries(config.apis);
      const { keys: actionsCreatorsKeys, values: ActionsCreators } = this._splitEntries(config.actionsCreators);

      const apisServiceId = this._injector.registerService(Apis, `Api ${apiKeys.toString()}`);
      const actionsCreatorsServiceId = this._injector.registerService(ActionsCreators, `Actions Creator ${actionsCreatorsKeys.toString()}`);

      const EnhancedTarget = this._enhancer.extendActionsCreator(Target, {
        actionsCreators: {
          keys: actionsCreatorsKeys,
          serviceId: actionsCreatorsServiceId,
        },
        apis: {
          keys: apiKeys,
          serviceId: apisServiceId,
        },
      });

      return EnhancedTarget;
    };
  }

  public LifecycleManager(config: IActionsCreatorServiceRuntimeConfig = {}): ClassDecorator {
    return this.ActionsCreator(config);
  }

  public RetaxComponent(config: IRetaxComponentRuntimeConfig = {}): ClassDecorator {
    return (ComposedComponent: React.ComponentClass<any>) => {
      const { keys: actionsCreatorKeys, values: ActionsCreators } = this._splitEntries(config.actionsCreators);

      const actionsCreatorServiceId = this._injector.registerService(ActionsCreators, `Actions Creator ${actionsCreatorKeys.toString()}`);

      return this._enhancer.extendComponent(ComposedComponent, {
        actionsCreators: {
          keys: actionsCreatorKeys,
          serviceId: actionsCreatorServiceId,
        },
      });
    };
  }

  private _splitEntries(injectableEntries: IInjectableUserServiceMap = {}): { keys: string[], values: IUserServiceConstructor[] } {
    const entries = Object.entries(injectableEntries);
    const keys = entries.map(e => e[0]);
    const values = entries.map(e => e[1]);

    return { keys, values };
  }
}
