import { IConfigStore } from '../../../utils';

export interface IInternalConfig {
  INITIAL_STATE_KEY: string;
  COOKIE_AUTH_TOKEN_KEY: string;
}

export interface IInternalConfigStore extends IConfigStore<IInternalConfig> {}
