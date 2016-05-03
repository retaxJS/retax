import { IKernel, IFactory } from 'inversify';

import {
  InversifyKernelFacade, IInversifyKernelFacade, INVERSIFY_KERNEL_FACADE,
} from '../../../core';

import { IKernelFactory, KernelFactory } from '../../kernelFactory';
import { IInjector, Injector } from '../../injector';
import { IKernelMediator, KernelMediator } from '../../kernelMediator';

import {
  INVERSIFY_KERNEL_FACADE_FACTORY,
  KERNEL_FACTORY,
  INJECTOR,
  KERNEL_MEDIATOR,
} from '../identifiers';

export default function diModule(kernel: IKernel): void {
  kernel.bind<IInversifyKernelFacade>(INVERSIFY_KERNEL_FACADE).to(InversifyKernelFacade);
  kernel.bind<IKernelFactory>(KERNEL_FACTORY).to(KernelFactory).inSingletonScope();
  kernel.bind<IKernelMediator>(KERNEL_MEDIATOR).to(KernelMediator).inSingletonScope();
  kernel.bind<IInjector>(INJECTOR).to(Injector).inSingletonScope();

  kernel.bind<IFactory<IInversifyKernelFacade>>(INVERSIFY_KERNEL_FACADE_FACTORY).toAutoFactory(INVERSIFY_KERNEL_FACADE);
}
