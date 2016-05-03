import { IKernelModule } from 'inversify';

import { IInversifyKernelFacade } from '../../../core';

export interface IKernelMediator {
  create(modules: IKernelModule[]): IInversifyKernelFacade;
  reload(kernelFacade?: IInversifyKernelFacade): void;
}
