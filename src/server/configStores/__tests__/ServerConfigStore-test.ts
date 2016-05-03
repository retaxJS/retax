(jest as any).disableAutomock();

jest.unmock('../ServerConfigStore');

import { retaxConfig } from '../../../core';
import ServerConfigStore from '../ServerConfigStore';

describe('ServerConfigStore', () => {
  it('set the default config', () => {
    const store = new ServerConfigStore();

    expect(store.config).toEqual({
      isomorphicTools: undefined,
      retaxConfig,
      serverRendering: true,
    });
  });
});
