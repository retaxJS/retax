import { IInjectableUserServiceMap } from '../../Service';
import { IInversifyKernelFacade } from '../../../inversifyKernelFacade';

export interface IRetaxChildContext {
  kernel: IInversifyKernelFacade;
}

export interface IRetaxProps extends IRetaxChildContext {}

export interface IRetaxComponentRuntimeConfig {
  actionsCreators?: IInjectableUserServiceMap;
}
