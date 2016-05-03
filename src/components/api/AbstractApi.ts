import 'isomorphic-fetch';

import {
  IApi,
  IUrlConfig,
  IMethodConfig,
  IFetchConfig,
  IHeader,
  HttpMethod,
  IHttpError,
} from './interfaces';
import { HTTP_METHODS } from './httpMethods';
import ApiError from './ApiError';

import {
  IReduxFacade,
  IRetaxConfigStore,
  IRoutesMap, IApiServiceRuntimeConfig,
} from '../../core';

abstract class AbstractApi implements IApi {
  public routes: IRoutesMap;
  public baseUrl: string;

  private _authHeaderName: string;

  constructor(
    private _reduxFacade: IReduxFacade,
    private _configStore: IRetaxConfigStore
  ) {
    const { authHeaderName, baseUrl } = _configStore.config.api;
    this._authHeaderName = authHeaderName;
    this.baseUrl = baseUrl;
  }

  public configure(config: IApiServiceRuntimeConfig): void {
    this.baseUrl = config.baseUrl || this.baseUrl;
    this.routes = config.routes;
  }

  public get<T>(config: IMethodConfig): Promise<T> {
    return this._abstractMethod<T>(HTTP_METHODS.GET, config);
  }

  public post<T>(config: IMethodConfig): Promise<T> {
    return this._abstractMethod<T>(HTTP_METHODS.POST, config);
  }

  public put<T>(config: IMethodConfig): Promise<T> {
    return this._abstractMethod<T>(HTTP_METHODS.PUT, config);
  }

  private async _abstractMethod<T>(
    method: HttpMethod,
    { url, filters, body, headers }: IMethodConfig
  ): Promise<T> {
    const fullUrl = this._makeFullUrl({ url, filters });
    const fetchConfig = this._makeFetchConfig({ method, body, headers });

    const response = await fetch(fullUrl, fetchConfig);
    const error = await this._checkResponse(response);

    if (error) throw error;

    return response.json();
  }

  private async _checkResponse(response: IResponse): Promise<IHttpError> {
    let error: IHttpError;

    if (!response.ok) {
      error = new ApiError({
        status: response.status,
        statusText: response.statusText,
        text: await response.text(),
      });
    }

    return error;
  }

  /**
   * Compute the fetch configuration
   */
  private _makeFetchConfig(
    { method, body, headers }: IFetchConfig = { method: HTTP_METHODS.GET }
  ): RequestInit {
    const token = this._reduxFacade.getAuthToken();

    const isJson = typeof body === 'object' && !(body instanceof FormData);
    const bodyToSend = isJson ? JSON.stringify(body) : body;
    const jsonHeader: IHeader = isJson ? {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    } : undefined;
    const authHeader: IHeader = token ? {
      [this._authHeaderName]: token,
    } : undefined;

    return {
      body: bodyToSend,
      credentials: 'include',
      headers: Object.assign(
        {},
        jsonHeader,
        headers,
        authHeader
      ),
      method,
    };
  }

  /**
   * Create the full url on which fetch will make a call.
   */
  private _makeFullUrl(
    { url, filters }: IUrlConfig = {}
  ): string {
    return `${this.baseUrl}${url}?Filter=${JSON.stringify(filters)}`;
  }
}

export default AbstractApi;

