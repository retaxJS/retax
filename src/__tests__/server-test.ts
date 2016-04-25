(jest as any).disableAutomock();

import middleware from '../server';

describe('retax server', () => {
  const serverConfig = {
    serverRendering: true,
  };

  it('exposes the middleware', () => {
    expect(middleware instanceof Function).toBeTruthy();
    expect(middleware(serverConfig) instanceof Function);
  });
});
