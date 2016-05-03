import { TSetAuthTokenPayload } from './interfaces';

import { SET_AUTH_TOKEN, REMOVE_AUTH_TOKEN } from '../constants';
import { actionsCreatorFactory, IActionCreator, IAction } from '../../../utils';

export function isSetAuthTokenAction(a: IAction<any, any>): a is IAction<TSetAuthTokenPayload, void> {
  return a.type === SET_AUTH_TOKEN;
}

export function isRemoveAuthTokenAction(a: IAction<any, any>): a is IAction<void, void> {
  return a.type === REMOVE_AUTH_TOKEN;
}

export const setAuthToken: IActionCreator<TSetAuthTokenPayload, void> =
  actionsCreatorFactory<TSetAuthTokenPayload, void>(SET_AUTH_TOKEN);

export const removeAuthToken: IActionCreator<void, void> =
  actionsCreatorFactory<void, void>(REMOVE_AUTH_TOKEN);
