import { injectable, inject } from 'inversify';
import { Store } from 'redux';

import RetaxConfigStore from './RetaxConfigStore';
import { IRetaxConfig } from './interfaces';

import { IContext } from '../context';

import { CONTEXT } from '../inversify';

@injectable()
export default class DomRetaxConfigStore extends RetaxConfigStore {
  constructor(
    @inject(CONTEXT) _context: IContext
  ) {
    super(_context.retaxConfig);
  }

  public evaluateConfig(store: Store<any>): IRetaxConfig {
    const evaluatedConfig = this.config;

    const { router } = evaluatedConfig;

    if (router.dynamic && typeof router.dynamic === 'function') {
      router.static = router.dynamic(
        store,
        navigator.userAgent
      );
    }

    return evaluatedConfig;
  }
}
