import { Middleware } from 'redux';

import { isSetAuthTokenAction, isRemoveAuthTokenAction } from '../actionsCreators';

import { ICookieProxy } from '../../cookieProxies';
import { IAction } from '../../../utils';

export default function credentialsMiddleware(cookieProxy: ICookieProxy): Middleware {
  return () => next => (action: IAction<any, any>) => {
    if (isSetAuthTokenAction(action)) {
      const { payload } = action;

      cookieProxy.authToken = payload;
    } else if (isRemoveAuthTokenAction(action)) {
      cookieProxy.deleteAuthToken();
    }

    return next(action);
  };
}
