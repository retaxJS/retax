import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder } from './interfaces';

import { IInversifyKernelFacade } from '../inversifyKernelFacade';
import { Html, RetaxProvider } from '../components';
import { IRetaxConfigStore, IInternalConfigStore } from '../configStores';
import { IContext } from '../context';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade } from '../reactRouter';

import {
  HTML_COMPONENT, RETAX_PROVIDER_COMPONENT,
  RETAX_CONFIG_STORE, INTERNAL_CONFIG_STORE,
  REDUX_FACADE,
  REACT_ROUTER_FACADE,
  CONTEXT,
} from '../inversify';

@injectable()
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    @inject(RETAX_CONFIG_STORE) private _retaxConfigStore: IRetaxConfigStore,
    @inject(INTERNAL_CONFIG_STORE) private _internalConfigStore: IInternalConfigStore,
    @inject(HTML_COMPONENT) private HtmlComponent: typeof Html,
    @inject(RETAX_PROVIDER_COMPONENT) private RetaxProviderComponent: typeof RetaxProvider,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacade,
    @inject(CONTEXT) private _context: IContext
  ) {}

  public build(kernel: IInversifyKernelFacade): JSX.Element {
    const { HtmlComponent, RetaxProviderComponent } = this;
    const { react: { appendChild } } = this._retaxConfigStore.config;
    const { isomorphicTools } = this._context.request;
    const { store } = this._reduxFacade;
    const { renderProps } = this._routerFacade;

    const assets = isomorphicTools && isomorphicTools.assets();

    const rootComponent = (
      <RetaxProviderComponent kernel={kernel}>
        <Provider store={store} key="provider">
          <div className="flex layout vertical">
            <RouterContext {...renderProps} />
            {appendChild && React.Children.only(appendChild)}
          </div>
        </Provider>
      </RetaxProviderComponent>
    );

    return (
      <HtmlComponent
        rootComponent={rootComponent}
        store={store}
        assets={assets}
        internalConfig={this._internalConfigStore.config}
      />
    );
  }
}
