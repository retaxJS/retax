import { injectable } from 'inversify';
import { ConfigStore } from '../../utils';
import { retaxConfig } from '../../core';

import { IServerConfig } from './interfaces';

export const initialConfig: IServerConfig = {
  isomorphicTools: undefined,
  retaxConfig,
  serverRendering: true,
};

@injectable()
export default class ServerConfigStore extends ConfigStore<IServerConfig> {
  constructor() {
    super();
    this.config = initialConfig;
  }
}
