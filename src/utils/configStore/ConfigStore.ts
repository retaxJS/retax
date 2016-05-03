import { merge } from 'lodash';

import { IConfigStore } from './interfaces';

export default class ConfigStore<T> implements IConfigStore<T> {
  private _config: T;

  /**
   * Get the current config
   */
  get config(): T {
    return this._config;
  }

  /**
   * Merge the new config in the previous one
   */
  set config(c: T) {
    this._config = c;
  }

  public mergeConfig(c: T): void {
    this._config = merge({}, this._config, c);
  }
}
