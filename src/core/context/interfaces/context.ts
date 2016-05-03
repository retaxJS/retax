import { Request, Response } from 'express';

import { IRetaxConfig } from '../../configStores';

export interface IAssets {
  javascript: Object;
  styles?: Object;
}

export interface IIsomorphicTools {
  assets(): IAssets;
  development(inDevelopment: boolean): IIsomorphicTools;
}

export interface IRequestContext {
  req: Request;
  res: Response;
  isomorphicTools?: IIsomorphicTools;
}

export interface IContext {
  history: HistoryModule.History;
  retaxConfig: IRetaxConfig;
  request?: IRequestContext;
}
