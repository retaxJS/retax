jest.unmock('../idGenerator');

import { generateRandomId } from '../idGenerator';

describe('idGenerator', () => {
  it('generates and id', () => {
    const id = generateRandomId();

    expect(id.length).toEqual(6);
  });
});
