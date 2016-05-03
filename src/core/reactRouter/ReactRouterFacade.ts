import { injectable, inject } from 'inversify';
import { match } from 'react-router';

import { IReactRouterFacade, IMatchArgs, IMatchResult } from './interfaces';

import { IRetaxConfigStore } from '../configStores';
import { IReduxFacade } from '../redux';
import { IContext } from '../context';
import { IRouterContextProps } from '../reactRouter';

import {
  CONTEXT,
  REDUX_FACADE,
  RETAX_CONFIG_STORE,
} from '../inversify';

@injectable()
export default class ReactRouterFacade implements IReactRouterFacade {
  private _renderProps: IRouterContextProps;

  constructor(
    @inject(CONTEXT) private _context: IContext,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(RETAX_CONFIG_STORE) private _configStore: IRetaxConfigStore
  ) {}

  get renderProps(): IRouterContextProps {
    if (!this._renderProps) {
      throw new Error('renderProps has not been initialized');
    }

    return this._renderProps;
  }

  public async initialize(): Promise<IRouterContextProps> {
    this._renderProps = await this.resolveRoute();

    return this._renderProps;
  }

  public async resolveRoute(): Promise<IRouterContextProps> {
    const { store } = this._reduxFacade;
    let resolutionTry = 0;
    let finalRenderProps;

    do {
      const config = this._configStore.evaluateConfig(store);
      const routes = config.router.static;

      const { renderProps, redirectLocation } = await this._match({
        history: this._context.history,
        routes,
      });

      if (redirectLocation) {
        this._context.history.replace(redirectLocation);
      }

      finalRenderProps = renderProps;
      resolutionTry++;
    } while (!finalRenderProps && resolutionTry < 3);

    if (!finalRenderProps && resolutionTry === 3) {
      throw new Error('Error in react-router, too much try');
    }

    return finalRenderProps;
  }

  private _match(config: IMatchArgs): Promise<IMatchResult> {
    return new Promise<IMatchResult>((resolve, reject) => {
      match(config, (err, redirectLocation, renderProps) => {
        if (err) reject(err);

        resolve({
          redirectLocation,
          renderProps,
        });
      });
    });
  }
}
