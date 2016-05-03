jest.unmock('lodash');
jest.unmock('../ConfigStore');

import ConfigStore from '../ConfigStore';

interface IStore {
  firstName: string;
  lastName: string;
}

describe('ConfigStore', () => {
  it('set, get and merges config in the store', () => {
    const store = new ConfigStore<IStore>();

    store.config = {
      firstName: 'Thomas',
      lastName: 'Hourlier',
    };

    expect(store.config).toEqual({
      firstName: 'Thomas',
      lastName: 'Hourlier',
    });

    store.mergeConfig({
      firstName: 'Thomas2',
      lastName: 'Hourlier2',
    });

    expect(store.config).toEqual({
      firstName: 'Thomas2',
      lastName: 'Hourlier2',
    });
  });
});
