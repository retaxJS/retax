jest.unmock('../StateConverter');

import StateConverter from '../StateConverter';
import { Collection } from 'immutable';

class Consumer extends StateConverter {}

export interface IState {
  routing: { someProps: boolean };
  session: Collection<string, string>;
  user: Collection<string, string>;
}

describe('StateConverter', () => {
  let converter: Consumer;

  beforeEach(() => {
    converter = new Consumer();
  });

  it('converts an object values to immutable skipping some keys', () => {
    const res = converter.convertStateToImmutable<IState>({
      routing: {
        someProps: true,
      },
      session: {
        token: '123456789',
      },
      user: {
        name: 'Thomas',
      },
    }, ['routing']);

    expect(res.routing).toEqual({
      someProps: true,
    });

    expect(res.session.toJS()).toEqual({
      token: '123456789',
    });

    expect(res.user.toJS()).toEqual({
      name: 'Thomas',
    });
  });

  it('converts undefined to an empty object', () => {
    const res = converter.convertStateToImmutable<IState>();

    expect(res).toEqual({});
  });
});

