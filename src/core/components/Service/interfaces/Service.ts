import { IHashMap } from '../../../../utils';

export interface IUserServiceConstructor {
  new(...args: any[]): IUserService;
}
export interface IUserService {
  configure<T>(config: T): void;
}

export interface IUserServiceMap extends IHashMap<IUserService> {}
export interface IInjectableUserServiceMap extends IHashMap<IUserServiceConstructor> {}





