import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IConfigStore } from '../../utils';
import { IInternalConfig, INTERNAL_CONFIG_STORE } from '../../core';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigStore } from '../configStores';
import {
  SERVER_CONFIG_STORE,
} from '../inversify';

@injectable()
export default class StaticMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    @inject(SERVER_CONFIG_STORE) private _serverConfigStore: IServerConfigStore,
    @inject(INTERNAL_CONFIG_STORE) private _internalConfigStore: IConfigStore<IInternalConfig>
  ) {}

  public create(): IRetaxMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const markup = this._generateHtmlMarkup();
        res.send(markup);
      } catch (e) {
        next(e);
      }
    };
  }

  private _generateHtmlMarkup(): string {
    const { INITIAL_STATE_KEY } = this._internalConfigStore.config;

    const assets = this._serverConfigStore.config.isomorphicTools.assets();

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>RetaxTest</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </head>
        <body class="fullbleed layout vertical">
          <div id="root" class="flex layout vertical">
            Loading...
          </div>
          <script>
            window.${INITIAL_STATE_KEY} = ${JSON.stringify({})};
          </script>
          ${
            Object.keys(assets.javascript).map((scriptName: string) => (
              `<script src="${assets.javascript[scriptName]}" defer></script>`
            )).join('')
          }
        </body>
      </html>
    `;
  }
}
