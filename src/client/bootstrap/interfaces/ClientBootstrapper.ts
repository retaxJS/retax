import { IRetaxConfig } from '../../../core';
import { IBootstrapper } from '../../../utils';

export interface IClientBootstrapper extends IBootstrapper<
  IRetaxConfig,
  Element,
  Promise<void>
> {
  reload(): void;
}
