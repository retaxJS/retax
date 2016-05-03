(jest as any).disableAutomock();

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import configureStore from 'redux-mock-store';
import { RouterContext } from 'react-router';

RouterContext.propTypes = undefined;

import ServerBuilder from '../ServerBuilder';
import HtmlComponent from '../../components/Html/Html';
import RetaxProviderComponent from '../../components/Retax/RetaxProvider';
import InverisfyKernelFacade from '../../inversifyKernelFacade/InversifyKernelFacade';

describe('ServerBuilder', () => {
  const reduxFacade = {
    store: configureStore()({}),
  };

  const routerFacade = {
    renderProps: {
      firstProp: '1234',
    },
  };

  const internalConfigStore = {
    config: {},
  };

  const context = {
    request: {
      isomorphicTools: undefined,
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

    const builder = new ServerBuilder(
      configStore as any,
      internalConfigStore as any,
      HtmlComponent,
      RetaxProviderComponent,
      reduxFacade as any,
      routerFacade as any,
      context as any
    );

    const app = builder.build(kernelFacade as any);

    expect(app.type).toEqual(HtmlComponent);
  });
});
