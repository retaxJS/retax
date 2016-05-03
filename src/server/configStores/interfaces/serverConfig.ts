import { IConfigStore } from '../../../utils';
import { IRetaxConfig, IIsomorphicTools } from '../../../core';

export interface IServerConfig {
  serverRendering?: boolean;
  isomorphicTools?: IIsomorphicTools;
  retaxConfig?: IRetaxConfig;
}

export interface IServerConfigStore extends IConfigStore<IServerConfig> {}
