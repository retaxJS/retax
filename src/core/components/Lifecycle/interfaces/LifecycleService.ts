import {
  IActionsCreatorService,
  IActionsCreatorServiceConstructor,
} from '../../ActionsCreator';

import {
  IUserService,
} from '../../Service';

import { IAction } from '../../../../utils';

/**
 * A service used for lifecycle managment
 */
export interface ILifecycleService extends IActionsCreatorService {
  willResolveRoute(): IAction<any, any>;
}

/**
 * A service constructor used for lifecycle managment
 */
export interface ILifecycleServiceConstructor extends IActionsCreatorServiceConstructor {
  new(apis?: IUserService[], actionsCreators?: IUserService[]): ILifecycleService;
}
