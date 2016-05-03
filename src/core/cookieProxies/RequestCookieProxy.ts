import { injectable, inject } from 'inversify';

import { ICookieProxy } from './interfaces';
import CookieProxy from './CookieProxy';

import { IInternalConfig } from '../configStores';
import { IContext } from '../context';
import { IConfigStore } from '../../utils';

import { INTERNAL_CONFIG_STORE, CONTEXT } from '../inversify/identifiers';

@injectable()
export default class RequestCookieProxy extends CookieProxy implements ICookieProxy {

  constructor(
    @inject(INTERNAL_CONFIG_STORE) private _store: IConfigStore<IInternalConfig>,
    @inject(CONTEXT) private _context: IContext
  ) {
    super();
  }

  public deleteAuthToken(): void {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    this._context.request.res.cookie(COOKIE_AUTH_TOKEN_KEY, undefined);
  }

  protected _setAuthToken(token: string): void {
    if (!token) return;

    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    this._context.request.res.cookie(COOKIE_AUTH_TOKEN_KEY, token);
  }

  protected _readAuthToken(): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    return this._context.request.req.cookies[COOKIE_AUTH_TOKEN_KEY];
  }
}
