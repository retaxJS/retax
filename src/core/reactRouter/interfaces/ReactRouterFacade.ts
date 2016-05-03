import { Store } from 'redux';

import { IAsyncInitializable } from '../../mediator';

export interface IMatchArgs extends ReactRouter.MatchArgs {};

export interface IMatchResult {
  redirectLocation: HistoryModule.Location;
  renderProps: IRouterContextProps;
}

export interface IResolveRouteConfig extends ReactRouter.MatchArgs {
  store: Store<any>;
}

export interface IReactRouterFacade extends IAsyncInitializable<void, IRouterContextProps> {
  renderProps: IRouterContextProps;

  resolveRoute(): Promise<IRouterContextProps>;
}

export interface IRouterContextProps extends ReactRouter.RouterState {
  history: HistoryModule.History;
  router?: ReactRouter.Router;
  createElement?: (component: ReactRouter.RouteComponent, props: Object) => any;
  location: HistoryModule.Location;
  routes: ReactRouter.PlainRoute[];
  params: ReactRouter.Params;
  components: ReactRouter.RouteComponent[];
}
