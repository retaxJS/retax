import { Action } from 'redux';

export interface IAction<P, M> extends Action {
  type: string;
  payload?: P;
  error?: boolean;
  meta?: M;
}

export interface IPayloadCreator<P> {
  (...args: any[]): P;
}

export interface IMetaCreator<M> {
  (...args: any[]): M;
}

export interface IActionCreator<P, M> {
  (...args: any[]): IAction<P, M>;
}
