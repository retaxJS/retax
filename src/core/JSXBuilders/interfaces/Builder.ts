import { IInversifyKernelFacade } from '../../inversifyKernelFacade';

export interface IJSXBuilder {
  build(kernel: IInversifyKernelFacade): JSX.Element;
}
