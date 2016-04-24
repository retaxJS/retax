(jest as any).disableAutomock();

import middleware from '../server';

describe('retax server', () => {
  it('exposes the middleware', () => {
    expect(middleware instanceof Function).toBeTruthy();
  });
});
