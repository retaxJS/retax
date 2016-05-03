import { injectable, inject } from 'inversify';

import { IRetaxMediator } from './interfaces';

import { IInversifyKernelFacade } from '../inversifyKernelFacade';
import { ICookieProxy } from '../cookieProxies';
import { IStateProxy } from '../stateProxies';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade, IRouterContextProps } from '../reactRouter';
import { ILifecycleService } from '../components';
import { IJSXBuilder } from '../JSXBuilders';
import { IContext } from '../context';

import {
  CONTEXT,
  COOKIE_PROXY,
  STATE_PROXY,
  REDUX_FACADE,
  REACT_ROUTER_FACADE,
  LIFECYCLE_ACTIONS_CREATOR,
  JSX_BUILDER,
} from '../inversify/identifiers';

@injectable()
export default class RetaxMediator implements IRetaxMediator {
  constructor(
    @inject(CONTEXT) private _context: IContext,
    @inject(COOKIE_PROXY) private _cookieProxy: ICookieProxy,
    @inject(STATE_PROXY) private _stateProxy: IStateProxy,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacade,
    @inject(LIFECYCLE_ACTIONS_CREATOR) private _lifecycleActionsCreator: ILifecycleService,
    @inject(JSX_BUILDER) private _jsxBuilder: IJSXBuilder
  ) {}

  public async run(kernel: IInversifyKernelFacade): Promise<JSX.Element> {
    // initial state
    const initialState = this._stateProxy.read();

    // this.redux Facade init
    this._reduxFacade.initialize(initialState);

    // preroute hook
    await this._runPreRouteHook();

    // this.router resolve route
    const renderProps = await this._routerFacade.initialize();

    // postroute hook
    await this._runPostRouteHook(renderProps);

    // builder
    const app = this._jsxBuilder.build(kernel);

    // history hook
    this._attachHistoryChangeHook();

    return app;
  }

  private async _runPreRouteHook(): Promise<void> {
    const { authToken } = this._cookieProxy;

    if (this._lifecycleActionsCreator && this._lifecycleActionsCreator.willResolveRoute) {
      await this._reduxFacade.dispatch(
        this._lifecycleActionsCreator.willResolveRoute(!!authToken)
      );
    }
  }

  private async _runPostRouteHook(renderProps: IRouterContextProps): Promise<void> {
    if (this._lifecycleActionsCreator && this._lifecycleActionsCreator.didResolveRoute) {
      await this._reduxFacade.dispatch(
        this._lifecycleActionsCreator.didResolveRoute(renderProps)
      );
    }
  }

  private _attachHistoryChangeHook(): void {
    if (this._lifecycleActionsCreator && this._lifecycleActionsCreator.historyDidChanged) {
      this._context.history.listen(this._historyChangeHook.bind(this));
    }
  }

  private async _historyChangeHook(location: HistoryModule.Location): Promise<void> {
    const renderProps = await this._routerFacade.resolveRoute();

    this._reduxFacade.dispatch(
      this._lifecycleActionsCreator.historyDidChanged(location, renderProps)
    );
  }
}
