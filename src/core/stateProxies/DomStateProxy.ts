import { injectable, inject } from 'inversify';

import { IStateProxy } from './interfaces';
import AStateConverter from './StateConverter';

import { IInternalConfigStore, IRetaxConfigStore } from '../configStores';

import { INTERNAL_CONFIG_STORE, RETAX_CONFIG_STORE } from '../inversify/identifiers';

@injectable()
export default class DomStateProxy extends AStateConverter implements IStateProxy {
  constructor(
    @inject(RETAX_CONFIG_STORE) private _retaxConfigStore: IRetaxConfigStore,
    @inject(INTERNAL_CONFIG_STORE) private _internalConfigStore: IInternalConfigStore
  ) {
    super();
  }

  public read<S>(): S {
    const { INITIAL_STATE_KEY } = this._internalConfigStore.config;
    const { nonImmutableKeys } = this._retaxConfigStore.config.store;

    const serverState = window[INITIAL_STATE_KEY];

    const immutableState = this.convertStateToImmutable<S>(serverState, nonImmutableKeys);

    return immutableState;
  }
}
