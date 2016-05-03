(<any>jest).disableAutomock();

import { Kernel, injectable } from 'inversify';
import Injector from '../Injector';

describe('Injector', () => {

  @injectable()
  class Service {
    public random: number = 1234;
    public configure(config: any): void {
      return;
    }
  }

  it('registers one service', () => {
    const kernel = new Kernel();
    const injector = new Injector();

    expect(injector.userModules).toEqual([]);

    const serviceId = injector.registerService(Service);
    const [firstModule] = injector.userModules;

    expect(injector.userModules.length).toEqual(1);
    expect(firstModule.serviceId).toEqual(serviceId);

    kernel.load(firstModule.kernelModuleLoader);

    const service = kernel.get<Service>(serviceId);

    expect(service instanceof Service).toBeTruthy();
    expect(service.random).toEqual(1234);
  });

  it('unloads a module', () => {
    const kernel = new Kernel();
    const injector = new Injector();

    const serviceId = injector.registerService(Service);
    const [firstModule] = injector.userModules;

    kernel.load(firstModule.kernelModuleLoader);
    kernel.load(firstModule.kernelModuleUnloader);

    expect(() => kernel.get(serviceId)).toThrow();
  });

  it('registers 2 times the same service an throws', () => {
    const injector = new Injector();

    injector.registerService(Service);
    expect(() => injector.registerService(Service)).toThrow();
  });

  it('registers several services', () => {
    const kernel = new Kernel();
    const injector = new Injector();

    const serviceId = injector.registerService([Service, Service]);
    const [firstModule] = injector.userModules;

    kernel.load(firstModule.kernelModuleLoader);

    const services = kernel.getAll<Service[]>(serviceId);

    expect(services.length).toEqual(2);
    expect(services[0] instanceof Service).toBeTruthy();
    expect(services[1] instanceof Service).toBeTruthy();
  });

  it('registers a undefined service', () => {
    const kernel = new Kernel();
    const injector = new Injector();

    const serviceId = injector.registerService(undefined);
    const [firstModule] = injector.userModules;

    kernel.load(firstModule.kernelModuleLoader);

    const service = kernel.get<Service>(serviceId);
    expect(service).toEqual(undefined);
  });

  it('registers a empty array of services', () => {
    const kernel = new Kernel();
    const injector = new Injector();

    const serviceId = injector.registerService([]);
    const [firstModule] = injector.userModules;

    kernel.load(firstModule.kernelModuleLoader);

    const service = kernel.get<Service>(serviceId);
    expect(service).toEqual(undefined);
  });
});
