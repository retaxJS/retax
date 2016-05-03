(jest as any).disableAutomock();

import { Kernel, injectable } from 'inversify';
import { IKernelMediator } from '../kernelMediator';
import { IInjector } from '../injector';
import { diModule, KERNEL_MEDIATOR, INJECTOR } from '../inversify';

describe('Retax DI', () => {

  @injectable()
  class Incrementer {
    public value: number = 0;

    public increment(): number {
      return ++this.value;
    }
  }

  it('creates user module and loads them into a new kernel facade', () => {
    const kernel = new Kernel();
    kernel.load(diModule);

    const injector = kernel.get<IInjector>(INJECTOR);
    const mediator = kernel.get<IKernelMediator>(KERNEL_MEDIATOR);

    const incrementerId = injector.registerService(<any>Incrementer);

    const kernelFacade = mediator.create([]);

    const incrementer = kernelFacade.getService<Incrementer>(incrementerId);

    expect(incrementer instanceof Incrementer).toBeTruthy();
    expect(incrementer.value).toEqual(0);
    expect(incrementer.increment()).toEqual(1);
    expect(incrementer.value).toEqual(1);
  });
});
