(jest as any).disableAutomock();

import { Kernel } from 'inversify';

import kernel from '../di';

describe('di container', () => {
  it('exposes the kernel', () => {
    expect(kernel instanceof Kernel).toBeTruthy();
  });
});
