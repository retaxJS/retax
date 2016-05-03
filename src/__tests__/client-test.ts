(jest as any).disableAutomock();

import 'reflect-metadata';

import { ClientBootstrapper } from '../client';
import { retax } from '../index';

describe('retax client', () => {
  it('exposes the client bootstrapper', () => {
    expect(retax instanceof ClientBootstrapper).toBeTruthy();
  });
});
