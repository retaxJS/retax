(jest as any).disableAutomock();

import { ClientBootstrapper } from 'retax-client';

import bootstrapper from '../client';

describe('retax client', () => {
  it('exposes the client bootstrapper', () => {
    expect(bootstrapper instanceof ClientBootstrapper).toBeTruthy();
  });
});
