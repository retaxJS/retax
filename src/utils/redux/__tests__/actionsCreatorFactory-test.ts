jest.unmock('../actionsCreatorFactory');

import makeActionsCreator from '../actionsCreatorFactory';

describe('actionsCreatorFactory', () => {
  it('create a simple actions creator', () => {
    const actionsCreator = makeActionsCreator('INC');

    expect(actionsCreator()).toEqual({
      payload: undefined,
      type: 'INC',
    });

    expect(actionsCreator(5)).toEqual({
      payload: 5,
      type: 'INC',
    });
  });

  it('create an actions creator with a payload creator', () => {
    const actionsCreator = makeActionsCreator(
      'INC',
      (x = 0) => 2 * x
    );

    expect(actionsCreator()).toEqual({
      payload: 0,
      type: 'INC',
    });

    expect(actionsCreator(5)).toEqual({
      payload: 10,
      type: 'INC',
    });
  });

  it('create an actions creator with a meta creator', () => {
    const actionsCreator = makeActionsCreator(
      'INC',
      (x = 0) => 3 * x,
      (x = 0) => 2 * x
    );

    expect(actionsCreator()).toEqual({
      meta: 0,
      payload: 0,
      type: 'INC',
    });

    expect(actionsCreator(5)).toEqual({
      meta: 10,
      payload: 15,
      type: 'INC',
    });
  });

  it('create an actions creator which returns an error', () => {
    const actionsCreator = makeActionsCreator('INC');

    const error = new Error('Borken!');

    expect(actionsCreator(error)).toEqual({
      error: true,
      payload: error,
      type: 'INC',
    });
  });
});
