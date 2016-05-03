import { ILifecycleManager } from './interfaces';

import {
  IActionsCreatorServiceConfig,
  IUserServiceMap,
} from '../../core';

import { IAction } from '../../utils';

abstract class AbstractLifecycleManager implements ILifecycleManager {
  public apis: IUserServiceMap;
  public actionsCreators: IUserServiceMap;

  public configure(config: IActionsCreatorServiceConfig): void {
    this.apis = config.apis;
    this.actionsCreators = config.actionsCreators;
  }

  public abstract willResolveRoute(): IAction<any, any>;
}

export default AbstractLifecycleManager;
