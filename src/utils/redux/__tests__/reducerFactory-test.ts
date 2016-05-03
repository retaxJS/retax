jest.unmock('../reducerFactory');

import reducerFactory from '../reducerFactory';

describe('reducerFactory', () => {
  it('create a reducer', () => {
    const reducer = reducerFactory(
      0,
      {
        DEC: (state: number, action: { payload: number }): number => state - action.payload,
        INC: (state: number, action: { payload: number }): number => state + action.payload,
      }
    );

    let state: number = (<any>reducer)();

    expect(state).toEqual(0);

    state = reducer(state, {
      payload: 1,
      type: 'DEC',
    });

    expect(state).toEqual(-1);

    state = reducer(state, {
      payload: 10,
      type: 'INC',
    });

    expect(state).toEqual(9);

    state = reducer(state, {
      type: 'OTHER',
    });

    expect(state).toEqual(9);
  });
});
