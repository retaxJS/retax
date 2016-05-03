import { Reducer, ReducersMapObject } from 'redux';

import { IAction } from './interfaces';

export default function reducerFactory<S>(initialState: S, handlers: ReducersMapObject): Reducer<S> {
  return function reducer(state: S = initialState, action?: IAction<any, any>): S {
    if (action && handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
