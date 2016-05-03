import { injectable, inject } from 'inversify';
import { Store } from 'redux';

import RetaxConfigStore from './RetaxConfigStore';
import { IRetaxConfig } from './interfaces';

import { IContext } from '../context';

import {
  CONTEXT,
} from '../inversify';

@injectable()
export default class RequestRetaxConfigStore extends RetaxConfigStore {
  constructor(
    @inject(CONTEXT) private _context: IContext
  ) {
    super(_context.retaxConfig);
  }

  public evaluateConfig(store: Store<any>): IRetaxConfig {
    const evaluatedConfig = this.config;
    const { router } = evaluatedConfig;

    if (router.dynamic && typeof router.dynamic === 'function') {
      router.static = router.dynamic(
        store,
        this._context.request.req.header('user-agent')
      );
    }

    return evaluatedConfig;
  }
}
