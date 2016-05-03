import { IApiService } from '../../../core';
import { IHashMap } from '../../../utils';

import { HttpMethod } from './httpMethods';
import { IRestFilter } from './restApi';

export interface IHeader extends IHashMap<string> {}

export interface IUrlConfig {
  url?: string;
  filters?: IRestFilter;
}

export interface IRequestConfig {
  body?: BodyInit;
  headers?: IHeader;
}

export interface IFetchConfig extends IRequestConfig {
  method: HttpMethod;
}

export interface IMethodConfig extends IUrlConfig, IRequestConfig {}

export interface IApi extends IApiService {
  get<T>(config: IMethodConfig): Promise<T>;
  post<T>(config: IMethodConfig): Promise<T>;
  put<T>(config: IMethodConfig): Promise<T>;
}
