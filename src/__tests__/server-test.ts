(jest as any).disableAutomock();

import 'reflect-metadata';

import { retaxMiddleware } from '../index';

describe('retax server', () => {
  const serverConfig = {
    serverRendering: true,
  };

  it('exposes the middleware', () => {
    expect(retaxMiddleware instanceof Function).toBeTruthy();
    expect(retaxMiddleware(serverConfig) instanceof Function);
  });
});
