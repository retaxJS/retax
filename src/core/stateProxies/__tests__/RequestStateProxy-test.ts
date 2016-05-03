jest.unmock('inversify');
jest.unmock('../RequestStateProxy');

import RequestStateProxy from '../RequestStateProxy';

describe('RequestStateProxy', () => {
  it('reads the initial state and convert it to an immutable object', () => {
    const proxy = new RequestStateProxy();

    const res = proxy.read();

    expect(res).toEqual({});
  });
});
