(jest as any).disableAutomock();

jest.mock('react-router');

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { Kernel } from 'inversify';
import { diModule } from '../../di';
import { REDUX_FACADE, IReduxFacade } from '../../core';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { IClientBootstrapper } from '../bootstrap';
import { clientModule, CLIENT_BOOTSTRAPPER } from '../inversify';

describe('Retax client', () => {

  const About = connect(state => {
    return {
      counter: state.counter,
    };
  })(
    (props) => <div>Hello About! {`TheCounterValue${props.counter}`}</div>
  );

  function counterReducer(state: number = 0, action: any): number {
    switch (action.type) {
      case 'INC':
        return state + 1;
      default:
        return state;
    }
  }

  const retaxConfig = {
    lifecycle: undefined,
    react: {
      appendChild: undefined,
    },
    router: {
      static: (
        <Route path="/">
          <Route path="about" component={About}/>
        </Route>
      ),
    },
    store: {
      reducers: {
        counter: counterReducer,
      },
    },
  };

  pit('bootstraps a retax app', async () => {
    Object.defineProperty(window.location, 'pathname', {
      value: '/about',
      writable: true,
    });

    const mountPoint = document.createElement('div');
    const kernel = new Kernel();

    kernel.load(diModule, clientModule);

    const bootstrapper = kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);

    bootstrapper.config(retaxConfig as any);
    await bootstrapper.bootstrap(mountPoint);

    expect(mountPoint.innerHTML).toContain('Hello About!');
  });

  pit('update the redux store of a retax app', async () => {
    Object.defineProperty(window.location, 'pathname', {
      value: '/about',
      writable: true,
    });

    const mountPoint = document.createElement('div');
    const kernel = new Kernel();

    kernel.load(diModule, clientModule);

    const bootstrapper = kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);

    bootstrapper.config(retaxConfig as any);
    await bootstrapper.bootstrap(mountPoint);

    expect(mountPoint.innerHTML).toContain('TheCounterValue0');

    const kernelFacade = (bootstrapper as any)._kernelFacade;

    const reduxFacade: IReduxFacade = kernelFacade.getService(REDUX_FACADE);
    const { store } = reduxFacade;

    store.dispatch({
      type: 'INC',
    });

    expect(mountPoint.innerHTML).toContain('TheCounterValue1');
  });

  pit('throws an execption because no route match the url', async () => {
    Object.defineProperty(window.location, 'pathname', {
      value: '/home',
      writable: true,
    });

    const mountPoint = document.createElement('div');
    const kernel = new Kernel();

    kernel.load(diModule, clientModule);

    const bootstrapper = kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);

    bootstrapper.config(retaxConfig as any);
    let error;

    try {
      await bootstrapper.bootstrap(mountPoint);
    } catch (e) {
      error = e;
    } finally {
      expect(error instanceof Error).toBeTruthy();
      expect(error.message).toEqual('Error in react-router, too much try');
    }
  });
});
