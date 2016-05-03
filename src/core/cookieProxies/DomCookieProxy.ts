import { injectable, inject } from 'inversify';
import * as Cookie from 'js-cookie';

import { ICookieProxy } from './interfaces';
import CookieProxy from './CookieProxy';

import { IInternalConfig } from '../configStores';
import { IConfigStore } from '../../utils';

import { INTERNAL_CONFIG_STORE } from '../inversify/identifiers';

@injectable()
export default class DomCookieProxy extends CookieProxy implements ICookieProxy {
  constructor(
    @inject(INTERNAL_CONFIG_STORE) private _store: IConfigStore<IInternalConfig>
  ) {
    super();
  }

  public deleteAuthToken(): void {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    Cookie.remove(COOKIE_AUTH_TOKEN_KEY);
  }

  protected _setAuthToken(token: string): void {
    if (!token) return;

    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    Cookie.set(COOKIE_AUTH_TOKEN_KEY, token, { expires: 1 });
  }

  protected _readAuthToken(): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    return Cookie.get(COOKIE_AUTH_TOKEN_KEY);
  }
}
