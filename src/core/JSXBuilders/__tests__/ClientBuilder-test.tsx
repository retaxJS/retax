(jest as any).disableAutomock();

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ClientBuilder from '../ClientBuilder';
import RetaxProviderComponent from '../../components/Retax/RetaxProvider';
import InverisfyKernelFacade from '../../inversifyKernelFacade/InversifyKernelFacade';

describe('ClientBuilder', () => {
  const reduxFacade = {
    store: configureStore()({}),
  };

  const routerFacade = {
    renderProps: {
      firstProp: '1234',
    },
  };

  it('build and render the app', () => {
    const configStore = {
      config: {
        react: {
          appendChild: undefined,
        },
      },
    };

    const kernelFacade = new InverisfyKernelFacade();

    const builder = new ClientBuilder(
      configStore as any,
      RetaxProviderComponent,
      reduxFacade as any,
      routerFacade as any
    );

    const app = builder.build(kernelFacade as any);

    expect(app.type).toEqual(RetaxProviderComponent);

    const wrapper = shallow(app);
    const reduxProvider = wrapper.find('Provider');
    const reactRouter = wrapper.find('Router');

    expect(reduxProvider.prop('store')).toEqual(reduxFacade.store);
    expect(reactRouter.prop('firstProp')).toEqual('1234');
  });

  it('build and render the app with a children', () => {
    const configStore = {
      config: {
        react: {
          appendChild: <div id="the-children">Hello World!</div>,
        },
      },
    };

    const kernelFacade = new InverisfyKernelFacade();

    const builder = new ClientBuilder(
      configStore as any,
      RetaxProviderComponent,
      reduxFacade as any,
      routerFacade as any
    );

    const app = builder.build(kernelFacade as any);

    const wrapper = shallow(app);
    const children = wrapper.find('#the-children');

    expect(children.text()).toEqual('Hello World!');
  });
});
