jest.unmock('redux');
jest.unmock('redux-mock-store');
jest.unmock('../Html');

jest.mock('react-helmet');

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { shallow, ShallowWrapper } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as Helmet from 'react-helmet';

import Html from '../Html';

describe('Html Component', () => {
  let wrapper: ShallowWrapper<any, any>;
  const initialState = {
    renderTime: +new Date(),
  };
  const assets = {
    javascript: {
      'bundle': 'bundle.js',
      'vendor': 'vendor.js',
    },
  };
  const config = {
    COOKIE_AUTH_TOKEN_KEY: 'auth_token',
    INITIAL_STATE_KEY: '__INITIAL_STATE__',
  };

  beforeEach(() => {
    const store = configureStore()(initialState);

    wrapper = shallow(
      <Html
        store={store}
        assets={assets}
        rootComponent={
          <div>Hello World</div>
        }
        internalConfig={config}
      />
    );

    expect(wrapper).toBeTruthy();
  });

  it('contains a script tag with the initial state', () => {
    const initialStateScript = wrapper.find('#initial-state');

    expect(initialStateScript.html()).toContain(
      `${config.INITIAL_STATE_KEY}=${JSON.stringify(initialState)}`
    );
  });

  it('contains a script tag with the JS assets', () => {
    const assetsScripts = wrapper.find('script[defer]');

    expect(assetsScripts.length).toEqual(2);

    Object.keys(assets.javascript).forEach((k, i) => {
      expect(assetsScripts.at(i).prop('src')).toEqual(assets.javascript[k]);
    });
  });

  it('contains the root component', () => {
    const root = wrapper.find('#root');

    expect(root.html()).toContain('Hello World');
  });

  it('calls react-helmet methods', () => {
    expect(Helmet.rewind).toBeCalled();
  });
});
