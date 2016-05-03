import { Middleware, Reducer, Store, StoreEnhancer } from 'redux';

import { IInitializable } from '../../mediator';
import { IImmutableState } from '../../stateProxies';

import { IAction } from '../../../utils';

export interface ICreateStoreConfig {
  initialState: IImmutableState;
  history: HistoryModule.History;
  middlewares: Middleware[];
  storeEnhancers: StoreEnhancer<any>[];
  rootReducer: Reducer<any>;
}

export interface IReduxFacade extends IInitializable<IImmutableState, Store<any>> {
  store: Store<any>;

  getAuthToken(): string;
  setAuthToken(token: string): IAction<string, void>;
  dispatch<P, M>(action: IAction<P, M>): IAction<P, M>;
}
