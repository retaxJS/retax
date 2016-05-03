import { IKernel, IKernelModule } from 'inversify';

import { RetaxProvider, ILifecycleService, ILifecycleServiceConstructor } from '../../components';
import { IInternalConfigStore, InternalConfigStore } from '../../configStores';
import { IReactRouterFacade, ReactRouterFacade } from '../../reactRouter';
import { IReduxFacade, ReduxFacade } from '../../redux';
import { IRetaxMediator, RetaxMediator } from '../../mediator';
import { IContext } from '../../context';

import {
  MEDIATOR,
  COMPONENTS,
  CONFIG_STORES,
  REACT_ROUTER_FACADE,
  REDUX_FACADE,
  CONTEXT,
  LIFECYCLE_ACTIONS_CREATOR,
} from '../identifiers';

export default function commonModule(kernel: IKernel): void {
  kernel.bind<IRetaxMediator>(MEDIATOR).to(RetaxMediator).inSingletonScope();
  kernel.bind<IReactRouterFacade>(REACT_ROUTER_FACADE).to(ReactRouterFacade).inSingletonScope();
  kernel.bind<IReduxFacade>(REDUX_FACADE).to(ReduxFacade).inSingletonScope();

  kernel.bind<typeof RetaxProvider>(COMPONENTS.RETAX_PROVIDER_COMPONENT).toConstructor(RetaxProvider);

  kernel.bind<IInternalConfigStore>(CONFIG_STORES.INTERNAL_CONFIG_STORE).to(InternalConfigStore).inSingletonScope();
}

export function contextModuleFactory(context: IContext): IKernelModule {
  return function contextModule(kernel: IKernel): void {
    kernel.bind<IContext>(CONTEXT).toConstantValue(context);
  };
}

export function lifecycleModuleFactory(LifecycleActionsCreator: ILifecycleServiceConstructor): IKernelModule {
  return function lifecycleModule(kernel: IKernel): void {
    if (LifecycleActionsCreator) {
      kernel.bind<ILifecycleService>(LIFECYCLE_ACTIONS_CREATOR).to(LifecycleActionsCreator);
    } else {
      kernel.bind<ILifecycleService>(LIFECYCLE_ACTIONS_CREATOR).toConstantValue(undefined);
    }
  };
}
