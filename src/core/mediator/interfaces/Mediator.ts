import { IInversifyKernelFacade } from '../../inversifyKernelFacade';

export interface IRetaxMediator {
  run(kernel: IInversifyKernelFacade): Promise<JSX.Element>;
}
