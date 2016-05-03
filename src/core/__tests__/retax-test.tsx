(jest as any).disableAutomock();

/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { shallow } from 'enzyme';
import { createMemoryHistory, Route } from 'react-router';

import {
  clientModule, contextModuleFactory, lifecycleModuleFactory,
  MEDIATOR,
} from '../inversify';
import { IRetaxMediator } from '../mediator';
import { InversifyKernelFacade } from '../inversifyKernelFacade';
import { RetaxProvider } from '../components';

describe('Retax Core', () => {
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
          <Route path="home" />
          <Route path="about" />
        </Route>
      ),
    },
    store: {
      reducers: {
        counter: counterReducer,
      },
    },
  };

  pit('build a retax app', async () => {
    // configure history
    const history = createMemoryHistory();
    const location = history.createLocation('/home');
    history.replace(location);

    // create IOC kernel
    const inversifyKernelFacade = new InversifyKernelFacade();
    inversifyKernelFacade.loadKernelModules([
      clientModule,
      contextModuleFactory({ history, retaxConfig } as any),
      lifecycleModuleFactory(retaxConfig.lifecycle),
    ]);

    // build the app
    const mediator = inversifyKernelFacade.getService<IRetaxMediator>(MEDIATOR);
    const app = await mediator.run(inversifyKernelFacade);

    expect(app.type).toEqual(RetaxProvider);

    const wrapper = shallow(app);

    expect(wrapper).toBeTruthy();
  });
});
