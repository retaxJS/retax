import {
  IActionsCreatorService,
} from '../../../core';
import { IHashMap } from '../../../utils';

export interface IActionsCreator extends IActionsCreatorService {
  export(): IExportReturn;
}

export interface IExportReturn extends IHashMap<Function> {}
