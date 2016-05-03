import * as React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import * as _ from 'lodash';
import { inject, multiInject, injectable } from 'inversify';

import {
  IEnhancer,
  IApiEnhancmentConfig,
  IActionsCreatorEnhancmentConfig,
  IComponentEnhancmentConfig,
} from './interfaces';

import {
  IUserService, IUserServiceMap,
  IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
  RetaxConsumer,
  IRetaxConfigStore, RETAX_CONFIG_STORE,
  IReduxFacade, REDUX_FACADE,
} from '../../core';

@injectable()
export default class Enhancer implements IEnhancer {
  public extendApi(
    Target: IApiServiceConstructor,
    config: IApiEnhancmentConfig
  ): IApiServiceConstructor {

    @injectable()
    class EnhancedApi extends Target {
      constructor(
        @inject(REDUX_FACADE) reduxFacade: IReduxFacade,
        @inject(RETAX_CONFIG_STORE) configStore: IRetaxConfigStore
      ) {
        super(reduxFacade, configStore);
        this.configure(config);
      }
    }

    return EnhancedApi;
  }

  public extendActionsCreator(
    Target: IActionsCreatorServiceConstructor,
    config: IActionsCreatorEnhancmentConfig
  ): IActionsCreatorServiceConstructor {

    @injectable()
    class EnhancedActionsCreator extends Target {
      constructor(
        @multiInject(config.apis.serviceId) apis: IUserService[],
        @multiInject(config.actionsCreators.serviceId) actionsCreators: IUserService[]
      ) {
        super(apis, actionsCreators);
        this.configure({
          actionsCreators: _.zipObject<IUserServiceMap>(config.actionsCreators.keys, actionsCreators),
          apis: _.zipObject<IUserServiceMap>(config.apis.keys, apis),
        });
      }
    }

    return EnhancedActionsCreator;
  }

  public extendComponent(
    ComposedComponent: React.ComponentClass<any>,
    config: IComponentEnhancmentConfig
  ): typeof RetaxConsumer {

    class RetaxComponent extends RetaxConsumer<void, void> {
      public static displayName: string = `WithServices(${ComposedComponent.displayName || 'Nameless'})`;

      public render(): JSX.Element {
        const { kernel } = this.context;

        const services = kernel.getAllServices<IUserService[]>(config.actionsCreators.serviceId);

        return React.createElement(
          ComposedComponent,
          Object.assign(
            _.zipObject<IUserServiceMap>(config.actionsCreators.keys, services),
            this.props
          )
        );
      }
    }

    // webpack HMR
    // if ((<any>module) && (<any>module).hot) {
    //   const retaxLib = require('retax');
    //   (<any>module).hot.accept();
    //   retaxLib.retax.reload();
    // }

    return hoistNonReactStatic(RetaxComponent, ComposedComponent);
  }
}
